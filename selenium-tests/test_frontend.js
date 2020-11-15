const { Builder, By, Key, util, seleniumrequests } = require("selenium-webdriver");
let request = require('request');

// TODO: Ask Mandeep about if auth uses promise
/*  ATTEMPT #1 await
*/
function test_frontend_login(email, password) {
    return new Promise(async (resolve, fulfill) => {
        let test_data = "";

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://localhost:3000/login");
        await driver.getCurrentUrl()
        driver.findElement(By.name('email')).sendKeys(email);
        driver.findElement(By.name('password')).sendKeys(password);
        await driver.findElement(By.className('btn btn-primary')).click();
        setTimeout(async function () {
            let title = await driver.getCurrentUrl()
            if (title === "http://localhost:3000/dashboard") {
                test_data = "Passed"
            } else {
                test_data = "Failed";
            }

            setTimeout(async function () {
                driver.close();
                resolve(test_data);
            }, 2000)
        }, 500)
    });
}


function test_frontend_register(firstName, lastName, username, email, password) {
    return new Promise(async (resolve, fulfill) => {
        let test_data = "";

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://localhost:3000/register-user");
        await driver.getCurrentUrl();
        driver.findElement(By.name('firstName')).sendKeys(firstName);
        driver.findElement(By.name('lastName')).sendKeys(lastName);
        driver.findElement(By.name('username')).sendKeys(username);
        driver.findElement(By.name('email')).sendKeys(email);
        driver.findElement(By.name('password')).sendKeys(password);

        await driver.findElement(By.className('btn btn-primary')).click();
        setTimeout(async function () {
            let title = await driver.getCurrentUrl();
            if (title === "http://localhost:3000/dashboard") {
                test_data = "Passed";
            } else {
                test_data = "Failed";
            }

            setTimeout(async function () {
                driver.close();
                resolve(test_data);
            }, 1000)
        }, 1000)

    });
}






function test_frontend_createStudyGroup(email, password, groupName, startDate, endDate, repeating, description, courseId, courseCode) {
    return new Promise(async (resolve, fulfill) => {
        let test_data = "";
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://localhost:3000/login");
        await driver.getCurrentUrl()
        driver.findElement(By.name('email')).sendKeys(email);
        driver.findElement(By.name('password')).sendKeys(password);
        await driver.findElement(By.className('btn btn-primary')).click();
        setTimeout(async function () {
            await driver.get("http://localhost:3000/createstudygroup");
            await driver.getCurrentUrl();
            driver.findElement(By.name('groupName')).sendKeys(groupName);
            driver.findElement(By.name('startDate')).sendKeys(startDate);
            driver.findElement(By.name('endDate')).sendKeys(endDate);
            driver.findElement(By.name('repeating')).sendKeys(repeating);
            driver.findElement(By.name('courseId')).sendKeys(courseId);
            driver.findElement(By.name('courseCode')).sendKeys(courseCode);
            driver.findElement(By.className('csg-input-description-box')).sendKeys(description);

            await driver.findElement(By.className('btn btn-primary')).click();
            setTimeout(async function () {
                let title = await driver.getCurrentUrl();
                if (title === "http://localhost:3000/dashboard") {
                    test_data = "Passed"
                } else {
                    test_data = "Failed"
                }
                driver.close();
                resolve(test_data);
            }, 2000)
        }, 1000)
    });
}







async function test_frontend_courseSearch_exists(email, password, courseId, courseCode) {
    return new Promise(async (resolve, fulfill) => {
        let test_data = "";
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://localhost:3000/login");
        await driver.getCurrentUrl()
        driver.findElement(By.name('email')).sendKeys(email);
        driver.findElement(By.name('password')).sendKeys(password);
        await driver.findElement(By.className('btn btn-primary')).click();
        setTimeout(async function () {
            await driver.get("http://localhost:3000/courseSearch");
            await driver.getCurrentUrl();
            driver.findElement(By.name('courseId')).sendKeys(courseId);
            driver.findElement(By.name('courseCode')).sendKeys(courseCode);
            await driver.findElement(By.className('btn btn-primary')).click();
            setTimeout(async function () {
                try {
                    await driver.findElement(By.className('list-group-item'));
                    test_data = "Passed";
                } catch (err) {
                    test_data = "Failed";
                }
                setTimeout(async function () {
                    driver.close();
                    resolve(test_data);
                }, 1500);
            }, 1000)
        }, 500)
    });

}




