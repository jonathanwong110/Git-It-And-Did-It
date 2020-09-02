class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :profile_icon, :username, :password
  has_many :tasks
end
