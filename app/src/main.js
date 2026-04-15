import './style.css'
import * as SkillButton from './skillSelectButton.js'

let config = await SkillButton.loadConfig();
let buttons = SkillButton.makeSkillButton(config['skillData']);

document.querySelector('#app').innerHTML = `
<section>
  <div>
    <h1>Moster Hunter Now Skill Simulator</h1>
  </div>
  <div id="skillButtons"></div>
  <div id="selectSkill"></div>
  <div>
    <button id="skillCheck">チェック</button>
    <label><input type="checkbox" id="slotCheck" />憑依錬成あり</label>
  </div>
  <div id="result"></div>
  <div>&copy;iKnowLab,</div>
</section>
`

document.querySelector('#skillCheck').disabled = true;
document.querySelector('#skillButtons').innerHTML = buttons.outerHTML;
SkillButton.setSkillButtonScript(config);
SkillButton.setSkillCheckButtonScript(config);
