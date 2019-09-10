$(document).on('turbolinks:load', function(){
  function buildHTML(comment){
    var img = comment.image ? `<img class="message-detail__text" src="${ comment.image }">` : "";
    var text = comment.message ? `${ comment.message }` : "";
    var html = `<div class="message-detail">
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
  })
})