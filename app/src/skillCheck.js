export function armorSelect(selectedSkills, config) {
  let skillSums = [];
  for (let checkSkill in selectedSkills) {
    if (!(checkSkill in config)) {
      console.log(checkSkill+" Not Exist");
      return skillSums;
    }
  }

  // parts, armor_name, skill, level
  let choiceEquip = {'head': {'自由枠': {'なし': 0}},
          'body': {'自由枠': {'なし': 0}},
          'arm': {'自由枠': {'なし': 0}},
          'waist': {'自由枠': {'なし': 0}},
          'foot': {'自由枠': {'なし': 0}}};

  // 必要なデータのみ集める
  for (let choiceSkill in selectedSkills) {
    for (let parts in choiceEquip) {
      if (!(parts in config[choiceSkill])) continue;
      for (let armorName in config[choiceSkill][parts]) {
        if (!(armorName in choiceEquip[parts]))
          choiceEquip[parts][armorName] = {};
        if (!(choiceSkill in choiceEquip[parts][armorName]))
          choiceEquip[parts][armorName][choiceSkill] = {};
        choiceEquip[parts][armorName][choiceSkill] =
          choiceLevel(config[choiceSkill][parts][armorName]);
      }
    }
  }

  // 集めたデータを組み合わせて判定の用意する
  let selectedArmors = [];
  for (let head in choiceEquip['head']) {
    for (let body in choiceEquip['body']) {
      for (let arm in choiceEquip['arm']) {
        for (let waist in choiceEquip['waist']) {
          for (let foot in choiceEquip['foot']) {
            // 一つの装備で複数の選択スキルがあることがある
            let skillSum = {};
            for (let parts in choiceEquip) {
              let armor = eval(parts);
              for (let skill in choiceEquip[parts][armor]) {
                if (!(skill in skillSum)) skillSum[skill] = 0;
                skillSum[skill] += choiceEquip[parts][armor][skill];
              }
            }

            // スキル数判定
            if (Object.keys(selectedSkills).length > Object.keys(skillSum).length) continue;

            // スキルレベル判定
            let continueFlg = false;
            for (let choiceSkill in selectedSkills) {
              if (!(choiceSkill in skillSum)) {
                continueFlg = true;
              } else if (skillSum[choiceSkill] < selectedSkills[choiceSkill]) {
                continueFlg = true;
              }
            }
            if (continueFlg) continue;
            selectedArmors.push([head, body, arm, waist, foot]);
          }
        }
      }
    }
  }

  // 選ばれた装備の全スキル
  let armorData = {};
  if (selectedArmors) armorData = makeArmorData(config);

  for (let i = 0; i < selectedArmors.length; i++) {
    let skillSum = {};
    for (let j = 0; j < 5; j++) {
      let armor = selectedArmors[i][j];
      let skills = armorData[armor];
      for (let skill in skills) {
        if (!(skill in skillSum)) skillSum[skill] = 0;
        skillSum[skill] += choiceLevel(skills[skill]);
      }
    }
    skillSums.push({'Armor': selectedArmors[i], 'Skill': skillSum});
  }
  return skillSums;
}

function choiceLevel(gradeLevels) {
  let levels = [];
  for (let key in gradeLevels) levels.push(gradeLevels[key]);
  return levels[levels.length -1];
}

function makeArmorData(config) {
  let outputData = {};
  for (let skill in config) {
    for (let parts in config[skill]) {
      if (('head' == parts)
          || ('body' == parts)
          || ('arm' == parts)
          || ('waist' == parts)
          || ('foot' == parts)) {
        for (let armor in config[skill][parts]) {
          if (!(armor in outputData)) outputData[armor] = {}
          if (!(skill in outputData[armor])) outputData[armor][skill] = {};
          outputData[armor][skill] = config[skill][parts][armor];
        }
      }
    }
  }
  return outputData
}
