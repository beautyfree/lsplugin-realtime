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

class PluginRealtime_ModuleNotify extends PluginRealtime_Inherit_ModuleNotify {

    public function cutStr($string, $maxlen = 130) {
        $strlen = mb_strlen($string);
        if($strlen == 0) return '';

        $len = ($strlen > $maxlen) ? mb_strripos(mb_substr($string, 0, $maxlen), ' ') : $maxlen;
        $cutStr = mb_substr($string, 0, $len);
        return ($strlen > $maxlen) ? '"' . $cutStr . '..."' : '"' . $cutStr . '"';
    }

    /**
     * Отправляет уведомление при новом личном сообщении
     *
     * @param ModuleUser_EntityUser $oUserTo
     * @param ModuleUser_EntityUser $oUserFrom
     * @param ModuleTalk_EntityTalk $oTalk
     */
    public function SendTalkNew(ModuleUser_EntityUser $oUserTo,ModuleUser_EntityUser $oUserFrom,ModuleTalk_EntityTalk $oTalk) {
        /**
         * Проверяем можно ли юзеру рассылать уведомление
         */
        if ($oUserTo->getSettingsMomentNoticeNewTalk()) {
            $this->PluginRealtime_Realtime_Send(array(
                'event' => 'talk_new',
                'to'    => $oUserTo->getId(),
                'from'  => $oUserFrom->getId(),

                'user'  => $oUserFrom->getLogin(),
                'title' => $this->cutStr($oTalk->getTitle(),30),
                'text'  => $this->cutStr($oTalk->getText()),
                'link' => Router::GetPath('talk').'read/'.$oTalk->getId(),
                'author_photo' => $oUserFrom->getProfileAvatarPath(48)
            ));
        }
        parent::SendTalkNew($oUserTo,$oUserFrom,$oTalk);
    }

    /**
     * Отправляет уведомление при новом комментарии на личное сообщение
     *
     * @param ModuleUser_EntityUser $oUserTo
     * @param ModuleUser_EntityUser $oUserFrom
     * @param ModuleTalk_EntityTalk $oTalk
     * @param ModuleComment_EntityComment $oTalkComment
     */
    public function SendTalkCommentNew(ModuleUser_EntityUser $oUserTo,ModuleUser_EntityUser $oUserFrom,ModuleTalk_EntityTalk $oTalk,ModuleComment_EntityComment $oTalkComment) {
        /**
         * Проверяем можно ли юзеру рассылать уведомление
         */
        if ($oUserTo->getSettingsMomentNoticeNewTalk()) {

            $oViewerLocal=$this->Viewer_GetLocalViewer();
            $oViewerLocal->Assign('oUserCurrent',$oUserTo);
            $oViewerLocal->Assign('bOneComment',true);
            $oViewerLocal->Assign('bNoCommentFavourites',true);
            $oTalkComment->setUser($oUserFrom);
            $oViewerLocal->Assign('oComment',$oTalkComment);
            $sText=$oViewerLocal->Fetch("comment.tpl");
            $aCmt=array(
                'html' => $sText,
                'idParent' => $oTalkComment->getPid(),
                'id' => $oTalkComment->getId(),
            );

            $this->PluginRealtime_Realtime_Send(array(
                'event' => 'talk_comment_new',
                'to'   => $oUserTo->getId(),
                'from'  => $oUserFrom->getId(),

                'user'  => $oUserFrom->getLogin(),
                'title' => $this->cutStr($oTalk->getTitle(),30),
                'text' => $this->cutStr($oTalkComment->getText()),
                'link' => Router::GetPath('talk').'read/'.$oTalk->getId().'/#comment'.$oTalkComment->getId(),
                'author_photo' => $oUserFrom->getProfileAvatarPath(48),

                'comment' => $aCmt
            ));
        }
        parent::SendTalkCommentNew($oUserTo,$oUserFrom,$oTalk,$oTalkComment);
    }

    /**
     * Отправляет юзеру уведомление об ответе на его комментарий
     *
     * @param ModuleUser_EntityUser $oUserTo
     * @param ModuleTopic_EntityTopic $oTopic
     * @param CommentEntity_TopicComment $oComment
     * @param ModuleUser_EntityUser $oUserComment
     */
    public function SendCommentReplyToAuthorParentComment(ModuleUser_EntityUser $oUserTo, ModuleTopic_EntityTopic $oTopic, ModuleComment_EntityComment $oComment, ModuleUser_EntityUser $oUserComment) {
        /**
         * Проверяем можно ли юзеру рассылать уведомление
         */
        if ($oUserTo->getSettingsMomentNoticeReplyComment()) {
            $this->PluginRealtime_Realtime_Send(array(
                'event' => 'comment_reply',
                'to'    => $oUserTo->getId(),
                'from'  => $oUserComment->getId(),

                'user'  => $oUserComment->getLogin(),
                'title' => $this->cutStr($oTopic->getTitle(),30),
                'text'  => $this->cutStr($oComment->getText()),
                'link'  => $oTopic->getUrl().'#comment'.$oComment->getId(),
                'author_photo' => $oUserComment->getProfileAvatarPath(48)
            ));
        }
        parent::SendCommentReplyToAuthorParentComment($oUserTo,$oTopic,$oComment,$oUserComment);
    }

