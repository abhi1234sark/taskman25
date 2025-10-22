import React from 'react';

const Sidebar = ({ activeTab, onTabChange }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">
          <span className="nav-item-icon">☑️</span>
          Task Manager
        </h1>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">Main</div>
          <button
            className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => onTabChange('tasks')}
          >
            <span className="nav-item-icon">📋</span>
            Tasks
          </button>
          <button
            className={`nav-item ${activeTab === 'audit-logs' ? 'active' : ''}`}
            onClick={() => onTabChange('audit-logs')}
          >
            <span className="nav-item-icon">🕒</span>
            Audit Logs
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
