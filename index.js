const server = require('./api/server')
const dotenv = require('dotenv')
dotenv.config()

// const cors = require('cors')
const port = process.env.PORT || 4000


server.listen(port,()=>{
    console.log(`\n* Server Running on port ${port} *\n`);
})