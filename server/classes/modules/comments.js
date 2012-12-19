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
 * Модуль отправки комментариев топиков. Благодаря нему осуществяляется их подгрузка
 */
var CommentsModule = {
    name: 'Comments',
    events: {
        comment: 'EventComment'
    },

    EventComment: function(obj) {
        this.io.sockets.in(obj.hash).emit('message',obj);

        this.logger.info('event '+obj.event+': ' + obj.hash);
    }
}

for (var i in CommentsModule)
  exports[i] = CommentsModule[i];
