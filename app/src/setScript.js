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
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('click', () => {
      let choise = document.querySelectorAll('input[type="radio"]');
      let choiseArmor = [];
      for (let i = 0; i < choise.length; i++) if (choise[i].checked) choiseArmor.push(choise[i].value);
      element.setChoiceSkill(skillList, choiseArmor, config);
      setPlusMinusButton(config);
    });
  });
}

function setPlusMinusButton(config) {
  // Button
  document.querySelectorAll('button.minus').forEach((button) => {
    button.addEventListener('click', function() {
      const isWapon = this.classList.contains('wapon');
      const slotSum = document.getElementById('SlotSum');
      const slot = this.parentElement.children[1];
      if (slot.value > 0) {
        slot.value = Number(slot.value) - 1;
        if (!isWapon) slotSum.value = Number(slotSum.value) + 1;
      }
      // SkillLevel
      let levelSum = 0;
      this.parentElement.parentElement.querySelectorAll('input').forEach((input) => {
        levelSum += Number(input.value);
      })
      const skillName = this.parentElement.parentElement.querySelector('td').innerText;
      const maxLevel = config['skillData'][skillName]['max_level'];
      const koka = config['skillData'][skillName]['効果'][Math.min(levelSum, maxLevel) -1];
      console.log(this.parentElement.parentElement.querySelector('td:nth-child(6)'));
      this.parentElement.parentElement.querySelector('td:nth-child(6)').innerText = koka;
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
    })
  });
}
