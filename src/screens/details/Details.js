import { Typography } from '@material-ui/core';
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
    return (
      <div className='movie-details'>
        <Header />
        <div className='back-to-home'>
          <Typography>
            <Link to='/'> &#60; Back to Home</Link>
          </Typography>
        </div>
        <section className='movie-full-details-section'>
          <div className='movie-poster-section'>
            <img
              src={''}
              alt={''}
            />
          </div>

          <div className='movie-full-details'>
            <div>
              <Typography
                variant='headline'
                component='h2'
              ></Typography>
            </div>

            <br />
            <br />

            <div>
              <Typography>
                <span>Genres: </span>
              </Typography>
            </div>

            <div>
              <Typography>
                <span>Duration: </span>
              </Typography>
            </div>

            <div>
              <Typography>
                <span>Release Date: </span>
              </Typography>
            </div>

            <div>
              <Typography>
                <span>Rating: </span>
              </Typography>
            </div>

            <div>
              <Typography>
                <span>Plot:</span>
              </Typography>
            </div>

            <div>
              <Typography>
                <span>Trailer:</span>
              </Typography>
            </div>
          </div>

          <div className='rating-movie-artists-container'>
            <Typography>
              <span>Rate this movie: </span>
            </Typography>

            <div>
              <Typography>
                <span>Artists:</span>
              </Typography>
            </div>
            <div>
              <GridList
                cellHeight={160}
                cols={2}
              ></GridList>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Details;
