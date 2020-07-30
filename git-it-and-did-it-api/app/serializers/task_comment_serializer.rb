class TaskCommentSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :task_id, :comment_id
  belongs_to :task
  belongs_to :comment
end
