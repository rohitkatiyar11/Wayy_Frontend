import React, { memo, useState, useEffect, useContext } from 'react';
import { Handle, Position, useReactFlow, useKeyPress, getOutgoers } from 'reactflow';
import cx from 'classnames';
import styles from './NodeTypes.module.css';
import useNodeClickHandler from '../hooks/useNodeClick';
import { uuid, randomLabel } from '../utils';
import List from "../list";
import { AppContext } from '../context';
import { lab } from 'd3-color';

const WorkflowNode = ({ id, data }) => {
  const { onClickNode } = useContext(AppContext);
  const inputRef = React.createRef();
  const [label, setLabel] = useState(data.label);
  const [temp, setTemp] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [showList, setShowList] = useState(false);
  const { setEdges, setNodes, getNodes, getEdges, getNode } = useReactFlow();

  // see the hook implementation for details of the click handler
  // calling onClick adds a child node to this node
  const onClick = useNodeClickHandler(id);


  const aPressed = useKeyPress(["a"])
  const bPressed = useKeyPress(["b"])
  const cPressed = useKeyPress(["c"])
  const dPressed = useKeyPress(["d"])
  const ePressed = useKeyPress(["e"])
  const fPressed = useKeyPress(["f"])
  const gPressed = useKeyPress(["g"])
  const hPressed = useKeyPress(["h"])
  const iPressed = useKeyPress(["i"])
  const jPressed = useKeyPress(["j"])
  const kPressed = useKeyPress(["k"])
  const lPressed = useKeyPress(["l"])
  const mPressed = useKeyPress(["m"])
  const nPressed = useKeyPress(["n"])
  const oPressed = useKeyPress(["o"])
  const pPressed = useKeyPress(["p"])
  const qPressed = useKeyPress(["q"])
  const rPressed = useKeyPress(["r"])
  const sPressed = useKeyPress(["s"])
  const tPressed = useKeyPress(["t"])
  const uPressed = useKeyPress(["u"])
  const vPressed = useKeyPress(["v"])
  const wPressed = useKeyPress(["w"])
  const xPressed = useKeyPress(["x"])
  const yPressed = useKeyPress(["y"])
  const zPressed = useKeyPress(["z"])
  const Presse1 = useKeyPress(["1"])
  const Presse2 = useKeyPress(["2"])
  const Presse3 = useKeyPress(["2"])
  const Presse4 = useKeyPress(["4"])
  const Presse5 = useKeyPress(["5"])
  const Presse6 = useKeyPress(["6"])
  const Presse7 = useKeyPress(["7"])
  const Presse8 = useKeyPress(["8"])
  const Presse9 = useKeyPress(["9"])

  //const arrowPresses = useKeyPress(["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Space"]);
  const arrowPresses = useKeyPress(["Space"]);

  useEffect(() => {
    if (!data?.selected) {
      setShowList(false);
      setIsEditable(false);
    }
  }, [data?.selected]);

  useEffect(() => {
    if (aPressed) {
      setLabel((label) => label + "a");
      setIsEditable(data?.selected)
    } else if (bPressed) {
      setLabel((label) => label + "b");
      setIsEditable(data?.selected)
    } else if (cPressed) {
      setLabel((label) => label + "c");
      setIsEditable(data?.selected)
    } else if (dPressed) {
      setLabel((label) => label + "d");
      setIsEditable(data?.selected)
    } else if (ePressed) {
      setLabel((label) => label + "e");
      setIsEditable(data?.selected)
    } else if (fPressed) {
      setLabel((label) => label + "f");
      setIsEditable(data?.selected)
    } else if (gPressed) {
      setLabel((label) => label + "g");
      setIsEditable(data?.selected)
    } else if (hPressed) {
      setLabel((label) => label + "h");
      setIsEditable(data?.selected)
    } else if (iPressed) {
      setLabel((label) => label + "i");
      setIsEditable(data?.selected)
    } else if (jPressed) {
      setLabel((label) => label + "j");
      setIsEditable(data?.selected)
    } else if (kPressed) {
      setLabel((label) => label + "k");
      setIsEditable(data?.selected)
    } else if (lPressed) {
      setLabel((label) => label + "l");
      setIsEditable(data?.selected)
    } else if (mPressed) {
      setLabel((label) => label + "m");
      setIsEditable(data?.selected)
    } else if (nPressed) {
      setLabel((label) => label + "n");
      setIsEditable(data?.selected)
    } else if (oPressed) {
      setLabel((label) => label + "o");
      setIsEditable(data?.selected)
    } else if (pPressed) {
      setLabel((label) => label + "p");
      setIsEditable(data?.selected)
    } else if (qPressed) {
      setLabel((label) => label + "q");
      setIsEditable(data?.selected)
    } else if (rPressed) {
      setLabel((label) => label + "r");
      setIsEditable(data?.selected)
    } else if (sPressed) {
      setLabel((label) => label + "s");
      setIsEditable(data?.selected)
    } else if (tPressed) {
      setLabel((label) => label + "t");
      setIsEditable(data?.selected)
    } else if (uPressed) {
      setLabel((label) => label + "u");
      setIsEditable(data?.selected)
    } else if (vPressed) {
      setLabel((label) => label + "v");
      setIsEditable(data?.selected)
    } else if (wPressed) {
      setLabel((label) => label + "w");
      setIsEditable(data?.selected)
    } else if (xPressed) {
      setLabel((label) => label + "x");
      setIsEditable(data?.selected)
    } else if (yPressed) {
      setLabel((label) => label + "y");
      setIsEditable(data?.selected)
    } else if (zPressed) {
      setLabel((label) => label + "z");
      setIsEditable(data?.selected)
    } else if (Presse1) {
      setLabel((label) => label + "1");
      setIsEditable(data?.selected)
    } else if (Presse2) {
      setLabel((label) => label + "2");
      setIsEditable(data?.selected)
    } else if (Presse3) {
      setLabel((label) => label + "3");
      setIsEditable(data?.selected)
    } else if (Presse4) {
      setLabel((label) => label + "4");
      setIsEditable(data?.selected)
    } else if (Presse5) {
      setLabel((label) => label + "5");
      setIsEditable(data?.selected)
    } else if (Presse6) {
      setLabel((label) => label + "6");
      setIsEditable(data?.selected)
    } else if (Presse7) {
      setLabel((label) => label + "7");
      setIsEditable(data?.selected)
    } else if (Presse8) {
      setLabel((label) => label + "8");
      setIsEditable(data?.selected)
    } else if (Presse9) {
      setLabel((label) => label + "9");
      setIsEditable(data?.selected)
    }
    inputRef && inputRef.current && inputRef.current.focus();

  }, [aPressed, bPressed, cPressed, dPressed, ePressed, fPressed, gPressed, hPressed, iPressed, jPressed, kPressed, lPressed, mPressed, nPressed, oPressed, pPressed, qPressed, rPressed, sPressed, tPressed, uPressed, vPressed, wPressed, xPressed, yPressed, zPressed, Presse1, Presse2, Presse3, Presse4, Presse5, Presse6, Presse7, Presse8, Presse9]);

  // useEffect(() => {
  //   if (bPressed) {
  //     setLabel((label) => label + "b");
  //     setIsEditable(data?.selected)
  //   }
  //   inputRef && inputRef.current && inputRef.current.focus();
  // }, [bPressed]);

  useEffect(() => {
    if (arrowPresses) {
      setShowList((showList) => data?.selected && !showList);
      setTimeout(() => {
        if (document.getElementsByClassName("listView")) {
          document.getElementsByClassName("listView")[0].click()
          document.getElementsByClassName("listView")[0].click()
        }
      })
    }
  }, [arrowPresses]);

  const honClick = () => {
    onClickNode(id)
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
      handleLabelBlur()
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

  return (
    <div tabIndex={0} onClick={honClick} onDoubleClick={() => setShowList(true)} className={cx(data.mainGoal ? styles.node : styles.childNode, data.selected ? "selected-node" : "")} title="click to add a child node">
      {isEditable ? getEditableLable() : getReadOnlyLable()}
      <Handle className={styles.handle} type="target" position={Position.Top} isConnectable={false} />
      <Handle className={styles.handle} type="source" position={Position.Bottom} isConnectable={false} />
    </div>

  );
};

export default memo(WorkflowNode);
