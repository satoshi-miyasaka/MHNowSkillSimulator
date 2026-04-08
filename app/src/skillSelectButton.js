export async function loadConfig() {
  try {
    const response = await fetch('/SkillData.json');
    const config = await response.json();
    return config;
  } catch (error) {
    console.error("スキルデータの読み込みに失敗しました:", error);
  }
}

export function makeSkillButton(config) {
  let buttons = "";
  let btnTempl = '<button class="skillButton" value="##key##">##key##</button>';
  let map = new Map(Object.entries(config));

  buttons += '<hr />';
  buttons += '<h2>攻撃</h2>';
  buttons += '<div>';
  map.forEach((value, key) => {
    if (value['tag'].includes('攻撃')) buttons += btnTempl.replaceAll('##key##', key)
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>属性</h2>';
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

export function setSkillButtonScript(config) {
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
      btn.addEventListener('click', (event) => { document.getElementById("div_"+event.target.value).remove() });
      div.appendChild(btn);
      let spn = document.createElement("span");
      spn.innerText = target;
      div.appendChild(spn);
      let slct = document.createElement("select");
      slct.setAttribute("class", "selectSkillLevel");

      let maxLevel = config[target].max_level;
      for (let i = 1; i <= maxLevel; i++) {
        let opt = document.createElement("option");
        opt.value = `{"${target}":${i}}`;
        opt.innerText = `Level ${i}`;
        slct.appendChild(opt);
      }
      div.appendChild(slct);
      selectSkillArea.appendChild(div);
    })
  });
}

