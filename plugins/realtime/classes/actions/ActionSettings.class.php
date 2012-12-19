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

class PluginRealtime_ActionSettings extends PluginRealtime_Inherit_ActionSettings {

    protected function EventTuning() {
        $this->sMenuItemSelect='settings';
        $this->sMenuSubItemSelect='tuning';

        $this->Viewer_AddHtmlTitle($this->Lang_Get('settings_menu_tuning'));

        if (isPost('submit_settings_tuning')) {
            $this->Security_ValidateSendForm();

            $this->oUserCurrent->setSettingsNoticeNewTopic( getRequest('settings_notice_new_topic') ? 1 : 0 );
            $this->oUserCurrent->setSettingsNoticeNewComment( getRequest('settings_notice_new_comment') ? 1 : 0 );
            $this->oUserCurrent->setSettingsNoticeNewTalk( getRequest('settings_notice_new_talk') ? 1 : 0 );
            $this->oUserCurrent->setSettingsNoticeReplyComment( getRequest('settings_notice_reply_comment') ? 1 : 0 );
            $this->oUserCurrent->setSettingsNoticeNewFriend( getRequest('settings_notice_new_friend') ? 1 : 0 );

            $this->oUserCurrent->setSettingsMomentNoticeNewTopic( getRequest('settings_moment_notice_new_topic') ? 1 : 0 );
            $this->oUserCurrent->setSettingsMomentNoticeNewComment( getRequest('settings_moment_notice_new_comment') ? 1 : 0 );
            $this->oUserCurrent->setSettingsMomentNoticeNewTalk( getRequest('settings_moment_notice_new_talk') ? 1 : 0 );
            $this->oUserCurrent->setSettingsMomentNoticeReplyComment( getRequest('settings_moment_notice_reply_comment') ? 1 : 0 );
            $this->oUserCurrent->setSettingsMomentNoticeNewFriend( getRequest('settings_moment_notice_new_friend') ? 1 : 0 );
            $this->oUserCurrent->setProfileDate(date("Y-m-d H:i:s"));
            if ($this->User_Update($this->oUserCurrent)) {
                $this->Message_AddNoticeSingle($this->Lang_Get('settings_tuning_submit_ok'));
            } else {
                $this->Message_AddErrorSingle($this->Lang_Get('system_error'));
            }
        }
    }

}
?>
