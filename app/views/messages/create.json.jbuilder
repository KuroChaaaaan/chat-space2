json.user_id   @message.user_id
json.user_name @message.user.name
json.message   @message.message
json.image     @message.image.url
json.post_time @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id        @message.id