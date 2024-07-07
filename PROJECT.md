Ecommerce application

requirements(all not done)
#home
#login and logout
#sign up
#cards
#explore(can be belong to home)
#search
#upload product
#Dashboard(should be last)

#techstack
Nextjs
prisma
postgresql
bcrypt
uploadmything - for images
nextauth - for authentication
Stripe or anything that can be for payment
bcrypt -for password hashing

#optionl tech stack
Sentry - for tracking and monitoring
Zustand - for global state management
socketio - for notificatin but should be last


#format hashPassword
const hashPassword = bcrypt.hashSync(password, 10)


MODEL OF BUSINESS IN PRISMA
Business Name
description
LOGO for the business
banner color refercence on DISKORD APP GITHUB
category
ContactNumber
Email For notification
Orders By client(Different from items)
Rating
Reviews LATER