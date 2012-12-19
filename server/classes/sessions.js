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

var config = require('../config'),
    logger   = require('./lib/logger').logger;

var sessions = function() {
    this.aSessions = {};
    this.aTemps = {};

    this.createSession = function(id, key) {
        // Если уже существует точь в точь такая же сессия выходим
        if (this.aSessions[id] && this.aSessions[id].key == key) return null;

        // Хэш новой сессии
        var session = {
            id: id,
            key: key
        };
        this.aSessions[id] = session;

        logger.info('session created: '+session.id);
    };

    // Фунция обертка для создания сессий
    this.startDeleteSession = function(id) {
        if (this.aTemps[id]) return false;

        var temp = {
            id: id,
            timestamp: new Date()
        };
        this.aTemps[id] = temp;

        logger.info('temp created: '+temp.id);
    };

    // Если есть ключ и айди, и существует сессия такого айди с ключем
    this.checkSession = function(id, key) {
        if(id && key) {
            return (this.aSessions[id] && this.aSessions[id].key == key) ? true : false;
        } else if (id) {
            return (this.aSessions[id]) ? true : false;
        }
    };

    this.stopDeleteSession = function(id) {
        if(!id || !this.aTemps[id]) return false;

        logger.info('temp destroyed: '+id);
        delete this.aTemps[id];
    };

    this.deleteSession = function(id) {
        if(!id || !this.aSessions[id]) return false;

        logger.info('session destroyed: '+id);
        delete this.aSessions[id];
    };
};

exports.sessions = sessions;
