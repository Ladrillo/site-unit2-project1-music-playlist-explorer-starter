(async function script() {
    const modalPlaylist = document.querySelector("#modalPlaylist");
    const playlistTemplate = document.querySelector("#playlistTemplate");
    const songTemplate = document.querySelector("#songTemplate");
    const playlistSongs = document.querySelector(".playlist-songs");
    const closeButton = modalPlaylist.querySelector(".close");
    const shuffleButton = modalPlaylist.querySelector(".shuffle-btn");
    const modalTitle = modalPlaylist.querySelector("h4");
    const modalCreator = modalPlaylist.querySelector("h4~p");
    const playlistCards = document.querySelector(".playlist-cards");
  
    let currentSongs = [];
  
    modalPlaylist.addEventListener("click", (evt) => {
      // Clicking on the grey background or the 'X' should close the modal
      if (evt.target === modalPlaylist || closeButton.contains(evt.target)) {
        modalPlaylist.classList.add("hidden");
      }
    });
  
    shuffleButton.addEventListener("click", () => {
      currentSongs.sort(() => Math.random() - 0.5);
      writeSongs(currentSongs);
    });
  
    // Fetching won't work unless index.html is loaded by a web server (CORS)
    const response = await fetch("data/data.json");
    const playlists = await response.json();
  
    playlists.forEach((p) => {
      const pClone = playlistTemplate.content.cloneNode(true);
      const playlistCard = pClone.querySelector(".playlist-card");
      const title = pClone.querySelector("h2");
      const creator = pClone.querySelector("h3");
      const likeBtn = pClone.querySelector(".like-btn");
      const likeHeart = likeBtn.querySelector(".heart");
      const likeCount = likeBtn.querySelector(".like-count");
      playlistCards.appendChild(pClone);
  
      title.textContent = p.playlistTitle;
      creator.textContent = `Created by ${p.playlistCreator}`;
      likeCount.textContent = p.playlistLikeCount;
  
      playlistCard.addEventListener("click", (evt) => {
        // Clicking on card opens modal, unless clicking on the like btn
        if (likeBtn.contains(evt.target)) {
          const liked = likeBtn.classList.toggle("liked");
          const count = parseInt(likeCount.textContent, 10);
          likeCount.textContent = liked ? count + 1 : count - 1;
          likeHeart.textContent = liked ? "♥" : "♡";
        } else {
          modalTitle.textContent = p.playlistTitle;
          modalCreator.textContent = p.playlistCreator;
          currentSongs = p.playlistSongs;
          writeSongs(currentSongs);
          modalPlaylist.classList.toggle("hidden");
        }
      });
    });
  
    function writeSongs(songs) {
      playlistSongs.replaceChildren(); // wipe out existing songs
      songs.forEach((s) => {
        const sClone = songTemplate.content.cloneNode(true);
        sClone.querySelector("h5").textContent = s.songTitle;
        sClone.querySelector("h5~p").textContent = s.songArtist;
        sClone.querySelector("h5~p~p").textContent = s.songAlbum;
        sClone.querySelector(".song-duration").textContent = s.songDuration;
        playlistSongs.appendChild(sClone);
      });
    }
  })();
  