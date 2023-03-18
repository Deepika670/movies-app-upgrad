import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Home.css';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  upcomingMoviesHeading: {
    background: '#ff9999',
    padding: '8px',
    textAlign: 'center',
    fontSize: '1rem',
  },
  upcomingMoviesListGird: {
    width: '100%',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  mainList: {
    cursor: 'pointer',
    transform: 'translateZ(0)',
  },
  FormControl: {
    minWidth: 240,
    maxWidth: 240,
    margin: theme.spacing.unit,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

class Home extends Component {
  constructor() {
    super();
    this.state = {
      movieName: '',
      upcomingMovies: [],
      releasedMovies: [],
      releaseDateStart: '',
      releaseDateEnd: '',
      genres: [],
      genresList: [],
      artists: [],
      artistsList: [],
    };
  }

  render() {
    return (
      <div>
        <Header />

        <div className='upcoming-movies-heading'>
          <span>Upcoming Movies</span>
        </div>

        <div className='movies-and-find-movies-container'>
          <div className='find-movies-section'>
            <Card>
              <CardContent>
                <FormControl>
                  <Typography className=''>FIND MOVIES BY:</Typography>
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor='movieName'>Movie Name</InputLabel>
                  <Input id='movieName' />
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor='genres'>Genres</InputLabel>
                  <Select multiple>
                    {this.state.genresList.map((eachGenre) => (
                      <MenuItem
                        key={eachGenre.id}
                        value={eachGenre.genre}
                      >
                        <CheckBox
                          checked={
                            this.state.genres.indexOf(eachGenre.genre) > -1
                          }
                        />
                        <ListItemText primary={eachGenre.genre} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <InputLabel htmlFor='artists'>Artists</InputLabel>
                  <Select multiple>
                    {this.state.artistsList.map((eachArtist) => (
                      <MenuItem
                        key={eachArtist.id}
                        value={
                          eachArtist.first_name + ' ' + eachArtist.last_name
                        }
                      >
                        <Checkbox
                          checked={
                            this.state.artists.indexOf(
                              eachArtist.first_name + ' ' + eachArtist.last_name
                            ) > -1
                          }
                        />
                        <ListItemText
                          primary={
                            eachArtist.first_name + ' ' + eachArtist.last_name
                          }
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <TextField
                    id='releaseDateStart'
                    label='Release Date Start'
                    type='date'
                    defaultValue={''}
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>

                <FormControl>
                  <TextField
                    id='releaseDateEnd'
                    label='Release Date End'
                    type='date'
                    defaultValue={''}
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>

                <br />
                <br />

                <FormControl>
                  <Button>APPLY</Button>
                </FormControl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
