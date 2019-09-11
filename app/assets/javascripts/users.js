$(function(){
  var user_search = $("#user-search-result");
  var existing_member = $(".chat-group-users.js-add-user");

  function appendUser(invitation) {
    
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${invitation.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${invitation.id}" data-user-name="${invitation.name}">追加</a>
              </div>`
    user_search.append(html);
  }
  function changeUser(destroyName, destoryId) {
    var html =`
              <div class='chat-group-user clearfix js-chat-member'>
                <input name='group[user_ids][]' type='hidden' value='${destoryId}'>
                  <p class='chat-group-user__name'>${destroyName}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    existing_member.append(html);
  };
  function appendErrMsgToHTML(msg) {
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
              </div>`
    user_search.append(html);
  }
  $("#user-search-field").on("keyup",function(){
    var decision = ""
    var input = $("#user-search-field").val();
    var mainHuman = $(".mainId").val();
    var inviHuman = $(".chat-group-user.clearfix.js-chat-member").val();
    console.log(mainHuman);


    if (input !== decision) {
      $.ajax({
        type: 'GET',
        url:  '/users',
        data: {keyword: input},
        dataType: 'json'
      })
      
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length === 0) {
          appendErrMsgToHTML("一致するユーザーが見つかりません");
        } else {
          users.forEach(function(user){
            if (mainHuman == user.id ) {
              $('#user-search-result').empty();
            } else {
              appendUser(user);
            }
          });
        }
      })
      .fail(function() {
        alert('Error');
      });
    }
  });
  
  $(document).on('click', '.user-search-add', function(){
    $(this).parent().remove();
    var setName = $(this).data('user-name');
    var setId = $(this).data('user-id');
    changeUser(setName, setId);
  })

  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  })
});