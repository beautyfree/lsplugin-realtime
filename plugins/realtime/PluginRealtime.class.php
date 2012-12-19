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

if (!class_exists('Plugin')) {
    die('Hacking attempt!');
}

class PluginRealtime extends Plugin {

    protected $aInherits=array(
        'module' => array('ModuleNotify'),
        'mapper' => array('ModuleUser_MapperUser'),
        'entity' => array('ModuleUser_EntityUser'),
        'action' => array('ActionSettings')
    );

    public function Activate() {
        if(!$this->isFieldExists(Config::Get('db.table.user'),'user_settings_moment_notice_new_topic')) {
            $this->ExportSQL(dirname(__FILE__).'/install.sql');
        }
        return true;
    }

    public function Init() {
        if($this->User_GetUserCurrent()) {
            $sKey = $this->Security_SetSessionKey();
            $this->PluginRealtime_Realtime_SendInit($sKey);


            /**
             * Данные для определения последней используемой страницы
             * В js находиться механизм сравнения хэша записанного в куки и того что указан на странице
             */
            $sHashCurrentTab = func_generator(10);
            $this->Viewer_Assign('sHashCurrentTab',$sHashCurrentTab);
        }
    }
}
?>
