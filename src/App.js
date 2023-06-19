import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import MovieHeader from './components/MovieHeader';
import AddMovieForm from './components/AddMovieForm';
import EditMovieForm from './components/EditMovieForm';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const {push} = useHistory();
  
  useEffect(()=>{
    getData();
  }, []);

  const getData =() =>{
    axios.get('http://localhost:5000/api/movies')
      .then(res =>{
        setMovies(res.data);
      })
      .catch(err =>{
        console.log(err);
      })
  }
  const deleteMovie = (id)=> {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(() =>{
          getData();
          push('/movies')
      });
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD PROJECT *** SARAH GUIDRY</span>
      </nav>
 
      <div className="container">
        <MovieHeader/>
        <div className="row ">
              
          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/add" component={AddMovieForm}>
              <AddMovieForm setMovies={setMovies}/>
            </Route>
            
            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} movie={Movie}/>
            </Route>

            <Route path="/movies/:id">
              <Movie movie={Movie}/>
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;