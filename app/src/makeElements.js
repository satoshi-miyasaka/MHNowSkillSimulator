import * as common from './common.js'

export function makeSkillDiv(skillData) {
  const subLoop = function(sub, map) {
    const button = function(key, clazz) {return `<button class="SkillButton NonSelect ${clazz}" value="${key}">${key}</button>`};
    let nothing = '';
    let exist = '';
    let only = '';
    map.forEach((value, key) => {
      if (value['tag'].includes(sub)) {
        if ('憑依' in value && 'あり' ==  value['憑依']) {
          exist += button(key, 'Exist');
        } else if ('憑依' in value && 'のみ' ==  value['憑依']) {
          only += button(key, 'Only');
        } else {
          nothing += button(key, 'Nothing');
        }
      }
    });
    return `<h3>${sub}</h3>
      ${nothing}
      ${exist}
      ${only}
    `;
  }
  const makeSkillButton = function(main, sub, map) {
    const devInner = function(sub, map) {
      let res = '';
      for (let i = 0; i < sub.length; i++) {
        res += subLoop(sub[i], map);
      }
      return res
    }
    return `
    <h2>${main}<button class="foldButton" value="${main}">▼</button></h2>
    <div id="${main}" class="skill_div" style="display: none;">
    ${devInner(sub, map)}
    </div>`;
  }

  let map = new Map(Object.entries(skillData));
  return `
    ${makeSkillButton('攻撃', ['攻撃力アップ', 'ダメージアップ', '会心', '攻撃・その他'], map)}
    ${makeSkillButton('属性・状態異常', ['属性', '状態異常'], map)}
    ${makeSkillButton('アクション', ['アクション'], map)}
    ${makeSkillButton('防御・耐性', ['防御', '耐性'], map)}
    ${makeSkillButton('その他', ['その他'], map)}
  `;
}

export function setArmorChoice(skillList, config) {
  let skillData = config['skillData'];
  let armorData = config['armorData'];
  let slotData = config['slotData'];

  const makeArmorData = function(pos, skillList, skillData) {
    let selectArmor = '';
    for (let i = 0; i < skillList.length; i++) {
      if (!skillData[skillList[i]][pos]) continue;
      selectArmor += `<optgroup label="${skillList[i]}">`;
      for (let key in skillData[skillList[i]][pos]) {
        selectArmor += `<option>${key}</option>`;
      }
      selectArmor += `</optgroup>`;
    }
    return `<option>選択してください</option>${selectArmor}`
  }
  let armorGradeOptions = '';
  for (let i = 1; i <= 7; i++) armorGradeOptions += `<option value="${i}">Grade${i}</option>`;
  armorGradeOptions += `<option selected="true" value="8">Grade8～</option>`;

  let headSelect = makeArmorData('head', skillList, skillData);
  document.getElementById('ArmorChoice').innerHTML = `
    <table>
      <tr>
        <th>頭</th>
        <td>
          <p><select class="Armor">${makeArmorData('head', skillList, skillData)}</select></p>
          <p><select class="Grade">${armorGradeOptions}</select></p>
        </td>
        <td></td>
      </tr>
      <tr>
        <th>胴</th>
        <td>
          <p><select class="Armor">${makeArmorData('body', skillList, skillData)}</select></p>
          <p><select class="Grade">${armorGradeOptions}</select></p>
        </td>
        <td></td>
      </tr>
      <tr>
        <th>腕</th>
        <td>
          <p><select class="Armor">${makeArmorData('arm', skillList, skillData)}</select></p>
          <p><select class="Grade">${armorGradeOptions}</select></p>
        </td>
        <td></td>
      </tr>
      <tr>
        <th>腰</th>
        <td>
          <p><select class="Armor">${makeArmorData('waist', skillList, skillData)}</select></p>
          <p><select class="Grade">${armorGradeOptions}</select></p>
        </td>
        <td></td>
      </tr>
      <tr>
        <th>足</th>
        <td>
          <p><select class="Armor">${makeArmorData('foot', skillList, skillData)}</select></p>
          <p><select class="Grade">${armorGradeOptions}</select></p>
        </td>
        <td></td>
      </tr>
    </table>
  `
}

