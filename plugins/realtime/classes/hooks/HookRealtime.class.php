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

class PluginRealtime_HookRealtime extends Hook {

    public function RegisterHook() {
        $this->AddHook('template_html_head_end','HtmlHeadEnd');
        $this->AddHook('template_body_end','HtmlBodyEnd');
        $this->AddHook('template_form_settings_tuning_end','HtmlSettingsTuningEnd');
        $this->AddHook('comment_add_after','CommentAdd');
    }

    public function HtmlHeadEnd() {
        return $this->Viewer_Fetch(Plugin::GetTemplatePath(__CLASS__).'html_head_end.tpl');
    }

    public function HtmlBodyEnd() {
        return $this->Viewer_Fetch(Plugin::GetTemplatePath(__CLASS__).'body_end.tpl');
    }

    public function HtmlSettingsTuningEnd() {
        return $this->Viewer_Fetch(Plugin::GetTemplatePath(__CLASS__).'settings_tuning_end.tpl');
    }

    public function CommentAdd($aParams) {
        $oCommentNew = $aParams['oCommentNew'];
        $oCommentParent = $aParams['oCommentParent'];
        $oTopic = $aParams['oTopic'];
        $oUserCurrent = $this->User_GetUserCurrent();

        $oViewerLocal=$this->Viewer_GetLocalViewer();
        $oViewerLocal->Assign('oUserCurrent',$oUserCurrent); // Не верно
        $oViewerLocal->Assign('bOneComment',true);
        $oCommentNew->setUser($oUserCurrent);
        $oViewerLocal->Assign('oComment',$oCommentNew);
        $sText=$oViewerLocal->Fetch("comment.tpl");
        $aCmt=array(
            'html' => $sText,
            'idParent' => $oCommentNew->getPid(),
            'id' => $oCommentNew->getId(),
        );

        $this->PluginRealtime_Realtime_Send(array(
            'event'  => 'comment',
            'hash'   => $oTopic->getUrl(),
            'from'   => $oCommentNew->getUserId(),

            'comment' => $aCmt
        ));
    }
}
?>
