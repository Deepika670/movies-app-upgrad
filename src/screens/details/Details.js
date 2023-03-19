import React, { Component } from 'react';

class Details extends Component {
  constructor() {
    super();

    this.state = {
      movie: {
        genres: [],
        trailer_url: '',
        artists: [],
      },
      starIcons: [
        {
          id: 1,
          stateId: 'star1',
          color: 'black',
        },
        {
          id: 2,
          stateId: 'star2',
          color: 'black',
        },
        {
          id: 3,
          stateId: 'star3',
          color: 'black',
        },
        {
          id: 4,
          stateId: 'star4',
          color: 'black',
        },
        {
          id: 5,
          stateId: 'star5',
          color: 'black',
        },
      ],
    };
  }

  render() {
    return <div>Details</div>;
  }
}

export default Details;
