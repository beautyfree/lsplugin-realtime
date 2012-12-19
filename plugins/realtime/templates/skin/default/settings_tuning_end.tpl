<strong>{$aLang.settings_moment_notice}</strong>

<p>
    {hook run='form_settings_moment_tuning_begin'}
    <label><input {if $oUserCurrent->getSettingsMomentNoticeNewTopic()}checked{/if} type="checkbox" id="settings_moment_notice_new_topic" name="settings_moment_notice_new_topic" value="1" class="checkbox" />{$aLang.settings_tuning_notice_new_topic}</label><br />
    <label><input {if $oUserCurrent->getSettingsMomentNoticeNewComment()}checked{/if} type="checkbox" id="settings_moment_notice_new_comment" name="settings_moment_notice_new_comment" value="1" class="checkbox" />{$aLang.settings_tuning_notice_new_comment}</label><br />
    <label><input {if $oUserCurrent->getSettingsMomentNoticeNewTalk()}checked{/if} type="checkbox" id="settings_moment_notice_new_talk" name="settings_moment_notice_new_talk" value="1" class="checkbox" />{$aLang.settings_tuning_notice_new_talk}</label><br />
    <label><input {if $oUserCurrent->getSettingsMomentNoticeReplyComment()}checked{/if} type="checkbox" id="settings_moment_notice_reply_comment" name="settings_moment_notice_reply_comment" value="1" class="checkbox" />{$aLang.settings_tuning_notice_reply_comment}</label><br />
    <label><input {if $oUserCurrent->getSettingsMomentNoticeNewFriend()}checked{/if} type="checkbox" id="settings_moment_notice_new_friend" name="settings_moment_notice_new_friend" value="1" class="checkbox" />{$aLang.settings_tuning_notice_new_friend}</label>
    {hook run='form_settings_moment_tuning_end'}
</p>
