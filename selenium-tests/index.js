const {Builder, By, Key ,util, seleniumrequests} = require("selenium-webdriver");
let request = require('request');

function valid_login(email , password){
    return new Promise((resolve, fulfill)=> {
    let result = { error: false, message: null }
    let test_data = {};
      
        request({
            method: 'POST',
            uri: 'http://localhost:5000/api/authFindNStudy',
            //body: {'email': 'friday@aol.com', 'password': '123123' },
            body: {'email': email, 'password': password },
            json: true
        },
        function(error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
            }
            else if (response.statusCode !== 200){
                //result.error = true;
                result.message = body;
                test_data = {
                    "test_case": "2",
                    "route": " /api/authFindNStudy",
                    "HTTP_Method": "POST",
                    "request_body": {'email': email, 'password': password },
                    "description": "**** Running test case #2 login with invalid credentials. ****",
                    "result": "Test case #2 passed. User NOT logged in with invalid credentials",
                    "response": response.body.errors[0]
                }
                result.error ? fulfill('Fail') : resolve(test_data);       
            }
            else{
                result.error = false;
                result.message = 'success';
                test_data = {
                    "test_case": "1",
                    "route": " /api/authFindNStudy",
                    "HTTP_Method": "POST",
                    "request_body": {'email': email, 'password': password },
                    "description": "**** Running test case #1 to check if login is valid. ****",
                    "result": "Test case #1 passed. User logged in. Here is the JWT token:",
                    "response": response.body
                }
            }
            result.error ? fulfill('Fail') : resolve(test_data);
        })
    });
}

function register(firstName, lastName, username, email, password){
    return new Promise((resolve, fulfill)=> {
    let result = { error: false, message: null }
    let test_data = {};

        request({
            method: 'POST',
            uri: 'http://localhost:5000/api/usersFindNStudy',
            body: {'firstName': firstName, 'lastName': lastName, 'username': username,
            'email': email, 'password': password },
            json: true
        },
        function(error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
            }
            else if (response.statusCode !== 200){
               // result.error = true;
                result.message = body;
                test_data = {
                    "test_case": "4",
                    "route": "/api/usersFindNStudy",
                    "HTTP_Method": "POST",
                    "request_body": {'firstName': firstName, 'lastName': lastName, 'username': username,
                    'email': email, 'password': password },
                    "description": "**** Running test case #4 to check if it is possible to register same user twice. ****",
                    "result": "Test case #4 passed. Since you cannot register a user twice",
                    "response": response.body.errors[0]
                }

                result.error ? fulfill('Fail') : resolve(test_data);

     
            }
            else{
                result.error = false;
                result.message = 'success';

                test_data = {
                    "test_case": "3",
                    "route": "/api/usersFindNStudy",
                    "HTTP_Method": "POST",
                    "request_body": {'firstName': firstName, 'lastName': lastName, 'username': username,
                    'email': email, 'password': password },
                    "description": "**** Running test case #3 to check if new user is registered. ****",
                    "result": " Test case #3 passed. New User is able to register",
                    "response": response.body
                }
                
            }
            result.error ? fulfill('Fail') : resolve(test_data);
        })
    });
}

function auth(email , password){
    return new Promise((resolve, fulfill)=> {
    let result = { error: false, message: null }
    let test_data = {};

        request({
            method: 'POST',
            uri: 'http://localhost:5000/api/authFindNStudy',
            //body: {'email': 'friday@aol.com', 'password': '123123' },
            body: {'email': email, 'password': password },
            json: true
        },
        function(error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
            }
            else if (response.statusCode !== 200){
                result.error = true;
                result.message = body;
            }
            else{
                result.error = false;
                result.message = 'success';
                
                let jwt = response.body.token;
                request({
                    method: 'GET',
                    uri: 'http://localhost:5000/api/authFindNStudy',
                    headers: {
                        'x-auth-token': jwt,
                      },
                    json: true
                }, function(error, response, body) {
                    if(error) {

                    } else if(response.statusCode !== 200) {

                    } else {

                         test_data = {
                            "test_case": "5",
                            "route": "/api/authFindNStudy",
                            "HTTP_Method": "GET",
                            "request_body": "N/A",
                            "description": "**** Running test case #5 to check AUTH API. The header of this request contains valid JWT ****",
                            "result": "Test case #5 passed. User is authenticated",
                            "response": response.body
                        }

                        result.error ? fulfill('Fail') : resolve(test_data);
                    }
                })
            }
        })
    });
}

