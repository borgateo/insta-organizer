module.exports = {
  db: process.env.db || 'localhost',
  clientSecret: process.env.clientSecret || '71c32a5a389a41e6831322e392804ba3',
  tokenSecret: process.env.tokenSecret || 'this is a very long string for the tokenSecret'
};
