import { Store } from '../core/core'

const store = new Store({
  searchText: '',
  searchYear: '',
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {},
  message: 'Search for the movie title',
  listLoading: false,
  modal: false,
  contents: false,
  movieID: '',
  muted: true
})

export default store

export const searchMovies = async page => {
  store.state.listLoading = true
  store.state.page = page
  if (page === 1) {
    store.state.movies = []
    store.state.message = ''
  }
  try {
    const res = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify({
        title: store.state.searchText,
        year: store.state.searchYear,
        page
      })
    })
    const { Search, totalResults, Response, Error } = await res.json()
    if (Response === 'True') {
      store.state.movies = [...store.state.movies, ...Search]
      store.state.pageMax = Math.ceil(Number(totalResults) / 10)
    } else {
      store.state.message = Error
    }
  } catch (error) {
    console.log('searchMovies error:', error)
  } finally {
    store.state.listLoading = false
  }
}

export const getMovieDetails = async id => {
  try {
    const res = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify({
        id
      })
    })
    store.state.movie = await res.json()
    await changeState()
  } catch (error) {
    console.log('getMovieDetails error:', error)
  }
}

function changeState() {
  store.state.contents = true
}
