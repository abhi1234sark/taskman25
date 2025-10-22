import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TasksTab from './components/TasksTab';
import AuditLogsTab from './components/AuditLogsTab';

function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="main-content">
        <div className="content-header">
          <div className="header-left">
            <h1 className="page-title">
              {activeTab === 'tasks' ? (
                <>
                  <span className="icon">🚀</span>
                  Tasks
                </>
              ) : (
                <>
                  <span className="icon">📋</span>
                  Audit Logs
                </>
              )}
            </h1>
          </div>
          <div className="header-right">
            <span className="version">v1.0</span>
          </div>
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
          <button
            className={`tab-button ${activeTab === 'audit-logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit-logs')}
          >
            Audit Logs
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'tasks' ? (
            <TasksTab />
          ) : (
            <AuditLogsTab />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
