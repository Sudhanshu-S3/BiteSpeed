import React from 'react';

const NodesPanel = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const nodeTypes = [
        { type: 'textNode', label: 'Message', icon: '💬', color: '#b2f0e3' },
        { type: 'imageNode', label: 'Image', icon: '🖼️', color: '#fbbf24' },
        { type: 'tableNode', label: 'Table', icon: '📊', color: '#60a5fa' },
        { type: 'textBoxNode', label: 'Text Box', icon: '📝', color: '#a78bfa' },
        { type: 'buttonNode', label: 'Buttons', icon: '🔘', color: '#10b981' }
    ];

    return (
        <aside className="nodes-panel">
            <div className="panel-header">
                <h3>Node Types</h3>
                <p className="description">Drag these nodes to the canvas</p>
            </div>
            <div className="nodes-container">
                {nodeTypes.map((node, index) => (
                    <div
                        key={index}
                        className="dndnode"
                        onDragStart={(event) => onDragStart(event, node.type)}
                        draggable
                        style={{
                            borderLeft: `4px solid ${node.color}`,
                            marginBottom: '10px'
                        }}
                    >
                        <span className="node-icon">{node.icon}</span>
                        <span className="node-label">{node.label}</span>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default NodesPanel;
