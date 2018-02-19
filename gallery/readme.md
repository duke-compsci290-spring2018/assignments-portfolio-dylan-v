Homework 5: Image Gallery
Due: Feb. 19 2018
Time spent: This assignment took longer than the others. It took at least 10 hours for me to set up the JSON data structure and the load image functionality. Retreiving data from JSON was more trivial, but initally was confusing because it required me to set up a local server (browsers cannot access files directly).

The layout of the gallery is as follows. Images are displayed based on which checkbox is checked. This indicates to the JavaScript file which images to load into the HTML document from the JSON files (using AJAX) based on their category (nature or building). In order to for changes to take effect, the Sort button must be pressed, which initiates the load/display image functionality.

When the images are sorted, they are initially all presented at once. A carosel is provided in order for the user to browse the presented photos. However, because the carosel was implemented following the tutorial from w3school, I had issues with the display. Once a user hits a forward or back button on the carosel, only 1 image is displayed. However, the images presented in the carosel are still the relevant photos based on the checked categories, so it still meets the assignment requirements.

Lastly, when a user clicks an image, a lightbox feature is used. The image becomes larger and the background behind the image becomes black so that the user only focuses on that image. In order to close the lightbox, the user simply clicks on the image again.