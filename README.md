# Spalk technical exercise.

This is an excercise to create a parser that will parse MPEG Transport Stream files.

## Steps to run this code:

- Please clone the repository to your machine then run `npm install`
- To run the parser with the test files located in the `trialFiles` folder please run the following commands:
  - For an example of a successful result run `node mpegts-parser.js trialFiles/test_success.ts`
  - For an example of a failed result run `node mpegts-parser.js trialFiles/test_failure.ts`

## Tests

There are a few tests associated with the parser. To run the tests please use the following command:

- `npx jest __tests__/mpegts-parser.test.js`
