import * as element from './makeElements.js'
import * as common from './common.js'

export function setSkillButton(config) {
  document.querySelectorAll('.SkillButton').forEach((skillButton) => {
    skillButton.addEventListener('click', function() {
      if (!this.classList.contains('OnSelect')) {
        this.classList.add('OnSelect')
      } else {
        this.classList.remove('OnSelect')
      }
      let skillList = makeSkillList();
      element.setArmorChoice(skillList, config);
      setArmorChoiceScript(config);
    });
  });
}

export function setFoldButtonScript() {
  const foldButtons = document.querySelectorAll('.foldButton');
  foldButtons.forEach((foldButton) => {
    foldButton.addEventListener('click', function() {
      const target =  document.getElementById(this.value);
      const skillDivs = document.querySelectorAll('.skill_div');
      const flag = target.style.display == 'none';
      skillDivs.forEach((skillDiv) => {
        skillDiv.style.display = 'none';
      });
      target.style.display = flag ? 'inline-block' : 'none';
    });
  });
}

function setArmorChoiceScript(config) {
  document.querySelectorAll('select.Armor, select.Grade').forEach((select) => {
    select.addEventListener('change', function() {
      const parentElement = this.parentElement.parentElement.parentElement;
      const armorName = parentElement.querySelector('td:nth-child(2) > p:nth-child(1) > select').value;
      const armorGrade = parentElement.querySelector('td:nth-child(2) > p:nth-child(2) > select').value;
      console.log( parentElement.querySelector('td:nth-child(3)'));
      parentElement.querySelector('td:nth-child(3)').innerHTML =
          common.selectSkillGrade(armorName, armorGrade, config['armorData'], config['slotData']);

      element.makeSkillTable(config, makeSkillList());
      setPlusMinusButton(config);
      setSkillActiveScript(config);
      setDamageValue(config)
    });
  });
}

function setPlusMinusButton(config) {
  document.querySelectorAll('button.minus').forEach((button) => {
    button.addEventListener('click', function() {
      const isWapon = this.classList.contains('wapon');
      const slotSum = document.getElementById('SlotSum');
      const slot = this.parentElement.children[1];
      if (slot.value > 0) {
        slot.value = Number(slot.value) - 1;
        if (!isWapon) slotSum.value = Number(slotSum.value) + 1;
      }
      setEffect(this.parentElement.parentElement, config['skillData']);
      setDamageValue(config);
    })
  });
  document.querySelectorAll('button.plus').forEach((button) => {
    button.addEventListener('click', function() {
      const isWapon = this.classList.contains('wapon');
      const slotSum = document.getElementById('SlotSum');
      const slot = this.parentElement.children[1];
      if (isWapon || slotSum.value > 0) {
        slot.value = Number(slot.value) + 1;
        if (!isWapon) slotSum.value = Number(slotSum.value) - 1;
      }
      setEffect(this.parentElement.parentElement, config['skillData']);
      setDamageValue(config);
    })
  });
}

function setEffect(parentTr, skillData) {
  let levelSum = 0;
  parentTr.querySelectorAll('input.inputNumeric').forEach((input) => {
    levelSum += Number(input.value);
  })
  const skillName = parentTr.querySelector('input[name=skillName]').value;
  const maxLevel = skillData[skillName]['max_level'];
  const effect = 0 < levelSum ? skillData[skillName]['効果'][Math.min(levelSum, maxLevel) -1] : '';
  // 2行上に効果を設定
  parentTr.previousElementSibling.previousElementSibling.querySelector('td').innerText = effect;
  parentTr.querySelector('input[name=skillLevel]').value = Math.min(levelSum, maxLevel);
}

function makeSkillList() {
  let skillList = [];
  const onSelect = document.querySelectorAll('.OnSelect');
  for (let i = 0; i < onSelect.length; i++) {
    skillList.push(onSelect[i].value);
  }
  return skillList;
}

