import React from "react";

export const inodes = [
  {
    id: "1",
    type: "workflow",
    data: {
      label: "Maintain health",
      icon: (<img src="/cup.png" width={"22px"} />),
      mainGoal: true
    },
    position: { x: 0, y: 0 },
    selected: true
  },
  {
    id: "2",
    position: { x: 0, y: 150 },
    type: 'enterAction',
    data: { label: '+' },
  }
];


export const iedges = [
  { id: "e1-2", source: "1", target: "2", type: "enterAction" },
]
