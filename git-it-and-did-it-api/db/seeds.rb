# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create([
  { email: '123@testing.com', username: 'JW', password: '12345' },
  { email: '123@testing.com', username: 'OM', password: '12345' },
  { email: '123@testing.com', username: 'KL', password: '12345' }
])

Task.create([
  { title: 'testing1', category: 0, description: 'testing1', status: 0, priority: 0, user_id: 1 },
  { title: 'testing2', category: 0, description: 'testing2', status: 0, priority: 1, user_id: 2 },
  { title: 'testing3', category: 0, description: 'testing3', status: 1, priority: 2, user_id: 3 }
])

Comment.create([
  { content: 'testing1', user_id: 3 },
  { content: 'testing2', user_id: 2 },
  { content: 'testing3', user_id: 1 }
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