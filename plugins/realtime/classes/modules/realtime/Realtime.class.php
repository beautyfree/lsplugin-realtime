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

class PluginRealtime_ModuleRealtime extends Module {
    protected $oUserCurrent=null;

    public function Init() {
        $this->oUserCurrent=$this->User_GetUserCurrent();
    }

    public function SendInit($sKey) {
        $aData = array(
            'event' => 'init',
            'id'    => $this->oUserCurrent->getId(),
            'key'   => $sKey,
        );
        $this->Send($aData);
    }

    public function Send($aData) {
        $sJson = json_encode($aData);
        if(Config::Get('plugin.realtime.socket.file')) {
            $handle = fsockopen(Config::Get('plugin.realtime.socket.file'));
        } else {
            $handle = fsockopen(Config::Get('plugin.realtime.node.host'),Config::Get('plugin.realtime.socket.port'));
        }
        fwrite($handle, $sJson);
        fclose($handle);
    }
}
?>
