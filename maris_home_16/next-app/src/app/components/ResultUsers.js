import React from "react";
import Image from "next/image";

export default function ResultUsers({ users }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      {users.map((user) => (
        <div
          key={user.id}
          className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="card-body p-4">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <Image src={user.avatar_url} alt={user.login} />
                </div>
              </div>
              <div>
                <h2 className="card-title text-lg">{user.login}</h2>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-success text-sm"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
