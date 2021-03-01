import axios from 'axios';
import React from 'react';
import Song from './Song';
import Genre from './Genre';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      selectedUserId:'', //track URL id changes,
      featuringArtistId: '',
      genre: '',
    }
  }

  async componentDidMount() {
    const songs = (await axios.get('/api/songs')).data; //[{…}, {…}, {…}, {…}, {…}, {…}]
    this.setState({ songs }); //adds songs to home page

    window.addEventListener('hashchange', () => { //set selectedUserId when user selects a song
      this.setState({
        selectedUserId: window.location.hash.slice(1,2),
        featuringArtistId: window.location.hash.slice(4),
      });
    });

    this.setState({ //stays the same after refresh
      selectedUserId: window.location.hash.slice(1,2),
      featuringArtistId: window.location.hash.slice(4)
    });
  }

  render() {
    const { songs, selectedUserId, featuringArtistId, genre } = this.state;

    return (
      <div>
        <h2>Song Name</h2>
        <div id='songs'>
          {
            songs.map(song => {
              return (
                <p className={ selectedUserId*1 === song.id ? 'selected': ''} key={song.id}>
                  <a href={`#${song.id}/#${song.featuringArtistId}`}>
                    {`${song.name}`}
                  </a>
                </p>
              )
          })
          }
        </div>
        <h2>Artist</h2>
        <p>
          {
            !!selectedUserId && <Song selectedUserId={ selectedUserId } featuringArtistId ={ featuringArtistId } />
          }
        </p>
        <h2>Genre</h2>
        <p>
          {
            !!selectedUserId && <Genre selectedUserId={ selectedUserId } />
          }
        </p>
        <div>
        </div>
      </div>
    )
  }
}

export default App;
