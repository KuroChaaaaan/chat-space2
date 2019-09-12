json.array! @messages do |message|
  json.id           message.id
  json.user_name    message.user.name
  json.message      message.message
  json.image        message.image.url
  json.post_time   message.created_at.strftime("%Y/%m/%d %H:%M")
end