import './style.css'
import * as SkillButton from './skillSelectButton.js'

let config = await SkillButton.loadConfig();
let skillButtons = SkillButton.makeSkillButton(config['skillData']);

document.querySelector('#app').innerHTML = `
<section>
  <div>
    <h1>Moster&nbsp;Hunter&nbsp;Now Skill&nbsp;Simulator</h1>
  </div>
  <div id="skillButtons">${skillButtons}</div>
  <hr />
  <div id="selectSkill"></div>
  <hr />
  <div>
    <button id="skillCheck">チェック</button>
    <label><input type="checkbox" id="slotCheck" />憑依錬成あり</label>
  </div>
  <hr />
  <div id="result"></div>
  <hr />
  <div>&copy;iKnowLab,</div>
</section>
`

document.querySelector('#skillCheck').disabled = true;
SkillButton.setSkillButtonScript(config);
SkillButton.setSkillCheckButtonScript(config);
