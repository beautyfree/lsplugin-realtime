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

jQuery(function($) {
    if(typeof(USER_ID) !== "undefined") {
        socket = io.connect(SOCKET_IO_URL, {
            'port' : SOCKET_IO_PORT,
            'reconnect': true,
            'reconnection delay': 500,
            'max reconnection attemps': 10
        });

        socket.on('connect', function () {
            socket.emit('join', {
                id: USER_ID,
                key: LIVESTREET_SECURITY_KEY,
                hash: document.location.href.split("#")[0]
            });
        });
    }
});
