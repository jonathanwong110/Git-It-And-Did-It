class CommentSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :content, :user_id, :task_id, :username
  belongs_to :user
  belongs_to :task
end
