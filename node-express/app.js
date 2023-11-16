const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {loadContact, saveContact, detailContactByName,isNameDuplicate, deleteContactByName, updateContactByName} = require('./utils/contact')
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

app.post('/contact', 
    [   //validasi dengan validator-express
        body('name').custom((value) => {
            if(isNameDuplicate(value)) {
                throw new Error('Nama tidak boleh sama')
            }
            return true
        }),
        check('phoneNumber', 'Nomor HP tidak valid').isMobilePhone('id-ID'),
        check('email', 'Email tidak valid').isEmail()
    ], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){ // jika mendapati validasi error maka
        const {name, phoneNumber, email} = req.body
        res.render('add-contact', {title: 'Add new contact', layout, error: errors.array(), name, phoneNumber, email})
    } else { // jika tidak mendapatkan validasi error maka
        const {name, phoneNumber, email} = req.body
        saveContact(name, phoneNumber, email)
        res.redirect('/contact')
    }
})

app.get('/contact/add', (req, res) => {
    res.render('add-contact', {title: 'Add new contact', layout})
})

app.get('/contact/update/:name', (req, res) => {
    const {name, phoneNumber, email} = detailContactByName(req.params.name)
    res.render('update-contact', {title: 'Update contact', layout, name, phoneNumber, email})
})

app.post('/contact/update/:name', 
    [
        check('phoneNumber', 'Nomor HP tidak valid').isMobilePhone('id-ID'),
        check('email', 'Email tidak valid').isEmail()
    ], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const {name, phoneNumber, email} = req.body
        res.render('update-contact', {title: 'Update contact', layout, error: errors.array(), name, phoneNumber, email})
    } else {
        const {name, phoneNumber, email} = req.body
        const nameTarget = req.params.name
        updateContactByName(nameTarget, name, phoneNumber, email)
        res.redirect('/contact')
    }
})

app.get('/contact/details/:name', (req, res) => {
    const {name, phoneNumber, email} = detailContactByName(req.params.name)
    res.render('detail-contact', {title: 'Contact details', layout, name, phoneNumber, email})
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