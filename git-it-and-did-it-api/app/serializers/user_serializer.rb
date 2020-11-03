class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :profile_icon, :username, :password
end
