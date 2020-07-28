class Comment < ApplicationRecord
  has_many :user_comments
  belongs_to :user, through :user_comment
  validates_presence_of :description
end
