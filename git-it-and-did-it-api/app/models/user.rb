class User < ApplicationRecord
  has_secure_password
  has_many :user_tasks
  has_many :tasks, through :user_tasks
  validates_presence_of :email, :username, :password
end
