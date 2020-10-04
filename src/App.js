import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Login'; 
import { retrieveToken } from './spotify';
import SpotifyWebApi  from 'spotify-web-api-js';
import Player from './Player'
import { useDataLayerValue } from './DataLayer'

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();
  
  useEffect(() => { 
    const hash = retrieveToken();
    window.location.hash = ""; //clear the token from URL for security
    const _token = hash.access_token

    if (_token) {

      dispatch({ 
        type: 'SET_TOKEN',
        token: _token,
        });

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user //could just be user as shorthandgiven ES6
        });
      });
 

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });

      spotify.getPlaylist('1fFkUDjiG0g2OytiqmL1zY').then((res) =>
      dispatch({
        type: "SET_2_COMMIT_2_GIT",
        cohort_playlist: res,
      })
    );
    }

  }, []);


  return <div className="app">{ token ? <Player spotify={spotify}/> : <Login />} </div>;
}

export default App;