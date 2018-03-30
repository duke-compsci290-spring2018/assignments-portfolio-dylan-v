Final Project -- News Platform Political Skew Meter

NetIDs: dgv3 and sms107

Outline:

CS290 Final Project: News Platform Political Skew Meter

We will create an application that allows users to add news sources and rate them on a Liberal to Conservative scale (1-5, where 3 is Centrist). Users will generate data by voting on various things. Next to each news source, the average of the user ratings will be presented in order to determine public opinion of political skew. Guests may view the site but not vote on skew, make comments on news sources, or give a thumbs up/down. Users may vote on a current source, add a new news sources (add new logo, customize name, and set a preliminary score), contribute to a comment section. Then other users can then vote on the source (modifying the average) and share whether they agree with the current average with a thumbs up or down. Administrators can remove sources and remove users. There will be slightly different user interfaces for each mode.

Preliminary data can be loaded onto the site using JSON that is pushed to a Firebase server. This JSON data will include source name, logo image, average skew rating, an array of comments, and a thumbs up/down score to gauge whether people agree with the average rating. All of this information will be presented in the user interface. Users can then push custom data to Firebase and administrators may remove data from Firebase.
