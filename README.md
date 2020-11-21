# Internal Document

## How to set up and run developer/test environment:

1. Open a terminal
2. Execute the `git clone https://github.com/2020-fall-cs160-team-BaSignSe/2020-fall-cs160-team-BaSignSe.git` command in terminal  
3. Open the repo in your IDE/editor (example: Visual Studio Code)
4. Download the dependencies for the repo
5. Start the server by running the command `npm run dev` from the repo's main directory
6. Wait for the server to be successfully up
   1. Once it is fully up, your web browser should have http://localhost:3000 open and the website should display. You can navigate around.
7. Once the server is up, change directory to ./selenium-tests/
8. Select the appropriate driver to download depending on what browser you use (Chrome, Firefox, etc) from [Selenium WebDrivers](https://www.npmjs.com/package/selenium-webdriver)
9. Place the driver you downloaded from step 8 into ./selenium-tests/ 
10. Execute the command `npm install selenium-webdriver` in terminal from the repo's main directory
11. Change directory to ./selenium-tests/
12. Execute the command `node fileName.js` where "fileName" is replaced with the file you would like to test (index.js for backend, test_frontend for frontend).
13. The results will be outputted to the console

## What you need to know

* When working on the code, make sure to create and work on your own branch
  * create your own branch `git branch -b <your branch name>`.
  * After completing your changes, run `git add .` (to add every changed file) or `git add <file name>` (for specific file(s)).
  * Then commit the changes to your branch by `git commit -m "message here"`
  * Then push the changes by `git push -u origin <branch name>`
  * Then go to the repo and do a pull request
* To add new test cases, go to ./selenium-tests/
  * Open up the file you wish to add test cases to (ex index.js)
  * Follow and mimic the pattern/format in the file that each test case has
* About the database
  * The database being used is MongoDB Atlas. The URI for it can be changed in the ./config/default.json file
* About the file organization
  * the main folders are the backend, frontend
  * everything is organized so it will be easy to add new features and look at
* To view and navigate the web page in the web browser, go to http://localhost:3000/ after starting up the server with `npm run dev`

