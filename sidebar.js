import React from 'react';
import './sidebar.css';
const Sidebar = ({ data }) => {
  const handleClick = (item) => {
    // Handle click event here, e.g., update state or perform an action
    console.log(`Clicked on ${item.title}`);
  };

  return (
    <div className="sidebar">
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <a href="#" onClick={() => handleClick(item)}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;