class UserSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :email, :profile_icon, :username, :password
  has_many :user_tasks
  has_many :tasks, through: :user_tasks
  has_many :user_comments
  has_many :comments, through: :user_comments
end
