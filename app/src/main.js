import './style.css'

document.querySelector('#app').innerHTML = `
<section>
  <h1>Moster&nbsp;Hunter&nbsp;Now Skill&nbsp;Simulator</h1>
</section>
<section>
  <div id="SkillButton">
    <h2>攻撃</h2>
    <h3>攻撃力アップ</h3>
    <button class="RenNothng">攻撃</button>
    <button class="RenExist">攻撃</button>
    <button class="RenOnry">攻撃</button>
    <hr />
    <h3>ダメージアップ</h3>
    <button class="RenNothng">攻撃</button>
    <button class="RenExist">攻撃</button>
    <button class="RenOnry">攻撃</button>
    <hr />
  </div>
  <div id="SkillSelect">
    <table>
      <tr>
        <td>削除</td><td>スキル</td><td>レベル</td><td>効果</td><td></td>
      </tr>
      <tr>
        <td><button class="SkillRemove">×</button></td>
        <td>攻撃</td>
        <td><select><option>Lv.1</option><option>Lv.2</option><option>Lv.3</option><option>Lv.4</option><option>Lv.5</option></select></td>
        <td></td><td></td>
      </tr>
      <tr>
        <td><button class="SkillRemove">×</button></td>
        <td>攻撃</td>
        <td><select><option>Lv.1</option><option>Lv.2</option><option>Lv.3</option><option>Lv.4</option><option>Lv.5</option></select></td>
        <td></td><td></td>
      </tr>
    </table>
  </div>
  <div>
  <br />
   ( (武器攻撃力<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a1" />
+ スタイル強化値<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a2" value="0" />)
    × 攻撃力倍率<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a3" value="100" />%
     ＋ 攻撃力UP<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a4" value="0" />
+ 錬成パラメータ<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a5" value="0" />)
      × 攻撃活性<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a6" value="100" />%
<br />
   ( (武器属性値<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b1" />
+ スタイル強化値<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b2" value="0" />)
      × 属性倍率<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b3" value="100" />%
  + 属性攻撃力UP<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b4" value="0" />)
  × 古龍属性倍率<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b5" value="100" />%
  × 弱点補正倍率<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b6" value="100" />%
<br />
( 物理攻撃力(<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a" />)
+ 属性攻撃力(<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b" />) )
    × ダメージ倍率<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c1" value="100" />%
    × 武器固有補正<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c2" value="100" />%
        × 会心倍率<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c3" value="100" />%
      × 武器SP倍率<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c4" value="100" />%
    × 状態異常補正<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c5" value="100" />%
            × 肉質<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c6" value="130" />/100
    × モーション値<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c7" value="27" />/100
<br />
= ダメージ<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c" />
<br />
※ トレーニングエリアでのダメージを想定しています
  </div>
</section>
<section>
  <div id="copyRight">&copy;iKnowLab,</div>
</section>
`;

const obj = document.querySelectorAll('.inputNumeric');
obj.forEach((inputNumeric) => {
  inputNumeric.addEventListener('input', () => {
    inputNumeric.value = inputNumeric.value.replace(/[\D]/g, '')

    const a1 = Number(document.getElementById('a1').value);
    const a2 = Number(document.getElementById('a2').value);
    const a3 = Number(document.getElementById('a3').value) / 100;
    const a4 = Number(document.getElementById('a4').value);
    const a5 = Number(document.getElementById('a5').value);
    const a6 = Number(document.getElementById('a6').value) / 100;

    const aObj = document.getElementById('a');
    let a = Math.floor(Math.floor((a1 + a2) * a3 + a4 + a5) * a6);
    aObj.value = a;

    const b1 = Number(document.getElementById('b1').value);
    const b2 = Number(document.getElementById('b2').value);
    const b3 = Number(document.getElementById('b3').value) / 100;
    const b4 = Number(document.getElementById('b4').value);
    const b5 = Number(document.getElementById('b5').value) / 100;
    const b6 = Number(document.getElementById('b6').value) / 100;

    const bObj = document.getElementById('b');
    let b  = Math.floor(Math.floor(((b1 + b2) * b3 + b4) * b5) * b6);
    bObj.value = b;

    const c1 = Number(document.getElementById('c1').value) / 100;
    const c2 = Number(document.getElementById('c2').value) / 100;
    const c3 = Number(document.getElementById('c3').value) / 100;
    const c4 = Number(document.getElementById('c4').value) / 100;
    const c5 = Number(document.getElementById('c5').value) / 100;
    const c6 = Number(document.getElementById('c6').value) / 100;
    const c7 = Number(document.getElementById('c7').value) / 100;

    const cObj = document.getElementById('c');
    let c = Math.ceil((a + b) * c1 * c2 * c3 * c4 * c5 * c6 * c7);
    cObj.value = c;
  })
})
