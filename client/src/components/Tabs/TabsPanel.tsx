import React, { ReactNode } from 'react';

interface TabPanelProperties {
  label: string;
  children: ReactNode;
}

const TabPanel: React.FC<TabPanelProperties> = ({ children }) => {
  return <div>{children}</div>;
};

export default TabPanel;