    /**
     * Отправляет юзеру уведомление о новом комментарии в его топике
     *
     * @param ModuleUser_EntityUser $oUserTo
     * @param ModuleTopic_EntityTopic $oTopic
     * @param CommentEntity_TopicComment $oComment
     * @param ModuleUser_EntityUser $oUserComment
     */
    public function SendCommentNewToAuthorTopic(ModuleUser_EntityUser $oUserTo, ModuleTopic_EntityTopic $oTopic, ModuleComment_EntityComment $oComment, ModuleUser_EntityUser $oUserComment) {
        /**
         * Проверяем можно ли юзеру рассылать уведомление
         */
        if ($oUserTo->getSettingsMomentNoticeNewComment()) {
            $this->PluginRealtime_Realtime_Send(array(
                'event'  => 'comment_new',
                'to'    => $oUserTo->getId(),
                'from'  => $oUserComment->getId(),

                'user'  => $oUserComment->getLogin(),
                'title' => $this->cutStr($oTopic->getTitle(),30),
                'text'  => $this->cutStr($oComment->getText()),
                'link'  => $oTopic->getUrl().'#comment'.$oComment->getId(),
                'author_photo' => $oUserComment->getProfileAvatarPath(48),
            ));
        }
        parent::SendCommentNewToAuthorTopic($oUserTo,$oTopic,$oComment,$oUserComment);
    }

    /**
     * Отправляет юзеру уведомление о новом топике в блоге, в котором он состоит
     *
     * @param ModuleUser_EntityUser $oUserTo
     * @param ModuleTopic_EntityTopic $oTopic
     * @param ModuleBlog_EntityBlog $oBlog
     * @param ModuleUser_EntityUser $oUserTopic
     */
    public function SendTopicNewToSubscribeBlog(ModuleUser_EntityUser $oUserTo, ModuleTopic_EntityTopic $oTopic, ModuleBlog_EntityBlog $oBlog, ModuleUser_EntityUser $oUserTopic) {
        /**
         * Проверяем можно ли юзеру рассылать уведомление
         */
        if ($oUserTo->getSettingsMomentNoticeNewTopic()) {
            $this->PluginRealtime_Realtime_Send(array(
                'event'  => 'topic_new',
                'to'    => $oUserTo->getId(),
                'from'  => $oUserTopic->getId(),

                'user'  => $oUserTopic->getLogin(),
                'title'  => $this->cutStr($oBlog->getTitle(),30),
                'id'    => $oTopic->getId(),
                'topic' => $this->cutStr($oTopic->getTitle(),30),
                'text'  => $this->cutStr($oTopic->getText()),
                'link'  => $sPath,
                'author_photo' => $oUserFrom->getProfileAvatarPath(48)
            ));
        }
        parent::SendTopicNewToSubscribeBlog($oUserTo,$oTopic,$oBlog,$oUserTopic);
    }

    /**
     * Отправляет пользователю сообщение о добавлении его в друзья
     *
     * @param ModuleUser_EntityUser $oUserTo
     * @param ModuleUser_EntityUser $oUserFrom
     */
    public function SendUserFriendNew(ModuleUser_EntityUser $oUserTo,ModuleUser_EntityUser $oUserFrom, $sText,$sPath) {
        /**
         * Проверяем можно ли юзеру рассылать уведомление
         */
        if ($oUserTo->getSettingsMomentNoticeNewFriend()) {
            $this->PluginRealtime_Realtime_Send(array(
                'event'  => 'user_friend_new',
                'to'    => $oUserTo->getId(),
                'from'  => $oUserFrom->getId(),

                'user'  => $oUserFrom->getLogin(),
                'text'  => $this->cutStr($sText),
                'link'  => $sPath,
                'author_photo' => $oUserFrom->getProfileAvatarPath(48)
            ));
        }
        parent::SendUserFriendNew($oUserTo,$oUserFrom, $sText,$sPath);
    }

    /**
     * Отправляет пользователю сообщение о приглашение его в закрытый блог
     *
     * @param ModuleUser_EntityUser $oUserTo
     * @param ModuleUser_EntityUser $oUserFrom
     */
    public function SendBlogUserInvite(ModuleUser_EntityUser $oUserTo,ModuleUser_EntityUser $oUserFrom, ModuleBlog_EntityBlog $oBlog,$sPath) {
        $this->PluginRealtime_Realtime_Send(array(
            'event'  => 'blog_invite_new',
            'to'    => $oUserTo->getId(),
            'from'  => $oUserFrom->getId(),

            'user'  => $oUserFrom->getLogin(),
            'title'  => $this->cutStr($oBlog->getTitle(),30),
            'link'   => $oBlog->getUrl(),
            'author_photo' => $oUserFrom->getProfileAvatarPath(48)

        ));
        parent::SendBlogUserInvite($oUserTo,$oUserFrom,$oBlog,$sPath);
    }
}

?>
