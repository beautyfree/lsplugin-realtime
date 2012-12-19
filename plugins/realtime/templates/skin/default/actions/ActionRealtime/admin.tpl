{include file='header.tpl'}
<script>
$(document).ready(function() {
    socket.on('connect', function () {
        socket.on('admin', function (msg) {

            $.each(msg,function(index,value){
                $('#sessions tbody').append('<tr><td>'+value.id+'</td><td>'+value.key+'</td><td><a href="#" onclick="ls.showFormNotification('+value.id+',\''+value.key+'\')">Отправить</a></td></tr>');
            });

        });
        ls.ajax(aRouter['realtime']+'ajaxupdate');
    });
});
</script>
<table id="sessions">
    <thead>
        <tr>
            <td>ID пользователя</td>
            <td>Ключ</td>
            <td>Сообщение</td>
        </tr>
    </thead>
    <tbody></tbody>
</table>

<form method="POST" action="#" class="popup jqmWindow" id="form_send_notification">
    <h3>Отправка уведомления</h3>

    <input type="hidden" name="notification_id" id="notification_id" value="" />
    <input type="hidden" name="notification_key" id="notification_key" value="" />

    <p>
        <label>Текст:<br />
        <input type="text" name="notification_text" value="" class="input-wide" /></label>
    </p>

    <input type="button" value="Отправить" class="button" onclick="ls.ajaxSendNotification('form_send_notification');" />
</form>

{include file='footer.tpl'}
