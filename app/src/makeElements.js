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
  const MakekArmorRows = class {
    constructor(armorData, slotData) {
      this.armorData = armorData;
      this.slotData = slotData;
      this.armorNameWork = '';
      this.skillWork = '';
      this.count = 0;
      this.options = '';

      for (let i = 1; i <= 7; i++) this.options += `<option value="${i}">Grade${i}</option>`;
      this.options += `<option selected="true" value="8">Grade8～</option>`;
    }
    setElement(i, armors, pos) {
      if (i < armors.length) {
        let armorName = armors[i];
        this.armorNameWork += `<td rowspan="2"><input type="radio" name="${pos}" value="${armorName}" /></td>`;
        this.armorNameWork += `<td><p>${armorName}</p><select class="armorGrade">${this.options}</select></td>`;
        this.skillWork += `<td>${common.selectSkillGrade(armorName, 8, this.armorData, this.slotData)}</td>`;
      } else {
        this.armorNameWork += `<td rowspan="2"></td><td></td>`;
        this.skillWork += `<td></td>`;
        this.count++;
      }
    }
    get getArmorNameWork() {
      return this.armorNameWork
    }
    get getSkillWork() {
      return this.skillWork
    }
    get isBreak() {
      return 5 == this.count
    }
  }

  const setArmorData = function(pos, skillData, posArmor) {
    if (!skillData[pos]) return;
    for (let key in skillData[pos]) if (!posArmor.includes(key)) posArmor.push(key);
  }

  const freeArmor = function() {
    let free = '';
    ['head', 'body', 'arm', 'waist', 'foot'].forEach((pos) => {
      free += `<td><input type="radio" name="${pos}" value="自由枠" checked /></td><td>自由枠</td> `
    });
    return `<tr>${free}</tr>`;
  }

  let skillData = config['skillData'];
  let armorData = config['armorData'];
  let slotData = config['slotData'];

  let headArmor = [];
  let bodyArmor = [];
  let armArmor = [];
  let waistArmor = [];
  let footArmor = [];

  for (let i = 0; i < skillList.length; i++) {
    setArmorData('head', skillData[skillList[i]], headArmor);
    setArmorData('body', skillData[skillList[i]], bodyArmor);
    setArmorData('arm', skillData[skillList[i]], armArmor);
    setArmorData('waist', skillData[skillList[i]], waistArmor);
    setArmorData('foot', skillData[skillList[i]], footArmor);
  }

  let choiseArmor = '';
  let i = 0;
  while (true) {
    let block = new MakekArmorRows(armorData, slotData);
    block.setElement(i, headArmor, 'head');
    block.setElement(i, bodyArmor, 'body');
    block.setElement(i, armArmor, 'arm');
    block.setElement(i, waistArmor, 'waist');
    block.setElement(i, footArmor, 'foot');

    if (block.isBreak) break;
    choiseArmor += `<tr>${block.armorNameWork}</tr><tr>${block.skillWork}</tr>`;
    i++;
  }
  document.getElementById('ArmorChoice').innerHTML = `
    <table>
      <tr>
        <th colspan="2">頭</th><th colspan="2">胴</th><th colspan="2">腕</th><th colspan="2">腰</th><th colspan="2">足</th>
      </tr>
      ${freeArmor()}
      ${choiseArmor}
    </table>
  `
}

export function setChoiceSkill(skillList, selectHash, config) {
  const plusMinusSet = function(arg, isInner=true) {
    let inner = '';
    if (isInner) {
      inner = `
        <button class="minus ${arg}">-</button>
        <input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric ${arg}" />
        <button class="plus ${arg}">+</button>
        `;
    }
    return `<td>${inner}</td>`;
  }

  let skillData = config['skillData'];
  let armorData = config['armorData'];
  let slotData = config['slotData'];

  let skillSummary = {};
  let slotSummary = 0;
  let skillRows = '';

  for (let armorName in selectHash) {
    for (let skillName in armorData[armorName]) {
      if (!(skillName in skillSummary)) skillSummary[skillName] = 0;
      skillSummary[skillName] += common.choiceLevel(armorData[armorName][skillName], selectHash[armorName]);
    }
    slotSummary += common.choiceLevel(slotData[armorName], selectHash[armorName]);
  }

  for (let skillName in skillSummary) {
    let level = 0;
    let styleClass = '';
    if (skillSummary[skillName] > skillData[skillName]['max_level']) {
      level = skillData[skillName]['max_level'];
      styleClass = ' level_over';
    } else {
      level = skillSummary[skillName];
    }
    let skillEffect = skillData[skillName]['効果'][level -1];
    skillRows += `
      <tr><td>${skillName}</td><td>
      <input type="text" value="${skillSummary[skillName]}"
      readonly="true" size="1" maxlength="1" class="inputNumeric${styleClass}" />
      </td>`;
    skillRows += plusMinusSet('slot', ('憑依' in skillData[skillName]));
    skillRows += plusMinusSet('wapon');
    skillRows += `<td>${skillEffect}</td></tr>`;
  }
  for (let i = 0; i < skillList.length; i++) {
    let skillName = skillList[i];
    let skillEffect = skillData[skillName]['効果']
      [(skillSummary[skillName] > skillData[skillName]['max_level']
      ? skillData[skillName]['max_level']
      : skillSummary[skillName])-1];
    if (!(skillList[i] in skillSummary)) {
      skillRows += `<tr><td>${skillName}</td><td>0</td>`;
      skillRows += plusMinusSet('slot', ('憑依' in skillData[skillName]));
      skillRows += plusMinusSet('wapon');
      skillRows += `<td>${skillEffect}</td></tr>`;
    }
  }
  document.getElementById('ChoiceSkill').innerHTML = `
    <table>
      <tr>
        <th>スキル</th>
        <th>装備レベル</th>
        <th>憑依錬成<input type="text" size="1" maxlength="1" class="inputNumeric" value="${slotSummary}" id="SlotSum" /></th>
        <th>武器スキル</th><th>効果</th>
      </tr>
      ${skillRows}
    </table>
    `
}

