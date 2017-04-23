module.exports = {  
  // Secret key for JWT signing and encryption
  'secret': 'super secret passphrase',
  // Database connection information
 'database': 'mongodb://localhost:27017/bgwssys',
 //'database': 'mongodb://sjeeten:british123A@ds161410.mlab.com:61410/bgwssys',

  // Setting port for server
  'port': process.env.PORT || 3000
}