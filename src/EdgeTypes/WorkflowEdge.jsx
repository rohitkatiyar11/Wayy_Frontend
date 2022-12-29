import React from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

import useEdgeClick from '../hooks/useEdgeClick';
import styles from './EdgeTypes.module.css';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
}) {
  // see the hook for implementation details
  // onClick adds a node in between the nodes that are connected by this edge
  const onClick = useEdgeClick(id);

  const [edgePath, edgeCenterX, edgeCenterY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path id={id} style={style} className={styles.edgePath} d={edgePath} markerEnd={markerEnd} />
      {/* <g transform={`translate(${edgeCenterX}, ${edgeCenterY})`}>
        <circle cx=".8" cy="0" r="10" stroke="black" stroke-width="1" fill="white" className={styles.edgeButton} />
        <text className={styles.edgeButtonText} y={5} x={-4}>
          +
        </text>
        <text className={styles.edgeButtonText} y={5} x={20}>
          Enter
        </text>
      </g> */}
    </>
  );
}
