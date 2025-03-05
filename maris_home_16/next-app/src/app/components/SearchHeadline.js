import React from "react";
export default function SearchHeadline({ title }) {
  return (
    <div className="hero my-6">
      <div className="text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>
      </div>
    </div>
  );
}
