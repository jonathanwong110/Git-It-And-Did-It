Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post '/login' => 'auth#login'
      resources :users
      resources :tasks
      resources :comments
    end
  end
end
