// Ваш Client ID от Spotify
const CLIENT_ID = "024078ae9f614aefbbbee63fda1049f9";
// Redirect URI, указанный в настройках приложения Spotify
const REDIRECT_URI = "http://localhost:5500/callback.html";
// Запрашиваемые права доступа
const SCOPES = "";

// Функция для получения токена из URL
function getTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

// Функция для авторизации
function authorize() {
  const authUrl = "https://accounts.spotify.com/authorize";
  const params = new URLSearchParams({
    response_type: "token",
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
  });
  window.location.href = `${authUrl}?${params.toString()}`;
}

// Проверяем, есть ли токен
let accessToken = getTokenFromUrl();
if (accessToken) {
  // Сохраняем токен в sessionStorage и очищаем URL
  localStorage.setItem("spotify_access_token", accessToken);
  window.history.replaceState({}, document.title, "/index.html");
} else {
  // Проверяем, есть ли токен в sessionStorage
  accessToken = localStorage.getItem("spotify_access_token");
  if (!accessToken) {
    // Если нет, предлагаем авторизоваться
    const searchSectionToken = document.querySelector(".search-section-token");
    searchSectionToken.innerHTML = `<button class="login-button" onclick="authorize()">Войти через Spotify</button>`;
    // Останавливаем дальнейшее выполнение скрипта
    throw "Access token not found. Redirecting to Spotify authorization.";
  }
}

document.getElementById("searchForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const artistName = document.getElementById("artistName").value.trim();
  const resultDiv = document.getElementById("result");

  // Очищаем предыдущие результаты
  resultDiv.innerHTML = "";

  if (artistName === "") {
    resultDiv.innerHTML = '<p class="error">Пожалуйста, введите имя исполнителя.</p>';
    return;
  }

  try {
    // Поиск исполнителя
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        artistName
      )}&type=artist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!searchResponse.ok) {
      if (searchResponse.status === 401) {
        // Токен истёк или недействителен
        sessionStorage.removeItem("spotify_access_token");
        authorize();
        return;
      }
      throw new Error("Ошибка при поиске исполнителя.");
    }

    const searchData = await searchResponse.json();

    if (searchData.artists.items.length === 0) {
      resultDiv.innerHTML = '<p class="error">Исполнитель не найден.</p>';
      return;
    }

    const artist = searchData.artists.items[0];

    // Получение популярных треков
    const topTracksResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!topTracksResponse.ok) {
      throw new Error("Ошибка при получении популярных треков.");
    }

    const topTracksData = await topTracksResponse.json();

    // Получение альбомов
    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album&market=US&limit=9`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!albumsResponse.ok) {
      throw new Error("Ошибка при получении альбомов.");
    }

    const albumsData = await albumsResponse.json();

    // Создание карточки исполнителя
    //hero section content
    const hero = document.querySelector(".hero-section");
    const heroTop = document.querySelector(".hero-top");
    const heroText = document.querySelector(".hero-text");

    hero.style.background = `
      linear-gradient(rgba(1, 1, 1, 0.1), rgba(9, 9, 9, 0.8)),
      url(${artist.images[0]?.url || "https://via.placeholder.com/100"})
    `;
    hero.style.height = "600px";

    heroTop.innerHTML = `<img class="sp-logo" src="./Full_Logo_White_RGB.svg" alt="Spotify Logo">`;

    heroText.innerHTML = `
    <div class="hero-text">
            <h2>${artist.name}</h2>
            <p><strong>Жанры:</strong> ${artist.genres.join(", ") || "Не указаны"}</p>
            <p><strong>Популярность:  </strong> ${artist.popularity}
            <strong>Ссылка:  </strong> <a href="${
              artist.external_urls.spotify
            }" target="_blank">Spotify</a></p>
    </div>
      `;
    //albums and tracks section
    resultDiv.innerHTML = `
        <div class="albums-section">
        <h3>Альбомы:</h3>
        <ul class="albums">
          ${albumsData.items
            .map(
              (album) => `
          <li>
            <a class="album-link" href="${album.external_urls.spotify}" target="_blank">
              <img src="${album.images[0].url}" alt="${album.name} cover" />
              ${album.name}
            </a>
          </li>
        `
            )
            .join("")}
        </ul>
        </div>

        <div class="tracks-section">
        <h3>Популярные треки:</h3>
        <ul class="tracks">
          ${topTracksData.tracks
            .map(
              (track) => `
          <li><a href="${track.external_urls.spotify}" target="_blank">${track.name}</a></li>
        `
            )
            .join("")}
        </ul>
        </div>
      `;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
  }
});
