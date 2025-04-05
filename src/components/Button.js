import React from 'react';


export default function Button ({ text, id, onClick }) {
  return (
    <button id={id} className="custom-button" onClick={onClick}>
      {text}
    </button>
  );
};


