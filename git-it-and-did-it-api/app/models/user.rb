class User < ApplicationRecord
  has_secure_password
  has_many :user_tasks
  has_many :tasks, through: :user_tasks
  has_many :user_comments
  has_many :comments, through: :user_comments
  validates_presence_of :email, :username, :password
  validates :username, uniqueness: { case_sensitive: false }
end
