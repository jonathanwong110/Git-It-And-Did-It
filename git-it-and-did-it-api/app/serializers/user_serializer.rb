class UserSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at, :email, :profile_icon, :username, :password
  has_many :tasks
  has_many :comments
end
