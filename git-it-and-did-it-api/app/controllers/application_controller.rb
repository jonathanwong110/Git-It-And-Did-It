class ApplicationController < ActionController::API
  # protect_from_forgery with: :exception

  def logged_in?
    !!session[:user_id]
  end
  
  def current_user
    if session[:user_id]
      @current_user ||= User.find_by(id: session[:user_id])
    end
  end
  
  # def require_login
  #   unless logged_in?
  #     render json: {message: 'Please log in to view information!'}
  #     redirect_to login_path
  #   end
  # end

end
