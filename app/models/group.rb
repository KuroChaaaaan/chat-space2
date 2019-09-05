class Group < ApplicationRecord
  has_many :groups_users
  has_many :messages
  has_many :users, through: :groups_users
  validates :name, presence: true, uniqueness: true

  def show_last_message
    if (last_message = messages.last).present?
      last_message.message? ? last_message.message : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end