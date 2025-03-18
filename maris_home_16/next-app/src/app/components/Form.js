import React from "react";

export default function Form({ onSubmit, inputValue, onInputChange, placeholder }) {
  return (
    <form onSubmit={onSubmit} className="flex items-center justify-center p-4 mb-10">
      <div className="form-control w-full max-w-md">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            className="input input-bordered w-full focus:border-success focus:outline-success"
            placeholder={placeholder}
          />
          <button type="submit" className="btn btn-success text-white min-w-[120px]">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
