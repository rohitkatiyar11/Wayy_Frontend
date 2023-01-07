import React, { memo, useState, useEffect, useContext } from 'react';
import { Handle, Position, useReactFlow, useKeyPress, getOutgoers } from 'reactflow';
import cx from 'classnames';
import styles from './NodeTypes.module.css';
import useNodeClickHandler from '../hooks/useNodeClick';
import { uuid, randomLabel } from '../utils';
import List from "../list";
import { AppContext } from '../context';
import { lab } from 'd3-color';

const WorkflowNode = ({ id, data, selected }) => {
  const { onClickNode } = useContext(AppContext);
  const inputRef = React.createRef();
  const [label, setLabel] = useState(data.label);
  const [temp, setTemp] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [showList, setShowList] = useState(false);
  const { setEdges, setNodes, getNodes, getEdges, getNode } = useReactFlow();

  useEffect(() => {
    setLabel(data.label)
  }, [localStorage.getItem("selectedNodeId")])

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
    if (!selected) {
      setShowList(false);
      setIsEditable(false);
    }
  }, [selected]);

  useEffect(() => {
    if (aPressed) {
      setLabel((label) => label + "a");
      setIsEditable(selected)
    } else if (bPressed) {
      setLabel((label) => label + "b");
      setIsEditable(selected)
    } else if (cPressed) {
      setLabel((label) => label + "c");
      setIsEditable(selected)
    } else if (dPressed) {
      setLabel((label) => label + "d");
      setIsEditable(selected)
    } else if (ePressed) {
      setLabel((label) => label + "e");
      setIsEditable(selected)
    } else if (fPressed) {
      setLabel((label) => label + "f");
      setIsEditable(selected)
    } else if (gPressed) {
      setLabel((label) => label + "g");
      setIsEditable(selected)
    } else if (hPressed) {
      setLabel((label) => label + "h");
      setIsEditable(selected)
    } else if (iPressed) {
      setLabel((label) => label + "i");
      setIsEditable(selected)
    } else if (jPressed) {
      setLabel((label) => label + "j");
      setIsEditable(selected)
    } else if (kPressed) {
      setLabel((label) => label + "k");
      setIsEditable(selected)
    } else if (lPressed) {
      setLabel((label) => label + "l");
      setIsEditable(selected)
    } else if (mPressed) {
      setLabel((label) => label + "m");
      setIsEditable(selected)
    } else if (nPressed) {
      setLabel((label) => label + "n");
      setIsEditable(selected)
    } else if (oPressed) {
      setLabel((label) => label + "o");
      setIsEditable(selected)
    } else if (pPressed) {
      setLabel((label) => label + "p");
      setIsEditable(selected)
    } else if (qPressed) {
      setLabel((label) => label + "q");
      setIsEditable(selected)
    } else if (rPressed) {
      setLabel((label) => label + "r");
      setIsEditable(selected)
    } else if (sPressed) {
      setLabel((label) => label + "s");
      setIsEditable(selected)
    } else if (tPressed) {
      setLabel((label) => label + "t");
      setIsEditable(selected)
    } else if (uPressed) {
      setLabel((label) => label + "u");
      setIsEditable(selected)
    } else if (vPressed) {
      setLabel((label) => label + "v");
      setIsEditable(selected)
    } else if (wPressed) {
      setLabel((label) => label + "w");
      setIsEditable(selected)
    } else if (xPressed) {
      setLabel((label) => label + "x");
      setIsEditable(selected)
    } else if (yPressed) {
      setLabel((label) => label + "y");
      setIsEditable(selected)
    } else if (zPressed) {
      setLabel((label) => label + "z");
      setIsEditable(selected)
    } else if (Presse1) {
      setLabel((label) => label + "1");
      setIsEditable(selected)
    } else if (Presse2) {
      setLabel((label) => label + "2");
      setIsEditable(selected)
    } else if (Presse3) {
      setLabel((label) => label + "3");
      setIsEditable(selected)
    } else if (Presse4) {
      setLabel((label) => label + "4");
      setIsEditable(selected)
    } else if (Presse5) {
      setLabel((label) => label + "5");
      setIsEditable(selected)
    } else if (Presse6) {
      setLabel((label) => label + "6");
      setIsEditable(selected)
    } else if (Presse7) {
      setLabel((label) => label + "7");
      setIsEditable(selected)
    } else if (Presse8) {
      setLabel((label) => label + "8");
      setIsEditable(selected)
    } else if (Presse9) {
      setLabel((label) => label + "9");
      setIsEditable(selected)
    }
    inputRef && inputRef.current && inputRef.current.focus();

  }, [aPressed, bPressed, cPressed, dPressed, ePressed, fPressed, gPressed, hPressed, iPressed, jPressed, kPressed, lPressed, mPressed, nPressed, oPressed, pPressed, qPressed, rPressed, sPressed, tPressed, uPressed, vPressed, wPressed, xPressed, yPressed, zPressed, Presse1, Presse2, Presse3, Presse4, Presse5, Presse6, Presse7, Presse8, Presse9]);

  useEffect(() => {
    if (arrowPresses) {
      setShowList((showList) => selected && !showList);
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

  const debounce = (func, timeout = 250) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
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

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      debounce(() => handleLabelBlur())()
    } else if (e.key === 'Tab') {
      //handleLabelBlur()
      e.preventDefault();
    }
  }

  const getEditableLable = () => {
    return (
      data.mainGoal ? (<div className="main-goal">
        {data.icon} <input onKeyDown={_handleKeyDown} tabindex="-1" ref={inputRef} type={"text"} value={label} onChange={handleLabelChange} onBlur={handleLabelBlur} className={data.mainGoal ? "inputNodeMainGoal" : "inputNodeSubGoal"} />
      </div>) : <input onKeyDown={_handleKeyDown} tabindex="-1" ref={inputRef} type={"text"} value={label} onChange={handleLabelChange} onBlur={handleLabelBlur} className={data.mainGoal ? "inputNodeMainGoal" : "inputNodeSubGoal"} />
    )
  }

  return (
    <div onClick={honClick} onDoubleClick={() => setShowList(true)} className={cx(data.mainGoal ? styles.node : styles.childNode, selected ? "selected-node" : "")} title="Enter to add a child node">
      {isEditable ? getEditableLable() : getReadOnlyLable()}
      <Handle className={styles.handle} type="target" position={Position.Top} isConnectable={false} />
      <Handle className={styles.handle} type="source" position={Position.Bottom} isConnectable={false} />
    </div>

  );
};

export default memo(WorkflowNode);
