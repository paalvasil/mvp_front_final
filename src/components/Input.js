import React from 'react';

export default function Input({ label, placeholder, type = 'text', value, onChange, readonly = false }) {
  return (
    <div className="input-div">
      <label className="label">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          placeholder={placeholder}
          className={`input-row ${readonly ? 'readonly' : ''}`}
          value={value}
          onChange={onChange}
          readOnly={readonly}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`input-row ${readonly ? 'readonly' : ''}`}
          value={value}
          onChange={onChange}
          readOnly={readonly}
        />
      )}
    </div>
  );
}
