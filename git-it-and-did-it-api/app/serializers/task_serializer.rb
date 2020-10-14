class TaskSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :title, :category, :description, :status, :priority, :assignee, :user_id
  belongs_to :user
  # has_many :comments
end