function setDamageValue(config) {
  const skillData = config['skillData'];
  const skillNames = document.querySelectorAll('input[name=skillName]');
  const skillLevels = document.querySelectorAll('input[name=skillLevel]');
  const skillActives = document.querySelectorAll('input[name=skillActive]');

  let skillHash = {};
  for (let i = 0; i < skillNames.length; i++) {
    if (skillActives[i].checked) skillHash[skillNames[i].value] = skillLevels[i].value;
  }

  let attackPlus = 0;
  let attackUp = 0;
  let attrPlus = 0;
  let attrUp = 0;
  let dragonUp = 0;
  let damageUp = 0;
  let kassei = 0;
  let criticalUp = 0;
  let criticalDamageUp = 125;
  let badCriticalDamageUp = 0;
  let isAttackPower = false;
  let stepAttackPlus = 0;
  let stepLevel = 0;

  for (let skillName in skillHash) {
    if ('攻撃力PLUS' in skillData[skillName] && 0 < skillData[skillName]['攻撃力PLUS']) {
      attackPlus += Number(skillData[skillName]['攻撃力PLUS'][Number(skillHash[skillName]) -1]);
    }
    if ('攻撃力UP' in skillData[skillName] && 0 < skillData[skillName]['攻撃力UP']) {
      attackUp += Number(skillData[skillName]['攻撃力UP'][Number(skillHash[skillName]) -1]);
    }
    if ('属性攻撃力PLUS' in skillData[skillName] && 0 < skillData[skillName]['属性攻撃力PLUS']) {
      attrPlus += Number(skillData[skillName]['属性攻撃力PLUS'][Number(skillHash[skillName]) -1]);
    }
    if ('属性攻撃力UP' in skillData[skillName] && 0 < skillData[skillName]['属性攻撃力UP']) {
      attrUp += Number(skillData[skillName]['属性攻撃力UP'][Number(skillHash[skillName]) -1]);
    }
    if ('ダメージUP' in skillData[skillName] && 0 < skillData[skillName]['ダメージUP']) {
      damageUp += Number(skillData[skillName]['ダメージUP'][Number(skillHash[skillName]) -1]);
    }
    if ('古龍属性値UP' in skillData[skillName] && 0 < skillData[skillName]['古龍属性値UP']) {
      dragonUp += Number(skillData[skillName]['古龍属性値UP'][Number(skillHash[skillName]) -1]);
    }
    if ('攻撃活性UP' in skillData[skillName] && 0 < skillData[skillName]['攻撃活性UP']) {
      kassei += Number(skillData[skillName]['攻撃活性UP'][Number(skillHash[skillName]) -1]);
    }
    if ('会心率UP' in skillData[skillName] && 0 < skillData[skillName]['会心率UP']) {
      criticalUp += Number(skillData[skillName]['会心率UP'][Number(skillHash[skillName]) -1]);
    }
    if ('会心ダメージUP' in skillData[skillName] && 0 < skillData[skillName]['会心ダメージUP']) {
      criticalDamageUp += Number(skillData[skillName]['会心ダメージUP'][Number(skillHash[skillName]) -1]);
    }
    if ('凶会心ダメージUP' in skillData[skillName] && 0 < skillData[skillName]['凶会心ダメージUP']) {
      badCriticalDamageUp += Number(skillData[skillName]['凶会心ダメージUP'][Number(skillHash[skillName]) -1]);
    }
    if (skillData[skillName]['tag'].includes('攻撃増強')) {
      isAttackPower = true;
    }
    if ('段階攻撃力PLUS' in skillData[skillName] && 0 < skillData[skillName]['段階攻撃力PLUS']) {
      stepAttackPlus += Number(skillData[skillName]['段階攻撃力PLUS'][Number(skillHash[skillName]) -1]);
      stepLevel = Math.min(Number(document.getElementById('d3').value), skillData[skillName]['段階MAX']);
    }
  }

  if (isAttackPower) attackPlus += (Math.max(0, Number(document.getElementById('d2').value))) * 8;

  document.getElementById('a3').value = attackUp;
  document.getElementById('a4').value = attackPlus + (stepLevel * stepAttackPlus);
  document.getElementById('a6').value = kassei;
  document.getElementById('b3').value = attrUp;
  document.getElementById('b4').value = attrPlus;
  document.getElementById('b5').value = dragonUp;
  document.getElementById('c1').value = damageUp;
  document.getElementById('c3').value = criticalDamageUp;
  document.getElementById('c8').value = badCriticalDamageUp;
  document.getElementById('d1').value = criticalUp;

  calcDamage()
}

export function setCalcDamageScript(config) {
  document.querySelectorAll('input.damageValue').forEach((target) => {
    target.addEventListener('focus', (event) => {
      target.select()
    });
    target.addEventListener('input', function() {
      // 入力から数字以外を削除する
      this.value = this.value.replace(/[^0-9\-]/g, '');
      setDamageValue(config)
    })
  })
}

export function setSkillActiveScript(config) {
  document.querySelectorAll('input[name=skillActive]').forEach((target) => {
    target.addEventListener('change', function() {
      setDamageValue(config)
    })
  })
}

function calcDamage() {
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
  const c3 = Number(document.getElementById('c3').value) / 100;
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
}
