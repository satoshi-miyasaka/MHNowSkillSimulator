import './style.css'
import * as common from './common.js'
import * as make from './makeElements.js'

const config = await common.loadConfig();
let selectSkillList = [];

document.querySelector('#app').innerHTML = `
<section>
  <h1>Moster&nbsp;Hunter&nbsp;Now Skill&nbsp;Simulator</h1>
</section>
<section>
  <!-- 削除ボタンを止め、トグルボタンに変更 -->
  <div id="SkillDiv" />
  <!-- 選択したスキルの装備を全部並べる -->
  <div id="ArmorChoice" />
  <!-- 選択したスキルをレベル0で並べ、選択した装備でレベルと憑依錬成数を反映する -->
  <div id="ChoiceSkill" />
  <!-- ダメージ計算 -->
  <div id="CalcDamage" />
</section>
<section>
  <div id="copyRight">&copy;iKnowLab,</div>
</section>
`

document.querySelector('#SkillDiv').innerHTML = make.makeSkillDiv(config['skillData']);

document.querySelectorAll('.SkillButton').forEach((skillButton) => {
  skillButton.addEventListener('click', (event) => {
    if (!event.target.classList.contains('OnSelect')) {
      event.target.classList.add('OnSelect');
    } else {
      event.target.classList.remove('OnSelect');
    }
    let selectSkillList = [];
    let obj = document.querySelectorAll('.OnSelect').forEach((onSelect) => {
      selectSkillList.push(onSelect.value);
    });
  })
})
