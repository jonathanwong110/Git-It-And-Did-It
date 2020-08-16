class TaskSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :title, :category, :description, :status, :priority, :assignee, :user_id
  has_many :user_tasks
  belongs_to :user
  has_many :task_comments
  has_many :comments, through: :task_comments
end
