import { NodeTypes } from 'reactflow';
import PlaceholderNode from './PlaceholderNode';
import WorkflowNode from './WorkflowNode';
import ActionNode from './ActionNode';

// two different node types are needed for our example: workflow and placeholder nodes
const nodeTypes = {
  placeholder: PlaceholderNode,
  workflow: WorkflowNode,
  enterAction: ActionNode,
  tabAction: ActionNode
};

export default nodeTypes;
