import { Component } from '../core/core'
import movieStore, { searchMovies } from '../store/movie'
import MovieItem from './MovieItem'
import MovieDetail from './MovieDetail'
import TheLoader from './TheLoader'

export default class MovieList extends Component {
  constructor() {
    super()
    movieStore.subscribe('movies', () => {
      this.render()
    })
    movieStore.subscribe('listLoading', () => {
      this.render()
    })
    movieStore.subscribe('message', () => {
      this.render()
    })
  }
  render() {
    this.el.classList.add('movie-list')
    this.el.innerHTML = /*HTML*/ `
      ${
        movieStore.state.message
          ? `<div class="message">${movieStore.state.message}</div>`
          : '<div class="movies"></div>'
      }
    `
    const loader = new TheLoader().el
    const detail = new MovieDetail().el
    this.el.append(loader, detail)

    movieStore.state.listLoading
      ? loader.classList.remove('hide')
      : loader.classList.add('hide')

    const moviesEl = this.el.querySelector('.movies')
    moviesEl?.append(
      ...movieStore.state.movies.map(
        movie =>
          new MovieItem({
            movie
          }).el
      )
    )
  }
}
