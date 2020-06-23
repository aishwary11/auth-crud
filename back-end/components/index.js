const user = require('./user/userRoutes')
const employee = require('./employee/employeeRoutes')

let version = '/api/v1'

module.exports = (app) => {
    app.use(version + "/user", user)
    app.use(version + "/employee", employee)
}