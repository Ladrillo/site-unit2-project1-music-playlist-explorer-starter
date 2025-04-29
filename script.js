console.log("The DOM is ready");

(async function script() {
    const modalPlaylist = document.querySelector('#modalPlaylist')
    const playlistTemplate = document.querySelector("#playlistTemplate")
    const songTemplate = document.querySelector("#songTemplate")
    const playlistSongs = document.querySelector(".playlist-songs")
    const closeButton = modalPlaylist.querySelector('.close')

    modalPlaylist.addEventListener('click', evt => {
        if (evt.target === modalPlaylist || closeButton.contains(evt.target)) {
            modalPlaylist.classList.toggle('hidden')
            playlistSongs.replaceChildren()
        }
    })

    const response = await fetch('data/data.json')
    const playlists = await response.json()

    playlists.forEach(p => {
        const pClone = playlistTemplate.content.cloneNode(true)
        pClone.querySelector('h2').textContent = p.playlistTitle
        pClone.querySelector('h3').textContent = p.playlistCreator
        pClone.querySelector('.playlist-card').addEventListener('click', evt => {
            modalPlaylist.querySelector('h4').textContent = p.playlistTitle
            modalPlaylist.querySelector('h4~p').textContent = p.playlistCreator
            p.playlistSongs.forEach(s => {
                const sClone = songTemplate.content.cloneNode(true)
                sClone.querySelector('h5').textContent = s.songTitle
                sClone.querySelector('h5~p').textContent = s.songArtist
                sClone.querySelector('h5~p~p').textContent = s.songAlbum
                sClone.querySelector('.duration').textContent = s.songDuration
                document.querySelector('.playlist-songs').appendChild(sClone)
            })
            modalPlaylist.classList.toggle('hidden')
        })
        document.querySelector('.playlist-cards').appendChild(pClone)
    })
}())




// [
//     {
//         "playlistId": 1,
//         "playlistCreator": "Mickey Mouse",
//         "playlistLikeCount": 7,
//         "playlistSongs": [
//             {
//                 "songId": 1,
//                 "songTitle": "Welcome to the Jungle",
//                 "songArtist": "Guns n Roses",
//                 "songAlbum": "Apetite for Destruction",
//                 "songDuration": "3:25"
//             },
//             {

//             }
//         ]
//     },
//     {

//     }
// ]