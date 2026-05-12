export function setSkillDiv(skillData) {
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
  for (let i = 0; i < skillList.length; i++) {
    setArmorData('head', skillData[skillList[i]], selectedArmorName, headArmor);
    setArmorData('body', skillData[skillList[i]], selectedArmorName, bodyArmor);
    setArmorData('arm', skillData[skillList[i]], selectedArmorName, armArmor);
    setArmorData('waist', skillData[skillList[i]], selectedArmorName, waistArmor);
    setArmorData('foot', skillData[skillList[i]], selectedArmorName, footArmor);
  }

  let options = '';
  for (let j = 1; j <= 10; j++) options += `<option>Grade${j}</option>`;

  let result = '';
  let i = 0;
  while (true) {
    let armorNameWork = '';
    let skillWork = '';

    let flag = 0;
    if (i < headArmor.length) {
      let armorName = headArmor[i];
      armorNameWork += `<td rowspan="2"><input type="radio" name="head" value="${armorName}" /></td>`;
      armorNameWork += `<td>${armorName}<br /><select>${options}</select></td>`;
      skillWork += `<td>${selectSkillGrade(armorName, 10, armorData, slotData)}</td>`;
    } else {
      armorNameWork += `<td rowspan="2"></td><td></td>`;
      skillWork += `<td></td>`;
      flag++;
    }
    if (i < bodyArmor.length) {
      let armorName = bodyArmor[i];
      armorNameWork += `<td rowspan="2"><input type="radio" name="body" value="${armorName}" /></td>`;
      armorNameWork += `<td>${armorName}<br /><select>${options}</select></td>`;
      skillWork += `<td>${selectSkillGrade(armorName, 10, armorData, slotData)}</td>`;
    } else {
      armorNameWork += `<td rowspan="2"></td><td></td>`;
      skillWork += `<td></td>`;
      flag++;
    }
    if (i < armArmor.length) {
      let armorName = armArmor[i];
      armorNameWork += `<td rowspan="2"><input type="radio" name="arm" value="${armorName}" /></td>`;
      armorNameWork += `<td>${armorName}<br /><select>${options}</select></td>`;
      skillWork += `<td>${selectSkillGrade(armorName, 10, armorData, slotData)}</td>`;
    } else {
      armorNameWork += `<td rowspan="2"></td><td></td>`;
      skillWork += `<td></td>`;
      flag++;
    }
    if (i < waistArmor.length) {
      let armorName = waistArmor[i];
      armorNameWork += `<td rowspan="2"><input type="radio" name="waist" value="${armorName}" /></td>`;
      armorNameWork += `<td>${armorName}<br /><select>${options}</select></td>`;
      skillWork += `<td>${selectSkillGrade(armorName, 10, armorData, slotData)}</td>`;
    } else {
      armorNameWork += `<td rowspan="2"></td><td></td>`;
      skillWork += `<td></td>`;
      flag++;
    }
    if (i < footArmor.length) {
      let armorName = footArmor[i];
      armorNameWork += `<td rowspan="2"><input type="radio" name="foot" value="${armorName}" /></td>`;
      armorNameWork += `<td>${armorName}<br /><select>${options}</select></td>`;
      skillWork += `<td>${selectSkillGrade(armorName, 10, armorData, slotData)}</td>`;
    } else {
      armorNameWork += `<td rowspan="2"></td><td></td>`;
      skillWork += `<td></td>`;
      flag++;
    }
    if (5 == flag) break;
    result += `<tr>${armorNameWork}</tr><tr>${skillWork}</tr>`;
    i++;
  }
  document.getElementById('ArmorChoice').innerHTML = `
    <table>
      <tr>
        <th colspan="2">頭</th><th colspan="2">胴</th><th colspan="2">腕</th><th colspan="2">腰</th><th colspan="2">足</th>
      </tr>
      <tr>
        <td><input type="radio" name="head" value="自由枠" checked /></td>
        <td>自由枠</td>
        <td><input type="radio" name="body" value="自由枠" checked /></td>
        <td>自由枠</td>
        <td><input type="radio" name="arm" value="自由枠" checked /></td>
        <td>自由枠</td>
        <td><input type="radio" name="waist" value="自由枠" checked /></td>
        <td>自由枠</td>
        <td><input type="radio" name="foot" value="自由枠" checked /></td>
        <td>自由枠</td>
      </tr>
      ${result}
    </table>
  `
}

