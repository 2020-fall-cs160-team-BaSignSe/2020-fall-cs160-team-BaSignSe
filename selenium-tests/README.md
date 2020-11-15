Note:
-index.js is for backend testing
-test_frontend.js is for frontend testing

To run the tests:
-make sure to have the server/website up with npm run dev
-open another terminal
-change directory to ./selenium-tests/
-run the command "node index.js"

index.js Test output:
```
********************************************************************************
************************** Running Backend Tests *******************************
********************************************************************************
[
  {
    test_case: '1',
    route: ' /api/authFindNStudy',
    HTTP_Method: 'POST',
    request_body: { email: 'friday@aol.com', password: '123123' },
    description: '**** Running test case #1 to check if login is valid. ****',
    result: 'Test case #1 passed. User logged in. Here is the JWT token:',
    response: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY4OWYwOWY4Yjk5YzUyMTc4NTk5ODg5In0sImlhdCI6MTYwNTM5MjQzNywiZXhwIjoxNjA1NzUyNDM3fQ.DbmddC9uFDQSrsUbcfr1yqpepMjya0I5G4N7apM4U_I'
    }
  },
  {
    test_case: '2',
    route: ' /api/authFindNStudy',
    HTTP_Method: 'POST',
    request_body: { email: 'friday@aol.com', password: '11111123123' },
    description: '**** Running test case #2 login with invalid credentials. ****',
    result: 'Test case #2 passed. User NOT logged in with invalid credentials',
    response: { msg: 'invalid credentials' }
  },
  {
    test_case: '3',
    route: '/api/usersFindNStudy',
    HTTP_Method: 'POST',
    request_body: {
      firstName: 'myFirstName',
      lastName: 'myLastName',
      username: 'username123_929092510780413',
      email: '5755057894835has_to_be_unique21@aol.com',
      password: 'krhrhrhrhr23'
    },
    description: '**** Running test case #3 to check if new user is registered. ****',
    result: ' Test case #3 passed. New User is able to register',
    response: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZiMDU4MzVmNjcxZTA2NGIwMjAxMTdmIn0sImlhdCI6MTYwNTM5MjQzNywiZXhwIjoxNjA1NzUyNDM3fQ.IPgHj9BExgGrkcixRVQCpdEaq9vjiFWHjgSM5d-QvsU'
    }
  },
  {
    test_case: '4',
    route: '/api/usersFindNStudy',
    HTTP_Method: 'POST',
    request_body: {
      firstName: 'myFirstName',
      lastName: 'myLastName',
      username: 'username123_92',
      email: 'has_to_be_unique21@aol.com',
      password: 'krhrhrhrhr23'
    },
    description: '**** Running test case #4 to check if it is possible to register same user twice. ****',
    result: 'Test case #4 passed. Since you cannot register a user twice',
    response: { msg: 'User alrrady exists' }
  },
  {
    test_case: '5',
    route: '/api/authFindNStudy',
    HTTP_Method: 'GET',
    request_body: 'N/A',
    description: '**** Running test case #5 to check AUTH API. The header of this request contains valid JWT ****',
    result: 'Test case #5 passed. User is authenticated',
    response: {
      _id: '5f89f09f8b99c52178599889',
      firstName: 'friday',
      lastName: 'today',
      username: 'friday',
      email: 'friday@aol.com',
      date: '2020-10-16T19:12:31.208Z',
      __v: 0
    }
  },
  {
    test_case: '6',
    route: '/api/studyGroup',
    HTTP_Method: 'POST',
    request_body: {
      groupName: 'This_is_group_Name12235130163397511',
      startDate: '11-11-20',
      endDate: '12-11-20',
      repeating: 'TTH',
      description: 'descripton123',
      courseId: '132',
      courseCode: 'Compiler Design'
    },
    description: '**** Running test case #6 to create a study group ****',
    result: 'Test case #6 passed. Study group created!',
    response: {
      _id: '5fb05835f671e064b0201180',
      groupAdmin: '5f89f09f8b99c52178599889',
      groupName: 'This_is_group_Name12235130163397511',
      startDate: '11-11-20',
      endDate: '12-11-20',
      repeating: 'TTH',
      description: 'descripton123',
      courseId: '132',
      courseCode: 'Compiler Design',
      date: '2020-11-14T22:20:37.952Z',
      __v: 0
    }
  },
  {
    test_case: '7',
    route: '/api/studyGroup',
    HTTP_Method: 'POST',
    request_body: {
      groupName: 'This_is_group_Name1223',
      startDate: '11-11-20',
      endDate: '12-11-20',
      repeating: 'TTH',
      description: 'descripton123',
      courseId: '132',
      courseCode: 'Compiler Design'
    },
    description: '**** Running test case #7 to create a duplicate group. It is not possible to create group with same name ****',
    result: 'Test case #7 passed. Duplicate study group is NOT created',
    response: 'Server Erorr'
  },
  {
    test_case: '8',
    route: '/api/course/{courseId}/{courseCode}',
    HTTP_Method: 'GET',
    request_body: 'N/A',
    description: '**** Running test case #8 to filter for existing courses in the database ****',
    result: 'Test case #8 passed. Able to search for courses',
    response: {
      _id: '5f9dcaf37d657f4321fb6d56',
      courseCode: '22A',
      courseId: 'CS',
      name: 'Python Programming for non majors I'
    }
  }
]
mandeeppabla@Mandeeps-MBP selenium-tests % 
```