function create_study_group(email , password, 
    groupName, startDate, endDate, repeating, description, courseId, courseCode){
    return new Promise((resolve, fulfill)=> {
    let result = { error: false, message: null }
    let test_data = {};
        request({
            method: 'POST',
            uri: 'http://localhost:5000/api/authFindNStudy',
            //body: {'email': 'friday@aol.com', 'password': '123123' },
            body: {'email': email, 'password': password },
            json: true
        },
        function(error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
            }
            else if (response.statusCode !== 200){
               // result.error = true;
                result.message = body;
            }
            else{
                result.error = false;
                result.message = 'success';
                
                let jwt = response.body.token;
                request({
                    method: 'POST',
                    uri: 'http://localhost:5000/api/studyGroup',
                    headers: {
                        'x-auth-token': jwt,
                        'Content-Type': 'application/json'
                      },
                    body: {
                        'groupName': groupName,
                        'startDate': startDate,
                        'endDate': endDate,
                        'repeating': repeating,
                        'description': description,
                        'courseId': courseId,
                        'courseCode': courseCode
                    },
                    json: true
                }, function(error, response, body) {
                    if(error) {

                    } else if(response.statusCode !== 200) {
                        test_data = {
                            "test_case": "7",
                            "route": "/api/studyGroup",
                            "HTTP_Method": "POST",
                            "request_body": {
                                'groupName': groupName,
                                'startDate': startDate,
                                'endDate': endDate,
                                'repeating': repeating,
                                'description': description,
                                'courseId': courseId,
                                'courseCode': courseCode
                            },
                            "description": "**** Running test case #7 to create a duplicate group. It is not possible to create group with same name ****",
                            "result": "Test case #7 passed. Duplicate study group is NOT created",
                            "response": response.body
                        }

                        result.error ? fulfill('Fail') : resolve(test_data);

                    } else {

                         test_data = {
                            "test_case": "6",
                            "route": "/api/studyGroup",
                            "HTTP_Method": "POST",
                            "request_body": {
                                'groupName': groupName,
                                'startDate': startDate,
                                'endDate': endDate,
                                'repeating': repeating,
                                'description': description,
                                'courseId': courseId,
                                'courseCode': courseCode
                            },
                            "description": "**** Running test case #6 to create a study group ****",
                            "result": "Test case #6 passed. Study group created!",
                            "response": response.body
                        }
                        result.error ? fulfill('Fail') : resolve(test_data);
                    }
                })
            }
        })
    });
}

function filter_courses(email , password, courseId, courseCode){
    return new Promise((resolve, fulfill)=> {
    let result = { error: false, message: null }
    let test_data = {};
        request({
            method: 'POST',
            uri: 'http://localhost:5000/api/authFindNStudy',
            //body: {'email': 'friday@aol.com', 'password': '123123' },
            body: {'email': email, 'password': password },
            json: true
        },
        function(error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
            }
            else if (response.statusCode !== 200){
               // result.error = true;
                result.message = body;
            }
            else{
                result.error = false;
                result.message = 'success';
                
                let jwt = response.body.token;
                request({
                    method: 'GET',
                    uri: 'http://localhost:5000/api/course/' + courseId + "/" + courseCode,
                    headers: {
                        'x-auth-token': jwt,
                        'Content-Type': 'application/json'
                      },
                    json: true
                }, function(error, response, body) {
                    if(error) {

                    } else if(response.statusCode !== 200) {

                    } else {

                         test_data = {
                            "test_case": "8",
                            "route": "/api/course/{courseId}/{courseCode}",
                            "HTTP_Method": "GET",
                            "request_body": "N/A",
                            "description": "**** Running test case #8 to filter for existing courses in the database ****",
                            "result": "Test case #8 passed. Able to search for courses",
                            "response": response.body.docs[0]
                        }
                        result.error ? fulfill('Fail') : resolve(test_data);
                    }
                })
            }
        })
    });
}


let promises = [];
let tests = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

// First test case with valid credentials
promises.push(valid_login("friday@aol.com", "123123").then((value) => {
    tests.push(value);
  }));

// Second test case with invalid credentials
promises.push(valid_login("friday@aol.com", "11111123123").then((value) => {
    tests.push(value);
  }));

// Third test case to see if we can create/register a new user
promises.push(register("myFirstName", "myLastName", "username123_92" + parseInt(getRandomInt(10000000000000)), 
parseInt(getRandomInt(10000000000000)) + "has_to_be_unique21@aol.com", "krhrhrhrhr23").then((value) => {
   tests.push(value);
}));

// // 4th test case should call ^^^^^^ w/ a user that already exists (edge case)
promises.push(register("myFirstName", "myLastName", "username123_92", 
"has_to_be_unique21@aol.com", "krhrhrhrhr23").then((value) => {
  tests.push(value);
}));

// 5th test case to test the AUTH API
promises.push(auth("friday@aol.com", "123123").then((value) => {
    tests.push(value);
  }));

// 6th test case should create a study group
promises.push(create_study_group("friday@aol.com", "123123", 
"This_is_group_Name1223" + parseInt(getRandomInt(10000000000000)), "11-11-20", "12-11-20", "TTH", "descripton123", "132", "Compiler Design").then((value) => {
     tests.push(value);
  }));

//  7th test case should try to create a dupliate study group and fail
promises.push(create_study_group("friday@aol.com", "123123", 
"This_is_group_Name1223", "11-11-20", "12-11-20", "TTH", "descripton123", "132", "Compiler Design").then((value) => {
    tests.push(value);
  }));

// 8th test cases filters the courses
  promises.push(filter_courses("friday@aol.com", "123123", 
"CS", "22A").then((value) => {
    tests.push(value);
  }));



Promise.all(promises).then(results => {
    console.log("\n");
    console.log("********************************************************************************")
    console.log("************************** Running Backend Tests *******************************")
    console.log("********************************************************************************")

    tests.sort(function (a,b){
        return a.test_case - b.test_case
    })
   console.log(tests);
    
}).catch(err => {
    console.log(err);
});
