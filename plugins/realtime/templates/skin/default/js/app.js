/***********************************************************************
 * Обработка
 */

jQuery(function($) {
    if(typeof(USER_ID) !== "undefined") {
        socket.on('message', function (msg) {
            var currentPage = window.location.href.split('#')[0].replace(/\/+$/,'');
            var messagePage = msg.link ? msg.link.split('#')[0].replace(/\/+$/,'') : null;
            // Если на странице есть комменты и мы получили ссылку на коммент
            var isCommentPage = msg.link ? (msg.link.indexOf('#') && $('#update-comments').length ? true : false) : false;

            var bExit = false;
            switch(msg.event) {
              case 'comment_new':
              case 'comment_reply':
                // Если комментарий с той же страницы где мы находимся
                if(isCommentPage && currentPage == messagePage)
                    bExit = true;
                break;
              case 'talk_new':
                // Увеличиваем счетчик новых личных сообщений
                $('#new_messages').children().text(parseInt($('#new_messages').text()) + 1);
                break;
              case 'talk_comment_new':
                if(isCommentPage && currentPage == messagePage) {
                    ls.comments.nComment(msg);
                    bExit = true;
                }
                // От самого себя уведомления не надо
                if(msg.from == USER_ID)
                  return;
                break;
              case 'comment':
                ls.comments.nComment(msg);
                bExit = true;
            }

            // Если просим выйти
            if(bExit) {
                // Проигрывание звука если окно не активно
                ls.notification.playSound();
                return;
            }

            // Смотрим последнню открытую вкладку и если данная страница
            // не является ей, уведомление не выводим
            if($.cookie('LAST_OPEN_TAB') != HASH_CURRENT_TAB)
                return;

            // Уведомление
            ls.notification.addMessage(msg);
        });
    }
});


/***********************************************************************
 * Новые методы
 */

var ls = ls || {};

ls.showFormNotification = function(id,key) {
    $('#form_send_notification #notification_id').val(id);
    $('#form_send_notification #notification_key').val(key);
    $('#form_send_notification').show(); //jqmShow();
};

ls.ajaxSendNotification = function(form) {
    ls.ajaxSubmit(aRouter['realtime']+'ajaxsend',form,function(data){
        if (data.bStateError) {
            ls.msg.error(data.sMsgTitle,data.sMsg);
        } else {
            $('#form_send_notification').hide();
        }
    });
};

ls.comments.nComment = function (obj) {
    // Меняем значение последнего айди на текущий
    $("#comment_last_id").val(obj.comment.id);
    // Увеличиваем количество комментов на 1
    $('#count-comments').text(parseInt($('#count-comments').text())+1);

    // Увеличиваем количество новых комментов на 1
    ls.comments.setCountNewComment(1+ls.comments.aCommentNew.length);
    // Добавляем коммент в массиа новые комментарии
    ls.comments.aCommentNew.push(obj.comment.id);
    // Вставляем html комментария в необходимую позицию на странице
    ls.comments.inject(obj.comment.idParent, obj.comment.id, obj.comment.html);

    // Удаляем подсветку у комментариев
    $('.comment').each(function(index, item){
        $(item).removeClass(this.options.classes.comment_new+' '+this.options.classes.comment_current);
    }.bind(this));

    if (obj.from == USER_ID) {
        this.toggleCommentForm(this.iCurrentShowFormComment, true);
    }

    if (obj.from == USER_ID && $('#comment_id_'+obj.comment.id).length) {
        this.scrollToComment(obj.comment.id);
    }

    this.checkFolding();
};

/***********************************************************************
 * Переопределяем методы
 */

ls.comments.add = function(formObj, targetId, targetType) {
    if (this.options.wysiwyg) {
        $('#'+formObj+' textarea').val(tinyMCE.activeEditor.getContent());
    }
    formObj = $('#'+formObj);

    $('#form_comment_text').addClass(this.options.classes.form_loader).attr('readonly',true);
    $('#comment-button-submit').attr('disabled', 'disabled');

    ls.ajax(this.options.type[targetType].url_add, formObj.serializeJSON(), function(result){
        $('#comment-button-submit').removeAttr('disabled');
        if (!result) {
            this.enableFormComment();
            ls.msg.error('Error','Please try again later');
            return;
        }
        if (result.bStateError) {
            this.enableFormComment();
            ls.msg.error(null,result.sMsg);
        } else {
            this.enableFormComment();
            $('#form_comment_text').val('');
        }
    }.bind(this));
}

ls.comments.inject = function(idCommentParent, idComment, sHtml) {
    var newComment = $('<div>', {'class': 'comment-wrapper', id: 'comment_wrapper_id_'+idComment}).html(sHtml);
    if (idCommentParent) {

        var countTree = $('#comment_wrapper_id_'+idCommentParent).parentsUntil('#comments').length;
        if(countTree == MAX_TREE) {
            var prevCommentParent = $('#comment_wrapper_id_'+idCommentParent).parent();
            idCommentParent = parseInt(prevCommentParent.attr('id').replace('comment_wrapper_id_',''));
        }

        $('#comment_wrapper_id_'+idCommentParent).append(newComment);
    } else {
        $('#comments').append(newComment);
    }
    ls.hook.run('ls_comment_inject_after',arguments,newComment);
}

ls.comments.initEvent = function() {
    $('#form_comment_text').bind('keyup', function(e) {
        key = e.keyCode || e.which;
        if(e.ctrlKey && (key == 13)) {
            $('#comment-button-submit').click();
            return false;
        }
    });

    if(this.options.folding){
        $(".folding").live('click',function(e){
            if ($(e.target).hasClass("folded")) {
                this.expandComment(e.target);
            } else {
                this.collapseComment(e.target);
            }
        }.bind(this));
    }
}
