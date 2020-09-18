class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]
  
  def index
    @tasks = Task.all
    render json: @tasks, status: 200
  end

  def show
    render json: @task, status: 200
  end

  def user_tasks
    @tasks = Task.where(user_id: params[:user_id])
    @tasks1 = Task.where.select { |task| task.user.id == task.user_id }
    render json: @tasks1, status: 200
  end

  def category
    @tasks = Task.where(category: params[:category])
    render json: @tasks, status: 200
  end

  def priority
    @tasks = Task.where(priority: params[:priority])
    render json: @tasks, status: 200
  end

  def status
    @tasks = Task.where(status: params[:status])
    render json: @tasks, status: 200
  end

  def assignee
    @tasks = Task.where(assignee: params[:assignee])
    render json: @tasks, status: 200
  end

  def create
    @task = Task.new(task_params)
    if @task.save
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
    render status: 204
  end

  private
    def set_task
      @task = Task.find(params[:id])
    end

    def task_params
      params.require(:task).permit(:title, :category, :description, :status, :priority, :assignee, :user_id)
    end
end
