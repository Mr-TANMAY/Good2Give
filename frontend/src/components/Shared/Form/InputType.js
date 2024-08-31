import React from 'react'

const InputType = ({
    labelFor,
    labelText,
    inputType,
    Name,
    value,
    onChange,
  }) => {
    return (
      <>
        <div className="mb-3">
          <label htmlFor={labelFor} className="form-label">
            {labelText}
          </label>
          <input
            type={inputType}
            className="form-control"
            name={Name}
            value={value}
            onChange={onChange}
          />
        </div>
      </>
    );
  };

export default InputType