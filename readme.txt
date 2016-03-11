Name: Bluemix Todo Demo
App : node-todo

Bluemix DC   : UK
Bluemix Org  : Lionel Mace
Bluemix Space: Demo

Fork from : https://github.com/scotch-io/node-todo
Tutorial  : https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
Download  : Jan 25, 2016

Pre-Requisites:
---------------
- Mongo DB installed locally or MongoLab Service

Todo:
-----
* add a switch in server.js to detect if running local or in Bluemix
* push in my own git
* add font-awesome locally
? is there a Mongo REST API to read DB

History
-------

V2 - In progress
----------------
+ added Bluemix favicon.ico

V1 - 2016-01-25
---------------
+ added manifest.yml to publish to Bluemix. Runs fine in Bluemix.
* added local Mongo URL and MongoLag URL in config/database.js
+ added folder framework to store bootstrap and angularjs lib for local testing
* updated index.html to refer to framework lib instead of loading from internet.