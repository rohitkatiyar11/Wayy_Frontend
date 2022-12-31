import React from 'react';
import { getBezierPath, EdgeProps } from 'reactflow';

import styles from './EdgeTypes.module.css';

// the placeholder edges do not have a special functionality, only used as a visual
export default function PlaceholderEdge({
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
    const [edgePath, edgeCenterX, edgeCenterY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (<><path id={id} style={style} className={styles.placeholderPath} d={edgePath} markerEnd={markerEnd} />
        <g transform={`translate(${edgeCenterX}, ${edgeCenterY})`}>
            <circle cx=".8" cy="0" r="10" stroke="black" stroke-width="1" fill="white" className={styles.edgeButton} />
            <text className={styles.edgeButtonSym} y={5} x={-4}>
                +
            </text>
            <text className={styles.edgeButtonText} y={5} x={20}>
                TAB
            </text>
        </g>
    </>);
}

