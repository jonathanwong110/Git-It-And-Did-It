class User < ApplicationRecord
  has_secure_password
  has_many :tasks
  has_many :comments
  validates_presence_of :email, :profile_icon, :username, :password
  validates :username, uniqueness: { case_sensitive: false }
end
