import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const TextBoxNode = memo(({ data }) => {
    const bgColor = data.color || '#fff';
    const isDark = bgColor && ['#4a5568', '#1e3a8a', '#4c1d95'].includes(bgColor);

    return (
        <div className="node textbox-node" style={{ backgroundColor: bgColor }}>
            <div className="node-header" style={{ backgroundColor: data.color ? bgColor : '#a78bfa', color: isDark ? '#fff' : '#333' }}>
                <span role="img" aria-label="textbox">📝</span> Text Box
                <span className="node-type-icon">📱</span>
            </div>
            <div className="node-content" style={{ color: isDark ? '#fff' : '#333' }}>
                <div className="textbox-content" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    padding: '12px',
                    borderRadius: '6px',
                    minHeight: '80px',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    fontFamily: 'sans-serif'
                }}>
                    {data.content || data.label || 'Enter text content here...'}
                </div>
            </div>
            <Handle type="source" position={Position.Right} id="a" />
            <Handle type="target" position={Position.Left} id="b" />
        </div>
    );
});

export default TextBoxNode;
