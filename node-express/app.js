const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()

const PORT = 3000

app.set('view engine', 'ejs') // memberitahu express bahwa kita akan menggunakan view engine ejs
app.use(expressLayouts) // juga menggunakan expressLayouts
app.use(express.static('public')) // memberitahu express bahwa folder 'public' bebas diakses
app.use(express.json()) // memberitahu express bahwa req dan res menggunakan format json
app.use(express.urlencoded({extended: true})) // memberitahu express untuk enable urlencoded, untuk method post
app.use(morgan('dev'))

const layout = 'layout/main-layout'

const contacts = [
    {
        name: 'hadi',
        phoneNumber: '0823',
        email: 'hadi@gmail.com'
    },
]

app.use('/', (req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.get('/', (req, res) => {
    //res.send('<h1>Halaman Utama</h1>')
    //res.render(index)
    const title = 'Home'
    res.render('index',{title, layout})
})

app.get('/about', (req, res) => {
    //res.send('<h1>Halaman About</h1>')
    //res.json(object)
    const title = 'About'
    res.render('about',{title, layout})
})

app.get('/contact', (req, res) => {
    //res.send('<h1>Halaman Contact</h1>')
    const title = 'Contact'
    res.render('contact', {title, layout})
})

app.post('/contact', (req, res) => {
    const {name, phoneNumber, email} = req.body
    contacts.push(name, phoneNumber, email)
    res.send(`<h1>Kontak disimpan</h1> <br> ${contacts.name}`)
})

// app.get('/product/:id', (req, res) => {
//     res.send(`<h1>ID : ${req.params.id} <br> Query : ${req.query.category}</h1>`)
// })


app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})



/* 
const http = require('http')
const fs = require('fs')

const PORT = 3000

const readHTML = (path, res) => {
    fs.readFile(path, (err, data) => {
        if(err) {
            res.writeHead(404)
            res.write('Page not found')
        } else {
            res.write(data)
        }
        res.end()
    })
}

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    
    const url = req.url

    if(url == '/about'){
        readHTML('./about.html', res)
    } else if(url == '/contact') {
        readHTML('./contact.html', res)
    } else {
        readHTML('./index.html', res)
    }

}).listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
*/