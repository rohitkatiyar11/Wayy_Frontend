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
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge, Background, getOutgoers, ReactFlowProvider, useKeyPress, useReactFlow
} from 'reactflow';

import { getJson, toast } from '@mobiscroll/react';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Col, Container, Row } from "react-bootstrap";
import 'reactflow/dist/style.css';
import styled from "styled-components";
import { AppContext } from './context';
import edgeTypes from './EdgeTypes';
import useLayout from './hooks/useLayout';
import { iedges, inodes } from "./initial-elements";
import List from "./list";
import nodeTypes from './NodeTypes';
import { uuid } from './utils';

const ContainerDiv = styled(Container)`
  font-family: sans-serif;
  text-align: center;
`;

const proOptions = { account: 'paid-pro', hideAttribution: true };

const fitViewOptions = {
  padding: 0.95,
};

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here 
  // is better than directly setting `value + 1`
}

function ReactFlowPro() {
  const { setEdges, setNodes, getNodes, getEdges, getNode } = useReactFlow();
  const forceUpdate = useForceUpdate();
  const backSpacePresses = useKeyPress(["Backspace", "Delete"]);
  const enterPressed = useKeyPress(['Enter']);
  const tabPressed = useKeyPress(['Tab']);
  const arrowPressUp = useKeyPress(["ArrowUp"]);
  const arrowPresseDown = useKeyPress(["ArrowDown"]);
  const arrowPressRight = useKeyPress(["ArrowRight"]);
  const arrowPresseLeft = useKeyPress(["ArrowLeft"]);

  const debounce = (func, timeout = 250) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  useEffect(() => {
    const nodes = getNodes();
    const edges = getEdges();
    const selectedNodeId = localStorage.getItem("selectedNodeId");
    if (!selectedNodeId) return;
    if (arrowPresseDown) {
      const targets = edges.filter(e => e.source === selectedNodeId).map(({ target }) => target);
      if (targets?.length) {
        const nextEligibleNodes = nodes.filter(n => !!targets.includes(n.id) && n.type === "workflow").sort((a, b) => a.position.x - b.position.x);
        const nextNode = nextEligibleNodes[0]
        nextNode && debounce(() => handleOnClickNode(nextNode.id))();
      }
    } else if (arrowPressUp) {
      const target = edges.find(e => e.target === selectedNodeId);
      if (target) {
        debounce(() => handleOnClickNode(target.source))();
      }
    } else if (arrowPressRight) {
      const parentId = edges.find(e => e.target === selectedNodeId)?.source;
      if (!parentId) return;
      const targets = edges.filter(e => e.source === parentId).map(({ target }) => target);
      if (targets?.length) {
        const nextEligibleNodes = nodes.filter(n => !!targets.includes(n.id) && n.type === "workflow").sort((a, b) => a.position.x - b.position.x);
        const selectedIndex = nextEligibleNodes.findIndex(ne => ne.id === selectedNodeId);
        const nextNode = nextEligibleNodes[selectedIndex + 1]
        nextNode && debounce(() => handleOnClickNode(nextNode.id))();
      }
    } else if (arrowPresseLeft) {
      const parentId = edges.find(e => e.target === selectedNodeId)?.source;
      if (!parentId) return;
      const targets = edges.filter(e => e.source === parentId).map(({ target }) => target);
      if (targets?.length) {
        const nextEligibleNodes = nodes.filter(n => !!targets.includes(n.id) && n.type === "workflow").sort((a, b) => a.position.x - b.position.x);
        const selectedIndex = nextEligibleNodes.findIndex(ne => ne.id === selectedNodeId);
        const nextNode = nextEligibleNodes[selectedIndex - 1]
        nextNode && debounce(() => handleOnClickNode(nextNode.id))();
      }
    }

  }, [arrowPressUp, arrowPressRight, arrowPresseDown, arrowPresseLeft])

  useEffect(() => {
    localStorage.setItem('selectedNodeId', "1");
    return () => {
      localStorage.removeItem('selectedNodeId');
    }
  }, [])

  const getDeletableIds = (edges, source, temp = []) => {
    for (let i = 0; i < edges.length; i++) {
      if (edges[i].source === source) {
        temp.push(edges[i].target);
        getDeletableIds(edges, edges[i].target, temp);
      }
    }
    return temp;
  }

  useEffect(() => {
    if (backSpacePresses) {
      const nodes = getNodes();
      const edges = getEdges();
      const selectedNode = nodes.find(({ selected }) => selected);
      if (selectedNode && !selectedNode?.data?.mainGoal) {
        let unodes = nodes.filter(n => selectedNode.id !== n.id);
        let uedges = edges.filter(e => e.target !== selectedNode.id);
        // calculate children
        const deletableIds = getDeletableIds(uedges, selectedNode.id);
        unodes = unodes.filter(n => !deletableIds.includes(n.id));
        uedges = uedges.filter(e => !deletableIds.includes(e.target));
        setNodes(unodes);
        setEdges(uedges);
        handleOnBlur();
      }
    }
  }, [backSpacePresses]);


  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);
  // this hook call ensures that the layout is re-calculated every time the graph changes
  useLayout();

  const handleNodeCreation = (id) => {
    const parentNode = getNode(id);
    if (!parentNode) {
      return;
    }

    // create a unique id for the child node
    const childNodeId = uuid();

    // create a unique id for the placeholder (the placeholder gets added to the new child node)
    const childPlaceholderId = uuid();
    const childTabPlaceholderId = uuid();

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
      },
      selected: true
    };

    // we need to create a connection from parent to child
    const childEdge = {
      id: `${parentNode.id}=>${childNodeId}`,
      source: parentNode.id,
      target: childNodeId,
      type: 'workflow',
    };

    // create a placeholder for the new child node
    // we want to display a placeholder for all workflow nodes that do not have a child already
    // as the newly created node will not have a child, it gets this placeholder
    const childPlaceholderNode = {
      id: childPlaceholderId,
      // we place the placeholder 150 pixels below the child node, spacing can be adjusted in the useLayout hook
      position: { x: childNode.position.x, y: childNode.position.y + 150 },
      type: 'enterAction',
      data: { label: '+' },
    };

    // we need to create a connection from child to our placeholder
    const childPlaceholderEdge = {
      id: `${childNodeId}=>${childPlaceholderId}`,
      source: childNodeId,
      target: childPlaceholderId,
      type: 'enterAction',
    };

    const childTabPlaceholderNode = {
      id: childTabPlaceholderId,
      position: { x: parentNode.position.x, y: parentNode.position.y + 150 },
      type: 'tabAction',
      data: { label: '+' },
    };

    // we need to create a connection from child to our placeholder
    const childTabPlaceholderEdge = {
      id: `${parentNode.id}=>${childTabPlaceholderId}`,
      source: parentNode.id,
      target: childTabPlaceholderId,
      type: 'tabAction',
    };

    // if the clicked node has had any placeholders as children, we remove them because it will get a child now
    const existingPlaceholders = getNodes()
      .filter((node) => node.type === 'placeholder' || node.type === 'tabAction' || node.type === 'enterAction')
      .map((node) => node.id);

    // add the new nodes (child and placeholder), filter out the existing placeholder nodes of the clicked node
    const unodes = getNodes().map(nd => {
      nd.selected = false;
      return nd;
    }).filter((node) => !existingPlaceholders.includes(node.id)).concat([childNode, childTabPlaceholderNode, childPlaceholderNode]);

    setNodes([...unodes]);

    // add the new edges (node -> child, child -> placeholder), filter out any placeholder edges
    setEdges((edges) =>
      edges.filter((edge) => !existingPlaceholders.includes(edge.target)).concat([childEdge, childTabPlaceholderEdge, childPlaceholderEdge])
    );

    //set selected node id
    localStorage.setItem('selectedNodeId', childNodeId);
  }

  useEffect(() => {
    if (enterPressed) {
      const nodes = getNodes();
      //const selectedNode = nodes.find(({ selected }) => selected);
      const selectedNodeId = localStorage.getItem('selectedNodeId');
      if (selectedNodeId) {
        handleNodeCreation(selectedNodeId);
      }
    }
  }, [enterPressed]);

  useEffect(() => {
    if (tabPressed) {
      const nodes = getNodes();
      //const selectedNode = nodes.find(({ selected }) => selected);
      const selectedNodeId = localStorage.getItem('selectedNodeId');
      if (selectedNodeId) {
        const edges = getEdges();
        const targetEdge = edges.find(({ target }) => selectedNodeId === target);
        if (targetEdge) {
          handleNodeCreation(targetEdge.source);
        }
      }
    }
  }, [tabPressed]);

  const createPlaceholders = (id) => {
    const currentNode = getNode(id);
    if (!currentNode) {
      return;
    }

    // create a unique id for the placeholder (the placeholder gets added to the new child node)
    const childPlaceholderId = uuid();
    const childTabPlaceholderId = uuid();


    const childPlaceholderNode = {
      id: childPlaceholderId,
      // we place the placeholder 150 pixels below the child node, spacing can be adjusted in the useLayout hook
      position: { x: currentNode.position.x, y: currentNode.position.y + 150 },
      type: 'enterAction',
      data: { label: '+' },
    };

    // we need to create a connection from child to our placeholder
    const childPlaceholderEdge = {
      id: `${currentNode.id}=>${childPlaceholderId}`,
      source: currentNode.id,
      target: childPlaceholderId,
      type: 'enterAction',
    };

    const nodesToAdd = [childPlaceholderNode];
    const edgesToAdd = [childPlaceholderEdge];

    //calculate scrrent node's parent
    const _edges = getEdges();
    const parentNodeEdge = _edges.find(ed => ed.target === id);
    let childTabPlaceholderNode, childTabPlaceholderEdge;
    if (parentNodeEdge && parentNodeEdge?.source) {
      const parentNode = getNode(parentNodeEdge?.source);
      childTabPlaceholderNode = {
        id: childTabPlaceholderId,
        position: { x: parentNode.position.x, y: parentNode.position.y + 150 },
        type: 'tabAction',
        data: { label: '+' },
      };

      // we need to create a connection from child to our placeholder
      childTabPlaceholderEdge = {
        id: `${parentNode.id}=>${childTabPlaceholderId}`,
        source: parentNode.id,
        target: childTabPlaceholderId,
        type: 'tabAction',
      };

      nodesToAdd.push(childTabPlaceholderNode);
      edgesToAdd.push(childTabPlaceholderEdge);
    }

    // if the clicked node has had any placeholders as children, we remove them because it will get a child now
    const existingPlaceholders = getNodes()
      .filter((node) => node.type === 'placeholder' || node.type === 'tabAction' || node.type === 'enterAction')
      .map((node) => node.id);

    // add the new nodes (child and placeholder), filter out the existing placeholder nodes of the clicked node
    setNodes((nodes) =>
      nodes.map(element => {
        if (element.id === id) {
          element.selected = true;
        } else {
          element.selected = false;
        }
        return element;
      }).filter((node) => !existingPlaceholders.includes(node.id)).concat([...nodesToAdd])
    );

    // add the new edges (node -> child, child -> placeholder), filter out any placeholder edges
    setEdges((edges) =>
      edges.filter((edge) => !existingPlaceholders.includes(edge.target)).concat([...edgesToAdd])
    );
    forceUpdate();
  }

  const handleOnClickNode = (id) => {
    const selectedNodeId = localStorage.getItem("selectedNodeId");
    if (selectedNodeId !== id) {
      localStorage.setItem('selectedNodeId', id);
      createPlaceholders(id);
    }
  }

  const handleOnBlur = () => {
    localStorage.removeItem("selectedNodeId");
    // if the clicked node has had any placeholders as children, we remove them because it will get a child now
    const existingPlaceholders = getNodes()
      .filter((node) => node.type === 'placeholder' || node.type === 'tabAction' || node.type === 'enterAction')
      .map((node) => node.id);

    setNodes((nodes) =>
      nodes.filter((node) => !existingPlaceholders.includes(node.id)));

    // add the new edges (node -> child, child -> placeholder), filter out any placeholder edges
    setEdges((edges) =>
      edges.filter((edge) => !existingPlaceholders.includes(edge.target))
    );
  }

  return (
    <AppContext.Provider value={{ onClickNode: handleOnClickNode }}>
      <ContainerDiv fluid>
        <Row>
          <Col md={12}>
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
                deleteKeyCode={null}
                onPaneClick={handleOnBlur}
                disableKeyboardA11y={true}
                nodesFocusable={false}

              >
                <Background color="#aaa" gap={16} />
              </ReactFlow>
            </div>
          </Col>
        </Row>
      </ContainerDiv>
    </AppContext.Provider>
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
