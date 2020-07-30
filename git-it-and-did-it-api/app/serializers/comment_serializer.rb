class CommentSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :content, :user_id, :task_id
  has_many :user_comments
  belongs_to :user
  has_many :task_comments
  belongs_to :task
end
