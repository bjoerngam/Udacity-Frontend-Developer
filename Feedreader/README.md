# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


##About the Jasmine tests

When you open the index.html you can find the Jasmine test at the bottom of the page
The tests are split in four sections:

* RSS feeds
 Are defined
 each feed has a valid HTML name
 each feed has a valid name

* The menu
  menu is hidden by default
  menu is visible after mouse click and after another click its hidden again

* Intial entries
  at least one entry element inside of the feed container

* New feed section
  the feed entry should changed and should not be the first one
