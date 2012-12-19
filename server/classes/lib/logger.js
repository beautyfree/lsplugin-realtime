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

var winston = require('winston'),
    dateFormat = require('./dateformat');

var now = new Date();
var logger = new (winston.Logger) ({
    transports: [
        new (winston.transports.Console) (),
        new (winston.transports.File) ({
            filename: 'logs/' + dateFormat(now,'isoDate') + '.log',
            maxsize: 20*1024*1024,
            timestamp: true,
            json: false
            //handleExceptions: true
        })
    ]
});

exports.logger = logger;
