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
      element.setChoiceSkill(skillList, config['skillData']);
    });
  });
}
