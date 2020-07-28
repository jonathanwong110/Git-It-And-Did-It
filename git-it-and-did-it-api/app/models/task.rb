class Task < ApplicationRecord
  has_many :user_tasks
  has_many :users, through: user_tasks
  validates_presence_of :title, category, description, status, priority, :user
end
