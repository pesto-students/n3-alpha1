/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import './tabs.scss';

const Tabs = (props: any) => {
  const { tabs, children } = props;
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  return (
    <div className="rf-tabs">
      <div className="rf-tabs-container">
        {tabs.map((tab: string) => (
          <div
            className={`rf-tab ${currentTab === tab ? 'rf-tab-current' : ''}`}
            onClick={() => setCurrentTab(tab)}
            key={tab}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="rf-tab-view">
        {React.Children.map(children, (child: any) => {
          return currentTab === child.key ? child : null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
