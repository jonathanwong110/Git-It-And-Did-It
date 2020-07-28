class Task < ApplicationRecord
  has_many :user_tasks
  belongs_to :users, through: user_tasks
  validates_presence_of :title, category, description, status, priority, :user
end
