import { makeArmorData, selectArmor, summarySkill } from './skillCheck.js'

var selectArmors = [];

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
  div.appendChild(makeHTitle('h2', '属性'));
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
  const buttons = document.querySelectorAll('.skillButton');
  const selectSkillArea = document.querySelector('#selectSkill');

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let target = event.target.value;
      if (document.getElementById("div_"+target)) return;

      let div = document.createElement("div");
      div.setAttribute("id", "div_"+target);
      let btn = document.createElement("button");
      btn.innerText = 'X';
      btn.value = target;
      btn.addEventListener('click', (event) => {
        document.getElementById("div_"+event.target.value).remove()
        selectArmors = preSkillCheck(config);
      });
      div.appendChild(btn);
      let spn = document.createElement("span");
      spn.innerText = target;
      div.appendChild(spn);
      let slct = document.createElement("select");
      slct.setAttribute("class", "selectSkillLevel");

      let maxLevel = skillData[target].max_level;
      for (let i = 1; i <= maxLevel; i++) {
        let opt = document.createElement("option");
        opt.value = `${target}:${i}`;
        opt.innerText = `Level ${i}`;
        slct.appendChild(opt);
      }
      slct.addEventListener('change', (event) => {
        selectArmors = preSkillCheck(config);
      });
      div.appendChild(slct);
      selectSkillArea.appendChild(div);

      selectArmors = preSkillCheck(config);
    })
  });

  const slotCheckBox = document.querySelector('#slotCheck');
  slotCheckBox.addEventListener('change', (event) => {
    let selectArmors = preSkillCheck(config);
  });
  
}

export function setSkillCheckButtonScript(config) {
  const button = document.getElementById('skillCheck');
  button.addEventListener('click', () => {
    let resultArea = document.getElementById('result');
    resultArea.innerHTML = '<div>検索中</div>';

    let result = summarySkill(selectArmors, config);
    if (0 == result.length) {
      resultArea.innerHTML = '<div>検索結果なし</div>';
    } else {
      let table = "<table>";
      for (let i = 0; i < result.length; i++) {
        let armorList = result[i]['Armor'];
        let skillList = result[i]['Skill'];
        table += "<tr>";
        table += "<tr><td>頭</td><td>"+armorList[0]+"</td><td rowspan='5'>";
        for (let skill in skillList) {
          table += skill+":" + skillList[skill] + " ";
        }
        table += "</td></tr>";
        table += "</td></tr>";
        table += "<tr><td>胴</td><td>"+armorList[1]+"</td></tr>";
        table += "<tr><td>腕</td><td>"+armorList[2]+"</td></tr>";
        table += "<tr><td>腰</td><td>"+armorList[3]+"</td></tr>";
        table += "<tr><td>足</td><td>"+armorList[4]+"</td></tr>";
      }
      table += "</table>";
      resultArea.innerHTML = table;
    }
  });
}

function makeButtonTag(map, tag) {
  let divButtons = document.createElement('div');
  map.forEach((value, key) => {
    let button = document.createElement('button');
    if (value['tag'].includes(tag)) {
      button.setAttribute('class', 'skillButton');
      button.setAttribute('value', key);
      button.innerText = key;
      if ('憑依' in value && 'あり' ==  value['憑依']) {
        button.classList.add('hyoiari');
        button.innerText += '【憑依あり】';
      }
      if ('憑依' in value && 'のみ' ==  value['憑依']) {
        button.classList.add('hyoinomi');
        button.innerText += '【憑依のみ】';
      }
      divButtons.appendChild(button);
    }
  });
  return divButtons;
}

function makeHTitle(tag, title) {
  let hTitle = document.createElement(tag);
  hTitle.innerText = title;
  return hTitle;
}

function preSkillCheck(config) {
  const selectSkillLevels = document.querySelectorAll('.selectSkillLevel');
  const slotCheck = document.querySelector('#slotCheck');
  let request = {};
  selectSkillLevels.forEach((select) => {
    let skillLevel = select.value.split(":");
    request[skillLevel[0]] = skillLevel[1];
  })
  let selectedArmors = selectArmor(request, slotCheck.checked, config);
  if (0 == selectedArmors.length) {
    document.querySelector('#skillCheck').disabled = true;
  } else {
    document.querySelector('#skillCheck').disabled = false;
  }
  return selectedArmors;
}
