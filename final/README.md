# Skew: A Newspaper Bias Meter

> A Vue.js project
> This project was created by Dylan Vanelli and Sean Snider for CS290.
> As of now (Saturday March 28), we have not figured out how to deploy the application.
> However, the instructions below provide a sure-fire way to run the application locally on your machine. Since the data within the application uses Firebase, all interactions made by the user are recorded and update the application in real time for all users.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

#About the project: 

•Interactively enter data or load data from an online source that is organized within a database
	o User may vote on the bias of a news source, share whether they agree with the current bias rating, and if appropriate, upload a newspaper.
	o Data on firebase: newspapers (contains all information related to the newspaper, updated in real time), user information (vote and approval history, updated in real time)
•Interact with the cumulative data in a useful way
	o Data on each newspaper is visualized using Chart.js, which allows data fields to be manipulated to alter the visualization.
•	View the cumulative or individual data in multiple ways
	o User voting and approval statistics are constantly collected and computed into meaningful statistics (ex. Average approval rating, voting history, personal bias). One key function of user data is respecting the ability to create new newspapers for users that express significant personal bias (ex. Voting on Liberal-leaning papers as Conservative).
• Keep track of individual preferences regarding users of your web site
	oUser voting habits are stored on Firebase and retrieved on login. As mentioned above, these voting habits make for meaningful statistics.

#Roles

Check the application "About" tab for information on different types of users and their abilities.

#User Feedback

Christian Leonard: "The website feels pretty easy to navigate. I really liked the visualizations, but wasn't sure why you seperated the bias votes and the approval ratings... might look better if they were side to side. The Emojis are great though. Makes the site seem modern and social-media oriented somehow. The site also feels really fast. The interface is really reactive and helps with the user's interactions."

