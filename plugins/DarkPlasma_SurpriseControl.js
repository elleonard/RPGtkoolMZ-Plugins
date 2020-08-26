// DarkPlasma_SurpriseControl
// Copyright (c) 2020 DarkPlasma
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2020/08/26 1.0.0 MZ版公開
 */

/*:
 * @plugindesc 先制攻撃/不意打ちの制御を行う
 * @author DarkPlasma
 * @license MIT
 *
 * @target MZ
 * @url https://github.com/elleonard/RPGtkoolMZ-Plugins
 *
 * @param No Preemptive Switch
 * @text 先制攻撃しなくなるスイッチ番号
 * @desc 指定したスイッチがONのとき、プレイヤーサイドが先制攻撃しなくなります
 * @default 0
 * @type switch
 *
 * @param No Surprise Switch
 * @text 先制攻撃されなくなるスイッチ番号
 * @desc 指定したスイッチがONのとき、エネミーサイドが先制攻撃しなくなります
 * @default 0
 * @type switch
 *
 * @param Force Preemptive Switch
 * @text 必ず先制攻撃するスイッチ番号
 * @desc 指定したスイッチがONのとき、プレイヤーサイドが確実に先制攻撃します
 * @default 0
 * @type switch
 *
 * @param Force Surprise Switch
 * @text 必ず先制攻撃されるスイッチ番号
 * @desc 指定したスイッチがONのとき、エネミーサイドが確実に先制攻撃します
 * @default 0
 * @type switch
 *
 * @param Enable With Event Command
 * @text 戦闘の処理でも有効
 * @desc イベントコマンド「戦闘の処理」でも先制判定を行うかどうか
 * @default true
 * @type boolean
 *
 * @help
 *  プレイヤーサイド、エネミーサイドの先制攻撃を制御します。
 *  プラグインパラメータで特定スイッチがONのときに
 *  先制攻撃しない/されない/する/される設定ができます。
 * 
 *  複数のスイッチがONのとき、優先度は以下のようになります。
 * 
 *  必ず先制攻撃する > 必ず先制攻撃される > 先制攻撃しない/されない
 * 
 *  エネミーのメモ欄に<NoPreemptive>, <NoSurprise>,
 *  <ForcePreemptive>, <ForceSurprise>と記述をすることで、
 *  その敵が含まれる戦闘において、
 *  先制しない/されない/する/される設定ができます。
 * 
 *  <NoPreemptive>: プレイヤーサイドが先制攻撃しない
 *  <NoSurprise>: エネミーサイドが先制攻撃しない
 *  <ForcePreemptive>: プレイヤーサイドが必ず先制攻撃する
 *  <ForceSurprise>: エネミーサイドが必ず先制攻撃する
 * 
 *  上記が複数含まれるパターンの戦闘においては、優先度は以下のようになります。
 * 
 *  必ず先制攻撃する > 必ず先制攻撃される > 先制攻撃しない/されない
 */
(function () {
  'use strict';
  const pluginName = document.currentScript.src.replace(/^.*\/(.*).js$/, function () {
    return arguments[1];
  });
  const pluginParameters = PluginManager.parameters(pluginName);

  let battleProcessByEvent = false;

  const _extractMetadata = DataManager.extractMetadata;
  DataManager.extractMetadata = function (data) {
    _extractMetadata.call(this, data);
    if (data.meta.NoPreemptive !== undefined) {
      data.noPreemptive = true;
    }
    if (data.meta.NoSurprise !== undefined) {
      data.noSurprise = true;
    }
    if (data.meta.ForcePreemptive !== undefined) {
      data.forcePreemptive = true;
    }
    if (data.meta.ForceSurprise !== undefined) {
      data.forceSurprise = true;
    }
  }

  const settings = {
    noPreemptiveSwitch: Number(pluginParameters['No Preemptive Switch']) || 0,
    noSurpriseSwitch: Number(pluginParameters['No Surprise Switch']) || 0,
    forcePreemptiveSwitch: Number(pluginParameters['Force Preemptive Switch']) || 0,
    forceSurpriseSwitch: Number(pluginParameters['Force Surprise Switch']) || 0,
    enableWithEventCommand: String(pluginParameters['Enable With Event Command'] || 'true') === 'true',
  };

  const _BattleManager_setup = BattleManager.setup;
  BattleManager.setup = function (troopId, canEscape, canLose) {
    _BattleManager_setup.call(this, troopId, canEscape, canLose);
    if (settings.enableWithEventCommand && battleProcessByEvent) {
      this.onEncounter();
    }
  };

  const _BattleManager_ratePreemptive = BattleManager.ratePreemptive;
  BattleManager.ratePreemptive = function () {
    if (this.forcePreemptive()) {
      return 1;
    } else if (this.noPreemptive() || this.forceSurprise()) {
      return 0;
    }
    return _BattleManager_ratePreemptive.call(this);
  };

  const _BattleManager_rateSurprise = BattleManager.rateSurprise;
  BattleManager.rateSurprise = function () {
    if (this.forceSurprise()) {
      return 1;
    } else if (this.noSurprise()) {
      return 0;
    }
    return _BattleManager_rateSurprise.call(this);
  };

  BattleManager.noPreemptive = function () {
    return settings.noPreemptiveSwitch > 0 && $gameSwitches.value(settings.noPreemptiveSwitch)
      || $gameTroop.hasNoPreemptiveFlag();
  };

  BattleManager.noSurprise = function () {
    return settings.noSurpriseSwitch > 0 && $gameSwitches.value(settings.noSurpriseSwitch)
      || $gameTroop.hasNoSurpriseFlag();
  };

  BattleManager.forcePreemptive = function () {
    return settings.forcePreemptiveSwitch > 0 && $gameSwitches.value(settings.forcePreemptiveSwitch)
      || $gameTroop.hasForcePreemptiveFlag();
  };

  BattleManager.forceSurprise = function () {
    return settings.forceSurpriseSwitch > 0 && $gameSwitches.value(settings.forceSurpriseSwitch)
      || $gameTroop.hasForceSurpriseFlag();
  };

  Game_Troop.prototype.hasNoPreemptiveFlag = function () {
    return this.members().some(function (enemy) {
      return enemy.hasNoPreemptiveFlag();
    });
  };

  Game_Troop.prototype.hasNoSurpriseFlag = function () {
    return this.members().some(function (enemy) {
      return enemy.hasNoSurpriseFlag();
    });
  };

  Game_Troop.prototype.hasForcePreemptiveFlag = function () {
    return this.members().some(function (enemy) {
      return enemy.hasForcePreemptiveFlag();
    });
  };

  Game_Troop.prototype.hasForceSurpriseFlag = function () {
    return this.members().some(function (enemy) {
      return enemy.hasForceSurpriseFlag();
    });
  };

  Game_Enemy.prototype.hasNoPreemptiveFlag = function () {
    return !!this.enemy().noPreemptive;
  };

  Game_Enemy.prototype.hasNoSurpriseFlag = function () {
    return !!this.enemy().noSurprise;
  };

  Game_Enemy.prototype.hasForcePreemptiveFlag = function () {
    return !!this.enemy().forcePreemptive;
  };

  Game_Enemy.prototype.hasForceSurpriseFlag = function () {
    return !!this.enemy().forceSurprise;
  };

  const _Game_Interpreter_command301 = Game_Interpreter.prototype.command301;
  Game_Interpreter.prototype.command301 = function (params) {
    battleProcessByEvent = true;
    _Game_Interpreter_command301.call(this, params);
    battleProcessByEvent = false;
  }
})();