export function setChoiceSkill(skillList, selectList, config) {
  let skillData = config['skillData'];
  let armorData = config['armorData'];
  let slotData = config['slotData'];

  let skillSummary = {};
  let slotSummary = 0;
  for (let i = 0; i < selectList.length; i++) {
    let armorName = selectList[i];
    for (let skillName in armorData[armorName]) {
      if (!(skillName in skillSummary)) skillSummary[skillName] = 0;
      skillSummary[skillName] += choiceLevel(armorData[armorName][skillName]);
    }
    slotSummary += choiceLevel(slotData[armorName]);
  }
  let temp = '';
  for (let skillName in skillSummary) {
    let skillKoka = skillData[skillName]['効果'][
      (skillSummary[skillName] > skillData[skillName]['max_level']
      ? skillData[skillName]['max_level']
      : skillSummary[skillName])-1];
    if (skillSummary[skillName] > skillData[skillName]['max_level']) {
      temp += `<tr><td>${skillName}</td>
      <td class="level_over">
        <input type="text" value="${skillSummary[skillName]}"
        readonly="true" size="1" maxlength="1" class="inputNumeric slot" />
      </td>`;
    } else {
      temp += `<tr><td>${skillName}</td>
      <td>
        <input type="text" value="${skillSummary[skillName]}"
        readonly="true" size="1" maxlength="1" class="inputNumeric slot" />
      </td>`;
    }
    if ('憑依' in skillData[skillName]) {
      temp += `<td>
      <button class="minus">-</button>
      <input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric slot" />
      <button class="plus">+</button>
      </td>`;
    } else {
      temp += `<td></td>`;
    }
    temp += `<td>
    <button class="minus wapon">-</button>
    <input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric wapon" />
    <button class="plus wapon">+</button>
    </td>`;
    temp += `<td></td><td>${skillKoka}</td></tr>`;
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
        temp += `<td>
        <button class="minus">-</button>
        <input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric slot" />
        <button class="plus">+</button>
        </td>`;
      } else {
        temp += `<td></td>`;
      }
      temp += `<td>
      <button class="minus wapon">-</button>
      <input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric wapon" />
      <button class="plus wapon">+</button>
      </td>`;
    temp += `<td></td><td>${skillKoka}</td></tr>`;
    }
  }
  document.getElementById('ChoiceSkill').innerHTML = `
    <table>
      <tr>
        <th>スキル</th>
        <th>装備レベル</th>
        <th>憑依錬成<input type="text" size="1" maxlength="1" class="inputNumeric" value="${slotSummary}" id="SlotSum" /></th>
        <th>武器スキル</th><th>計</th><th>効果</th>
      </tr>
      ${temp}
    </table>
    `
}

function makeSkillButton(main, sub, map) {
  let result = '';
  result += `<h2>${main}<button class="foldButton" value="${main}">▼</button></h2>`;
  result += `<div id="${main}" class="skill_div" style="display: none;">`;

  for (let i = 0; i < sub.length; i++) {
    result += `<h3>${sub[i]}</h3>`;

    let  divButtonsNothing = '';
    let divButtonsExist = '';
    let divButtonsOnly = '';
    map.forEach((value, key) => {
      if (value['tag'].includes(sub[i])) {
        if ('憑依' in value && 'あり' ==  value['憑依']) {
          divButtonsExist += `<button class="SkillButton NonSelect Exist " value="${key}">${key}</button>`;
        } else if ('憑依' in value && 'のみ' ==  value['憑依']) {
          divButtonsOnly += `<button class="SkillButton NonSelect Only " value="${key}">${key}</button>`;
        } else {
          divButtonsNothing += `<button class="SkillButton NonSelect Nothing" value="${key}">${key}</button>`;
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

function selectSkillGrade(armorName, greade, armorData, slotData) {
  let temp = '';
  let result = '';
  for (let skillName in armorData[armorName]) {
    for (let skillGrade in armorData[armorName][skillName]) {
      temp = `<p>${skillName}:Lv.${choiceLevel(armorData[armorName][skillName])}</p>`;
    }
    result += temp;
  }
  temp = '';
  for (let slotGrade in slotData[armorName]) {
      temp = `<p>憑依スロット:${choiceLevel(slotData[armorName])}</p>`;
  }
  result += temp;
  return result;
}

function choiceLevel(gradeLevels) {
  let levels = [0];
  for (let key in gradeLevels) levels.push(gradeLevels[key]);
  return levels[levels.length -1];
}

function setArmorData(pos, skillData, selectedArmorName, posArmor) {
  if (skillData[pos]) {
    for (let key in skillData[pos]) {
      if (!selectedArmorName.includes(key)) {
        selectedArmorName.push(key);
        posArmor.push(key);
      }
    }
  }
}
