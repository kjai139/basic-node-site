const http = require('http')
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html', (err) => {
        if (err) {
            console.log('error sending home', err)
        } else {
            console.log('file sent')
        }
    })
})

//when using sendFile it auto set headers and end response so no need to use res.end or set status codes

app.get('/:name', (req, res)=> {
    const fileName = req.params.name
    // console.log(fileName)
    const url = req.url
    // console.log(url)

    const filePath = __dirname + `${url}.html`

    res.sendFile(filePath, function(err) {
        if (err) {
            console.log('error sending', err)
        } else {
            console.log('file sent', filePath)
            console.log('file name:', fileName)
            console.log('url name:', url)
        }
    })
})


// const server = http.createServer((request, res) => {
//     const url = request.url


//     let filePath = path.join(__dirname, `${url}.html`)
//     if (url === '/') {
//         filePath = './index.html'
//     }

//     fs.access(filePath, fs.F_OK, (err) => {
//         if (err) {
//             res.writeHead(404)
//             res.end('404 not found')
//             return
//         }
//         fs.readFile(filePath, (err, data) => {
//             if (err) {
//                 res.writeHead(500)
//                 res.end('500 internal server error')
//                 return
//             }

//             res.writeHead(200)
//             res.end(data)
//         })
//     })
// })

app.listen(8080, () => {
    console.log('server running on port 8080')
})