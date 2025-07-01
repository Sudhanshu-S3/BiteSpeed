import React, { useState } from 'react';

const FlowsPanel = ({ flows, onSelectFlow, onNewFlow, isCollapsed, currentFlow }) => {
    const [folders, setFolders] = useState({});
    const [newFolderName, setNewFolderName] = useState('');
    const [showNewFolderInput, setShowNewFolderInput] = useState(false);

    // Group flows by folder
    const groupedFlows = flows.reduce((acc, flow) => {
        const folder = flow.folder || 'Default';
        if (!acc[folder]) {
            acc[folder] = [];
        }
        acc[folder].push(flow);
        return acc;
    }, {});

    const toggleFolder = (folderName) => {
        setFolders({
            ...folders,
            [folderName]: !folders[folderName]
        });
    };

    const handleCreateFolder = () => {
        if (newFolderName.trim()) {
            onNewFlow(newFolderName.trim());
            setNewFolderName('');
            setShowNewFolderInput(false);
        }
    };

    if (isCollapsed) {
        return null;
    }

    return (
        <aside className="flows-panel">
            <div className="panel-header">
                <h3>Flows</h3>
                <div className="flows-actions">
                    <button
                        onClick={() => onNewFlow('Default')}
                        className="new-flow-btn"
                        title="Create a new flow"
                    >
                        + New Flow
                    </button>
                    <button
                        onClick={() => setShowNewFolderInput(!showNewFolderInput)}
                        className="new-folder-btn"
                        title="Create a new folder"
                    >
                        + New Folder
                    </button>
                </div>
                {showNewFolderInput && (
                    <div className="new-folder-input">
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="Folder name"
                        />
                        <button onClick={handleCreateFolder}>Create</button>
                    </div>
                )}
            </div>
            <div className="flows-container">
                {Object.keys(groupedFlows).map((folderName) => (
                    <div key={folderName} className="flow-folder">
                        <div
                            className="folder-header"
                            onClick={() => toggleFolder(folderName)}
                        >
                            <span className="folder-icon">
                                {folders[folderName] ? '📂' : '📁'}
                            </span>
                            <span className="folder-name">{folderName}</span>
                        </div>
                        {!folders[folderName] && (
                            <div className="folder-flows">
                                {groupedFlows[folderName].map((flow) => (
                                    <div
                                        key={flow._id}
                                        className={`flow-item ${currentFlow && currentFlow._id === flow._id ? 'active' : ''}`}
                                        onClick={() => onSelectFlow(flow)}
                                    >
                                        <span className="flow-icon">📄</span>
                                        <span className="flow-name">{flow.name}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default FlowsPanel;
