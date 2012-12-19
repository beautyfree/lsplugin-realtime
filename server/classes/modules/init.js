/*-------------------------------------------------------
*
*   LiveStreet Plugin "Realtime"
*   Copyright © 2012 Alexey Yelizarov
*
*--------------------------------------------------------
*
*   Official site: www.devall.ru
*   Contact e-mail: felex-ae@ya.ru
*
*   GNU General Public License, version 2:
*   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
*
---------------------------------------------------------
*/

/**
 * Модуль обрабатывающий запрос на инициализацию пользователя
 */
var InitModule = {
    name: 'Init',
    events: {
        init: 'EventInit'
    },
    canLoad: function() {
        return true;
    },

    EventInit: function(obj) {
        // Создаем новую сессию
        this.sessions.createSession(obj.id,obj.key);

        this.logger.info('event ' + obj.event + ': ' + JSON.stringify(obj));
    }
}

for (var i in InitModule)
  exports[i] = InitModule[i];
