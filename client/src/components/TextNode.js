import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

// Define the TextNode component as a custom node for ReactFlow
const TextNode = memo(({ data }) => {
    const bgColor = data.color || '#fff';
    const isDark = bgColor && ['#4a5568', '#1e3a8a', '#4c1d95'].includes(bgColor);

    return (
        <div className="node text-node" style={{ backgroundColor: bgColor }}>
            <div className="node-header" style={{ backgroundColor: data.color ? bgColor : '#b2f0e3', color: isDark ? '#fff' : '#333' }}>
                <span role="img" aria-label="message">💬</span> Message
                <span className="node-type-icon">📱</span>
            </div>
            <div className="node-content" style={{ color: isDark ? '#fff' : '#333' }}>
                <div className="message-bubble">
                    {data.label}
                </div>
            </div>
            <Handle type="source" position={Position.Right} id="a" />
            <Handle type="target" position={Position.Left} id="b" />
        </div>
    );
});

export default TextNode;