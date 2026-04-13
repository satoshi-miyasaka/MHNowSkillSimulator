import './style.css'
import * as SkillButton from './skillSelectButton.js'

let config = await SkillButton.loadConfig();
let buttons = SkillButton.makeSkillButton(config['skillData']);

document.querySelector('#app').innerHTML = `
<section>
  <div>
    <h1>Moster Hunter Now Skill Simulator</h1>
  </div>
  <div>${buttons}</div>
  <div><button id="skillCheck">チェック</button></div>
  <div id="selectSkill"></div>
  <div id="result"></div>
  <!-- button id="counter" type="button" class="counter"></button -->
</section>
`

SkillButton.setSkillButtonScript(config['skillData']);
SkillButton.setSkillCheckButtonScript(config['skillData']);
