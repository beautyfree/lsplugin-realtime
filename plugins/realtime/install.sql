ALTER TABLE  `prefix_user`
ADD  `user_settings_moment_notice_new_topic` TINYINT( 1 ) NOT NULL DEFAULT  '1',
ADD  `user_settings_moment_notice_new_comment` TINYINT( 1 ) NOT NULL DEFAULT  '1',
ADD  `user_settings_moment_notice_new_talk` TINYINT( 1 ) NOT NULL DEFAULT  '1',
ADD  `user_settings_moment_notice_reply_comment` TINYINT( 1 ) NOT NULL DEFAULT  '1',
ADD  `user_settings_moment_notice_new_friend` TINYINT( 1 ) NOT NULL DEFAULT  '1'
