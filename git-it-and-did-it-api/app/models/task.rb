class Task < ApplicationRecord
  has_many :user_tasks
  belongs_to :user
  has_many :task_comments
  has_many :comments, through: :task_comments
  validates_presence_of :title, :category, :description, :status, :priority, :user

  enum category: { bugs: 0, new_feature: 1 }
  enum status: { in_progress: 0, finished: 1 }
  enum priority: { low: 0, medium: 1, high: 2 }
end
