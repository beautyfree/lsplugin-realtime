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

var sys = require('util');

/**
 * Модуль отвечающий за отправку всех событий модуля Notify из LiveStreet
 */
var NotificationsModule = {
    name: 'Notifications',
    events: {
        comment_new: 'EventAll',
        comment_reply: 'EventAll',
        topic_new: 'EventAll',
        talk_new: 'EventAll',
        talk_comment_new: 'EventAll',
        user_friend_new: 'EventAll',
        blog_invite_new: 'EventAll'
    },

    EventAll: function(obj) {
        // Есть ли такой пользователь на сайте онлайн?
        if(this.sessions.checkSession(obj.to)) {
            this.io.sockets.in(obj.to).emit('message', obj);
        }
        this.logger.info('event ' + obj.event + ': ' + JSON.stringify(obj));
    }
}

for (var i in NotificationsModule)
  exports[i] = NotificationsModule[i];
