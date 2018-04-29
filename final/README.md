# Skew: A Newspaper Bias Meter

> A Vue.js project
> This project was created by Dylan Vanelli and Sean Snider for CS290.
> As of now (Saturday March 28), we have not figured out how to deploy the application.
> However, the instructions below provide a sure-fire way to run the application locally on your machine. Since the data within the application uses Firebase, all interactions made by the user are recorded and update the application in real time for all users.

## Build Setup

``` bash
#First clone this repository to your local machine. Then cd into the clone's directory and do the following:

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## About the project: 

### Interactively enter data or load data from an online source that is organized within a database
•User may vote on the bias of a news source, share whether they agree with the current bias rating, and if appropriate, upload a newspaper.<br>
•Data on firebase: newspapers (contains all information related to the newspaper, updated in real time), user information (vote and approval history, updated in real time).<br>
### Interact with the cumulative data in a useful way
•Data on each newspaper is visualized using Chart.js, which allows data fields to be manipulated to alter the visualization.<br>
### View the cumulative or individual data in multiple ways
•User voting and approval statistics are constantly collected and computed into meaningful statistics (ex. Average approval rating, voting history, personal bias). One key function of user data is generating a user bias rating, which determined a user's ability to create new newspapers. If a user is proven to be excessively bias (ex. voting Conservative on multiple publications that are clearly Liberal), they will lose their ability to add content.<br>
### Keep track of individual preferences regarding users of your web site<br>
• User voting habits are stored on Firebase and retrieved on login. As mentioned above, these voting habits make for meaningful statistics. Voting and approval statistics are stored as arrays on Firebase.<br>

### Roles

Check the application "About" tab for information on different types of users and their abilities.

### User Feedback

Christian Leonard: "The website feels pretty easy to navigate. I really liked the visualizations, but wasn't sure why you seperated the bias votes and the approval ratings... might look better if they were side to side. The Emojis are great though. Makes the site seem modern and social-media oriented somehow. The site also feels really fast. The interface is really reactive and helps with the user's interactions."

Nathan Vanelli: "Cool app, better concept. The concept is great and pretty relevant to what's going on with "fake news" and the power of user data, revealed by the Cambridge Analytica scandle. The visualization page was my favorite part, just because it's easier to make sense of large groups of numbers with graphs. Also, the user stats page is interesting -- it shows how submitting a small amount of information can reveal larger trends about a user. I would like to know more about the exact math behind the bias calculations, but the explanations/methogology was pretty clear."

Logan Tappe: "Pretty awesome! In terms of User Experience, the app flows pretty well. However, I would make the home page the about page and then provide an easy way to navigate to the page where you vote. Other than that the layout seemed pretty logical and the overall concept is really cool! I like how you took data presented on one page and graohed it on another. it might have been smart to format them all on the same page. For exmaple, maybe next to each newspaper bias/approval ratings you put the graphs. That might be too cluttered though. Overall, really cool app!"

