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

var config  = require('./config'),
    net = require('net'),
    sio = require('socket.io'),
    profiler = require('./classes/lib/profiler').profiler,
    logger   = require('./classes/lib/logger').logger,
    sessions = require('./classes/sessions').sessions,
    engine   = require('./classes/engine').engine;

var sys = require('util');

var profiler = new profiler();
var iTimeId = profiler.Start('full_time','Full time of load server');

/**
 * Сессии и собиратель мертвых сессий
 */

var sessions = new sessions();
setInterval(function () {
    var now = new Date();
    for (var id in sessions.aTemps) {
        // Не существует данного параметра id
        // т.к может удалится в любом куске кода
        if (!sessions.aTemps.hasOwnProperty(id))
            continue;

        var temp = sessions.aTemps[id],
            session = sessions.aSessions[id];

        // Текущее время - время сессии > таймаута
        if (now - temp.timestamp > config.session_timeout) {
            sessions.stopDeleteSession(id);
            sessions.deleteSession(id);
        }
    }
}, 5000);


/**************************************
 * Связь node + user
 */

var user = sio.listen(config.io_port);
user.configure(function () {
  user.set('transports', config.io_transports );
  user.set('log level', config.io_log_level);
});

user.sockets.on('connection', function (socket) {
    var id = null;
    var hash = null;

    /**
     * Пользователь загрузил страницу
     */
    socket.on('join', function (obj) {
        if(!obj.id)
          return;
        // Если еще одно соединение с другой вкладки
        if(socket.store[obj.id])
          socket.disconnect();
        /**
         * Существует ли такая сессия(авторизировался ли пользователь)
         */
        if(sessions.checkSession(obj.id,obj.key)) {
            id = obj.id;
            hash = obj.hash;

            socket.join(id);   // Личный канал пользователя
            socket.join(hash); // Подключаемся к публичному каналу

            logger.info('event join: ' + JSON.stringify(obj) + ' ' + obj.hash);

            sessions.stopDeleteSession(id);
        }
    });

    /**
     * Пользователь закрыл страницу
     */
    socket.on('disconnect', function () {
        // Если он был авторизирован получим его id
        if(id) {
            sessions.startDeleteSession(id);
            logger.info('disconnect: ' +id + "\n---");
        } else {
            logger.info('id undefined: ' + id);
        }
    });
});

/**************************************
 * Связь node + php
 */

var engine = new engine();
engine.init(user,sessions);

var php = net.createServer(function (stream) {
    stream.setEncoding("utf8");
    stream.on("data", function (data) {
        //logger.info('FROM PHP: ' + data);
        var json = JSON.parse(data);
        engine.run(json.event,json);
    });
});
php.listen(config.socket_path);
logger.info('Listening on socket ' + config.socket_path);

profiler.Stop(iTimeId);

