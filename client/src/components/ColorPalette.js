import React from 'react';

const ColorPalette = ({ onColorSelect }) => {
    const colors = [
        '#ffffff', // white
        '#b2f0e3', // light teal
        '#fbbf24', // amber
        '#60a5fa', // blue
        '#a78bfa', // purple
        '#10b981', // green
        '#f87171', // red
        '#4a5568', // dark gray
        '#1e3a8a', // dark blue
        '#4c1d95', // dark purple
    ];

    return (
        <div className="color-palette">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className="color-option"
                    style={{
                        backgroundColor: color,
                        width: '30px',
                        height: '30px',
                        margin: '4px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        border: '1px solid #ddd',
                        display: 'inline-block',
                    }}
                    onClick={() => onColorSelect(color)}
                />
            ))}
        </div>
    );
};

export default ColorPalette;
