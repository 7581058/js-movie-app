import { Component } from '../core/core'

export default class TheLoader extends Component {
  render() {
    this.el.setAttribute('class', 'the-loader')
    this.el.classList.add('hide')
  }
}
