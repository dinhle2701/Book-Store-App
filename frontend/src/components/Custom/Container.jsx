// components/Container.jsx
import React from 'react';

const Container = ({ children, className = '' }) => {
    return (
        <div className={`max-w-7xl mx-auto px-2 md:px-2 ${className}`}>
            {children}
        </div>
    );
};

export default Container;
