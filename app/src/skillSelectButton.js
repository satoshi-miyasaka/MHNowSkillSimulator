export async function loadConfig() {
  try {
    const response = await fetch('/SkillData.json');
    const config = await response.json();
    return new Map(Object.entries(config));
  } catch (error) {
    console.error("スキルデータの読み込みに失敗しました:", error);
  }
}
export function makeSkillButton(config) {
  let buttons = "";
  buttons += '<hr />';
  buttons += '<h2>攻撃</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('攻撃')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>属性</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('属性')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<h3>状態異常</h3>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('状態異常')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>アクション</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('アクション')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>防御・耐性</h2>';
  buttons += '<h3>防御</h3>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('防御')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<h3>耐性</h3>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('耐性')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>その他</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('その他')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>ジャスト回避</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('ジャスト回避')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>SP</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('SP')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>片手剣</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('片手剣')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>大剣</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('大剣')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>ランス</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('ランス')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<h3>シールドタックル</h3>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('シールドタックル')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>ハンマー</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('ハンマー')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>ライトボウガン</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('ライトボウガン')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<h3>徹甲榴弾</h3>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('徹甲榴弾')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>ヘビーボウガン</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('ヘビーボウガン')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<h3>竜撃弾</h3>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('竜撃弾')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>双剣</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('双剣')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>太刀</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('太刀')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>狩猟笛</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('狩猟笛')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>ガンランス</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('ガンランス')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>弓</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('弓')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>チャージアックス</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('チャージアックス')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<h3>榴弾ビン</h3>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('榴弾ビン')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>スラッシュアックス</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('スラッシュアックス')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  buttons += '<h2>操虫棍</h2>';
  buttons += '<div>';
  config.forEach((value, key, map) => {
    if (value['tag'].includes('操虫棍')) buttons += `<button>${key}</button>`
  });
  buttons += '</div>';
  buttons += '<hr />';
  return buttons;
}
