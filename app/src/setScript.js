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