let promises = [];
let tests = [];
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

 //testing a valid credential
promises.push(test_frontend_login("bobdoe@sjsu.edu", "password123").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Passed"){
        result = "Passed test case"
    }
    test_data = {
        "test_case": "1",
        "description": "[User Login]: Valid login credentials",
        "expected_result": "pass",
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

 //testing an invalid credential
promises.push(test_frontend_login("bobdoe@sjsu.edu", "password1234").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){
        result = "Passed test case"
    }
    test_data = {
        "test_case": "2",
        "description": "[User Login]: Invalid login credentials",
        "expected_result": "fail",
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

promises.push(test_frontend_register("Bobby", "Flay", "Bflay" + parseInt(getRandomInt(10000000000000)), parseInt(getRandomInt(10000000000000)) + "Bflay@gmail.com", "password123").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Passed"){
        result = "Passed test case"
    }
    test_data = {
        "test_case": "3",
        "description": "[User Registration]: Valid registration",
        "expected_result": "pass",
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));
promises.push(test_frontend_register("Bobby", "Flay", "Bflay", "bobdoe@sjsu.edu", "password123").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){
        result = "Passed test case"
    }
    test_data = {
        "test_case": "4",
        "description": "[User Registration]: Invalid registration (email already exists)",
        "expected_result": "fail",
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));
promises.push(test_frontend_register("Bobby", "Flay", "Bflay", "Bflay", "password123").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){
        result = "Passed test case"
    }
    test_data = {
        "test_case": "5",
        "description": "[User Registration]: Invalid registration (no \"@\" in email)",
        "expected_result": "fail",
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));
promises.push(test_frontend_register("Bobby", "Flay", "Bflay", "Bflay@gmail.com", "p").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){
        result = "Passed test case"
    }
    test_data = {
        "test_case": "6",
        "description": "[User Registration]: Invalid registration (password < 6 characters)",
        "expected_result": "fail",
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));


