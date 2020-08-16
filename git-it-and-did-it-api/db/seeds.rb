# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create([
  { email: 'JW@company.com', profile_icon: 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png', username: 'JW', password: '12345' },
  { email: 'OM@company.com', profile_icon: 'https://cdn3.iconfinder.com/data/icons/shipping-and-delivery-2-1/512/54-512.png', username: 'OM', password: '12345' },
  { email: 'KL@company.com', profile_icon: 'https://f1.pngfuel.com/png/726/597/190/graphic-design-icon-customer-service-avatar-icon-design-call-centre-yellow-smile-forehead-png-clip-art.png', username: 'KL', password: '12345' }
])

Task.create([
  { title: 'task 1', category: 0, description: 'task description 1', status: 0, priority: 0, assignee: "KL", user_id: 1 },
  { title: 'task 2', category: 0, description: 'task description 2', status: 1, priority: 1, assignee: "JW", user_id: 2 },
  { title: 'task 3', category: 1, description: 'task description 3', status: 2, priority: 2, assignee: "OM", user_id: 3 }
])

Comment.create([
  { content: 'comment 1', user_id: 3, task_id: 1 },
  { content: 'comment 2', user_id: 2, task_id: 2 },
  { content: 'comment 3', user_id: 1, task_id: 3 }
])

UserTask.create([
  { user_id: 1, task_id: 1 },
  { user_id: 2, task_id: 2 },
  { user_id: 3, task_id: 3 }
])

UserComment.create([
  { user_id: 3, comment_id: 1 },
  { user_id: 2, comment_id: 2 },
  { user_id: 1, comment_id: 3 }
])

TaskComment.create([
  { task_id: 1, comment_id: 1 },
  { task_id: 2, comment_id: 2 },
  { task_id: 3, comment_id: 3 }
])

