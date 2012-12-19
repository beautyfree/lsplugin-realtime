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

class PluginRealtime_ModuleUser_EntityUser extends PluginRealtime_Inherit_ModuleUser_EntityUser {

    public function getSettingsMomentNoticeNewTopic() {
        return $this->_aData['user_settings_moment_notice_new_topic'];
    }
    public function getSettingsMomentNoticeNewComment() {
        return $this->_aData['user_settings_moment_notice_new_comment'];
    }
    public function getSettingsMomentNoticeNewTalk() {
        return $this->_aData['user_settings_moment_notice_new_talk'];
    }
    public function getSettingsMomentNoticeReplyComment() {
        return $this->_aData['user_settings_moment_notice_reply_comment'];
    }
    public function getSettingsMomentNoticeNewFriend() {
        return $this->_aData['user_settings_moment_notice_new_friend'];
    }


    public function setSettingsMomentNoticeNewTopic($data) {
        $this->_aData['user_settings_moment_notice_new_topic']=$data;
    }
    public function setSettingsMomentNoticeNewComment($data) {
        $this->_aData['user_settings_moment_notice_new_comment']=$data;
    }
    public function setSettingsMomentNoticeNewTalk($data) {
        $this->_aData['user_settings_moment_notice_new_talk']=$data;
    }
    public function setSettingsMomentNoticeReplyComment($data) {
        $this->_aData['user_settings_moment_notice_reply_comment']=$data;
    }
    public function setSettingsMomentNoticeNewFriend($data) {
        $this->_aData['user_settings_moment_notice_new_friend']=$data;
    }

}
?>
