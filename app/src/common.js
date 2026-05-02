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
