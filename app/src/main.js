import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
<section>
  <div>
    <h1>Moster Hunter Now Skill Simulator</h1>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>
`

setupCounter(document.querySelector('#counter'))
