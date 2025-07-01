import React, { useState, useEffect } from 'react';
import ColorPalette from './ColorPalette';

const SettingsPanel = ({ selectedNode, setNodes, setSelectedNode }) => {
    const [nodeText, setNodeText] = useState(selectedNode?.data?.label || '');

    useEffect(() => {
        if (selectedNode?.data?.label) {
            setNodeText(selectedNode.data.label);
        }
    }, [selectedNode]);

    const onTextChange = (evt) => {
        const text = evt.target.value;
        setNodeText(text);
    };

    const applyTextChange = () => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            label: nodeText,
                        },
                    };
                }
                return node;
            })
        );
    };

    const onColorChange = (color) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode.id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            color: color,
                        },
                    };
                }
                return node;
            })
        );
    };

    return (
        <div className="settings-panel">
            <div className="back-button" onClick={() => setSelectedNode(null)}>
                &larr; Back to Nodes Panel
            </div>
            <label>Message Text:</label>
            <textarea
                rows="6"
                value={nodeText}
                onChange={onTextChange}
                placeholder="Enter message content here..."
                aria-label="Message content"
            />
            <button
                onClick={applyTextChange}
                className="apply-btn"
            >
                Apply Changes
            </button>
            <div className="color-picker">
                <label>Node Color:</label>
                <p className="color-description">Click on a color below to change the entire node's appearance</p>
                <ColorPalette onColorSelect={onColorChange} />
            </div>
        </div>
    );
};

export default SettingsPanel;
