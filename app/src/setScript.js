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
      setArmorChoiceRadio(skillList, config);
      setArmorGradeSelect(config);
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

function setArmorChoiceRadio(skillList, config) {
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('click', () => {
      let choiseArmor = makeChoiseArmor();
      element.setChoiceSkill(skillList, choiseArmor, config);
      setPlusMinusButton(config);
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
    })
  });
}

function setEffect(parentTr, skillData) {
  let levelSum = 0;
  parentTr.querySelectorAll('input').forEach((input) => {
    levelSum += Number(input.value);
  })
  const skillName = parentTr.firstElementChild.innerText;
  const maxLevel = skillData[skillName]['max_level'];
  const effect = skillData[skillName]['効果'][Math.min(levelSum, maxLevel) -1];
  parentTr.querySelector('td:nth-child(5)').innerText = effect;
}

function setArmorGradeSelect(config) {
  document.querySelectorAll('select.armorGrade').forEach((select) => {
    select.addEventListener('change', function(event) {
      const grade = this.value;
      const armorName = this.previousElementSibling.innerText;
      const armorPos = this.parentElement.previousElementSibling.children[0].name;
      const tdPos = ['head', 'body', 'arm', 'waist', 'foot'].indexOf(armorPos) +1;
      this.parentElement.parentElement.nextElementSibling.querySelector(`td:nth-child(${tdPos})`).innerHTML =
          common.selectSkillGrade(armorName, grade, config['armorData'], config['slotData']);
      if (this.parentElement.previousElementSibling.children[0].checked) {
        element.setChoiceSkill(makeSkillList(), makeChoiseArmor(), config);
        setPlusMinusButton(config);
      }
    });
  });
}

function makeSkillList() {
  let skillList = [];
  const onSelect = document.querySelectorAll('.OnSelect');
  for (let i = 0; i < onSelect.length; i++) {
    skillList.push(onSelect[i].value);
  }
  return skillList;
}

function makeChoiseArmor() {
  let choise = document.querySelectorAll('input[type="radio"]');
  let choiseArmor = {};
  for (let i = 0; i < choise.length; i++) {
    if (choise[i].checked && '自由枠' != choise[i].value) choiseArmor[choise[i].value] =
        choise[i].parentElement.nextElementSibling.querySelector('select').value;
  }
  return choiseArmor;
}

export function setCalcDamageScript() {
  document.querySelectorAll('input.damageValue').forEach((target) => {
    target.addEventListener('input', function() {
      console.log("2");
      // 入力から数字以外を削除する
      this.value = this.value.replace(/[\D]/g, '');

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
    })
  })
}
