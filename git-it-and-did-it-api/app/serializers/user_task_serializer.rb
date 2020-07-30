class UserTaskSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :user_id, :task_id
  belongs_to :user
  belongs_to :task
end
