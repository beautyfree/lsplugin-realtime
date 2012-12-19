function cancelEvent(e) {
    e = e || window.event;
    if(!e) return false;
    e = e.originalEvent || e;
    if(e.preventDefault) e.preventDefault();
    if(e.stopPropagation) e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}

jQuery(function($){

  var config = window.NotifierjsConfig = {
    defaultTimeOut: 0,
    container: $("<div></div>")
  };

  $(document).ready(function() {
    config.container.attr("id","notifiers_wrap").addClass('fixed');
    $("body").append(config.container);
  });

  var Notifier = window.Notifier = (function($){

    this.notify = function(j, message, title, hash, timeOut) {
      notificationElement = $("<div>").addClass('notifier_baloon clear_fix');
      this.hash = hash;
      timeOut = timeOut >= 0 ? timeOut : config.defaultTimeOut;
      this.timeOut = timeOut;
      /*
       * Верхняя часть
       */
      headElement = $("<div/>").addClass('notifier_baloon_head clear_fix');
      /* Заголовок */
      if (title) {
        var titleElement = $("<div/>").addClass('notifier_baloon_title fl_l');
        titleElement.append(title);
        headElement.append(titleElement);
      }

      /* Крестик */
      var closeWrapElement = $("<div/>").addClass('notifier_close_wrap fl_r');
      closeWrapElement.hover(function(){
          closeWrapElement.addClass('notifier_close_over');
      },function(){
          closeWrapElement.removeClass('notifier_close_over');
      });
      var closeElement = $("<a/>").addClass('notifier_close');

      /*
       * Средняя часть
       */
      var bodyElement = $("<div/>").addClass('notifier_baloon_body');
      bodyElement.append('<table cellpadding="0" cellspacing="0" width="100%">' +
              '<tr>' +
                  (j.author_photo ?
                  '<td class="notifier_image_wrap">' +
                      '<div class="notifier_image_wrap">' +
                          (j.user ? '<a href="' + aRouter['profile'] + j.user + '">' :'') +
                              '<img src="' + j.author_photo + '" class="notifier_image" />' +
                          (j.user ? '</a>':'') +
                      '</div>' +
                  '</td>'
                  :'') +

                  '<td class="notifier_baloon_msg">' +
                      '<div class="notifier_baloon_msg wrapped" style="width: ' + (300 - 60 * ((j.author_photo && j.add_photo) ? 2 : ((j.add_photo || j.author_photo) ? 1 : 0))) + 'px;">'
                          + message +
                      '</div>' +
                  '</td>' +
              '</tr>' +
          '</table>'
      );

        notificationElement.bind("mouseover", function() {
          ls.notification.freezeEvents();
          $(this).addClass('notifier_baloon_over');
        });
        notificationElement.bind("mouseout", function() {
          ls.notification.unfreezeEvents();
          $(this).removeClass('notifier_baloon_over');
        });

      notificationElement.bind('mousedown', function(e){
          e = (e.originalEvent || e) || window.event;
          var btn = e.which,
              nohide = false;

          if(btn == 1 && (e.ctrlKey || $.browser.safari && e.metaKey)) {
              btn = 2
              if($.browser.safari) nohide = true;
          }

          if((e.target || e.srcElement).tagName == 'A') {
              switch(btn) {
                case 1: // left button
                    break;
                case 3: // right button
                    break;
              }
              return;
          }

          switch(btn) {
              case 1: // left buttin
                $.jStorage.deleteKey(hash);
                $(this).closest('.notifier_baloon_wrap').remove();
                window.open(j.link, '_self');
                break;
              case 2: // middle
                var wnd = window.open(j.link, '_blank');
                try {wnd.blur(); window.focus();} catch (e) {}
                if(!nohide) {
                    $.jStorage.deleteKey(hash);
                    $(this).closest('.notifier_baloon_wrap').remove();
                }
                break;
              case 3: // right
                if($.browser.mozilla) {
                    return;
                }
          }

          return cancelEvent(e);
      });

      closeWrapElement.bind("mousedown", function(e) {
          $.jStorage.deleteKey(hash);
          $(this).closest('.notifier_baloon_wrap').remove();
          return cancelEvent(e);
      });

      closeWrapElement.append(closeElement);
      headElement.append(closeWrapElement);
      notificationElement.append(headElement);
      notificationElement.append(bodyElement);

      var wrap = $("<div>").addClass('notifier_baloon_wrap');
      wrap.append(notificationElement);
      config.container.prepend(wrap);


      var v = {
        timeOut: timeOut,
        hash: hash,
        notificationElement: wrap
      }
      v.startFading = function() {
        v.notificationElement.fadeOut(function(){
            var pos = indexOf(ls.notification.messages, v);
            if (pos != -1)
              ls.notification.messages.splice(pos, 1);
            $(v.notificationElement).remove();
            $.jStorage.deleteKey(v.hash);
        });
      };

      ls.notification.messages.push(v);
    }

    return this;
  }).call(Notifier || {},jQuery);


}(jQuery));
