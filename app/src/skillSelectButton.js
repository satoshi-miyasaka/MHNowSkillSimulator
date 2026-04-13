import { armorSelect, makeArmorData } from './skillCheck.js'

export async function loadConfig() {
  try {
    const skillDataConfig = await fetch('/SkillData.json');
    const skillData = await skillDataConfig.json();

    const slotDataConfig = await fetch('/SlotData.json');
    const slotData = await slotDataConfig.json();

    const armorData = makeArmorData(skillData);

    return {'skillData': skillData, 'armorData': armorData, 'slotData': slotData};
  } catch (error) {
    console.error("スキルデータの読み込みに失敗しました:", error);
  }
}

export function makeSkillButton(skillData) {
  let buttons = "";
  let btnTempl = '<button class="skillButton" value="##key##">##key##</button>';
  let map = new Map(Object.entries(skillData));

  buttons += '<hr />';
  buttons += '<h2>攻撃</h2>';
  buttons += '<h3>攻撃力アップ</h3>';
  buttons += '<div>';
  map.forEach((value, key) => {
    if (value['tag'].includes('攻撃力アップ')) buttons += btnTempl.replaceAll('##key##', key)
  });
  buttons += '</div>';
  buttons += '<h3>ダメージアップ</h3>';
  buttons += '<div>';
  map.forEach((value, key) => {
    if (value['tag'].includes('ダメージアップ')) buttons += btnTempl.replaceAll('##key##', key)
  });
  buttons += '</div>';
  buttons += '<h3>会心</h3>';
  buttons += '<div>';
  map.forEach((value, key) => {
    if (value['tag'].includes('会心')) buttons += btnTempl.replaceAll('##key##', key)
  });
  buttons += '</div>';
  buttons += '<h3>破壊</h3>';
  buttons += '<div>';
  map.forEach((value, key) => {
    if (value['tag'].includes('破壊')) buttons += btnTempl.replaceAll('##key##', key)
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>属性</h2>';
  buttons += '<h3>属性</h3>';
  buttons += '<div>';
  map.forEach((value, key) => {
    if (value['tag'].includes('属性')) buttons += btnTempl.replaceAll('##key##', key)
  });
  buttons += '</div>';
  buttons += '<h3>状態異常</h3>';
  buttons += '<div>';
  map.forEach((value, key) => {
    if (value['tag'].includes('状態異常')) buttons += btnTempl.replaceAll('##key##', key)
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>アクション</h2>';
  buttons += '<div>';
  map.forEach((value, key) => {
    if (value['tag'].includes('アクション')) buttons += btnTempl.replaceAll('##key##', key)
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>防御・耐性</h2>';
  buttons += '<h3>防御</h3>';
  buttons += '<div>';
  map.forEach((value, key) => {
    if (value['tag'].includes('防御')) buttons += btnTempl.replaceAll('##key##', key)
  });
  buttons += '</div>';
  buttons += '<h3>耐性</h3>';
  buttons += '<div>';
  map.forEach((value, key) => {
    if (value['tag'].includes('耐性')) buttons += btnTempl.replaceAll('##key##', key)
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>その他</h2>';
  buttons += '<div>';
  map.forEach((value, key) => {
    if (value['tag'].includes('その他')) buttons += btnTempl.replaceAll('##key##', key)
  });
  buttons += '</div>';
  buttons += '<hr />';
  return buttons;
}

export function setSkillButtonScript(skillData) {
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
      div.appendChild(slct);
      selectSkillArea.appendChild(div);
    })
  });
}

export function setSkillCheckButtonScript(skillData) {
  const button = document.getElementById('skillCheck');
  button.addEventListener('click', () => {
    const selectSkillLevels = document.querySelectorAll('.selectSkillLevel');
    const slotCheck = document.querySelector('#slotCheck');
    let request = {};
    selectSkillLevels.forEach((select) => {
      let skillLevel = select.value.split(":");
      request[skillLevel[0]] = skillLevel[1];
    })

    let resultArea = document.getElementById('result');
    resultArea.innerHTML = '<div>検索中</div>';
    let result = armorSelect(request, slotCheck.checked, skillData);
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
