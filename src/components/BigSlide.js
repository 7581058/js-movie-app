import { Component } from '../core/core'
import { register } from 'swiper/element/bundle'
import movieStore, { getMovieDetails } from '../store/movie'
import recommendStore from '../store/recommend'

export default class BigSlide extends Component {
  render() {
    this.el.classList.add('big-slide')

    this.el.innerHTML = /*HTML*/ `
      <swiper-container loop="true" autoplay-disable-on-interaction="false" autoplay-delay="5000" >
      </swiper-container>
    `

    const swipercontainer = this.el.querySelector('swiper-container')

    recommendStore.state.newmovies.forEach(async newmovie => {
      await getMovieDetails(newmovie.id)
      const { movie } = movieStore.state
      const slide = document.createElement('swiper-slide')
      slide.innerHTML = /*HTML*/ `
        <div class="player">
          <video autoplay muted >
            <source src="./resource/${movie.imdbID}.mp4" />
          </video>
          <div class="player-controls">
            <button class="volume muted">
              <span class="material-symbols-outlined">
                ${movieStore.state.muted ? 'volume_off' : 'volume_up'}
              </span>
            </button>
          </div>
          <div class="info">
            <p class="title">${movie.Title}</p>
            <div class="year">${movie.Released}</div>
            <div class="plot">
              ${movie.Plot}
            </div>
            <button class="btn btn-more">More...</button>
          </div>
        </div>
      `
      swipercontainer.append(slide)
      register()
    })
  }
}
