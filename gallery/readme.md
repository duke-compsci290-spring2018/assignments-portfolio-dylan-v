Homework 5: Image Gallery
Due: Feb. 19 2018
Time spent: This assignment took longer than the others. It took at least 10 hours for me to set up the JSON data structure and the load image functionality. Retreiving data from JSON was more trivial, but initally was confusing because it required me to set up a local server (browsers cannot access files directly). This was the hardest assignment so far, but the jQuery documentation did help a good amount. I would the .attr class to be really helpful when providing detail about each image (src, id, caption), as opposed to using a concatination of strings which I used at first but felt messy.

The layout of the gallery is as follows. Images are displayed based on which checkbox is checked. This indicates to the JavaScript file which images to load into the HTML document from the JSON files (using AJAX) based on their category (nature or building). In order to for changes to take effect, press the sort button.

When the user clicks the arrows, the dynamically loaded images can be scrolled through. These images can also be viewed below the slideshow.

Lastly, when a user clicks an image, a lightbox feature is used. The image becomes larger and the background behind the image becomes black so that the user only focuses on that image. In order to close the lightbox, the user simply clicks on the image again.