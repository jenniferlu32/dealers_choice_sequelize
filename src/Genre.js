import React from 'react';
import axios from 'axios';

class Genre extends React.Component {
  constructor() {
    super();
    this.state = {
      genre: '',
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.selectedUserId != this.props.selectedUserId) {
      const song = (await axios.get(`/api/genres/${this.props.selectedUserId}`));
      const genre = song.data.name;
      this.setState({ genre });
    }
  }

  async componentDidMount() {
    console.log(this.props.selectedUserId);
    const song = (await axios.get(`/api/genres/${this.props.selectedUserId}`));
    const genre = song.data.name;
    this.setState({ genre });
  }

  render() {
    return (
      <div>
        { this.state.genre }
      </div>
    )
  }
}

export default Genre;
