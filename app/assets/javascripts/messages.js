$(document).on('turbolinks:load', function(){
  function buildHTML(comment){
    var img = comment.image ? `<img class="message-detail__text" src="${ comment.image }">` : "";
    var text = comment.message ? `${ comment.message }` : "";
    var html = `<div class="message-detail" data-message-id="${comment.id}">
                  <div class="message-detail__zone">
                    <div class="message-detail__zone__toker">
                      ${comment.user_name}
                    </div>
                    <div class="message-detail__zone__date">
                      ${comment.post_time}
                    </div>
                  </div>
                  <div class="message-detail__text">
                    <div class="message-detail__text">
                      ${text}
                    </div>
                    ${img}       
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    $('.form-zone__config__detail-send').removeAttr('data-disable-with');

    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message').get(0).reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
    })
    .fail(function(){
      alert('Error');
    })
  });
  

  var reloadMessages = function () {
    
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      
      var last_message_id = $('.message-detail:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      $.ajax({ //ajax通信で以下のことを行う
        url: 'api/messages#index {:format=>"json"}', //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'GET', //メソッドを指定
        dataType: 'json', //データはjson形式
        data: {id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        var upHtml = '';
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          upHtml = buildHTML(message); //メッセージが入ったHTMLを取得
          $('.messages').append(upHtml);//メッセージを追加
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function () {
        alert('AutomaticUpdateFailure');//ダメだったらアラートを出す
      });
    }
  }
  setInterval(reloadMessages, 5000);
});