import React from "react";

export default function Form({ onSubmit, inputValue, onInputChange, placeholder }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-400 mx-auto w-900px container text-center mb-4 py-5 flex flex-row align-center justify-center"
    >
      <div className="form-control">
        <input
          type="text"
          value={inputValue}
          onChange={onInputChange}
          className="input border focus:border-xl focus:border-success focus:outline-success"
          placeholder={placeholder}
        />
      </div>
      <button type="submit" className="btn bg-green-500 text-white ml-3">
        Search
      </button>
    </form>
  );
}
