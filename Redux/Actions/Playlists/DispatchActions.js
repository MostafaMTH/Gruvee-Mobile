// eslint-disable-next-line import/prefer-default-export
export const FetchPlaylists = (playlistsState, playlists) => {
    // Setup the flat state
    /*
        playlists: {
            byId: {
                “playlistId”: {
                    playlistId: “bla”,
                    members: [“456”, “789”], // MemberIds
                    songs: [“123”, “456”] // SongIds
                }
            },
		    allIds: [“1”, “2”, “3”]
	    }
    */

    // TODO: Think if we want to use reduce vs forEach (O(n^2) vs O(n))
    const reducedPlaylists = playlists.reduce(
        (state, currentPlaylist) => {
            return {
                byId: {
                    ...state.byId,
                    [currentPlaylist.id]: currentPlaylist,
                },
                allIds: [...state.allIds, currentPlaylist.id],
            }
        },
        { byId: {}, allIds: [] }
    )

    reducedPlaylists.byId = { ...reducedPlaylists.byId, ...playlistsState.byId }
    reducedPlaylists.allIds = [
        ...reducedPlaylists.allIds,
        ...playlistsState.allIds,
    ]

    return reducedPlaylists
}

export const DeletePlaylist = (playlistId, playlists) => {
    // LiquoriceLion - "Add some logic here." (02/03/20)
    // Filter out allIds to remove playlistId
    const allIds = playlists.allIds.filter(id => id !== playlistId)
    const byId = { ...playlists.byId }
    delete byId[playlistId]

    return { byId, allIds }
}
