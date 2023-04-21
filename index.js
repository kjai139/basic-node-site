const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, res) => {
    const url = request.url

    

    // let filePath = '.' + path
    // if (filePath === './') {
    //     filePath = './index.html'
    // } else {
    //     filePath = '.' + filePath + 'html'
    // }
    // console.log(filePath, 'file path')

    let filePath = path.join(__dirname, `${url}.html`)
    if (url === '/') {
        filePath = './index.html'
    }

    fs.access(filePath, fs.F_OK, (err) => {
        if (err) {
            res.writeHead(404)
            res.end('404 not found')
            return
        }
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500)
                res.end('500 internal server error')
                return
            }

            res.writeHead(200)
            res.end(data)
        })
    })
})

server.listen(8080, () => {
    console.log('server running on port 8080')
})