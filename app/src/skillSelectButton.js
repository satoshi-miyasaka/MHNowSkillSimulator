import { makeArmorData, selectArmor, summarySkill } from './skillCheck.js'

var selectArmors = [];
var request = {};

export async function loadConfig() {
  try {
    const skillDataConfig = await fetch('/SkillData.json');
    const skillData = await skillDataConfig.json();

    const slotDataConfig = await fetch('/SlotData.json');
    const slotData = await slotDataConfig.json();

    const armorData = makeArmorData(skillData);

    return {'skillData': skillData, 'armorData': armorData, 'slotData': slotData};
  } catch (error) {
    console.error('スキルデータの読み込みに失敗しました:', error);
  }
}

export function makeSkillButton(skillData) {
  let map = new Map(Object.entries(skillData));

  let div = document.createElement('div');
  div.appendChild(document.createElement('hr'));
  div.appendChild(makeHTitle('h2', '攻撃'));
  div.appendChild(makeHTitle('h3', '攻撃力アップ'));
  div.appendChild(makeButtonTag(map, '攻撃力アップ'));
  div.appendChild(makeHTitle('h3', 'ダメージアップ'));
  div.appendChild(makeButtonTag(map, 'ダメージアップ'));
  div.appendChild(makeHTitle('h3', '会心'));
  div.appendChild(makeButtonTag(map, '会心'));
  div.appendChild(makeHTitle('h3', '破壊'));
  div.appendChild(makeButtonTag(map, '破壊'));
  div.appendChild(document.createElement('hr'));
  div.appendChild(makeHTitle('h2', '属性・状態異常'));
  div.appendChild(makeHTitle('h3', '属性'));
  div.appendChild(makeButtonTag(map, '属性'));
  div.appendChild(makeHTitle('h3', '状態異常'));
  div.appendChild(makeButtonTag(map, '状態異常'));
  div.appendChild(document.createElement('hr'));
  div.appendChild(makeHTitle('h2', 'アクション'));
  div.appendChild(makeButtonTag(map, 'アクション'));
  div.appendChild(document.createElement('hr'));
  div.appendChild(makeHTitle('h2', '防御・耐性'));
  div.appendChild(makeHTitle('h3', '防御'));
  div.appendChild(makeButtonTag(map, '防御'));
  div.appendChild(makeHTitle('h3', '耐性'));
  div.appendChild(makeButtonTag(map, '耐性'));
  div.appendChild(document.createElement('hr'));
  div.appendChild(makeHTitle('h2', 'その他'));
  div.appendChild(makeButtonTag(map, 'その他'));
  div.appendChild(document.createElement('hr'));
  return div;
}

export function setSkillButtonScript(config) {
  const skillData = config['skillData'];
  const skillButtons = document.querySelectorAll('.skillButton');
  const selectSkillArea = document.querySelector('#selectSkill');

  skillButtons.forEach((skillButton) => {
    skillButton.addEventListener('click', (event) => {
      let skillName = event.target.value;
      request[skillName] = 1;
      if (document.getElementById('div_'+skillName)) return;

      let div = document.createElement('div');
      div.setAttribute('id', 'div_'+skillName);
      let removeButton = document.createElement('button');
      removeButton.innerText = 'X';
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
        table += `<tr><td>頭</td><td>${armorList[0]['armor']}<br>憑依スロット:${armorList[0]['slot']}</td>`;
        table += '<td rowspan="5">';
        for (let skill in skillList) {
          if (skillList[skill] > skillData[skill]['max_level']) {
            table += '<span class="level_over">';
          } else {
            table += '<span>';
          }
          table += skill+':' + skillList[skill]+'</span>';
        }
        table += '<br /><span class="hyoi_skill">【憑依錬成】</span>';
        for (let skill in armorList[5]) {
            table += `<span class="hyoi_skill">${skill}:${armorList[5][skill]}</span>`;
        }
        table += '</td></tr>';
        table += `<tr><td>胴</td><td>${armorList[1]['armor']}<br>憑依スロット:${armorList[1]['slot']}</td></tr>`;
        table += `<tr><td>腕</td><td>${armorList[2]['armor']}<br>憑依スロット:${armorList[2]['slot']}</td></tr>`;
        table += `<tr><td>腰</td><td>${armorList[3]['armor']}<br>憑依スロット:${armorList[3]['slot']}</td></tr>`;
        table += `<tr><td>足</td><td>${armorList[4]['armor']}<br>憑依スロット:${armorList[4]['slot']}</td></tr>`;
      }
      table += '</table>';
      resultArea.innerHTML = table;
    }
  });
}

function makeButtonTag(map, tag) {
  let divButtons = document.createElement('div');
  let divButtonsNothing = document.createElement('div');
  let divButtonsExist = document.createElement('div');
  let divButtonsOnly = document.createElement('div');
  let titleP = document.createElement('p');
  titleP.innerText = '憑依錬成なし';
  divButtonsNothing.appendChild(titleP);
  titleP = document.createElement('p');
  titleP.innerText = '憑依錬成あり';
  divButtonsExist.appendChild(titleP);
  titleP = document.createElement('p');
  titleP.innerText = '憑依錬成のみ';
  divButtonsOnly.appendChild(titleP);
  map.forEach((value, key) => {
    let button = document.createElement('button');
    if (value['tag'].includes(tag)) {
      button.setAttribute('class', 'skillButton');
      button.setAttribute('value', key);
      button.innerText = key;
      if ('憑依' in value && 'あり' ==  value['憑依']) {
        divButtonsExist.appendChild(button);
      } else if ('憑依' in value && 'のみ' ==  value['憑依']) {
        divButtonsOnly.appendChild(button);
      } else {
        divButtonsNothing.appendChild(button);
      }
    }
  });
  divButtons.appendChild(divButtonsNothing);
  divButtons.appendChild(divButtonsExist);
  divButtons.appendChild(divButtonsOnly);
  return divButtons;
}

function makeHTitle(tag, title) {
  let hTitle = document.createElement(tag);
  hTitle.innerText = title;
  return hTitle;
}

async function preSkillCheck(config) {
  document.querySelector('#skillCheck').disabled = true;
  const selectSkillLevels = document.querySelectorAll('.selectSkillLevel');
  const slotCheck = document.querySelector('#slotCheck');
  let selectedArmors = selectArmor(request, slotCheck.checked, config);
  if (0 != selectedArmors.length) document.querySelector('#skillCheck').disabled = false;
  return selectedArmors;
}


