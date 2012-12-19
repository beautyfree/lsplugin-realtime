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

var logger = require('./lib/logger').logger;

var module = function() {
    this.name = null;
    this.events = [];
    this.event = '';

    this.io = null;
    this.sessions = null;

    this.logger = logger;
}

module.prototype = {
    init: function() {

    }
};

exports.module = module;
