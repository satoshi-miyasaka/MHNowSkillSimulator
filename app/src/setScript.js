import * as element from './makeElements.js'

export function setSkillButton(config) {
  document.querySelectorAll('.SkillButton').forEach((skillButton) => {
    skillButton.addEventListener('click', function() {
      if (!this.classList.contains('OnSelect')) {
        this.classList.add('OnSelect')
      } else {
        this.classList.remove('OnSelect')
      }
      let skillList = [];
      const onSelect = document.querySelectorAll('.OnSelect');
      for (let i = 0; i < onSelect.length; i++) {
        skillList.push(onSelect[i].value);
      }
      element.setArmorChoice(skillList, config);
      setArmorChoiceRedio(skillList, config);
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

function setArmorChoiceRedio(skillList, config) {
  let select = document.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < select.length; i++) {
    select[i].addEventListener('click', () => {
      let choise = document.querySelectorAll('input[type="radio"]');
      let choiseArmor = [];
      for (let j = 0; j < choise.length; j++) if (choise[j].checked) choiseArmor.push(choise[j].value);
      element.setChoiceSkill(skillList, choiseArmor, config);
      setPlusMinusButton();
    });
  }
}

function setPlusMinusButton() {
  let buttons = document.querySelectorAll('button.minus');
  buttons.forEach((button) => {
    button.addEventListener('click', function() {
      const isWapon = this.classList.contains('wapon');
      const slotSum = document.getElementById('SlotSum');
      const slot = this.parentElement.children[1];
      if (slot.value > 0) {
        slot.value = Number(slot.value) - 1;
        if (!isWapon) slotSum.value = Number(slotSum.value) + 1;
      }
    })
  });
  buttons = document.querySelectorAll('button.plus');
  buttons.forEach((button) => {
    button.addEventListener('click', function() {
      const isWapon = this.classList.contains('wapon');
      const slotSum = document.getElementById('SlotSum');
      const slot = this.parentElement.children[1];
      if (isWapon || slotSum.value > 0) {
        slot.value = Number(slot.value) + 1;
        if (!isWapon) slotSum.value = Number(slotSum.value) - 1;
      }
    })
  });
}
