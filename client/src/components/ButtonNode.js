import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const ButtonNode = memo(({ data }) => {
    const bgColor = data.color || '#fff';
    const isDark = bgColor && ['#4a5568', '#1e3a8a', '#4c1d95'].includes(bgColor);

    // Sample buttons if none provided
    const buttons = data.buttons || [
        { label: 'Button 1', action: 'action1' },
        { label: 'Button 2', action: 'action2' }
    ];

    return (
        <div className="node button-node" style={{ backgroundColor: bgColor }}>
            <div className="node-header" style={{ backgroundColor: data.color ? bgColor : '#10b981', color: isDark ? '#fff' : '#333' }}>
                <span role="img" aria-label="buttons">🔘</span> Buttons
                <span className="node-type-icon">📱</span>
            </div>
            <div className="node-content" style={{ color: isDark ? '#fff' : '#333' }}>
                <div className="buttons-container">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className="flow-button"
                            style={{
                                margin: '5px',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                backgroundColor: '#e2e8f0',
                                border: '1px solid #cbd5e0',
                                cursor: 'pointer'
                            }}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
            <Handle type="source" position={Position.Right} id="a" />
            <Handle type="target" position={Position.Left} id="b" />
        </div>
    );
});

export default ButtonNode;
