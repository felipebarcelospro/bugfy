require('dotenv/config')

const { app } = require('./app')

const { NODE_ENV, PORT, APPLICATION_URL } = process.env

app.listen(PORT, () => {
  console.log('------------------------------------------------------')
  console.log(`✅ BUGFY(API) running successfully at ${APPLICATION_URL}:${PORT} (Env: ${NODE_ENV.toUpperCase()})`)
})
