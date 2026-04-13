export function makeArmorData(skillData) {
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

export function armorSelect(selectedSkills, isSlotCheck, config) {
  const skillData = config['skillData'];
  const armorData = config['armorData'];
  const slotData = config['slotData'];

  let skillSums = [];
  for (let checkSkill in selectedSkills) {
    if (!(checkSkill in skillData)) {
      console.log(checkSkill+" Not Exist");
      return skillSums;
    }
  }

  // parts, armor_name, skill, level
  let choiceEquip = {'head': {'自由枠': {'なし': 0, '憑依スロット': 0}},
          'body': {'自由枠': {'なし': 0, '憑依スロット': 0}},
          'arm': {'自由枠': {'なし': 0, '憑依スロット': 0}},
          'waist': {'自由枠': {'なし': 0, '憑依スロット': 0}},
          'foot': {'自由枠': {'なし': 0, '憑依スロット': 0}}};

  // 必要なデータのみ集める
  for (let choiceSkill in selectedSkills) {
    for (let parts in choiceEquip) {
      if (!(parts in skillData[choiceSkill])) continue;
      for (let armorName in skillData[choiceSkill][parts]) {
        if (!(armorName in choiceEquip[parts]))
          choiceEquip[parts][armorName] = {};
        if (!(choiceSkill in choiceEquip[parts][armorName]))
          choiceEquip[parts][armorName][choiceSkill] = {};
        choiceEquip[parts][armorName][choiceSkill] =
          choiceLevel(skillData[choiceSkill][parts][armorName]);
        choiceEquip[parts][armorName]['憑依スロット'] =
          choiceLevel(slotData[armorName]);
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
            if ('自由枠' == head && '自由枠' == body
              && '自由枠' == arm && '自由枠' == waist && '自由枠' == foot) continue;
            // 一つの装備で複数の選択スキルがあることがある
            let skillSum = {};
            let slotSum = 0;
            for (let parts in choiceEquip) {
              let armor = eval(parts);
              for (let skill in choiceEquip[parts][armor]) {
                if (!(skill in skillSum)) skillSum[skill] = 0;
                skillSum[skill] += choiceEquip[parts][armor][skill];
              }
              slotSum += choiceEquip[parts][armor]['憑依スロット']
            }

            // スキル数判定
            // TODO スロット入れたらいらない
            // if (Object.keys(selectedSkills).length > Object.keys(skillSum).length) continue;

            // スキルレベル判定
            let continueFlg = false;
            for (let choiceSkill in selectedSkills) {
              if (!(choiceSkill in skillSum)) {
                if (isSlotCheck && '憑依' in skillData[choiceSkill]) {
                  slotSum -= selectedSkills[choiceSkill];
                } else {
                  continueFlg = true;
                }
              } else if (skillSum[choiceSkill] < selectedSkills[choiceSkill]) {
                if (isSlotCheck && '憑依' in skillData[choiceSkill]) {
                  slotSum -= (selectedSkills[choiceSkill] - skillSum[choiceSkill]);
                } else {
                  continueFlg = true;
                }
              }
            }
            if (0 > slotSum) continueFlg = true;
            if (continueFlg) continue;
            selectedArmors.push([head, body, arm, waist, foot]);
          }
        }
      }
    }
  }
  // TODO スキル存在チェックを実装するならここまで

  // 選ばれた装備の全スキル
  for (let i = 0; i < selectedArmors.length; i++) {
    let skillSum = {};
    for (let j = 0; j < 5; j++) {
      let armor = selectedArmors[i][j];
      let skills = armorData[armor];
      for (let skill in skills) {
        if (!(skill in skillSum)) skillSum[skill] = 0;
        skillSum[skill] += choiceLevel(skills[skill]);
      }
      selectedArmors[i][j] += "【" + choiceLevel(slotData[armor]) + "】";
    }
    skillSums.push({'Armor': selectedArmors[i], 'Skill': skillSum});
  }
  return skillSums;
}

function choiceLevel(gradeLevels) {
  let levels = [0];
  for (let key in gradeLevels) levels.push(gradeLevels[key]);
  return levels[levels.length -1];
}

