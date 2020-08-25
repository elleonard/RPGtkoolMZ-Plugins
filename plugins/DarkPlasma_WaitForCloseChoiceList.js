// DarkPlasma_WaitForCloseChoiceList
// Copyright (c) 2020 DarkPlasma
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2020/08/25 1.0.0 公開
 */

/*:
 * @plugindesc シーンチェンジの際に選択肢ウィンドウが閉じるのを待つプラグイン
 * @author DarkPlasma
 * @license MIT
 *
 * @target MZ
 * @url https://github.com/elleonard/RPGtkoolMZ-Plugins
 *
 * @help
 * RPGツクールMZでは選択肢ウィンドウの選択肢が多数ある場合、
 * 新しいシーンのウィンドウの背後に選択肢ウィンドウの残骸が残ります。
 *
 * 本プラグインではシーンチェンジの際に選択肢ウィンドウが閉じきる前に
 * 別シーンのウィンドウが開いてしまうのを防ぎます。
 */

(function () {
  'use strict';
  const pluginName = document.currentScript.src.replace(/^.*\/(.*).js$/, function () {
    return arguments[1];
  });
  const pluginParameters = PluginManager.parameters(pluginName);

  const _Window_Message_isClosing = Window_Message.prototype.isClosing;
  Window_Message.prototype.isClosing = function () {
    if (this._choiceListWindow && this._choiceListWindow.isClosing()) {
      return true;
    }
    return _Window_Message_isClosing.call(this);
  };
})();
