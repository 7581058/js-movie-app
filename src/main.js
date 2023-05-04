import App from './App'
import router from './routes'
import './scss/style.scss'

const root = document.querySelector('#root')

root.append(new App().el)

router()

router()
;(async () => {
  const res = await fetch('/api/test')
  const json = await res.json()
  console.log('/api/test', json)
})()
