# RPGツクールMZ用プラグイン

RPGツクールMZ 1.0系 で動作するプラグインです。
RPGツクールMVにおける動作は保証しません。
RPGツクールMV用プラグインは[こちら](https://github.com/elleonard/RPGtkoolMV-Plugins)

There are plugins working with RMMZ 1.0.1 or later.
[RMMV plugins](https://github.com/elleonard/RPGtkoolMV-Plugins).

## 使い方

jsファイルをゲームプロジェクトの js/plugins ディレクトリ下において
RPGツクールMZのプラグイン管理から読み込んでください

# プラグインの説明

## DarkPlasma_AdditionalAttackAnimation.js

特定条件で攻撃アニメーションを追加するプラグイン

特定のステートにかかっている敵や、特定の種類の敵に攻撃したとき、アニメーションを追加表示します

## DarkPlasma_BattleItemVisibility.js

戦闘中のアイテムリストに表示するアイテムを制御するプラグイン

戦闘中に使用不可なアイテムを表示できます

## DarkPlasma_BountyList.js

賞金首一覧を表示するプラグイン

## DarkPlasma_BuffRate.js

バフ・デバフの倍率を個別に変更するプラグイン

攻撃力のバフのみ抑えめにしたり、防御力のバフデバフのみ強力にしたりできます

## DarkPlasma_ClearEquip.js

装備をすべてはずすプラグイン

パーティメンバーから抜けた際に、自動で抜けたメンバーの装備をすべてはずすプラグインパラメータを提供します
任意の名前のメンバーの装備をはずすプラグインコマンドを提供します

## DarkPlasma_EscapePenalty.js

逃走成功時にペナルティを与えるプラグイン

## DarkPlasma_MinimumDamageValue.js

最低ダメージ保証システムを追加するプラグイン

## DarkPlasma_NameWindow.js

会話イベント中に名前ウィンドウを表示するプラグイン

MV時代の\n<名前>表記に対応しているため、移行用に最適です
アクターごとに名前の色を指定したり、開きカッコを検出して自動で名前ウィンドウを表示したりできます

## DarkPlasma_OrderIdAlias.js

スキル/アイテムの表示順IDを制御するプラグイン

後々追加したスキルやアイテムの表示をどこかに差し込みたいときなどにどうぞ

## DarkPlasma_SkillCooldown.js

スキルにクールタイムを設定するプラグイン

## DarkPlasma_SkillCostExtension.js

スキルのコストを拡張するプラグイン

HPを消費する, HPを割合で消費する, MPを割合で消費する, アイテムを消費する, お金を消費する などの設定が可能です
アイテムは複数種類の消費に対応しています

## DarkPlasma_StateBuffOnBattleStart.js

戦闘開始時にステートやバフをかけるプラグイン

## DarkPlasma_StateGroup.js

ステートをグルーピングして優先度をつけます
優先度の高いステートで上書きします（例: 毒を猛毒で上書きする）

## DarkPlasma_SupponREE.js

ランダムな構成の敵を出現させるプラグイン

## DarkPlasma_SurpriseControl.js

スイッチや敵の種類によって先制を制御します
特定スイッチがONのときに必ず先制する/先制される/先制しない/先制されない設定が可能です
敵グループに特定のモンスターが混じっているときにも同様の制御が可能です

## DarkPlasma_TinyMedal.js

ちいさなメダルシステムを実現するプラグイン

## DarkPlasma_WaitForCloseChoiceList.js

シーンチェンジの際に、選択肢ウィンドウが閉じきるのを待つプラグイン
