import React from "react";
import SearchForm from "./SearchForm";

function SearchHeader() {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="justify-center text-5xl font-bold text-center mt-16 mb-0">
        {"Weather forecast"}
      </h1>
      <div className="flex flex-col w-full justify-start mt-8 mb-10">
        <SearchForm />
      </div>
    </div>
  );
}

export default SearchHeader;
