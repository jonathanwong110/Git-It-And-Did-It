class Comment < ApplicationRecord
  has_many :user_comments
  belongs_to :user, through :user_comment
  has_many :task_comments
  belongs_to :task, through :task_comments
  validates_presence_of :description
end
