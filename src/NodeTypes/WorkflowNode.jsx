import React, { memo, useState, useEffect } from 'react';
import { Handle, Position, useReactFlow, useKeyPress } from 'reactflow';
import cx from 'classnames';

import styles from './NodeTypes.module.css';
import useNodeClickHandler from '../hooks/useNodeClick';

const WorkflowNode = ({ id, data, selected }) => {
  const inputRef = React.createRef();
  const [label, setLabel] = useState(data.label);
  const [isEditable, setIsEditable] = useState(false);
  const [showList, setShowList] = useState(false);
  const { setEdges, setNodes, getNodes, getEdges, getNode } = useReactFlow();

  // see the hook implementation for details of the click handler
  // calling onClick adds a child node to this node
  const onClick = useNodeClickHandler(id);
  const anyKeyPressed = useKeyPress(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
  const arrowPresses = useKeyPress(["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Space"]);

  useEffect(() => {
    if (data?.new) {
      setTimeout(() => {
        setNodes((nodes) => {
          return nodes.map(element => {
            if (element.data?.new) {
              element.selected = true;
              element.data.new = false
            } else {
              element.selected = false;
            }
            return element
          })
        });
      }, 200)
    }
  }, [data?.new]);

  useEffect(() => {
    if (!selected) {
      setShowList(false);
      setIsEditable(false);
    }
  }, [selected]);

  useEffect(() => {
    if (anyKeyPressed) {
      setIsEditable(selected);
    }
    inputRef && inputRef.current && inputRef.current.focus();
  }, [anyKeyPressed]);

  useEffect(() => {
    if (arrowPresses) {
      setShowList((showList) => selected && !showList);
    }
  }, [arrowPresses]);

  const honClick = () => {
    const nodes = getNodes();
    nodes.forEach(element => {
      if (element.id === id) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });
    setNodes([...nodes]);
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
  }

  const getEditableLable = () => {
    return (
      data.mainGoal ? (<div className="main-goal">
        {data.icon} <input ref={inputRef} type={"text"} value={label} onChange={handleLabelChange} onBlur={handleLabelBlur} className={data.mainGoal ? "inputNodeMainGoal" : "inputNodeSubGoal"} />
      </div>) : <input ref={inputRef} type={"text"} value={label} onChange={handleLabelChange} onBlur={handleLabelBlur} className={data.mainGoal ? "inputNodeMainGoal" : "inputNodeSubGoal"} />
    )
  }

  return (
    <div onClick={honClick} onDoubleClick={() => setShowList(true)} className={cx(data.mainGoal ? styles.node : styles.childNode)} title="click to add a child node">
      {isEditable ? getEditableLable() : getReadOnlyLable()}
      <Handle className={styles.handle} type="target" position={Position.Top} isConnectable={false} />
      <Handle className={styles.handle} type="source" position={Position.Bottom} isConnectable={false} />
    </div>

  );
};

export default memo(WorkflowNode);
