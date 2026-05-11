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
    let skillKoka = skillData[skillName]['効果'][(skillSummary[skillName] > skillData[skillName]['max_level'] ? skillData[skillName]['max_level'] : skillSummary[skillName])-1];
    if (skillSummary[skillName] > skillData[skillName]['max_level']) {
      temp += `<tr><td>${skillName}</td><td class="level_over">${skillSummary[skillName]}</td>`;
    } else {
      temp += `<tr><td>${skillName}</td><td>${skillSummary[skillName]}</td>`;
    }
    if ('憑依' in skillData[skillName]) {
      temp += `<td><button>-</button><input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric" /><button>+</button></td>`;
    } else {
      temp += `<td></td>`;
    }
    temp += `<td><button>-</button><input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric" /><button>+</button></td>`;
    temp += `<td>${skillKoka}</td></tr>`;
  }
  for (let i = 0; i < skillList.length; i++) {
    let skillName = skillList[i];
    let skillKoka = skillData[skillName]['効果'][(skillSummary[skillName] > skillData[skillName]['max_level'] ? skillData[skillName]['max_level'] : skillSummary[skillName])-1];
    if (!(skillList[i] in skillSummary)) {
      temp += `<tr><td>${skillName}</td><td>0</td>`;
      if ('憑依' in skillData[skillName]) {
        temp += `<td><button>-</button><input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric" /><button>+</button></td>`;
      } else {
        temp += `<td></td>`;
      }
      temp += `<td><button>-</button><input type="text" value="0" readonly="true" size="1" maxlength="1" class="inputNumeric" /><button>+</button></td>`;
    temp += `<td>${skillKoka}</td></tr>`;
    }
  }
  document.getElementById('ChoiceSkill').innerHTML = `
    <table>
      <tr>
        <th>スキル</th>
        <th>装備レベル</th>
        <th>憑依錬成<input type="text" size="1" maxlength="1" class="inputNumeric" value="${slotSummary}" /></th>
        <th>武器スキル</th><th>効果</th>
      </tr>
      ${temp}
    </table>
    `
}

export function setSkillButtonScript(config) {
  // addEventListenerを使いたいのでDOMのまま
  const skillData = config['skillData'];
  const skillButtons = document.querySelectorAll('.skillButton');
  const selectSkillArea = document.querySelector('#selectSkill');
  const foldButtons = document.querySelectorAll('.foldButton');

  skillButtons.forEach((skillButton) => {
    skillButton.addEventListener('click', (event) => {
      let skillName = event.target.value;
      request[skillName] = 1;
      if (document.getElementById('div_'+skillName)) return;

      let div = document.createElement('div');
      div.setAttribute('id', 'div_'+skillName);
      let removeButton = document.createElement('button');
      removeButton.setAttribute('class', 'removeButton');
      removeButton.innerText = 'Ｘ';
      removeButton.value = skillName;
      removeButton.addEventListener('click', (event) => {
        document.getElementById('div_'+event.target.value).remove()
        delete request[event.target.value]
        preSkillCheck(config).then((val) => { selectArmors = val });
      });
      div.appendChild(removeButton);
      let skillNameSpan = document.createElement('span');
      skillNameSpan.innerText = skillName;
      div.appendChild(skillNameSpan);
      let levelSelect = document.createElement('select');
      levelSelect.setAttribute('class', 'selectSkillLevel');

      let maxLevel = skillData[skillName].max_level;
      for (let i = 1; i <= maxLevel; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerText = `Level ${i}`;
        levelSelect.appendChild(option);
      }
      levelSelect.addEventListener('change', (event) => {
        request[skillName] = levelSelect.value;
        preSkillCheck(config).then((val) => { selectArmors = val });
      });
      div.appendChild(levelSelect);
      selectSkillArea.appendChild(div);

      preSkillCheck(config).then((val) => { selectArmors = val });
    })
  });

  const slotCheckBox = document.querySelector('#slotCheck');
  slotCheckBox.addEventListener('change', (event) => {
    preSkillCheck(config).then((val) => { selectArmors = val });
  });

  foldButtons.forEach((foldButton) => {
    foldButton.addEventListener('click', (event) => {
      const target =  document.getElementById( event.target.value );
      const skillDivs = document.querySelectorAll('.skill_div');
      const flag = target.style.display == 'none';
      skillDivs.forEach((skillDiv) => {
        skillDiv.style.display = 'none';
      });
      target.style.display = flag ? 'inline-block' : 'none';
    });
  });

}

export function setSkillCheckButtonScript(config) {
  const skillData = config['skillData'];
  const button = document.getElementById('skillCheck');
  button.addEventListener('click', () => {
    let resultArea = document.getElementById('result');
    let result = summarySkill(selectArmors, config);
    if (0 == result.length) {
      resultArea.innerHTML = '<div>検索結果なし</div>';
    } else {
      let table = '<table>';
      for (let i = 0; i < result.length; i++) {
        let armorList = result[i]['Armor'];
        let skillList = result[i]['Skill'];
        table += '<tr>';
        table += `<tr><td>頭</td><td class="no-wrap">${armorList[0]['armor']}<br>憑依スロット:${armorList[0]['slot']}</td>`;
        table += '<td rowspan="2">';
        for (let skill in skillList) {
          if (skillList[skill] > skillData[skill]['max_level']) {
            table += '<span class="level_over">';
          } else {
            table += '<span>';
          }
          table += skill+':' + skillList[skill]+'</span>';
        }
        table += '</td></tr>';
        table += `<tr><td>胴</td><td class="no-wrap">${armorList[1]['armor']}<br>憑依スロット:${armorList[1]['slot']}</td></tr>`;
        table += `<tr><td>腕</td><td class="no-wrap">${armorList[2]['armor']}<br>憑依スロット:${armorList[2]['slot']}</td>`;
        table += '<td rowspan="2">';
        table += '<br /><span>【憑依錬成】</span>';
        for (let skill in armorList[5]) {
            table += `<span>${skill}:${armorList[5][skill]}</span>`;
        }
        table += '</td></tr>';
        table += `<tr><td>腰</td><td class="no-wrap">${armorList[3]['armor']}<br>憑依スロット:${armorList[3]['slot']}</td></tr>`;
        table += `<tr><td>足</td><td class="no-wrap">${armorList[4]['armor']}<br>憑依スロット:${armorList[4]['slot']}</td></tr>`;
      }
      table += '</table>'; resultArea.innerHTML = table;
    }
  });
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
