import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const ImageNode = memo(({ data }) => {
    const bgColor = data.color || '#fff';
    const isDark = bgColor && ['#4a5568', '#1e3a8a', '#4c1d95'].includes(bgColor);

    return (
        <div className="node image-node" style={{ backgroundColor: bgColor }}>
            <div className="node-header" style={{ backgroundColor: data.color ? bgColor : '#fbbf24', color: isDark ? '#fff' : '#333' }}>
                <span role="img" aria-label="image">🖼️</span> Image
                <span className="node-type-icon">📱</span>
            </div>
            <div className="node-content" style={{ color: isDark ? '#fff' : '#333' }}>
                {data.imageUrl ? (
                    <img src={data.imageUrl} alt="Content" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                ) : (
                    <div className="placeholder">
                        <span role="img" aria-label="placeholder">🖼️</span>
                        <p>Image Placeholder</p>
                    </div>
                )}
            </div>
            <Handle type="source" position={Position.Right} id="a" />
            <Handle type="target" position={Position.Left} id="b" />
        </div>
    );
});

export default ImageNode;
