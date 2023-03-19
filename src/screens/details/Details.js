import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Header from '../../common/header/Header';
import YouTube from 'react-youtube';

import './Details.css';
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

  componentWillMount() {
    let currentState = this;
    let movieData = null;
    let xhrMovie = new XMLHttpRequest();

    xhrMovie.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        currentState.setState({
          movie: JSON.parse(this.responseText),
        });
      }
    });

    xhrMovie.open(
      'GET',
      this.props.baseUrl + 'movies/' + this.props.match.params.id
    );
    xhrMovie.setRequestHeader('Cache-Control', 'no-cache');
    xhrMovie.send(movieData);
  }

  onClickArtist = (url) => {
    window.location = url;
  };

  onClickStars = (id) => {
    let starIconList = [];

    for (let star of this.state.starIcons) {
      let ratingStar = star;

      if (star.id <= id) {
        ratingStar.color = 'yellow';
      } else {
        ratingStar.color = 'black';
      }
      starIconList.push(ratingStar);
    }
    this.setState({ starIcons: starIconList });
  };

  render() {
    const options = {
      height: '300',
      width: '700',
      playerVars: {
        autoplay: 1,
      },
    };

    let movie = this.state.movie;

    return (
      <div className='movie-details'>
        <Header
          id={this.props.match.params.id}
          baseUrl={this.props.baseUrl}
          showBookShowButton='true'
        />
        <div className='back-to-home'>
          <Typography>
            <Link to='/'> &#60; Back to Home</Link>
          </Typography>
        </div>
        <div className='flex-containerDetails'>
          <div className='leftDetails'>
            <img
              src={movie.poster_url}
              alt={movie.title}
            />
          </div>

          <div className='middleDetails'>
            <div>
              <Typography
                variant='headline'
                component='h2'
              >
                {movie.title}{' '}
              </Typography>
            </div>
            <br />
            <div>
              <Typography>
                <span className='bold'>Genres: </span> {movie.genres.join(', ')}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className='bold'>Duration:</span> {movie.duration}{' '}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className='bold'>Release Date:</span>{' '}
                {new Date(movie.release_date).toDateString()}{' '}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className='bold'> Rating:</span> {movie.critics_rating}{' '}
              </Typography>
            </div>
            <div className='marginTop16'>
              <Typography>
                <span className='bold'>Plot:</span>{' '}
                <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline}{' '}
              </Typography>
            </div>
            <div className='trailerContainer'>
              <Typography>
                <span className='bold'>Trailer:</span>
              </Typography>
              <YouTube
                videoId={movie.trailer_url.split('?v=')[1]}
                opts={options}
                onReady={this._onReady}
              />
            </div>
          </div>

          <div className='rightDetails'>
            <Typography>
              <span className='bold'>Rate this movie: </span>
            </Typography>
            {this.state.starIcons.map((star) => (
              <StarBorderIcon
                className={star.color}
                key={'star' + star.id}
                onClick={() => this.onClickStars(star.id)}
              />
            ))}

            <div className='bold marginBottom16 marginTop16'>
              <Typography>
                <span className='bold'>Artists:</span>
              </Typography>
            </div>
            <div className='paddingRight'>
              <GridList
                cellHeight={160}
                cols={2}
              >
                {movie.artists != null &&
                  movie.artists.map((eachArtist) => (
                    <GridListTile
                      className='gridTile'
                      onClick={() => this.onClickArtist(eachArtist.wiki_url)}
                      key={eachArtist.id}
                    >
                      <img
                        src={eachArtist.profile_url}
                        alt={eachArtist.first_name + ' ' + eachArtist.last_name}
                      />
                      <GridListTileBar
                        title={
                          eachArtist.first_name + ' ' + eachArtist.last_name
                        }
                      />
                    </GridListTile>
                  ))}
              </GridList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
