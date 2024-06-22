import React from 'react';
import { AnimatedTree, Tree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';

const Relationships = () => {
  const data = {
    name: 'Parent',
    children: [
      {
        name: 'Child One',
        children: [] // Ensure children is an empty array if there are no children
      },
      {
        name: 'Child Two',
        children: [] // Ensure children is an empty array if there are no children
      }
    ]
  };

  return (
    <div className='p-5 bg-gray-800 text-white rounded-lg shadow-lg'>
      <h2 className='text-center mb-4'>Family Tree</h2>
      <div className='tree-container' style={{ height: '500px' }}>
        <AnimatedTree data={data} height={400} width={400} />
      </div>
    </div>
  );
};

export default Relationships;
