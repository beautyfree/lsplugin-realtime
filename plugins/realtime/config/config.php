<?php
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

Config::Set('router.page.realtime', 'PluginRealtime_ActionRealtime');

$config=array();

$config['node']['host'] = 'beautyfree.no-ip.org'; // 'devall.no.de'; /* Домен/ip где распологается node.js */

/* Cвязь php + node */
$config['socket']['file'] = "unix:///tmp/node-socket"; // false;   /* Расположение unix-socket */ // если определен то 2 параметра ниже значения не имеют
$config['socket']['port'] = 8001;                                  /* Порт socket */   // если file выше указан как false
$config['socket']['path'] = '/';                                   /* Папка socket */  // если file выше указан как false

/* Связь user + node.js */                       // Настройки для генерации ссылки на socket.io js скрипт отдающимся socket.io
$config['io']['port'] = 8003;                    /* Порт на котором работает socket.io */
$config['io']['root']['path'] = '/'; //"/";      /* Папка socket.io */ // в случае ипользования фронтэнда

/* Время через которое исчезает уведомление (0 - не ичезает) */
$config['timeout'] = 5000;


/**
 * Конфиг подгрузки js/css
 */
Config::Set('head.rules.realtime', array(
    'path'=> '*',
    'js' => array(
        'include' => array(
            // Socket.io библиотека
            'http://'.$config['node']['host'].':'.$config['io']['port'].rtrim($config['io']['root']['path'],'/').'/socket.io/socket.io.js',
            // Подключаемся к socket.io
            '___path.static.root___/plugins/realtime/lib/js/client.js',
            '___path.static.root___/plugins/realtime/lib/js/notification.js',

            // Необходимые библиотеки
            '___path.static.root___/plugins/realtime/lib/js/jquery.json.min.js',
            '___path.static.root___/plugins/realtime/lib/js/jquery.jplayer.js',
            '___path.static.root___/plugins/realtime/lib/js/notifier.js',
            '___path.static.root___/plugins/realtime/lib/js/jstorage.js',
            '___path.static.root___/plugins/realtime/lib/js/jquery.nano.js',
            // Логика приложения
            '___path.static.root___/plugins/realtime/templates/skin/default/js/app.js',
        )
    ),
    'css' => array(
        'include' => array(
            '___path.static.root___/plugins/realtime/templates/skin/default/css/realtime.css',
        )
    ),
));

return $config;
?>
