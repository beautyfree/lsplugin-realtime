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

class PluginRealtime_ActionRealtime extends ActionPlugin {

    public function Init() {
        $this->oUserCurrent=$this->User_GetUserCurrent();
        /**
         * Если пользователь не авторизован и не админ, то выкидываем его
         */
        if (!$this->oUserCurrent or !$this->oUserCurrent->isAdministrator()) {
            return $this->EventNotFound();
        }
    }

    protected function RegisterEvent() {
        $this->AddEvent('admin','EventAdmin');
        $this->AddEvent('ajaxupdate','AjaxUpdate');
        $this->AddEvent('ajaxsend','AjaxSend');
    }


    /**********************************************************************************
    ************************ РЕАЛИЗАЦИЯ ЭКШЕНА ***************************************
    **********************************************************************************
    */

    /**
     * Админка
     *
     */
    protected function EventAdmin() {
        $this->SetTemplateAction('admin');
    }

    protected function AjaxUpdate() {
        $this->Viewer_SetResponseAjax('json');

        $aData = array(
            'event' => 'check',
            'to'    => $this->oUserCurrent->getId(),
        );
        $this->PluginRealtime_Realtime_Send($aData);
    }

    protected function AjaxSend() {
        $this->Viewer_SetResponseAjax('json');

        $sId = getRequest('notification_id');
        if(!func_check($sId,'id')) {
            $this->Message_AddErrorSingle('id',$this->Lang_Get('attention'));
            return;
        }

        $sKey = getRequest('notification_key');
        $sText = getRequest('notification_text');

        $this->PluginRealtime_Realtime_Send(array(
            'event' => 'talk_new',
            'to'    => $sId,

            'text'  => strip_tags($sText),
            'link' => ''
        ));
    }
}
?>
