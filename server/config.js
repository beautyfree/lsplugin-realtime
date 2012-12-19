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

module.exports = {
    /*
     * Время жизни сессии 10 минут
     */
    "session_timeout" : 0.5*60*1000, //30*60*1000,

    /*
     * Расположение unix-socket либо порт
     */
    "socket_path" : "/tmp/node-socket", // 8001,

    /*
     * Порт на котором работает socket.io
     */
    "io_port" : 8003,
    "io_log_level" : 1,
    "io_transports" : ['websocket', 'flashsocket', 'htmlfile', 'jsonp-polling', 'xhr-polling']
}
