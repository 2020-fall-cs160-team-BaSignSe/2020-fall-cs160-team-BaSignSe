const {Builder, By, Key ,util, seleniumrequests} = require("selenium-webdriver");
let request = require('request');
async function example(){
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://google.com");
    await driver.findElement(By.name("q")).sendKeys("selenium", Key.RETURN);


}

async function login_backend() {
  //  let driver = await new Builder().forBrowser("chrome").build();
  //  await driver.get("http://localhost:3000/login");
   // let webdriver = 
}
//let result;
//let mem = [];

function login(){
    return new Promise((resolve, fulfill)=> {
    let result = { error: false, message: null }
      
        request({
            method: 'POST',
            uri: 'http://localhost:5000/api/authFindNStudy',
            body: {'email': 'friday@aol.com', 'password': '123123' },
            json: true
        },
        function(error, response, body) {
            if (error) {
                result.error = true;
                result.message = error;
             //   console.log(result);
              //  mem.push(result);
            }
            else if (response.statusCode !== 200){
                result.error = true;
                result.message = body;
          //      console.log(result);
              //  mem.push(result);
            }
            else{
                result.error = false;
                result.message = 'success';
                console.log(response.body);   // jwt token in the respone
             //   mem.push(result);
            }
            result.error ? fulfill('Fail') : resolve('Pass');
        })
       
        //result.error ? fulfill('Fail') : resolve('Pass');
    });
}

 //login().then( console.log(result));

 login().then((value) => {
    console.log(value);
    // expected output: "Success!"
    
   
  });
//  console.log("here");
//  console.log(mem);