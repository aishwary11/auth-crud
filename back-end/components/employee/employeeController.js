const employeeModel = require('./employeeModel')
const bcrypt = require('bcrypt')

let employee = {}

employee.add = async (req, res) => {
    let employeData = new employeeModel({
        name: req.body.name,
        id: req.body.id,
        salary: req.body.salary
    })
    console.log(employeData)
    let saveEmployeeData = await employeData.save()
    if (!saveEmployeeData) {
        res.status(400).json({
            result: employeData,
            status: 'Data not Saved'
        })
    } else {
        res.status(200).json({
            result: employeData,
            status: 'Data Save'
        })
    }
}

employee.list = async (req, res) => {
    let listData = await employeeModel.find()
    if (!listData) {
        res.status(400).json({
            result: 'No Data Found'
        })
    } else {
        console.log(listData)
        res.status(200).send(listData)
    }
}
module.exports = employee