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

var logger = require('./logger').logger;

var profiler = function(){
    this._iTimeId = 0;
    this._aTimes = [];
};

profiler.prototype = {
    Start: function(sName,sComment) {
        this._iTimeId++;
        this._aTimes[this._iTimeId] = {
            time_start : this._microtime(true),
            time_comment: sComment
        };
        return this._iTimeId;
    },

    Stop: function(iTimeId) {
        this._aTimes[iTimeId].time_stop = this._microtime(true);
        logger.info(this._aTimes[iTimeId].time_comment + ' - ' + this._GetTimeFull(iTimeId));
    },

    _GetTimeFull: function(iTimeId) {
        return this._aTimes[iTimeId].time_stop - this._aTimes[this._iTimeId].time_start;
    },

    _microtime: function(get_as_float) {
        var unixtime_ms = new Date().getTime();
        var sec = parseInt(unixtime_ms / 1000);

        return get_as_float ? (unixtime_ms/1000) : (unixtime_ms - (sec * 1000))/1000 + ' ' + sec;
    }
};

exports.profiler = profiler;
