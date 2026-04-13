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
  <div>
    <button id="skillCheck">チェック</button>
    <input type="checkbox" id="slotCheck" />憑依錬成あり
  </div>
  <div id="selectSkill"></div>
  <div id="result"></div>
  <div>&copy;iNowLab,</div>
</section>
`

SkillButton.setSkillButtonScript(config['skillData']);
SkillButton.setSkillCheckButtonScript(config);
