import React from "react";

function ResultUsers({ users }) {
  return (
    <div className="container mx-auto p-4 justify-center">
      <div
        className={`grid ${
          users.length === 1
            ? "grid-cols-1"
            : users.length === 2
            ? "grid-cols-2"
            : users.length === 3
            ? "grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        } gap-4`}
      >
        {users.map((user) => (
          <div key={user.id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={user.avatar_url}
                alt={user.login}
                className="mt-5 mx-5 h-48 object-cover rounded-full"
              />
            </figure>
            <div className="card-body justify-center">
              <h2 className="card-title justify-center text-2xl leading-tight">
                {user.login}
              </h2>
              <div className="card-actions justify-center">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success text-white mt-2"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultUsers;
