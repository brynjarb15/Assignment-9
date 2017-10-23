# NodeJS Testing

In this project we're going to use the code provided in this repo to write tests using Jest and refactor code that isn't easily testable.

To get started you have all of the packages installed that you will need and you only need to run `yarn test --watch` or `npm test -- --watch` to get your tests running.

#### 1
Write a test for the function `add`. Your tests should cover at least these three cases
+ add(1, 1)
+ add(null, 1)
+ add()

#### 2
Use auto mocking to create a mock implementation of the function `throws` and then write a test that validates that it doesn't throw anymore.

#### 3
Write a test for the function `loop` where you assert that `add` get's called N times. It's up to you to decide if you want to mock `add` or not. 

#### 4
Change the provided webservice to use a mock of MongoDB instead of a live database

#### 5
Write a test that uses the provided web service and asserts the response properly. You should use supertest to write these tests.

#### 6
Use snapshot testing to assert that the output from calling GET on `/` is valid.
Make sure to write a beforeEach and afterEach functions to fill your database with valid data to assert on.
