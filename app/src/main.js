import './style.css'
import { setupCounter } from './counter.js'
import * as SkillButton from './skillSelectButton.js'

let config = await SkillButton.loadConfig();
let buttons = SkillButton.makeSkillButton(config);

// XXX 理解したらsetupCounterを削除
// XXX アセットにイメージあるけど、理解したら削除
document.querySelector('#app').innerHTML = `
<section>
  <div>
    <h1>Moster Hunter Now Skill Simulator</h1>
  </div>
  <div>${buttons}</div>
  <div id="selectSkill"></div>
  <!-- button id="counter" type="button" class="counter"></button -->
</section>
`

SkillButton.setSkillButtonScript(config);

// setupCounter(document.querySelector('#counter'))
