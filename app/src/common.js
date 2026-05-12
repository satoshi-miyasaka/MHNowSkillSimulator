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

function makeArmorData(skillData) {
  let outputData = {};
  for (let skill in skillData) {
    for (let parts in skillData[skill]) {
      if (('head' == parts)
          || ('body' == parts)
          || ('arm' == parts)
          || ('waist' == parts)
          || ('foot' == parts)) {
        for (let armor in skillData[skill][parts]) {
          if (!(armor in outputData)) outputData[armor] = {}
          if (!(skill in outputData[armor])) outputData[armor][skill] = {};
          outputData[armor][skill] = skillData[skill][parts][armor];
        }
      }
    }
  }
  return outputData
}

export function selectSkillGrade(armorName, grade, armorData, slotData) {
  let temp = '';
  let result = '';
  for (let skillName in armorData[armorName]) {
    for (let skillGrade in armorData[armorName][skillName]) {
      if (skillGrade <= grade) temp = `<p>${skillName}:Lv.${choiceLevel(armorData[armorName][skillName], grade)}</p>`;
    }
    result += temp;
  }
  temp = '';
  for (let slotGrade in slotData[armorName]) {
      if (slotGrade <= grade) temp = `<p>憑依スロット:${choiceLevel(slotData[armorName], grade)}</p>`;
  }
  result += temp;
  return result;
}

function choiceLevel(gradeLevels, grade) {
  let levels = [0];
  for (let key in gradeLevels) if (key <= grade) levels.push(gradeLevels[key]);
  return levels[levels.length -1];
}

