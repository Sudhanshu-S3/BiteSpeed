import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Error handling for React rendering
const renderApp = () => {
    try {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );

        // If you want to start measuring performance in your app, pass a function
        // to log results (for example: reportWebVitals(console.log))
        // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
        reportWebVitals();
    } catch (error) {
        console.error("Failed to render the app:", error);
        // Display a fallback error message to the user
        const rootElement = document.getElementById('root');
        if (rootElement) {
            rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
          <h2>Something went wrong</h2>
          <p>We're having trouble loading the application. Please try refreshing the page.</p>
          <p>If the problem persists, contact support.</p>
          <p style="color: gray; font-size: 0.8rem;">Error: ${error.message}</p>
        </div>
      `;
        }
    }
};

renderApp();
