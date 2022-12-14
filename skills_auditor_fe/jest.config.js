const config = {
    verbose: true,
    "resetMocks": false,
    "setupFiles": ["jest-localstorage-mock"],
    "testEnvironment": "jest-environment-jsdom"
  };
  
  module.exports = config;
  
  // Or async function
  module.exports = async () => {
    return {
      verbose: true,
      moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(scss|sass|css)$": "identity-obj-proxy"
      }
    }
  };