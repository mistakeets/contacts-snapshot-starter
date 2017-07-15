module.exports = {
  env: 'production',
  db: process.env.SECRET_HOST,
  port: process.env.PORT || 3000
}
