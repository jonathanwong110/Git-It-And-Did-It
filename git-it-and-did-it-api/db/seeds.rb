User.create([
  { email: 'jw@company.com', profile_icon: 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png', username: 'jw', password: '12345' },
  { email: 'om@company.com', profile_icon: 'https://cdn3.iconfinder.com/data/icons/shipping-and-delivery-2-1/512/54-512.png', username: 'om', password: '12345' },
  { email: 'kl@company.com', profile_icon: 'https://f1.pngfuel.com/png/726/597/190/graphic-design-icon-customer-service-avatar-icon-design-call-centre-yellow-smile-forehead-png-clip-art.png', username: 'kl', password: '12345' }
])

Task.create([
  { title: 'mobile issue', category: 0, description: 'the homepage takes too long to load', status: 0, priority: 0, assignee: "kl", user_id: 1 },
  { title: 'graphic glitch', category: 0, description: 'the live background spazzes', status: 1, priority: 1, assignee: "jw", user_id: 2 },
  { title: 'needs update', category: 1, description: 'we can optimize the code for better performance', status: 2, priority: 2, assignee: "om", user_id: 3 }
])

Comment.create([
  { content: 'I can get this done by today', user_id: 3, task_id: 1 },
  { content: 'Me and KL can get this done by the end of the week', user_id: 2, task_id: 2 },
  { content: 'Testing', user_id: 1, task_id: 3 }
])