promises.push(test_frontend_createStudyGroup("bobdoe@sjsu.edu", "password123", "Group" + parseInt(getRandomInt(10000000000000)), "November 13, 2020", "December 20, 2020", "Tu,Thu", "A chill place to study", "CS", "152").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Passed"){
        result = "Passed test case"
    }
    test_data = {
        "test_case": "7",
        "description": "[Create Study Group]: Valid create study group",
        "expected_result": "Pass",
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

promises.push(test_frontend_createStudyGroup("bobdoe@sjsu.edu", "password123", "Group1", "November 13, 2020", "December 20, 2020", "Tu,Thu", "A chill place to study", "CS", "152").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){ //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "8",
        "description": "[Create Study Group]: Invalid create study group (group name already exists)",
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

promises.push(test_frontend_createStudyGroup("bobdoe@sjsu.edu", "password123", "", "November 13, 2020", "December 20, 2020", "Tu,Thu", "A chill place to study", "CS", "152").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){ //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "9", //
        "description": "[Create Study Group]: Invalid create study group (group name not filled out)", //
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

promises.push(test_frontend_createStudyGroup("bobdoe@sjsu.edu", "password123", "Group1", "", "December 20, 2020", "Tu,Thu", "A chill place to study", "CS", "152").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){ //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "10", //
        "description": "[Create Study Group]: Invalid create study group (start date not filled out)", //
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

promises.push(test_frontend_createStudyGroup("bobdoe@sjsu.edu", "password123", "Group1", "November 13, 2020", "", "Tu,Thu", "A chill place to study", "CS", "152").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){ //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "11", //
        "description": "[Create Study Group]: Invalid create study group (end date not filled out)", //
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

promises.push(test_frontend_createStudyGroup("bobdoe@sjsu.edu", "password123", "Group1", "November 13, 2020", "December 20, 2020", "", "A chill place to study", "CS", "152").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){ //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "12", //
        "description": "[Create Study Group]: Invalid create study group (repeating days not filled out)", //
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

promises.push(test_frontend_createStudyGroup("bobdoe@sjsu.edu", "password123", "Group1", "November 13, 2020", "December 20, 2020", "Tu,Thu", "", "CS", "152").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){ //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "13", //
        "description": "[Create Study Group]: Invalid create study group (description not filled out)", //
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));
promises.push(test_frontend_createStudyGroup("bobdoe@sjsu.edu", "password123", "Group1", "November 13, 2020", "December 20, 2020", "Tu,Thu", "A chill place to study", "", "152").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){ //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "14", //
        "description": "[Create Study Group]: Invalid create study group (course id not filed out)", //
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));
promises.push(test_frontend_createStudyGroup("bobdoe@sjsu.edu", "password123", "Group1", "November 13, 2020", "December 20, 2020", "Tu,Thu", "A chill place to study", "CS", "").then(actualResult => {
    let result = "Failed test case";
    if(actualResult === "Failed"){ //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "15", //
        "description": "[Create Study Group]: Invalid create study group (course code not filled out)", //
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

promises.push(test_frontend_courseSearch_exists("bobdoe@sjsu.edu", "password123", "CS", "152").then(actualResult => {
    let result = "Failed test case";
    if (actualResult === "Passed") { //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "16", //
        "description": "[Course Search]: Valid course search (course id and course code exists)", //
        "expected_result": "pass", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

promises.push(test_frontend_courseSearch_exists("bobdoe@sjsu.edu", "password123", "CS", "").then(actualResult => {
    let result = "Failed test case";
    if (actualResult === "Passed") { //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "17", //
        "description": "[Course Search]: Valid course search (course id exists)", //
        "expected_result": "pass", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));
promises.push(test_frontend_courseSearch_exists("bobdoe@sjsu.edu", "password123", "SDFGDFGDFG", "457345").then(actualResult => {
    let result = "Failed test case";
    if (actualResult === "Failed") { //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "18", //
        "description": "[Course Search]: Invalid course search (course id and course code does not exist)", //
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));
promises.push(test_frontend_courseSearch_exists("bobdoe@sjsu.edu", "password123", "SDFGDFGDFG", "").then(actualResult => {
    let result = "Failed test case";
    if (actualResult === "Failed") { //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "19", //
        "description": "[Course Search]: Invalid course search (course id does not exist)", //
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

promises.push(test_frontend_courseSearch_exists("bobdoe@sjsu.edu", "password123", "", "").then(actualResult => {
    let result = "Failed test case";
    if (actualResult === "Failed") { //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "20", //
        "description": "[Course Search]: Invalid course search (course id and course code are empty)", //
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));

promises.push(test_frontend_courseSearch_exists("bobdoe@sjsu.edu", "password123", "", "DFGHFGHFGH").then(actualResult => {
    let result = "Failed test case";
    if (actualResult === "Failed") { //
        result = "Passed test case"
    }
    test_data = {
        "test_case": "21", //
        "description": "[Course Search]: Invalid course search (course id is filled and course code is empty)", //
        "expected_result": "fail", //
        "actual_result": actualResult,
        "result": result
    }
    tests.push(test_data);
}));



Promise.all(promises).then(results => {
    console.log("\n");
    console.log("********************************************************************************")
    console.log("************************* Running Frontend Tests *******************************")
    console.log("********************************************************************************")
    tests.sort(function (a, b) {
        return a.test_case - b.test_case;
    });
    console.log(tests);
}).catch(err => {
    console.log(err);
})