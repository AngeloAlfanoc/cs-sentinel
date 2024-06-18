import React, { useState, ReactNode, ReactElement } from 'react';

interface TabProperties {
  label: string;
  children: ReactNode;
}

interface TabsProperties {
  children: ReactElement<TabProperties>[];
  defaultIndex?: number;
}

const Tabs: React.FC<TabsProperties> = ({ children, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className='tabs bg-gray-900 text-white'>
      <div className='flex border-b border-gray-700'>
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            className={`py-2 px-4 ${
              index === activeIndex
                ? 'border-indigo-500 text-indigo-500'
                : 'border-transparent text-whitehover:text-gray-300'
            } border-b-2 font-medium focus:outline-none`}
            onClick={() => setActiveIndex(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className='p-4 bg-gray-800'>{children[activeIndex]}</div>
    </div>
  );
};

export default Tabs;
