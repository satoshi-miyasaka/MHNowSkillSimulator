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
  let result = '';
  result += makeSkillDiv('攻撃', ['攻撃力アップ', 'ダメージアップ', '会心', '破壊'], map);
  result += makeSkillDiv('属性・状態異常', ['属性', '状態異常'], map);
  result += makeSkillDiv('アクション', ['アクション'], map);
  result += makeSkillDiv('防御・耐性', ['防御', '耐性'], map);
  result += makeSkillDiv('その他', ['その他'], map);
  return result;
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
      if ('none' == target.style.display) {
        target.style.display = 'inline-block';
      } else {
        target.style.display = 'none';
      }
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
        table += `<tr><td>胴</td><td class="no-wrap">${armorList[1]['armor']}<br>憑依スロット:${armorList[1]['slot']}</td></tr>`;
        table += `<tr><td>腕</td><td class="no-wrap">${armorList[2]['armor']}<br>憑依スロット:${armorList[2]['slot']}</td></tr>`;
        table += `<tr><td>腰</td><td class="no-wrap">${armorList[3]['armor']}<br>憑依スロット:${armorList[3]['slot']}</td></tr>`;
        table += `<tr><td>足</td><td class="no-wrap">${armorList[4]['armor']}<br>憑依スロット:${armorList[4]['slot']}</td></tr>`;
      }
      table += '</table>'; resultArea.innerHTML = table;
    }
  });
}

function makeSkillDiv(main, sub, map) {
  let result = '';
  result += `<hr>`;
  result += `<h2>${main}<button class="foldButton" value="${main}">▼</button></h2>`;
  result += `<div id="${main}" style="display: none;">`;

  for (let i = 0; i < sub.length; i++) {
    result += `<h3>${sub[i]}</h3>`;

    let  divButtonsNothing = '';
    let divButtonsExist = '';
    let divButtonsOnly = '';
    map.forEach((value, key) => {
      if (value['tag'].includes(sub[i])) {
        let button = `<button class="skillButton" value="${key}">${key}</button>`;
        if ('憑依' in value && 'あり' ==  value['憑依']) {
          divButtonsExist += button;
        } else if ('憑依' in value && 'のみ' ==  value['憑依']) {
          divButtonsOnly += button;
        } else {
          divButtonsNothing += button;
        }
      }
    });
    result += divButtonsNothing.length ? '<p>漂流石なし</p>' + divButtonsNothing : '';
    result += divButtonsExist.length ? '<p>漂流石あり</p>' + divButtonsExist : '';
    result += divButtonsOnly.length ? '<p>漂流石のみ</p>' + divButtonsOnly : '';
  }
  result += '</div>';
  return result;
}

async function preSkillCheck(config) {
  document.querySelector('#skillCheck').disabled = true;
  const selectSkillLevels = document.querySelectorAll('.selectSkillLevel');
  const slotCheck = document.querySelector('#slotCheck');
  let selectedArmors = selectArmor(request, slotCheck.checked, config);
  if (0 != selectedArmors.length) document.querySelector('#skillCheck').disabled = false;
  return selectedArmors;
}
