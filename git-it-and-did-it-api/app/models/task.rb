class Task < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy
  validates_presence_of :title, :category, :description, :status, :priority, :assignee, :user

  enum category: { bugs: 0, new_features: 1 }
  enum status: { to_do: 0, in_progress: 1, finished: 2 }
  enum priority: { low: 0, medium: 1, high: 2 }
end
