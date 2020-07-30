class UserCommentSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :user_id, :comment_id
  belongs_to :user
  belongs_to :comment
end