export function makeSkillTable(config, skillList) {
  let skillGradeHash = {};

  const skillData = config['skillData'];
  const armorData = config['armorData'];
  const slotData = config['slotData'];

  const armorNames = document.querySelectorAll('select.Armor');
  const armorGrades = document.querySelectorAll('select.Grade');

  for (let i = 0; i < armorNames.length; i++) {
    skillGradeHash[armorNames[i].value] = armorGrades[i].value;
  }

  const makeSkillRowSet = function(skillName, skillSummary, skillData) {
    let sumLevel = skillName in skillSummary ? skillSummary[skillName] : 0;
    let maxLevel = skillData[skillName]['max_level'];
    let skillLevel = Math.min(sumLevel, maxLevel);
    let skillNote = skillData[skillName]['説明'];
    let skillEfect = 0 < skillLevel ? skillData[skillName]['効果'][skillLevel -1] : '';
    let levelClass = sumLevel > maxLevel ? 'level_over' : '';
    let isRensei = '憑依' in skillData[skillName] ? '' : 'disable';

    return `
    <tr>
      <td rowspan="6"><input type="checkbox" name="skillActive" checked /></td>
    </tr><tr>
      <td colspan="3">${skillName}</td>
    </tr><tr>
      <td colspan="3">${skillNote}</td>
    </tr><tr>
      <td colspan="3">${skillEfect}</td>
    </tr><tr>
      <th>レベル</th><th>憑依錬成</th><th>武器スキル等</th>
    </tr><tr>
      <input type="hidden" value="${skillName}" name="skillName" />
      <input type="hidden" value="${skillLevel}" name="skillLevel" />
      <td>
        <input type="text" value="${sumLevel}" readonly="true"
        size="1" maxlength="1" class="inputNumeric ${levelClass}" />
      </td><td>
        <button class="minus">-</button>
        <input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric" />
        <button class="plus">+</button>
      </td><td>
        <button class="minus wapon">-</button>
        <input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric" />
        <button class="plus wapon">+</button>
      </td>
    </tr>
    `
  }

  let skillSummary = {};
  let slotSummary = 0;
  for (let armorName in skillGradeHash) {
    for (let skillName in armorData[armorName]) {
      if (!(skillName in skillSummary)) skillSummary[skillName] = 0;
      skillSummary[skillName] += common.choiceLevel(armorData[armorName][skillName], skillGradeHash[armorName]);
    }
    slotSummary += common.choiceLevel(slotData[armorName], skillGradeHash[armorName]);
  }

  let skillRows = '';
  for (let skillName in skillSummary) 
    skillRows += makeSkillRowSet(skillName, skillSummary, skillData);
  for (let i = 0; i < skillList.length; i++)
    if (!(skillList[i] in skillSummary))
      skillRows += makeSkillRowSet(skillList[i], skillSummary, skillData);

  document.getElementById('ChoiceSkill').innerHTML = `
  <table>
    <tr>
      <td></td>
      <th>憑依錬成</th>
      <td colspan="2">
        <input type="text" size="1" maxlength="1" class="inputNumeric" value="${slotSummary}" id="SlotSum" />
      </td>
    </tr>
    ${skillRows}
  </table>
  `
}

export function setDamageArea() {
  const makeInput = function(id, value) {
    return `<input type="text" id="${id}" value="${value}"
      size="4" maxlength="4" inputmode="numeric" class="inputNumeric damageValue" />`
  }
  const makeInputReadOnly = function(id, value='') {
    const clazz = value ? 'damageValue' : 'damageResult';
    return `<input type="text" id="${id}" value="${value}"
      size="4" maxlength="4" inputmode="numeric" class="inputNumeric damageResult" readonly />`
  }
  document.getElementById('CalcDamage').innerHTML = `
    <table>
      <tr>
        <th>攻撃力</th>
        <th>属性値</th>
        <th>会心率</th>
        <th>会心率(スキル)</th>
      </tr><tr>
        <td>${makeInput('a1', 1000)}</td>
        <td>${makeInput('b1', 1000)}</td>
        <td>${makeInput('d2', 0)}</td>
        <td>${makeInputReadOnly('d1', 0)}</td>
      </tr><tr>
        <th>錬成パラメータ</th>
        <th>尻上がり段階</th>
        <th>肉質</th>
        <th>モーション値</th>
      </tr><tr>
        <td>${makeInput('a5', 0)}</td>
        <td>${makeInput('d3', 0)}</td>
        <td>${makeInput('c6', 130)}</td>
        <td>${makeInput('c7', 18)}</td>
      </tr>
    </table>
    <hr />
    ( 攻撃力 × 攻撃力 ${makeInputReadOnly('a3', 0)} %UP<br />
    + 攻撃力 ${makeInputReadOnly('a4', 0)} UP<br />
    + 錬成パラメータ )<br />
    × 攻撃活性 ${makeInputReadOnly('a6', 0)} %UP<br />
    = 物理攻撃力<br />
    <hr />
     ( 属性値 × 属性値 ${makeInputReadOnly('b3', 0)} %UP<br />
    + 属性値 ${makeInputReadOnly('b4', 0)} UP )<br />
    × 古龍スキル ${makeInputReadOnly('b5', 0)} %UP<br />
    = 属性攻撃力<br />
    <hr />
    ( 物理攻撃力 ${makeInputReadOnly('a')}<br />
    + 属性攻撃力 ${makeInputReadOnly('b')} )<br />
    × ダメージ ${makeInputReadOnly('c1', 0)} %UP<br />
    × ( 肉質 / 100 ) × ( モーション値 / 100 )<br />
    = 基本ダメージ ${makeInputReadOnly('c')}<br />
  <hr />
  <div style="display: in-line" id="kaishinDamage">
  基本ダメージ × 会心ダメージ倍率 ${makeInputReadOnly('c3', 125)} %<br />
  = 会心ダメージ ${makeInputReadOnly('d')}<br />
  </div>
  <div style="display: in-line" id="MinusKaishinDamage">
  基本ダメージ × マイナス会心ダメージ倍率 0.75 <br />
  = マイナス会心ダメージ ${makeInputReadOnly('e')} <br />
  </div>
  <div style="display: in-line" id="KyokaishinDamage">
  基本ダメージ × 凶会心ダメージ倍率 ${makeInputReadOnly('c8', 0)} <br />
  = 凶会心ダメージ ${makeInputReadOnly('f')} <br />
  </div>
  <hr />
  ※ トレーニングエリアでのダメージを想定しています<br />
  ※ 会心撃【属性】は、会心ダメージを見るときのみに、反映チェックを付けてください。（修正予定）<br />
  ※ 武器固有補正 武器SP倍率 状態異常補正 はシンプルにしたかったので、省略しています<br />
  ※ 砲撃、ビンダメージ等は今後追加します。<br />
  ※ 計算式は「<a href="https://mhnowcalc.com/ja/home/" target="_brank">ナウかる研究所</a>」様の物を参考に作成しています。
  `;
}

