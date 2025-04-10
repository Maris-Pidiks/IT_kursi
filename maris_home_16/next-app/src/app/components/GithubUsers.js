import React from "react";
import SearchUsersForm from "./SearchUsersForm";

export default function GithubUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    // Fetch GitHub users API logic here
  };

  return (
    <div>
      <SearchUsersForm onSearch={handleSearch} />
      {/* Render users list or error message here */}
    </div>
  );
}
