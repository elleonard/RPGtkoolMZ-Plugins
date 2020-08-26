// DarkPlasma_ClearEquip
// Copyright (c) 2020 DarkPlasma
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2020/08/27 1.0.0 MZ版公開
 */

/*:
 * @plugindesc 装備をすべてはずす
 * @author DarkPlasma
 * @license MIT
 *
 * @target MZ
 * @url https://github.com/elleonard/RPGtkoolMZ-Plugins
 *
 * @param Clear Equip When Member is Out
 * @text パーティアウト時装備はずす
 * @desc パーティから外れたときに装備をすべてはずすかどうか
 * @default false
 * @type boolean
 *
 * @command clearEquip
 * @text アクターの装備をすべてはずす
 * @arg actorId
 * @text アクター
 * @type actor
 *
 * @help
 * プラグインパラメータの設定をONにしておくと、パーティからメンバーがはずれたとき、
 * そのメンバーの装備をすべてはずします。
 *
 * プラグインコマンド: アクターの装備をすべてはずす を提供します。
 */
(function(){
  'use strict';
  const pluginName = document.currentScript.src.replace(/^.*\/(.*).js$/, function () {
    return arguments[1];
  });
  const pluginParameters = PluginManager.parameters(pluginName);

  const settings = {
    clearEquipWhenMemberIsOut: String(pluginParameters['Clear Equip When Member is Out']) === 'true' || false,
  };

  const _Game_Party_removeActor = Game_Party.prototype.removeActor;
  Game_Party.prototype.removeActor = function(actorId) {
    // パーティメンバーがはずれたときに装備をすべてはずす
    if (settings.clearEquipWhenMemberIsOut && this._actors.contains(actorId)) {
      $gameActors.actor(actorId).clearEquipments();
    }
    _Game_Party_removeActor.call(this, actorId);
  };

  PluginManager.registerCommand(pluginName, 'clearEquip', args => {
    const actor = $gameParty.members().find(actor => actor.actorId() === Number(args.actorId));
    if (actor) {
      actor.clearEquipments();
    }
  });
})();
