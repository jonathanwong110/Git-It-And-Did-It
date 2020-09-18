Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      post '/login' => 'auth#login'
      resources :users
      resources :tasks do 
        collection do
          get '/usertasks/:user_id' => 'tasks#user_tasks'
          get '/category/:category' => 'tasks#category'
          get '/priority/:priority' => 'tasks#priority'
          get '/status/:status' => 'tasks#status'
          get '/assignee/:assignee' => 'tasks#assignee'
        end
      end
      resources :comments do 
        collection do
          get '/taskcomments/:task_id' => 'comments#task_comments'
        end
      end
    end
  end
end
