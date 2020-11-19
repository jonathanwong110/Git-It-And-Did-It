class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]
  before_action :set_user, only: [:show, :update, :destroy]
  
  def index
    @users = User.all
    render json: @users, status: 200
  end

  def show
    render json: @user, status: 200
  end

  def create
    params[:user][:username].downcase!
    params[:user][:email].downcase!
    @user = User.new(user_params)
    if @user.save
      @token = encode_token(user_id: @user.id)
      render json: { user: UserSerializer.new(@user), jwt: @token}, status: 200
    else
      render json: { 
        errors: @user.errors 
      }, status: 500 
    end
  end

  def update
    params[:user][:username].downcase!
    params[:user][:email].downcase!
    if @user.update(user_params)
      render json: @user, status: 200
    else
      render json: { 
        errors: @user.errors 
      }, status: 500 
    end
  end

  def destroy
    @user.destroy
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email, :profile_icon, :username, :password)
    end
    
end
