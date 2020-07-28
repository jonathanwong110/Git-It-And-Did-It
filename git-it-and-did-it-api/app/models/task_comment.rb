class TaskComment < ApplicationRecord
  belongs_to :task
  belongs_to :user
  belongs_to :comment
end
