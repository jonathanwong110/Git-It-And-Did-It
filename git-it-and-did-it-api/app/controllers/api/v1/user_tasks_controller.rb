class Api::V1::UserTasksController < ApplicationController

  def create
    @user_task = @user.where(user_id: current_user.id)
    render @task
  end

  def destroy
    @user_task = @user.where(user_id: current_user.id)
    @user_task.destroy
    render json: {message: 'You have deleted the task'}
  end

end