export function setDamageArea() {
  const makeButton = function(id, value='') {
    return `<input type="text" id="${id}" value="${value}"
      size="4" maxlength="4" inputmode="numeric" class="inputNumeric" />`
  }
  document.getElementById('CalcDamage').innerHTML = `
    <table>
      <tr>
        <th>攻撃力</th> <th>属性値</th> <th>肉質</th> <th>モーション値</th>
      </tr>
      <tr><td>
        ${makeButton('a1', 1000)}
      </td><td>
        ${makeButton('b1', 1000)}
      </td><td>
        ${makeButton('c6', 130)}
      </td><td>
        ${makeButton('c7', 27)}
      </td></tr>
    </table>
    <hr />
    ( 攻撃力 × 攻撃力 ${makeButton('a3', 0)} %UP
    + 攻撃力 ${makeButton('a4', 0)} UP
    + 錬成パラメータ ${makeButton('a5', 0)} )
    × 攻撃活性 ${makeButton('a6', 0)} %UP
    <hr />
     ( 属性値 × 属性値 ${makeButton('b3', 0)} %UP
    + 属性値 ${makeButton('b4', 0)} UP )
    × 古龍属性 ${makeButton('b5', 0)} %UP
    <hr />
    ( 物理攻撃力 ${makeButton('a')}
    + 属性攻撃力 ${makeButton('b')} )
    × ダメージ ${makeButton('c1', 0)} %UP
    × ( 肉質 / 100 ) × ( モーション値 / 100 )
  <hr />
  = 基本ダメージ ${makeButton('c')}
  <br />
  基本ダメージ × 会心倍率 ${makeButton('c3', 1.25)}
  = 会心ダメージ ${makeButton('d')}
  <br />
  基本ダメージ × 0.75
  = マイナス会心ダメージ ${makeButton('e')}
  <br />
  基本ダメージ × 凶会心 ${makeButton('c8', 0)}
  = 凶会心ダメージ ${makeButton('f')}
  <hr />
  ※ トレーニングエリアでのダメージを想定しています<br />
  ※ 武器固有補正 武器SP倍率 状態異常補正 はシンプルにしたかったので、省略しています<br />
  ※ 計算式は「ナウかる研究所」様の物を参考に作成しています。
  `;
}

function work() {
 obj = document.querySelectorAll('.inputNumeric');
  obj.forEach((inputNumeric) => {
    inputNumeric.addEventListener('input', () => {
      inputNumeric.value = inputNumeric.value.replace(/[\D]/g, '');

      const a1 = Number(document.getElementById('a1').value);
      const a3 = Number(document.getElementById('a3').value) / 100 + 1;
      const a4 = Number(document.getElementById('a4').value);
      const a5 = Number(document.getElementById('a5').value);
      const a6 = Number(document.getElementById('a6').value) / 100 + 1;

      const aObj = document.getElementById('a');
      let a = Math.floor(Math.floor(a1 * a3 + a4 + a5) * a6);
      aObj.value = a;

      const b1 = Number(document.getElementById('b1').value);
      const b3 = Number(document.getElementById('b3').value) / 100 + 1;
      const b4 = Number(document.getElementById('b4').value);
      const b5 = Number(document.getElementById('b5').value) / 100 + 1;
      const b6 = 1;

      const bObj = document.getElementById('b');
      let b  = Math.floor(Math.floor((b1 * b3 + b4) * b5) * b6);
      bObj.value = b;

      const c1 = Number(document.getElementById('c1').value) / 100 + 1;
      const c3 = Number(document.getElementById('c3').value);
      const c6 = Number(document.getElementById('c6').value) / 100;
      const c7 = Number(document.getElementById('c7').value) / 100;
      const c8 = Number(document.getElementById('c8').value) / 100;

      const cObj = document.getElementById('c');
      let c = Math.ceil((a + b) * c1 * c6 * c7);
      cObj.value = c;

      const dObj = document.getElementById('d');
      let d = Math.ceil(c * c3);
      dObj.value = d;

      const eObj = document.getElementById('e');
      let e = Math.ceil(c * 0.75);
      eObj.value = e;

      const fObj = document.getElementById('f');
      let f = Math.ceil(c * c8);
      fObj.value = f;
    })
  })
}
