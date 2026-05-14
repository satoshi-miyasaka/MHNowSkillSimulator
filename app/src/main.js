import './style.css'
import * as common from './common.js'
import * as element from './makeElements.js'
import * as onEvent from './setScript.js'

const config = await common.loadConfig();

document.querySelector('#app').innerHTML = `
<section>
  <h1>Moster&nbsp;Hunter&nbsp;Now Skill&nbsp;Simulator</h1>
</section>
<section>
  <!-- 削除ボタンを止め、トグルボタンに変更 -->
  <div id="SkillDiv">
  ${element.makeSkillDiv(config['skillData'])}
  </div>
  <h2>装備選択<button class="foldButton" value="armor">▼</button></h2>
  <div id="armor" style="display:none" class="skill_div">
    <!-- 選択したスキルの装備を全部並べる -->
    <div id="ArmorChoice"></div>
    <!-- 選択したスキルをレベル8で並べ、選択した装備でレベルと憑依錬成数を反映する -->
    <div id="ChoiceSkill"></div>
    <!-- ダメージ計算 -->
    <div id="CalcDamage"></div>
  </div>
</section>
<section>
  <div id="copyRight">&copy;iKnowLab,</div>
</section>
`
element.setDamageArea();
onEvent.setSkillButton(config);
onEvent.setFoldButtonScript();
onEvent.setCalcDamageScript(config);
