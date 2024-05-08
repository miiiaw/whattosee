import './styles/main.scss'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import ComparisonPage from './components/ComparisonPage'
import GenresCollection from './components/GenresCollection'
import GenrePage from './components/GenrePage'

function App() {

  return (
    <>
    <Layout >
      <Routes>
        <Route element={<Home />} path='/' exact />
        <Route element={<ComparisonPage />} path='/comparisonPage' />
        <Route element={<GenresCollection />} path='/genresCollection' />
        <Route element={<GenrePage />} path='/genrePage' />
      </Routes>
    </Layout>
    </>
  )
}

export default App
