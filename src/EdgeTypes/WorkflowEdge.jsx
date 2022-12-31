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
    </>
  );
}
