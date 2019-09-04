class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :context, presence: true, unless: :image?
end
