# websocketc
Website to provide easy interface between users and their own servers running websocketd.

# Currently under active development

# **Updated** CIS197 Milestones

## Milestone 1
* Main functionality flow from websocketd to displaying text in browser
* Ability to add and remove WS severs
* Basic UI to facilitate the above functionality 

## Milestone 2
* Beginning of database integration
* Beginning of user login
* Full functionality is better in last milestone, this is work in progress for data persistence and users

## Milestone 3
* Finalize auth/database -- Auth and database now works as was expected for Milestone 2
* UI Prettiness (move login routing to client)
* Better Error handling
* Refactor code better
* Save past received messages
* Clean up routes to look nicer


## To run locally:
* npm run watch 
* In a new terminal, npm run start
* Navigate to websocketc.com (currently redirects to localhost:3000 on the DNS side)
* For full funcitonality, make sure you have a websocketd server running!