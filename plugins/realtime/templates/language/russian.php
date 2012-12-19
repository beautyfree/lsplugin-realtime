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

return array(
    // Новый комментарий в его топике
    'comment_new' => '<span class="notifier_author_quote"><a class="mem_link" href="'.Router::GetPath('profile').'{user}">{user}</a></span> {text}',
    // Ответ на его комментарий
    'comment_reply' => '<span class="notifier_author_quote"><a class="mem_link" href="'.Router::GetPath('profile').'{user}">{user}</a></span> {text}',
    // Новый топик в блог, в котором он состоит
    'topic_new' => '<a href="'.Router::GetPath('profile').'{user}">{user}</a> опубликовал в блоге <b>«{blog}»</b> новый топик - <a href="'.Router::GetPath('blog').'{id}.html">{topic}</a>',
    // Новое личное сообщение
    'talk_new' => '<span class="notifier_author_quote"><a class="mem_link" href="'.Router::GetPath('profile').'{user}">{user}</a></span> {text}',
    // Комментарий на личное сообщение
    'talk_comment_new' => '<span class="notifier_author_quote"><a class="mem_link" href="'.Router::GetPath('profile').'{user}">{user}</a></span> {text}',
    // Заявка на добавление в друзья
    'user_friend_new' => '<span class="notifier_author_quote"><a class="mem_link" href="'.Router::GetPath('profile').'{user}">{user}</a></span> хочет добавить Вас в друзья',
    // Приглашение в закрытый блог
    'blog_invite_new' => '<span class="notifier_author_quote"><a class="mem_link" href="'.Router::GetPath('profile').'{user}">{user}</a></span> приглашает Вас вступить в блог {title}',

    'comment_new_title' => 'Новый комментарий на пост {title}',
    'comment_reply_title' => 'Новый ответ на ваш комментарий',
    'topic_new_title' => 'Новый топик в блоге {title}',
    'talk_new_title' => 'Новое сообщение {title}',
    'talk_comment_new_title' => 'Новый ответ на сообщение {title}',
    'user_friend_new_titile' => 'Новая заявка на добавление в друзья',
    'blog_invite_new' => 'Новое приглашение в закрытый блог {title}',


    'settings_moment_notice' => 'Моментальные уведомления на сайте:'
);

?>
