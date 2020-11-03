class User < ApplicationRecord
  has_secure_password
  has_many :tasks
  has_many :comments
  validates_presence_of :email, :profile_icon, :username, :password
  validates :username, :email, uniqueness: { case_sensitive: false }
  validates_length_of :username, in: 2..9, too_long: 'cannot be more than 9 characters', too_short: 'must be longer than 2 characters'
end
