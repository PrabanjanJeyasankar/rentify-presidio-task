const path = require('path')

const getFileByName = (request, response) => {
    const {image} = request.params
    const parentDirectory = (__dirname).split('controller')[0]
    const filePath = parentDirectory + 'public/images/' + image
    response.sendFile(filePath)
}

module.exports = {
    getFileByName
}