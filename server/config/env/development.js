module.exports = {
  db: 'mongodb://root:root@ds137101.mlab.com:37101/mongoose',
  //db: 'mongodb://localhost:27017/walnov',
  jwtSecret: 'WALNOVWEB',
  sessionSecret: 'developmentSessionSecret',
  facebook: {
    clientID: '118102758792110',
    clientSecret: '5097d075db01f8c94c82822b423da959',
    callbackURL: 'http://localhost:3000/social-login/success'
  },
  twitter: {
    clientID: 'jwlvxbZj9ENB5vx344N4sq3f6',
    clientSecret: 'XowUoSSXVqf1sTEVq1DDrPgNcbhhTSIShbIIumTq6wMIRlpvOY',
    callbackURL: 'http://localhost:3000/social-login/success'
  },
  google: {
    clientID: '155269873029-oho69f3pegkfqf6bqvgq6qjg1ig94qkp.apps.googleusercontent.com',
    clientSecret: 'hCe4TmzojLxbHMCFLAB7atMY',
    callbackURL: 'http://localhost:3000/social-login/success'
  }
};
