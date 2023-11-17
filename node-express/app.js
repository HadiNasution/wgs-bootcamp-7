const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact, saveContact, findContactByName, deleteContactByName, updateContactByName} = require('./utils/contact')
const {body, validationResult, check } = require('express-validator')
const app = express()

const PORT = 3000
const layout = 'layout/main-layout'

app.set('view engine', 'ejs') // memberitahu express bahwa kita akan menggunakan view engine ejs
app.use(expressLayouts) // juga menggunakan expressLayouts
app.use(express.static('public')) // memberitahu express bahwa folder 'public' bebas diakses
app.use(express.json()) // memberitahu express bahwa req dan res menggunakan format json
app.use(express.urlencoded({extended: true})) // memberitahu express untuk enable urlencoded, untuk method post

app.get('/', (req, res) => {
    res.render('index',{title: 'Home', layout})
})

app.get('/about', (req, res) => {
    res.render('about',{title: 'About', layout})
})

app.get('/contact', (req, res) => {
    const contacts = loadContact()
    res.render('contact', {title: 'Contacts', layout, contacts})
})

app.post('/contact/add', 
    [   //validasi dengan validator-express
        body('name').custom((value) => {
            // cek apakah nama sudah ada di data.json
            if(findContactByName(value)) {
                throw new Error('Nama sudah digunakan')
            }
            //cek apakah nama mengandung karakter spesial / angka
            const regex = /^[a-zA-Z0-9 ]*$/;
            if(!regex.test(value)) {
                throw new Error('Nama harus menggunakan huruf latin')
            }
            return true
        }),
        check('phoneNumber', 'Nomor HP tidak valid').isMobilePhone('id-ID'),
        check('email', 'Email tidak valid').isEmail()
    ], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){ // jika mendapati validasi error maka
        const contact = req.body
        res.render('add-contact', {title: 'Add new contact', layout, error: errors.array(), contact})
    } else { // jika tidak mendapatkan validasi error maka
        saveContact(req.body)
        res.redirect('/contact')
    }
})

app.get('/contact/add', (req, res) => {
    const contact = req.body
    res.render('add-contact', {title: 'Add new contact', layout, contact})
})

app.get('/contact/update/:name', (req, res) => {
    const contact = findContactByName(req.params.name)
    res.render('update-contact', {title: 'Update contact', layout, contact})
})

app.post('/contact/update',
    [
        body('name').custom((value, {req}) => {
        // cek jika ada nama yang duplikat (sudah ada di data.json) dan mengijinkan menggunakan nama sebelumnya
        if(value !== req.body.oldName && findContactByName(value)) {
            throw new Error('Nama sudah digunakan')
        }
        const regex = /^[a-zA-Z0-9 ]*$/;
        if(!regex.test(value)) {
            throw new Error('Nama harus menggunakan huruf latin')
        }
        return true
        }),
        check('phoneNumber', 'Nomor HP tidak valid').isMobilePhone('id-ID'),
        check('email', 'Email tidak valid').isEmail()
    ], (req, res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        const contact = req.body
        res.render('update-contact', {title: 'Update contact', layout, error: errors.array(), contact})
    } else {
        updateContactByName(req.body)
        res.redirect('/contact')
    }
})

app.get('/contact/details/:name', (req, res) => {
    const contact = findContactByName(req.params.name)
    res.render('detail-contact', {title: 'Contact details', layout, contact})
})

app.get('/contact/delete/:name', (req, res) => {
    deleteContactByName(req.params.name)
    res.redirect('/contact')
})

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