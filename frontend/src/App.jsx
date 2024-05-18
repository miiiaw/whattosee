import './styles/main.scss'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Home from './components/Home'
import ComparisonPage from './components/ComparisonPage'
import GenresCollection from './components/GenresCollection'
import GenrePage from './components/GenrePage'
import LogIn from './components/LogIn'
import { fetchAllUsers } from '../sanity/services/userService'
import { fetchAllMovies } from '../sanity/services/movieService'

function App() {

  // useState for all the users
  const [users, setUsers] = useState([])
  // useState for all the movies
  const [movies, setMovies] = useState([])
  // useState for the chosen person from LS
  const [chosenPerson, setPerson] = useState("")


  // Fetching all users from Sanity
  const getAllUsers = async () => {
      const data = await fetchAllUsers()
      setUsers(data)
  }

  // Fetching all movies from Sanity
  const getAllMovies = async () => {
    const data = await fetchAllMovies()
    setMovies(data)
  }

  // Running the fetches and getting the user/name from LS, if there is one.
  useEffect(() => {
      getAllUsers()
      getAllMovies()

      const storedPerson = localStorage.getItem('name')
      if (storedPerson) {
          setPerson(storedPerson)
      }
      
  }, [])


  return (
    <>

      <Routes>
        <Route element={<LogIn users={users} setPerson={setPerson} />} path='/' />

        <Route element={<Layout chosenPerson={chosenPerson} />} >
          <Route element={<Home users={users} chosenPerson={chosenPerson} />} path='/home' />
          <Route element={<ComparisonPage users={users} chosenPerson={chosenPerson} />} path='/comparisonPage/:person' />
          <Route element={<GenresCollection chosenPerson={chosenPerson} users={users} />} path='/genresCollection' />
          <Route element={<GenrePage movies={movies} />} path='/genrePage/:movieGenre' />
        </Route>
      </Routes>

    </>
  )
}

export default App
