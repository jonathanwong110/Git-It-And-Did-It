class Comment < ApplicationRecord
  has_many :user_comments
  belongs_to :user
  has_many :task_comments
  belongs_to :task
  validates_presence_of :content

  delegate :username, :to => :user

end
