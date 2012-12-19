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
 * Заготовки административной части
 */
var AdminModule = {
    name: 'Admin',
    events: {
        check: 'EventCheck',
    },

    EventCheck: function(obj) {
        var sessions = this.sessions.aSessions;
        this.io.sockets.in(obj.to).emit('admin', sessions);

        this.logger.info('event '+obj.event+': ' + JSON.stringify(sessions));
    }
}

for (var i in AdminModule)
  exports[i] = AdminModule[i];
