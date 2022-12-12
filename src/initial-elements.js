import React from "react";
import List from "./list";

export const inodes = [
  {
    id: "1",
    type: "workflow",
    data: {
      label: "Maintain health",
      icon: (<img src="/cup.png" width={"22px"} />),
      mainGoal: true
    },
    position: { x: 0, y: 0 }
  },
  // {
  //   id: "2",
  //   type: "workflow",
  //   position: { x: 0, y: 150 },
  //   data: {
  //     label: "Sports",
  //     list: (
  //       <List data={[{ text: "Daily Run", status: "pending" }, { text: "Finish 10K", status: "completed" }]} />
  //     )
  //   }
  // },
  {
    id: '2',
    data: { label: '+' },
    position: { x: 0, y: 300 },
    type: 'placeholder',
  },
];


export const iedges = [
  { id: "e1-2", source: "1", target: "2" },
  // { id: "e2-3", source: "2", target: "3" }

]
