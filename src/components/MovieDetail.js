import { Component } from '../core/core'
import movieStore from '../store/movie'
import TheLoader from './TheLoader'

export default class Movie extends Component {
  constructor() {
    super()
    movieStore.subscribe('modal', () => {
      this.render()
    })
    movieStore.subscribe('contents', () => {
      this.render()
    })
  }
  async render() {
    this.el.setAttribute('class', 'modal-bg')
    this.el.classList.add('hide')

    movieStore.state.modal
      ? this.el.classList.remove('hide')
      : this.el.classList.add('hide')

    const { movie } = movieStore.state

    this.el.innerHTML = /*HTML*/ `
      <div class="modal">
        <button class="btn-close">X</button>
        <div class="wrap hide">
          <div class="poster-wrap"></div>
          <div class="specs">
            <div class="title">
              ${movie.Title}
            </div>
            <div class="labels">
              <span>Released: ${movie.Released}</span>
              <br>
              <span>Runtime: ${movie.Runtime}</span>
            </div>
            <div class="plot">
              ${movie.Plot}
            </div>
            <div class="ratings">
              <h3>Ratings</h3>
              <div class="ratings-wrap"></div>
            </div>
            <div class="actors">
              <h3>Actors</h3>
              <p>${movie.Actors}</p>
            </div>
            <div class="director">
              <h3>Director</h3>
              <p>${movie.Director}</p>
            </div>
            <div class="production">
              <h3>Production</h3>
              <p>${movie.Production}</p>
            </div>
            <div class="genre">
              <h3>Genre</h3>
              <p>${movie.Genre}</p>
            </div>
          </div>
        </div>
      </div>
    `

    if (movieStore.state.modal) {
      const body = document.querySelector('body')
      body.classList.add('scroll-hidden')

      const modal = this.el.querySelector('.modal')
      const wrap = modal.querySelector('.wrap')

      const loader = new TheLoader().el
      modal.append(loader)
      loader.classList.remove('hide')

      if (movieStore.state.contents) {
        loader.classList.add('hide')
        wrap.classList.remove('hide')

        const ratingsWrap = this.el.querySelector('.ratings-wrap')
        ratingsWrap.innerHTML = `
          ${movie.Ratings?.map(rating => {
            return /*HTML*/ `
              <div class="ratings">
                <div class="ratings-logo">
                 
                </div>
                <p>${rating.Source} - ${rating.Value}</p>
              </div>
            `
          }).join('')}
        `
      }

      if (movie.Poster) {
        const posterWrap = modal.querySelector('.poster-wrap')
        let bigPoster = movie.Poster.replace('SX300', 'SX700')
        posterWrap.innerHTML = /*HTML*/ `
          <div 
            class="poster" 
            style=${
              movie.Poster === 'N/A'
                ? `background-image:url("./resource/noimage.png"); border: 2px solid #ea23e0;`
                : `background-image:url(${bigPoster})`
            }>
          </div>
        `
      }

      const closeButton = this.el.querySelector('.btn-close')
      closeButton.addEventListener('click', () => {
        const body = document.querySelector('body')
        body.classList.remove('scroll-hidden')
        movieStore.state.modal = false
        movieStore.state.contents = false
      })
    }
  }
}
