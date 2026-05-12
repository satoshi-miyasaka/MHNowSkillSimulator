import * as common from './common.js'

export function setSkillDiv(skillData) {
  const makeSkillButton = function(main, sub, map) {
    let result = '';
    result += `<h2>${main}<button class="foldButton" value="${main}">▼</button></h2>`;
    result += `<div id="${main}" class="skill_div" style="display: none;">`;

    for (let i = 0; i < sub.length; i++) {
      result += `<h3>${sub[i]}</h3>`;

      let  divButtonsNothing = '';
      let divButtonsExist = '';
      let divButtonsOnly = '';
      const button = function(key, clazz) {return `<button class="SkillButton NonSelect ${clazz}" value="${key}">${key}</button>`};
      map.forEach((value, key) => {
        if (value['tag'].includes(sub[i])) {
          if ('憑依' in value && 'あり' ==  value['憑依']) {
            divButtonsExist += button(key, 'Exist');
          } else if ('憑依' in value && 'のみ' ==  value['憑依']) {
            divButtonsOnly += button(key, 'Only');
          } else {
            divButtonsNothing += button(key, 'Nothing');
          }
        }
      });
      result += divButtonsNothing.length ? divButtonsNothing : '';
      result += divButtonsExist.length ? divButtonsExist : '';
      result += divButtonsOnly.length ? divButtonsOnly : '';
    }
    result += '</div>';
    return result;
  }

  let map = new Map(Object.entries(skillData));
  let result = '';
  result += makeSkillButton('攻撃', ['攻撃力アップ', 'ダメージアップ', '会心', '攻撃・その他'], map);
  result += makeSkillButton('属性・状態異常', ['属性', '状態異常'], map);
  result += makeSkillButton('アクション', ['アクション'], map);
  result += makeSkillButton('防御・耐性', ['防御', '耐性'], map);
  result += makeSkillButton('その他', ['その他'], map);
  return result;
}

export function setArmorChoice(skillList, config) {
  let skillData = config['skillData'];
  let armorData = config['armorData'];
  let slotData = config['slotData'];

  let headArmor = [];
  let bodyArmor = [];
  let armArmor = [];
  let waistArmor = [];
  let footArmor = [];

  let selectedArmorName = [];

  const setArmorData = function(pos, skillData, selectedArmorName, posArmor) {
    if (skillData[pos]) {
      for (let key in skillData[pos]) {
        if (!selectedArmorName.includes(key)) {
          selectedArmorName.push(key);
          posArmor.push(key);
        }
      }
    }
  }

  for (let i = 0; i < skillList.length; i++) {
    setArmorData('head', skillData[skillList[i]], selectedArmorName, headArmor);
    setArmorData('body', skillData[skillList[i]], selectedArmorName, bodyArmor);
    setArmorData('arm', skillData[skillList[i]], selectedArmorName, armArmor);
    setArmorData('waist', skillData[skillList[i]], selectedArmorName, waistArmor);
    setArmorData('foot', skillData[skillList[i]], selectedArmorName, footArmor);
  }

  let options = '';
  for (let i = 1; i <= 7; i++) options += `<option value="${i}">Grade${i}</option>`;
  options += `<option selected="true" value="8">Grade8～</option>`;

  let result = '';
  let i = 0;
  while (true) {
    const MakeClass = class {
      constructor(armorData, slotData, options) {
        this.armorData = armorData;
        this.slotData = slotData;
        this.armorNameWork = '';
        this.skillWork = '';
        this.count = 0;
        this.options = options;
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

    let make = new MakeClass(armorData, slotData, options);
    make.setElement(i, headArmor, 'head');
    make.setElement(i, bodyArmor, 'body');
    make.setElement(i, armArmor, 'arm');
    make.setElement(i, waistArmor, 'waist');
    make.setElement(i, footArmor, 'foot');
    if (make.isBreak) break;
    result += `<tr>${make.armorNameWork}</tr><tr>${make.skillWork}</tr>`;
    i++;
  }
  let free = '';
  ['head', 'body', 'arm', 'waist', 'foot'].forEach((pos) => {
    free += `<td><input type="radio" name="${pos}" value="自由枠" checked /></td><td>自由枠</td> `
  });
  document.getElementById('ArmorChoice').innerHTML = `
    <table>
      <tr>
        <th colspan="2">頭</th><th colspan="2">胴</th><th colspan="2">腕</th><th colspan="2">腰</th><th colspan="2">足</th>
      </tr>
      <tr>${free}</tr>
      ${result}
    </table>
  `
}

export function setChoiceSkill(skillList, selectHash, config) {
  let skillData = config['skillData'];
  let armorData = config['armorData'];
  let slotData = config['slotData'];

  let skillSummary = {};
  let slotSummary = 0;
  for (let armorName in selectHash) {
    for (let skillName in armorData[armorName]) {
      if (!(skillName in skillSummary)) skillSummary[skillName] = 0;
      skillSummary[skillName] += common.choiceLevel(armorData[armorName][skillName], selectHash[armorName]);
    }
    slotSummary += common.choiceLevel(slotData[armorName], selectHash[armorName]);
  }
  let temp = '';
  const plusMinusSet = function(arg) {
    return `<td>
    <button class="minus ${arg}">-</button>
    <input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric ${arg}" />
    <button class="plus ${arg}">+</button>
    </td>`;
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
    let skillKoka = skillData[skillName]['効果'][level -1];
    temp += `<tr><td>${skillName}</td>
    <td>
      <input type="text" value="${skillSummary[skillName]}"
      readonly="true" size="1" maxlength="1" class="inputNumeric${styleClass}" />
    </td>`;
    if ('憑依' in skillData[skillName]) {
      temp += plusMinusSet('slot');
    } else {
      temp += `<td></td>`;
    }
    temp += plusMinusSet('wapon');
    temp += `<td>${skillKoka}</td></tr>`;
  }
  for (let i = 0; i < skillList.length; i++) {
    let skillName = skillList[i];
    let skillKoka = skillData[skillName]['効果']
      [(skillSummary[skillName] > skillData[skillName]['max_level']
      ? skillData[skillName]['max_level']
      : skillSummary[skillName])-1];
    if (!(skillList[i] in skillSummary)) {
      temp += `<tr><td>${skillName}</td><td>0</td>`;
      if ('憑依' in skillData[skillName]) {
        temp += plusMinusSet('slot');
      } else {
        temp += `<td></td>`;
      }
      temp += plusMinusSet('wapon');
      temp += `<td>${skillKoka}</td></tr>`;
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
      ${temp}
    </table>
    `
}
