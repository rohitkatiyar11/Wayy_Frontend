import React, { memo, useState, useEffect } from 'react';
import { Handle, Position, useReactFlow, useKeyPress, getOutgoers } from 'reactflow';
import cx from 'classnames';
import styles from './NodeTypes.module.css';
import useNodeClickHandler from '../hooks/useNodeClick';
import { uuid, randomLabel } from '../utils';
import List from "../list";

const WorkflowNode = ({ id, data }) => {
  const inputRef = React.createRef();
  const [label, setLabel] = useState(data.label);
  const [temp, setTemp] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [showList, setShowList] = useState(false);
  const { setEdges, setNodes, getNodes, getEdges, getNode } = useReactFlow();

  // see the hook implementation for details of the click handler
  // calling onClick adds a child node to this node
  const onClick = useNodeClickHandler(id);
  const anyKeyPressed = useKeyPress(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
  const arrowPresses = useKeyPress(["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Space"]);

  useEffect(() => {
    if (!data?.selected) {
      setShowList(false);
      setIsEditable(false);
    }
  }, [data?.selected]);

  useEffect(() => {
    if (anyKeyPressed) {
      setIsEditable(data?.selected);
    }
    inputRef && inputRef.current && inputRef.current.focus();
  }, [anyKeyPressed]);

  useEffect(() => {
    if (arrowPresses) {
      setShowList((showList) => data?.selected && !showList);
    }
  }, [arrowPresses]);

  const honClick = () => {
    setNodes((nodes) => {
      return nodes.map(element => {
        if (element.id === id) {
          element.data.selected = true;
        } else {
          element.data.selected = false;
        }
      })
    });
  }

  const getReadOnlyLable = () => {
    return (
      data.mainGoal ? (<div className="main-goal">
        {data.icon} <span>{data.label}</span>
      </div>) : <><div style={{ position: "relative" }}>{data.label}</div>  {showList ? <div className='listView'>{data.list}</div> : <></>}</>
    )
  }

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  }

  const handleLabelBlur = () => {
    const nodes = getNodes();
    nodes.forEach(element => {
      if (element.id === id) {
        element.data.label = label;
      }
    });
    setNodes([...nodes]);
    setIsEditable(false);
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
      selected: true,
      // data: { label: randomLabel() },
      data: {
        label: "", list: (
          <List data={[{ text: "Daily Run", status: "pending" }, { text: "Finish 10K", status: "completed" }]} />
        ),
        selected: true
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
      nodes.map(nd => {
        nd.data.selected = false;
        return nd;
      }).filter((node) => !existingPlaceholders.includes(node.id)).concat([childNode, childPlaceholderNode])
    );

    // add the new edges (node -> child, child -> placeholder), filter out any placeholder edges
    setEdges((edges) =>
      edges.filter((edge) => !existingPlaceholders.includes(edge.target)).concat([childEdge, childPlaceholderEdge])
    );
  }

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditable(false);
      onClick();
    } else if (e.key === 'Tab') {
      const edges = getEdges();
      const targetEdge = edges.find(({ target }) => id === target);
      if (targetEdge) {
        handleNodeCreation(targetEdge.source);
      }
    }
  }

  const getEditableLable = () => {
    return (
      data.mainGoal ? (<div className="main-goal">
        {data.icon} <input onKeyDown={_handleKeyDown} ref={inputRef} type={"text"} value={label} onChange={handleLabelChange} onBlur={handleLabelBlur} className={data.mainGoal ? "inputNodeMainGoal" : "inputNodeSubGoal"} />
      </div>) : <input onKeyDown={_handleKeyDown} ref={inputRef} type={"text"} value={label} onChange={handleLabelChange} onBlur={handleLabelBlur} className={data.mainGoal ? "inputNodeMainGoal" : "inputNodeSubGoal"} />
    )
  }

  const getKeyDown = (e) => {
    setTemp(e.key);
  }

  return (
    <div tabIndex={0} onKeyDown={getKeyDown} onClick={honClick} onDoubleClick={() => setShowList(true)} className={cx(data.mainGoal ? styles.node : styles.childNode, data.selected ? "selected-node" : "")} title="click to add a child node">
      {isEditable ? getEditableLable() : getReadOnlyLable()}
      <Handle className={styles.handle} type="target" position={Position.Top} isConnectable={false} />
      <Handle className={styles.handle} type="source" position={Position.Bottom} isConnectable={false} />
    </div>

  );
};

export default memo(WorkflowNode);
