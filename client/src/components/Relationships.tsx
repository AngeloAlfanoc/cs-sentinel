import React from 'react';
import { Tree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';

type TreeData = {
  name: string;
  children: TreeData[];
}

const Relationships: React.FC<TreeData> = (data) => {
  return (
    <div className='p-5 bg-gray-800 text-white rounded-lg shadow-lg'>
      <div className='tree-container text-white' style={{ height: '500px' }}>
        <Tree data={data} height={400} width={400} />
      </div>
    </div>
  );
};

export default Relationships;
