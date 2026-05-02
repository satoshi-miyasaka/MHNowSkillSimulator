import './style.css'

document.querySelector('#app').innerHTML = `
<section>
  <h1>Moster&nbsp;Hunter&nbsp;Now Skill&nbsp;Simulator</h1>
</section>
<section>
  <!-- 削除ボタンを止め、トグルボタンに変更 -->
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
  </div>
  <hr />
  <div>
    <!-- 選択したスキルの装備を全部並べる -->
    <table>
      <tr><th colspan="3">頭</th><th colspan="3">胴</th><th colspan="3">腕</th><th colspan="3">腰</th><th colspan="3">足</th></tr>
      <tr>
        <td><input type="radio" name="head" checked="true" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td><input type="radio" name="body" checked="true" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td><input type="radio" name="arm" checked="true" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td><input type="radio" name="waist" checked="true" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td><input type="radio" name="foot" checked="true" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
      </tr>
      <tr>
        <td><input type="radio" name="head" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td><input type="radio" name="body" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td><input type="radio" name="arm" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td><input type="radio" name="waist" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td><input type="radio" name="foot" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
      </tr>
      <tr>
        <td><input type="radio" name="head" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td><input type="radio" name="body" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td><input type="radio" name="arm" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td><input type="radio" name="waist" /></td>
        <td>自由枠<br /><select><option>G1</oprion></select></td>
        <td> <div>攻撃:1</div> <div>憑依錬成:1</div> </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
  <hr />
  <div id="ChoiceSkill">
    <!-- 選択したスキルをレベル0で並べ、選択した装備でレベルと憑依錬成数を反映する -->
    <table>
      <tr>
        <th>スキル</th><th>装備レベル</th><th>効果</th><th>憑依錬成<input type="text" size="2" maxlength="2" /></th><th>武器スキル</th>
      </tr>
      <tr>
        <td>攻撃</td>
        <td><select><option>Lv 1</option><option>Lv 2</option><option>Lv 3</option></select></td>
        <td></td>
        <td><button>-</button><input type="text" value="0" readonly="true" size="2" maxlength="2" /><button>+</button></td>
        <td><button>-</button><input type="text" value="0" readonly="true" size="2" maxlength="2" /><button>+</button></td>
      </tr>
      <tr>
        <td>攻撃</td>
        <td><select><option>Lv 1</option><option>Lv 2</option><option>Lv 3</option></select></td>
        <td></td>
        <td><button>-</button><input type="text" value="0" readonly="true" size="2" maxlength="2" /><button>+</button></td>
        <td><button>-</button><input type="text" value="0" readonly="true" size="2" maxlength="2" /><button>+</button></td>
      </tr>
    </table>
  </div>
  <hr />
  <div>
    <table>
      <tr>
        <th>攻撃力</th><th>属性値</th><th>肉質</th><th>モーション値</th>
      </tr>
      <tr>
        <td><input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a1" /></td>
        <td><input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b1" /></td>
        <td><input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c6" value="130" /></td>
        <td><input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c7" value="27" /></td>
      </tr>
    </table>
    <hr />
    ( 攻撃力 × 攻撃力<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a3" value="0" />%UP
    + 攻撃力<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a4" value="0" />UP
    + 錬成パラメータ<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a5" value="0" />)
    × 攻撃活性<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a6" value="0" />%UP
    <hr />
     ( 属性値 × 属性値<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b3" value="0" />%UP
    + 属性値<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b4" value="0" />UP)
    × 古龍属性<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b5" value="0" />%UP
    <hr />
    ( 物理攻撃力<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="a" />
    + 属性攻撃力<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="b" />)
    × ダメージ<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c1" value="0" />%UP
    × 肉質 / 100 × モーション値 / 100
  <hr />
  = 基本ダメージ<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c" />
  <br />
  基本ダメージ × 会心倍率<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c3" value="1.25" />
  = 会心ダメージ<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="d" />
  <br />
  基本ダメージ × 0.75
  = マイナス会心ダメージ<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="e" />
  <br />
  基本ダメージ × 凶会心<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="c8" value="0" />
  = 凶会心ダメージ<input type="text" size="4" maxlength="4" inputmode="numeric" class="inputNumeric" id="f" />
  <hr />
  ※ トレーニングエリアでのダメージを想定しています<br />
  ※ 武器固有補正 武器SP倍率 状態異常補正 はシンプルにしたかったので、省略しています<br />
  ※ 計算式は「ナウかる研究所」様の物を参考に作成しています。
  </div>
  <hr />
</section>
<section>
  <div id="copyRight">&copy;iKnowLab,</div>
</section>
`;

const obj = document.querySelectorAll('.inputNumeric');
obj.forEach((inputNumeric) => {
  inputNumeric.addEventListener('input', () => {
    inputNumeric.value = inputNumeric.value.replace(/[\D]/g, '');

    const a1 = Number(document.getElementById('a1').value);
    const a3 = Number(document.getElementById('a3').value) / 100 + 1;
    const a4 = Number(document.getElementById('a4').value);
    const a5 = Number(document.getElementById('a5').value);
    const a6 = Number(document.getElementById('a6').value) / 100 + 1;

    const aObj = document.getElementById('a');
    let a = Math.floor(Math.floor(a1 * a3 + a4 + a5) * a6);
    aObj.value = a;

    const b1 = Number(document.getElementById('b1').value);
    const b3 = Number(document.getElementById('b3').value) / 100 + 1;
    const b4 = Number(document.getElementById('b4').value);
    const b5 = Number(document.getElementById('b5').value) / 100 + 1;
    const b6 = 1;

    const bObj = document.getElementById('b');
    let b  = Math.floor(Math.floor((b1 * b3 + b4) * b5) * b6);
    bObj.value = b;

    const c1 = Number(document.getElementById('c1').value) / 100 + 1;
    const c3 = Number(document.getElementById('c3').value);
    const c6 = Number(document.getElementById('c6').value) / 100;
    const c7 = Number(document.getElementById('c7').value) / 100;
    const c8 = Number(document.getElementById('c8').value) / 100;

    const cObj = document.getElementById('c');
    let c = Math.ceil((a + b) * c1 * c6 * c7);
    cObj.value = c;

    const dObj = document.getElementById('d');
    let d = Math.ceil(c * c3);
    dObj.value = d;

    const eObj = document.getElementById('e');
    let e = Math.ceil(c * 0.75);
    eObj.value = e;

    const fObj = document.getElementById('f');
    let f = Math.ceil(c * c8);
    fObj.value = f;
  })
})
