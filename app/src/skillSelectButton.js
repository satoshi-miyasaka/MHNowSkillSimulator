export async function loadConfig() {
  try {
    const response = await fetch('/SkillData.json');
    const config = await response.json();
    return config;
  } catch (error) {
    console.error("スキルデータの読み込みに失敗しました:", error);
  }
}
export function makeSkillButton(config) {
  let buttons = "";
  Object.keys(config).forEach(x =>{buttons += `<button>${x}</button>`});
  return buttons;
}
