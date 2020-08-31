// DarkPlasma_ParameterText
// Copyright (c) 2020 DarkPlasma
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2020/09/01 1.0.0 公開
 */

/*:
 * @plugindesc 
 * @author DarkPlasma
 * @license MIT
 *
 * @target MZ
 * @url https://github.com/elleonard/RPGtkoolMZ-Plugins
 *
 * @param extraParamNameCritical
 * @text 会心率表記
 * @type string
 * @default 会心率
 *
 * @param extraParamNameCriticalEvasion
 * @text 会心回避率表記
 * @type string
 * @default 会心回避率
 *
 * @param extraParamNameMagicEvasion
 * @text 魔法回避率表記
 * @type string
 * @default 魔法回避率
 *
 * @param extraParamNameMagicReflection
 * @text 魔法反射率表記
 * @type string
 * @default 魔法反射率
 *
 * @param extraParamNameCounterAttack
 * @text 反撃率表記
 * @type string
 * @default 反撃率
 *
 * @param extraParamNameHpRegeneration
 * @text HP再生率表記
 * @type string
 * @default HP再生率
 *
 * @param extraParamNameMpRegeneration
 * @text MP再生率表記
 * @type string
 * @default MP再生率
 *
 * @param extraParamNameTpRegeneration
 * @text TP再生率表記
 * @type string
 * @default TP再生率
 *
 * @param specialParamNameTargetRate
 * @text 狙われ率表記
 * @type string
 * @default 狙われ率
 *
 * @param specialParamNameGuardEffectRate
 * @text 防御効果率表記
 * @type string
 * @default 防御効果率
 *
 * @param specialParamNameRecoveryEffectRate
 * @text 回復効果率表記
 * @type string
 * @default 回復効果率
 *
 * @param specialParamNamePharmacology
 * @text 薬の知識表記
 * @type string
 * @default 薬の知識
 *
 * @param specialParamNameMpCostRate
 * @text MP消費率表記
 * @type string
 * @default MP消費率
 *
 * @param specialParamNameTpChargeRate
 * @text TPチャージ率表記
 * @type string
 * @default TPチャージ率
 *
 * @param specialParamNamePhysicalDamageRate
 * @text 物理ダメージ率表記
 * @type string
 * @default 物理ダメージ率
 *
 * @param specialParamNameMagicDamageRate
 * @text 魔法ダメージ率表記
 * @type string
 * @default 魔法ダメージ率
 *
 * @param specialParamNameFloorDamageRate
 * @text 床ダメージ率表記
 * @type string
 * @default 床ダメージ率
 *
 * @param specialParamNameExperienceRate
 * @text 経験獲得率表記
 * @type string
 * @default 経験獲得率
 *
 * @help
 * 本プラグインは他のプラグインから参照されることを前提としたベースプラグインです。
 * 追加能力値及び特殊能力値の表記テキストを返す関数を提供します。
 *
 * TextManager.xparam(追加能力値ID)
 *
 * TextManager.sparam(特殊能力値ID)
 */

(() => {
  'use strict';
  const pluginName = document.currentScript.src.replace(/^.*\/(.*).js$/, function () {
    return arguments[1];
  });
  const pluginParameters = PluginManager.parameters(pluginName);
  const TEXT_MANAGER_PARAM_ID = {
    HIT: 8,
    EVASION: 9,
  };

  const settings = {
    extraParamNames: [
      TextManager.param(TEXT_MANAGER_PARAM_ID.HIT),
      TextManager.param(TEXT_MANAGER_PARAM_ID.EVASION),
      String(pluginParameters.extraParamNameCritical || '会心率'),
      String(pluginParameters.extraParamNameCriticalEvasion || '会心回避率'),
      String(pluginParameters.extraParamNameMagicEvasion || '魔法回避率'),
      String(pluginParameters.extraParamNameMagicReflection || '魔法反射率'),
      String(pluginParameters.extraParamNameCounterAttack || '反撃率'),
      String(pluginParameters.extraParamNameHpRegeneration || 'HP再生率'),
      String(pluginParameters.extraParamNameMpRegeneration || 'MP再生率'),
      String(pluginParameters.extraParamNameTpRegeneration || 'TP再生率'),
    ],
    specialParamNames: [
      String(pluginParameters.specialParamNameTargetRate || '狙われ率'),
      String(pluginParameters.specialParamNameGuardEffectRate || '防御効果率'),
      String(pluginParameters.specialParamNameRecoveryEffectRate || '回復効果率'),
      String(pluginParameters.specialParamNamePharmacology || '薬の知識'),
      String(pluginParameters.specialParamNameMpCostRate || 'MP消費率'),
      String(pluginParameters.specialParamNameTpChargeRate || 'TPチャージ率'),
      String(pluginParameters.specialParamNamePhysicalDamageRate || '物理ダメージ率'),
      String(pluginParameters.specialParamNameMagicDamageRate || '魔法ダメージ率'),
      String(pluginParameters.specialParamNameFloorDamageRate || '床ダメージ率'),
      String(pluginParameters.specialParamNameExperienceRate || '経験獲得率'),
    ],
  };

  /**
   * 追加能力値のテキストを返す
   * @param {number} paramId パラメータID
   * @return {string}
   */
  TextManager.xparam = function (paramId) {
    return settings.extraParamNames[paramId] || "";
  };

  /**
   * 特殊能力値のテキストを返す
   * @param {number} paramId パラメータID
   * @return {string}
   */
  TextManager.sparam = function (paramId) {
    return settings.specialParamNames[paramId] || "";
  };
})();
