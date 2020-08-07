class ApplicationController < ActionController::API

  private
    def current_user
      @user ||= User.find_by(id: @user_id) if @user_id
    end
end
