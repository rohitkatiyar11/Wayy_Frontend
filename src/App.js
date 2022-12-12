/**
 * This example shows how you can use custom nodes and edges to dynamically add elements to your react flow graph.
 * A global layouting function calculates the new positions for the nodes every time the graph changes and animates existing nodes to their new position.
 *
 * There are three ways of adding nodes to the graph:
 *  1. Click an existing node: Create a new child node of the clicked node
 *  2. Click on the plus icon of an existing edge: Create a node in between the connected nodes of the edge
 *  3. Click a placeholder node: Turn the placeholder into a "real" node to prevent jumping of the layout
 *
 * The graph elements are added via hook calls in the custom nodes and edges. The layout is calculated every time the graph changes (see hooks/useLayout.ts).
 **/
import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background, Edge, Node, ProOptions, ReactFlowProvider, Controls, ControlButton, useNodesState,
  useEdgesState,
  useKeyPress,
  addEdge,
  useReactFlow,
  getOutgoers
} from 'reactflow';

import useLayout from './hooks/useLayout';
import nodeTypes from './NodeTypes';
import edgeTypes from './EdgeTypes';
import { inodes, iedges } from "./initial-elements";
import 'reactflow/dist/style.css';
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import 'reactflow/dist/style.css';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson, toast } from '@mobiscroll/react';
import { uuid, randomLabel } from './utils';
import List from "./list";


const ContainerDiv = styled(Container)`
  font-family: sans-serif;
  text-align: center;
`;

const proOptions = { account: 'paid-pro', hideAttribution: true };

const fitViewOptions = {
  padding: 0.95,
};

function ReactFlowPro() {
  const { setEdges, setNodes, getNodes, getEdges, getNode } = useReactFlow();

  const [myEvents, setEvents] = React.useState([]);

  React.useEffect(() => {
    getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
      setEvents(events);
    }, 'jsonp');
  }, []);

  const onEventClick = React.useCallback((event) => {
    toast({
      message: event.event.title
    });
  }, []);

  const view = React.useMemo(() => {
    return {
      schedule: { type: 'day' }
    };
  }, []);
  const enterPressed = useKeyPress(['Enter']);
  const tabPressed = useKeyPress(['Tab']);

  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);
  // this hook call ensures that the layout is re-calculated every time the graph changes
  useLayout();

  const handleOnSelectionChange = (evt) => {
    // console.log('enterPressed', enterPressed)
    //console.log('evt', evt);
  }

  const handleNodeCreation = (id) => {
    const parentNode = getNode(id);
    if (!parentNode) {
      return;
    }

    // create a unique id for the child node
    const childNodeId = uuid();

    // create a unique id for the placeholder (the placeholder gets added to the new child node)
    const childPlaceholderId = uuid();

    // create the child node
    const childNode = {
      id: childNodeId,
      // we try to place the child node close to the calculated position from the layout algorithm
      // 150 pixels below the parent node, this spacing can be adjusted in the useLayout hook
      position: { x: parentNode.position.x, y: parentNode.position.y + 150 },
      type: 'workflow',
      // data: { label: randomLabel() },
      data: {
        label: "", list: (
          <List data={[{ text: "Daily Run", status: "pending" }, { text: "Finish 10K", status: "completed" }]} />
        )
      }
    };

    // create a placeholder for the new child node
    // we want to display a placeholder for all workflow nodes that do not have a child already
    // as the newly created node will not have a child, it gets this placeholder
    const childPlaceholderNode = {
      id: childPlaceholderId,
      // we place the placeholder 150 pixels below the child node, spacing can be adjusted in the useLayout hook
      position: { x: childNode.position.x, y: childNode.position.y + 150 },
      type: 'placeholder',
      data: { label: '+' },
    };

    // we need to create a connection from parent to child
    const childEdge = {
      id: `${parentNode.id}=>${childNodeId}`,
      source: parentNode.id,
      target: childNodeId,
      type: 'workflow',
    };

    // we need to create a connection from child to our placeholder
    const childPlaceholderEdge = {
      id: `${childNodeId}=>${childPlaceholderId}`,
      source: childNodeId,
      target: childPlaceholderId,
      type: 'placeholder',
    };

    // if the clicked node has had any placeholders as children, we remove them because it will get a child now
    const existingPlaceholders = getOutgoers(parentNode, getNodes(), getEdges())
      .filter((node) => node.type === 'placeholder')
      .map((node) => node.id);

    // add the new nodes (child and placeholder), filter out the existing placeholder nodes of the clicked node
    setNodes((nodes) =>
      nodes.filter((node) => !existingPlaceholders.includes(node.id)).concat([childNode, childPlaceholderNode])
    );

    // add the new edges (node -> child, child -> placeholder), filter out any placeholder edges
    setEdges((edges) =>
      edges.filter((edge) => !existingPlaceholders.includes(edge.target)).concat([childEdge, childPlaceholderEdge])
    );
  }

  useEffect(() => {
    if (enterPressed) {
      const nodes = getNodes();
      const selectedNode = nodes.find(({ selected }) => !!selected);
      if (selectedNode) {
        handleNodeCreation(selectedNode.id);
      }
    }
  }, [enterPressed]);

  useEffect(() => {
    if (tabPressed) {
      const nodes = getNodes();
      const selectedNode = nodes.find(({ selected }) => !!selected);
      if (selectedNode) {
        const edges = getEdges();
        const targetEdge = edges.find(({ target }) => selectedNode.id === target);
        if (targetEdge) {
          handleNodeCreation(targetEdge.source);
        }
      }
    }
  }, [tabPressed]);

  return (
    <ContainerDiv fluid>
      <Row>
        <Col md={8}>
          <div style={{ height: '100vh' }}>
            <ReactFlow
              onConnect={onConnect}
              defaultNodes={inodes}
              defaultEdges={iedges}
              proOptions={proOptions}
              fitView
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              fitViewOptions={fitViewOptions}
              minZoom={0.2}
              nodesDraggable={false}
              nodesConnectable={false}
              zoomOnDoubleClick={false}
              onSelectionChange={handleOnSelectionChange}
            >
              <Controls
                onZoomIn={() => console.log("zoom in pressed")}
              >
                <ControlButton onClick={() => console.log("action")}>h</ControlButton>
              </Controls>
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
        </Col>
        <Col md={4} style={{ marginTop: "40px" }}>
          <Eventcalendar
            theme="ios"
            themeVariant="light"
            clickToCreate={true}
            dragToCreate={true}
            dragToMove={true}
            dragToResize={true}
            eventDelete={true}
            data={myEvents}
            view={view}
            onEventClick={onEventClick}
            responsive={{
              xsmall: {
                view: {
                  schedule: { type: 'day' }
                }
              },
              custom: { // Custom breakpoint
                breakpoint: 600,
                view: {
                  schedule: { type: 'week' }
                }
              }

            }}
          />
        </Col>
      </Row>
    </ContainerDiv>
  );
}

function ReactFlowWrapper() {
  return (
    <ReactFlowProvider>
      <ReactFlowPro />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
