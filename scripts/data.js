const path = require('path')
const fs = require("fs")

const jsonPath = path.join(__dirname, "../", "assets", "data", "pacientes.json")

async function loadData() {
    const jsonData = await fs.readFileSync(jsonPath)
    const data = await JSON.parse(jsonData)
    return data
}
async function saveData(data){
    data = JSON.stringify(data)
    await fs.writeFileSync(jsonPath, data)
}
module.exports = {loadData, saveData}