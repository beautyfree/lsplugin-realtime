{if $oUserCurrent}
<script language="JavaScript" type="text/javascript">
    var USER_ID = {$oUserCurrent->getId()};
    var SOCKET_IO_URL  = '{Config::Get('plugin.realtime.node.host')}:{Config::Get('plugin.realtime.io.port')}';
    var SOCKET_IO_PORT = {Config::Get('plugin.realtime.io.port')};
    var PLUGIN_PATH = '{$aTemplateWebPathPlugin['realtime']}';
    var MAX_TREE = {Config::Get('module.comment.max_tree')};

    var HASH_CURRENT_TAB = '{$sHashCurrentTab}';

    window.NotifierjsConfig.defaultTimeOut = {Config::Get('plugin.realtime.timeout')};

    ls.lang.load({lang_load name="comment_new,comment_new_title,comment_reply,comment_reply_title,topic_new,topic_new_title,talk_new,talk_new_title,talk_comment_new,talk_comment_new_title,user_friend_new,user_friend_new_title,blog_invite_new,blog_invite_new_title"});
</script>
{/if}
