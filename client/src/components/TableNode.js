import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const TableNode = memo(({ data }) => {
    const bgColor = data.color || '#fff';
    const isDark = bgColor && ['#4a5568', '#1e3a8a', '#4c1d95'].includes(bgColor);

    // Sample table data if none provided
    const tableData = data.tableData || {
        headers: ['Column 1', 'Column 2', 'Column 3'],
        rows: [
            ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3']
        ]
    };

    return (
        <div className="node table-node" style={{ backgroundColor: bgColor }}>
            <div className="node-header" style={{ backgroundColor: data.color ? bgColor : '#60a5fa', color: isDark ? '#fff' : '#333' }}>
                <span role="img" aria-label="table">📊</span> Table
                <span className="node-type-icon">📱</span>
            </div>
            <div className="node-content" style={{ color: isDark ? '#fff' : '#333' }}>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                {tableData.headers.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Handle type="source" position={Position.Right} id="a" />
            <Handle type="target" position={Position.Left} id="b" />
        </div>
    );
});

export default TableNode;
