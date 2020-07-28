class Task < ApplicationRecord
  has_many :user_tasks
  belongs_to :user, through: user_tasks
  has_many :task_comments
  has_many :comments, through :task_comments
  validates_presence_of :title, category, description, status, priority, :user
end
