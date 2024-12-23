// check if the DOM is loaded
function init() {
  // find the form
  const form = document.getElementById("userForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // find input field and result div
    const username = document.getElementById("username");
    const resultDiv = document.querySelector(".result");

    // check if no username or result, stop the program
    if (!username || !resultDiv) return;
    console.log("___error: no username or result found!");

    // delete empty spaces before and after the username
    const userValue = username.value.trim();

    // clear input field
    resultDiv.innerHTML = "";

    // check if user value is empty change result text
    if (userValue === "") {
      resultDiv.innerHTML = `<p class="error">"Please enter a GitHub username!"</p>`;
      return;
    }

    // fetch data from github api
    const response = await fetch(`https://api.github.com/users/${userValue}`);

    console.log("___response", response);

    // check fetch response status
    if (!response.ok) {
      if (response.status === 404) {
        resultDiv.innerHTML = `<p class="error">"User not found!"</p>`;
        return;
      } else {
        resultDiv.innerHTML = `<p class="error">"An error occurred!"</p>`;
      }
      return;
    }

    // get data from the response
    const data = await response.json();
    resultDiv.innerHTML = `
      <h2>${data.login}</h2>
      <img src="${data.avatar_url}" alt="${data.login}" width="200" height="200" style="border-radius: 50%";/>
      <p><strong>Repos:</strong> ${data.public_repos}</p>
      <p><strong>Followers:</strong> ${data.followers}</p>
      <p><strong>Following:</strong> ${data.following}</p>
      <p><a href="${data.html_url}" target="_blank">View Profile on GitHub</a></p>
      `;
  });
}

document.addEventListener("DOMContentLoaded", init);
