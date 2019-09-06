

const server = require('./server.js')

const port = 8008;
server.listen(port, () => console.log(`\nAPI on port ${port}`))