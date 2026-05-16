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
  <!-- スキル検索 -->
  <h2>スキルリスト<button class="foldButton" value="SkillSearch">▼</button></h2>
  <div id="SkillSearch" style="display:none" class="skill_div">
  </div>
  <h2>装備リスト<button class="foldButton" value="ArmorList">▼</button></h2>
  <div id="ArmorList" style="display:none" class="skill_div"></div>
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

const makeSkillSearch = function(config) {
  const skillData = config['skillData'];

  // TODO スキルのリストは作れた
  let rows = [];
  for (let skillName in skillData) {
    let note = skillData[skillName]['説明'];
    let rensei = skillData[skillName]['錬成'];
    rensei = rensei ? rensei : 'なし';
    let level = '';
    for (let key in skillData[skillName]['効果']) {
      level += `<p>Lv.${Number(key) +1} : ${skillData[skillName]['効果'][key]}</p>`
    }
    let tag = `#${skillData[skillName]['tag'].join(' #')}`;
    rows.push(`<td><p>${skillName}</p><p>錬成:${rensei}</p></td><td><p>${note}</p><p>${tag}</p></td><td>${level}</td>`);
  }

  return `<table><tr>${rows.join('</tr><tr>')}</tr></table>`
}

const makeArmorList = function(config) {
  const armorData = config['armorData'];
  const slotData = config['slotData'];
  const partsMap = {'head': '頭', 'body': '胴', 'arm': '腕', 'waist': '腰', 'foot': '足'};

  let rows = [];
  for (let armorName in armorData) {
    let parts = armorData[armorName]['parts'];

    let skillNames = [];
    let slots = [];
    for (let skillName in armorData[armorName]) {
      if ('parts' == skillName) continue;

      skillNames.push(skillName);
      for (let key in armorData[armorName][skillName]) {
        skillNames.push(`Grade.${key} : Lv.${armorData[armorName][skillName][key]}`);
      }
    }
    for (let key in slotData[armorName]) {
      slots.push(`Grade.${key} : ${slotData[armorName][key]}`);
    }
    rows.push(`<td><p>${armorName}</p><p>${partsMap[parts]}</p></td><td><p>${skillNames.join('</p><p>')}</p></td><td><p>${slots.join('</p><p>')}</p></td>`);
  }

  return `<table><tr>${rows.join('</tr><tr>')}</tr></table>`
}
document.getElementById('SkillSearch').innerHTML = `
  ${makeSkillSearch(config)}
`;

document.getElementById('ArmorList').innerHTML = `
  ${makeArmorList(config)}
`;
