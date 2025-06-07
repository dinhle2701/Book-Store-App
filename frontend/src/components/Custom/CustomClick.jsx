import React, { useState } from 'react';

const CustomClick = ({ onClick, children, className = '' }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    onClick(e);
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`${className} transition-transform duration-300 ${
        isClicked ? 'scale-110' : 'scale-100'
      }`}
    >
      {children}
    </button>
  );
};

export default CustomClick;
