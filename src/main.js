import './styles.css'
import './app.js'

import { initTelegram } from './telegram.js'
import { state } from './state.js'

initTelegram()
console.log('App state:', state)