import * as element from './makeElements.js'

export function setSkillButton(config) {
  document.querySelectorAll('.SkillButton').forEach((skillButton) => {
    skillButton.addEventListener('click', (event) => {
      if (!event.target.classList.contains('OnSelect')) {
        event.target.classList.add('OnSelect')
      } else {
        event.target.classList.remove('OnSelect')
      }
      let skillList = [];
      const onSelect = document.querySelectorAll('.OnSelect');
      for (let i = 0; i < onSelect.length; i++) {
        skillList.push(onSelect[i].value);
      }
      element.setArmorChoice(skillList, config);
      setArmorChoiceRedio(config);
    });
  });
}

function setArmorChoiceRedio(config) {
  let select = document.querySelectorAll('input[type="radio"]');
  for (let i = 0; i < select.length; i++) {
    select[i].addEventListener('click', (event) => {
      let choise = document.querySelectorAll('input[type="radio"]');
      let choiseArmor = [];
      for (let j = 0; j < choise.length; j++) if (choise[j].checked) choiseArmor.push(choise[j].value);
      element.setChoiceSkill(choiseArmor, config);
    });
  }
}
