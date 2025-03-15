export const handleSearch = async (url, searchTerm, setData, setError) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.length === 0) {
      setError("No data found!");
    } else {
      setData(data);
      setError(null);
    }
  } catch (error) {
    setError("Error fetching data!");
  }
};

// // filepath: /Users/webdev/Desktop/GitRepos/IT_kursi/maris_home_16/next-app/src/app/utils/handleSearch.js
// export const handleSearch = async (url, searchTerm, setUsers, setError) => {
//   const fullUrl = `${url}?q=${encodeURIComponent(searchTerm)}`;
//   console.log("Searching:", fullUrl);
//   try {
//     const response = await fetch(fullUrl);
//     if (!response.ok) {
//       console.error("Error:", response.status, response.statusText);
//       throw new Error(
//         "Network response was not ok: ${response.status} ${response.statusText}"
//       );
//     }
//     const data = await response.json();
//     console.log("Search results:", data);
//     if (data.items.length === 0) {
//       setError("No data found!");
//     } else {
//       setUsers(data.items);
//       setError(null);
//     }
//   } catch (error) {
//     console.error("Fetch error:", error);
//     setError("Error searching!");
//   }
// };
