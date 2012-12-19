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

var sys = require('util'),
    path = require('path'),
    fs = require('fs'),
    config = require('../config'),
    profiler = require('./lib/profiler').profiler,
    logger   = require('./lib/logger').logger,
    httpcli = require("./lib/httpclient"),
    module = require('./module').module;

var profiler = new profiler();

var engine = function() {
    this.modules = [];
};

engine.prototype = {
    init: function(io,sessions) {
        this.io = io;
        this.sessions = sessions;

        this._loadModules();
    },

    _loadModule: function(m) {
            var iTimeId = profiler.Start(m.name,'Time of load module '+m.name);

            /**
             * Создаем объект модуля
             */
            var oModule = new module()
            for(var event in m) {
                oModule[event] = m[event];
            }

            oModule.io = this.io;
            oModule.sessions = this.sessions;
            oModule.event = m[event];

            logger.info('Events:');
            for (var event in oModule.events) {
                this.modules[event] = oModule;
                logger.info('\t'+event);
            }

            profiler.Stop(iTimeId);
    },

    _loadModules: function() {

        var files = fs.readdirSync(path.join(__dirname, 'modules'));

        for(var i = 0; i < files.length; i++) {
            var file = files[i];
            var filename = file.replace(/\.js$/, '');
            var modulePath = path.join(__dirname, 'modules', filename);

            var m = require(modulePath);
            if(typeof(m.canLoad) == "function" && m.canLoad() == false) {
                logger.info("Skipping module " + m.name + ".");
                return;
            } else {
                logger.info("Loading module " + m.name + ".");
            }

            this._loadModule(m);
        }
    },

    run: function(event, obj) {
        if(this.modules[event]) {
            try {
                this.modules[event][this.modules[event].events[event]](obj);
            } catch (err) {
                logger.info("Error:", err);
            }
        }
    }
};

exports.engine = engine;
