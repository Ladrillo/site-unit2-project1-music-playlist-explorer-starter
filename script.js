(async function script() {
    const modalPlaylist = document.querySelector('#modalPlaylist')
    const playlistTemplate = document.querySelector("#playlistTemplate")
    const songTemplate = document.querySelector("#songTemplate")
    const playlistSongs = document.querySelector(".playlist-songs")
    const closeButton = modalPlaylist.querySelector('.close')

    modalPlaylist.addEventListener('click', evt => {
        if (evt.target === modalPlaylist || closeButton.contains(evt.target)) {
            modalPlaylist.classList.toggle('hidden')
        }
    })

    const response = await fetch('data/data.json')
    const playlists = await response.json()

    playlists.forEach(p => {
        const pClone = playlistTemplate.content.cloneNode(true)
        pClone.querySelector('h2').textContent = p.playlistTitle
        pClone.querySelector('h3').textContent = p.playlistCreator
        pClone.querySelector('h3').textContent = p.playlistCreator
        const likeBtn = pClone.querySelector('.like-btn')
        const likeHeart = likeBtn.querySelector('.heart')
        const likeCount = likeBtn.querySelector('.like-count')
        likeCount.textContent = p.playlistLikeCount
        pClone.querySelector('.playlist-card').addEventListener('click', evt => {
            if (likeBtn.contains(evt.target)) {
                if (likeBtn.classList.contains('liked')) {
                    likeBtn.classList.remove('liked')
                    likeCount.textContent = parseInt(likeCount.textContent) - 1
                    likeHeart.textContent = '♡'
                } else {
                    likeBtn.classList.add('liked')
                    likeCount.textContent = parseInt(likeCount.textContent) + 1
                    likeHeart.textContent = '♥'
                }
            } else {
                modalPlaylist.querySelector('h4').textContent = p.playlistTitle
                modalPlaylist.querySelector('h4~p').textContent = p.playlistCreator
                function writeSongs() {
                    playlistSongs.replaceChildren()
                    p.playlistSongs.forEach(s => {
                        const sClone = songTemplate.content.cloneNode(true)
                        sClone.querySelector('h5').textContent = s.songTitle
                        sClone.querySelector('h5~p').textContent = s.songArtist
                        sClone.querySelector('h5~p~p').textContent = s.songAlbum
                        sClone.querySelector('.duration').textContent = s.songDuration
                        playlistSongs.appendChild(sClone)
                    })
                }
                writeSongs()
                modalPlaylist.querySelector('.shuffle-btn').addEventListener('click', evt => {
                    console.log('clickzed')
                    p.playlistSongs.sort(() => Math.random() - 0.5)
                    writeSongs()
                })
                modalPlaylist.classList.toggle('hidden')
            }
        })
        document.querySelector('.playlist-cards').appendChild(pClone)
    })
}())
