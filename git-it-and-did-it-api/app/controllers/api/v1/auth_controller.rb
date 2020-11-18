class Api::V1::AuthController < ApplicationController
  skip_before_action :authorized, only: [:login]

  def login
    @user = User.find_by(username: params[:username])
    if !@user
      render json: { 
        errors: { Username: [' does not exist'] }
      }, status: 500
    elsif @user && @user.authenticate(params[:password])
      token = encode_token({ user_id: @user.id })
      render json: { user: UserSerializer.new(@user), jwt: token }, status: 200
    else
      render json: { 
        errors: { Password: [' is invalid!'] }
      }, status: 500
    end
  end
  
end