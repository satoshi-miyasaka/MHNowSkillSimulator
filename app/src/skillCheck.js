export function selectArmor(selectedSkills, isSlotCheck, config) {
  const skillData = config['skillData'];
  const slotData = config['slotData'];

  // parts, armor_name, skill, level
  let choiceEquip = {'head': {'自由枠': {'なし': 0, '憑依スロット': 0}},
          'body': {'自由枠': {'なし': 0, '憑依スロット': 0}},
          'arm': {'自由枠': {'なし': 0, '憑依スロット': 0}},
          'waist': {'自由枠': {'なし': 0, '憑依スロット': 0}},
          'foot': {'自由枠': {'なし': 0, '憑依スロット': 0}}};

  let selectedArmors = [];
  for (let checkSkill in selectedSkills) {
    if (!(checkSkill in skillData)) {
      console.log(checkSkill+" Not Exist");
      return selectedArmors;
    }
  }

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
            let slotSkill = {};
            for (let parts in choiceEquip) {
              let armor = eval(parts);
              for (let skill in choiceEquip[parts][armor]) {
                if (!(skill in skillSum)) skillSum[skill] = 0;
                skillSum[skill] += choiceEquip[parts][armor][skill];
              }
              slotSum += choiceEquip[parts][armor]['憑依スロット']
            }

            // スキルレベル判定
            let continueFlg = false;
            for (let choiceSkill in selectedSkills) {
              if (!(choiceSkill in skillSum)) {
                if (isSlotCheck && '憑依' in skillData[choiceSkill]) {
                  slotSum -= selectedSkills[choiceSkill];
                  slotSkill[choiceSkill] = selectedSkills[choiceSkill];
                } else {
                  continueFlg = true;
                }
              } else if (skillSum[choiceSkill] < selectedSkills[choiceSkill]) {
                if (isSlotCheck && '憑依' in skillData[choiceSkill]) {
                  slotSum -= (selectedSkills[choiceSkill] - skillSum[choiceSkill]);
                  slotSkill[choiceSkill] = (selectedSkills[choiceSkill] - skillSum[choiceSkill]);
                } else {
                  continueFlg = true;
                }
              }
            }
            if (0 > slotSum) continueFlg = true;
            if (continueFlg) continue;
            selectedArmors.push([head, body, arm, waist, foot, slotSkill]);
          }
        }
      }
    }
  }

  return selectedArmors;
}
export function summarySkill(selectedArmors, config) {
  const armorData = config['armorData'];
  const slotData = config['slotData'];

  let skillSums = [];
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
      selectedArmors[i][j] = {'armor': armor, 'slot': choiceLevel(slotData[armor])};
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
function damage(skillData, selectedArmors) {
  // ↓攻撃力 × 攻撃力倍率↓ + 攻撃力UP + 攻撃増強【会心】
  let attack = 0;
  let attackPlus = 0;
  let attackRaito = 0;

  // ↓↓(属性攻撃力 + 属性攻撃力UP) × 属性攻撃力倍率↓ × 弱点補正↓
  let attr = 0;
  let attrPlus = 0;
  let attrRaito = 0;

  let attackCritical = 0;
  let attrCritical = 0;

  let damageRaito = 0;

/*
○無条件
グループハント強化【攻撃】:
攻撃:
果敢:
滅尽龍の渇望:
力任せ:
攻撃活性:
攻撃増強【会心】:

○会心
凶会心:
弱点特効:
見切り:
超会心:

○特定攻撃
ジャスト巧撃:
ジャスト巧撃【持続】:
チェンジブースト:
攻めの守勢:
溜打・響音強化:
目覚めの一撃:
軽巧:
闇討ち:
ジャスト溜め解放:
変形攻撃強化:
ラストバレット:
砲術:

○段階
フルチャージ:
力の解放:
勇猛:
尻上がり:
本領発揮:
火事場力:
追撃:

○一時
連撃:
闘気活性:
逆恨み:
不屈:
劫血纏:
堅忍不抜:
死中に活:
追い打ち【毒】:
追い打ち【麻痺】:
邁進:
鬼火纏:
不退転:
災禍転福:
状態異常蓄積時威力UP:

適正距離威力UP:
- 弓・ボウガン
通常弾・属性通常弾強化:
- 通常弾・属性通常弾

攻撃・境地:
- 攻撃-Lv5
連撃・境地:
- 連撃-Lv5

反射:
- 追加ダメージ

SPスキル威力UP:
- SPダメージ

○ダメージなし
KO術:
破壊王:
破壊王【SPスキル】:

*/

}
