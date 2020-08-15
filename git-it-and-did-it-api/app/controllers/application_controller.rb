class ApplicationController < ActionController::API

  def current_user
    @user ||= User.find_by(id: @user_id) if @user_id
  end
  
end
