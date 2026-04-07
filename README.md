# Monstar Hunter Now Skill Simulator
AWS Amplifyで公開する Monstar Hunter Now のスキルシミュレータ
開発はViteで行う

## 構成

<pre>
App/
├── index.html       # 画面（HTML）
├── main.js          # メインロジック（100行未満のやつ）
├── config.json      # Pythonで変換したJSON
├── convert.py       # YAML -> JSON 変換スクリプト
├── config.yaml      # 元のYAML（ローカル編集用）
├── style.css        # 見た目の設定
└── data/            # スキルデータファイル
</pre>

Vite準備
---

# プロジェクトフォルダを作成
mkdir app
cd app

# Viteを初期化（Vanilla JSを選択）
npm create vite@latest . -- --template vanilla

# 依存関係をインストールして起動
npm install
npm run dev

---

