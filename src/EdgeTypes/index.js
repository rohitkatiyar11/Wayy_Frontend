import PlaceholderEdge from './PlaceholderEdge';
import WorkflowEdge from './WorkflowEdge';
import EnterActionEdge from "./EnterActionEdge";
import TabActionEdge from "./TabActionEdge";

export const edgeTypes = {
  placeholder: PlaceholderEdge,
  workflow: WorkflowEdge,
  enterAction: EnterActionEdge,
  tabAction: TabActionEdge
};

export default edgeTypes;
