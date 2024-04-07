/*
Title: Menu Common Events
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 1.0.0
Release: 05.05.2022
First release: 05.05.2022
*/

/*ru
Название: Общие События в Меню
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 1.0.0
Релиз: 05.05.2022
Первый релиз: 05.05.2022
*/

/*:
 * @plugindesc v.1.0.0 [MV|MZ] Allows you to add commands to the menu that will activate the common event.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Info about plugin ###
 Title: DK_Menu_Common_Events
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 1.0.0
 Release: 05.05.2022
 First release: 05.05.2022

 ###=========================================================================
 ## Compatibility
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## See also
 ###=========================================================================
 1. Game Time (https://dk-plugins.ru/game-time/)
 Time system.

 2. Globals (https://dk-plugins.ru/globals/)
 Allows you to specify variables and switches that will be “global” to all player saves.
 Changes are saved in a separate file and applied when starting a new game or loading any save.

 3. Mouse System (https://dk-plugins.ru/mouse-system/)
 Allows you to change the mouse cursor, activate events by clicking, hovering, etc.

 ###=========================================================================
 ## License and terms of use
 ###=========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 Visit the page: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Support
 ###=========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins



 * @param commands
 * @text Commands
 * @desc Commands
 * @type struct<MenuCommand>[]
 * @default []

*/

/*:ru
 * @plugindesc v.1.0.0 [MV|MZ] Позволяет добавить команды в меню, которые активируют общее событие.
 * @author DKPlugins
 * @target MZ
 * @help

 ### Информация о плагине ###
 Название: DK_Menu_Common_Events
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 1.0.0
 Релиз: 05.05.2022
 Первый релиз: 05.05.2022

 ###=========================================================================
 ## Совместимость
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Смотрите также
 ###=========================================================================
 1. Время (https://dk-plugins.ru/game-time/)
 Система времени.

 2. Глобальные Данные (https://dk-plugins.ru/globals/)
 Позволяет указать переменные и переключатели, которые будут "глобальными" для всех сохранений игрока.
 Изменения сохраняются в отдельный файл и применяются при старте новой игры или загрузке любого сохранения.

 3. Система Мыши (https://dk-plugins.ru/mouse-system/)
 Позволяет изменять курсор мыши, активировать события нажатием, наведением и др.

 ###=========================================================================
 ## Лицензия и правила использования плагина
 ###=========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Посетите страницу: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins



 * @param commands
 * @text Команды
 * @desc Команды
 * @type struct<MenuCommand>[]
 * @default []

*/

/*~struct~MenuCommand:

 * @param commandName
 * @text Command name
 * @desc Command name

 * @param commonEvent
 * @text Common event
 * @desc Common event
 * @type common_event
 * @default 0

 * @param visibleSwitch
 * @text Visible switch
 * @desc Visible switch
 * @type switch
 * @default 0

*/

/*~struct~MenuCommand:ru

 * @param commandName
 * @text Название команды
 * @desc Название команды

 * @param commonEvent
 * @text Общее событие
 * @desc Общее событие
 * @type common_event
 * @default 0

 * @param visibleSwitch
 * @text Переключатель видимости
 * @desc Переключатель видимости
 * @type switch
 * @default 0

*/

'use strict';

var Imported = Imported || {};
Imported['DK_Menu_Common_Events'] = '1.0.0';

//===========================================================================
// initialize parameters
//===========================================================================

const MenuCommonEventsParams = (function() {

    function parse(string) {
        try {
            return JSON.parse(string, function(key, value) {
                if (typeof string === 'number' || typeof string === 'boolean') {
                    return string;
                }

                try {
                    if (Array.isArray(value)) {
                        return value.map(val => parse(val));
                    }

                    return parse(value);
                } catch (e) {
                    return value;
                }
            });
        } catch(e) {
            return string;
        }
    }

    const parameters = PluginManager.parameters('DK_Menu_Common_Events');

    return Object.entries(parameters).reduce((acc, [key, value]) => {
        acc[key] = parse(value);

        return acc;
    }, {});

})();

//===========================================================================
// Window_MenuCommand
//===========================================================================

const MenuCommonEvents_Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    MenuCommonEvents_Window_MenuCommand_addOriginalCommands.apply(this, arguments);

    MenuCommonEventsParams.commands.forEach(command => {
        if (!command.visibleSwitch || $gameSwitches.value(command.visibleSwitch)) {
            this.addCommand(command.commandName, 'menu_common_event', true, command);
        }
    });
};

//===========================================================================
// Scene_Menu
//===========================================================================

const MenuCommonEvents_Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    MenuCommonEvents_Scene_Menu_createCommandWindow.apply(this, arguments);

    if (this._commandWindow) {
        this._commandWindow.setHandler('menu_common_event', this.commandMenuCommandEvent.bind(this));
    }
};

Scene_Menu.prototype.commandMenuCommandEvent = function() {
    const ext = this._commandWindow.currentExt();
    $gameTemp.reserveCommonEvent(ext.commonEvent);
    this.popScene();
};
