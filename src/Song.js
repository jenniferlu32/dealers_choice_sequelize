import React, { Component } from 'react';
import axios from 'axios';

//shows the song's artist and featuring artist
class Song extends Component {
  constructor () {
    super();
    this.state = {
      song: {},
      featuringArtist: '',
    }
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {

    //{id: 1, artist: "Drake", name: "Controlla"}
    const song = (await axios.get(`api/songs/${this.props.selectedUserId}`)).data;
    this.setState({ song, featuringArtist: '' });

    console.log(this.props) //{selectedUserId: "2", featuringArtistId: "1"}

      if (this.props.featuringArtistId) {
        const featuringArtist = (await axios.get(`api/songs/${this.props.selectedUserId}/${this.props.featuringArtistId}`)).data;
        console.log(featuringArtist) //Drake
        this.setState({ featuringArtist })
      }
    }
  }

  //get selectedUserId
  async componentDidMount() {

    //{id: 1, artist: "Drake", name: "Controlla"}
    const song = (await axios.get(`api/songs/${this.props.selectedUserId}`)).data;
    this.setState({ song });

    console.log(this.props) //{selectedUserId: "2", featuringArtistId: "1"}

    if (this.props.featuringArtistId) {
      const featuringArtist = (await axios.get(`api/songs/${this.props.selectedUserId}/${this.props.featuringArtistId}`)).data;
      console.log(featuringArtist) //Drake
      this.setState({ featuringArtist })
    }
  }

  render() {
    const { song, featuringArtist } = this.state;
    return (
      <div>
        {
          featuringArtist.length > 1 ? `${song.artist} featuring ${featuringArtist}` : `${song.artist}`
        }
      </div>
    )
  }
}

export default Song;
