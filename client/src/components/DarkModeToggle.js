import React from 'react';

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
    return (
        <button
            className={`dark-mode-toggle ${isDarkMode ? 'dark' : 'light'}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '5px 10px',
                borderRadius: '4px',
                backgroundColor: isDarkMode ? '#4a5568' : '#e2e8f0',
                color: isDarkMode ? '#fff' : '#333',
                marginRight: '10px'
            }}
        >
            {isDarkMode ? '☀️' : '🌙'}
        </button>
    );
};

export default DarkModeToggle;
