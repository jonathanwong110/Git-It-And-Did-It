class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]
  
  def index
    @tasks = Task.all
    render json: @tasks, status: 200
  end

  def show
    render json: @task, status: 200
  end

  def create
    @task = Task.new(task_params)
    @user = User.find_by(id: @task.user_id)
    if @task.save
      @user.tasks << @task
      render json: @task, status: 200
    end
  end

  def update
    if @task.update(task_params)
      render json: @task, status: 200
    end
  end

  def destroy
    @task.destroy
    render json: {taskId: @task.id}
  end

  private
    def set_task
      @task = Task.find(params[:id])
    end

    def task_params
      params.require(:task).permit(:title, :category, :description, :status, :priority, :assignee, :user_id)
    end
end
