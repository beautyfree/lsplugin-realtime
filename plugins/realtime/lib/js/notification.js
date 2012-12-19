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

var ls = ls || {};

Function.prototype.pbind = function() {
  var args = Array.prototype.slice.call(arguments);
  args.unshift(window);
  return this.bind.apply(this, args);
};

function indexOf(arr, value, from) {
  for (var i = from || 0, l = arr.length; i < l; i++) {
    if (arr[i] == value) return i;
  }
  return -1;
}

ls.notification = (function($){
    this.messages = [];
    this.window_active = true;

    this.init = function() {
        /* jPlayer Initialization*/
        $("#jpId").jPlayer( {
            ready: function () {
                $(this).jPlayer("setMedia", {
                    mp3: PLUGIN_PATH+"include/sound.mp3"
                });
            },
            swfPath: PLUGIN_PATH+"include"
        });

        this.showStorageMessages();
    };

    this.addMessage = function(msg) {
        var index = Math.floor(Math.random()*99999999999).toString();
        /* Удаляем двойные кавычки по аналогии trim*/
        msg.text = (msg.text).replace(/^\x22(.*)\x22$/,'$1');

        // Заголовок
        var title = $.nano(ls.lang.get(msg.event+'_title'), msg);
        var message = $.nano(ls.lang.get(msg.event), msg);

        var json  = $.toJSON(msg);

        $.jStorage.set(index,json);

        Notifier.notify(msg,message,title,index);
    };

    this.showStorageMessages = function() {
        var index = $.jStorage.index();
        if(index.length > 0) {
            for(i in index) {
                var hash = index[i];
                var json = $.jStorage.get(hash);
                if(json) {
                    var obj = $.parseJSON(json);
                    // Заголовок
                    var title = $.nano(ls.lang.get(obj.event+'_title'), obj);
                    var message = $.nano(ls.lang.get(obj.event), obj);
                    // Вывод всплывающего уведомления с текстом и заголовком
                    Notifier.notify(obj,message,title,hash);
                }
            }
        }
    }

    this.freezeEvents = function () {
      jQuery.each (ls.notification.messages, function (i,v) {
        clearTimeout(v.fadeTO);
      });
    }

    this.unfreezeEvents = function() {
      jQuery.each (ls.notification.messages, function (i,v) {
        v.i = i;
        v.fadeTO = setTimeout(v.startFading.bind(Notifier).pbind(v), v.timeOut);
      });
    }

    this.playSound = function() {
        // Проигрывание звука если окно не активно
        if(this.window_active === false)
            $("#jpId").jPlayer("play");
    }

    return this;
}).call(ls.notification || {},jQuery);

jQuery(window).bind("blur", function() {
    ls.notification.window_active = false;
    ls.notification.freezeEvents();
});

jQuery(window).bind("focus", function() {
    // Последняя активная вкладка
    jQuery(document).ready(function(){
       $.cookie('LAST_OPEN_TAB',HASH_CURRENT_TAB,'/');
    });
    ls.notification.window_active = true;
    ls.notification.unfreezeEvents();
});

jQuery(document).ready(function(){
    if(typeof(USER_ID) !== "undefined") {
        ls.notification.init();
    }
});
