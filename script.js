// Загрузка данных из anime.json
fetch('data/anime.json')
    .then(response => response.json())
    .then(data => {
        const animeList = document.getElementById('anime-list');
        data.forEach(anime => {
            const card = document.createElement('div');
            card.className = 'anime-card';
            card.innerHTML = `
                <img src="${anime.cover}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <a href="anime.html?id=${anime.id}"></a>
            `;
            card.addEventListener('click', () => {
                window.location.href = `anime.html?id=${anime.id}`;
            });
            animeList.appendChild(card);
        });
    });

// Страница просмотра аниме
if (window.location.pathname.includes('anime.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');

    fetch('data/anime.json')
        .then(response => response.json())
        .then(data => {
            const anime = data.find(item => item.id == animeId);
            document.getElementById('anime-title').textContent = anime.title;

            // Загрузка серий
            const episodesList = document.getElementById('episodes-list');
            anime.episodes.forEach(episode => {
                const episodeCard = document.createElement('div');
                episodeCard.className = 'anime-card';
                episodeCard.innerHTML = `
                    <h3>${episode.title}</h3>
                    <p>Серия ${episode.number}</p>
                `;
                episodeCard.addEventListener('click', () => {
                    document.getElementById('vk-player').src = 
                        `https://vk.com/video_ext.php?${episode.vk_url}`;
                });
                episodesList.appendChild(episodeCard);
            });

            // Загрузить первую серию
            if (anime.episodes.length > 0) {
                document.getElementById('vk-player').src = 
                    `https://vk.com/video_ext.php?${anime.episodes[0].vk_url}`;
            }
        });
}
