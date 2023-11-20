const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {body, validationResult, check } = require('express-validator')
const app = express()
const {getAllContact, getContact, deleteContact, addContact} = require('./utils/model')

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

app.get('/contact', async(req, res) => {
    try {
      const contacts = await getAllContact()
      res.render('contact', { title: 'Contacts', layout, contacts });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    }
});
  

app.post('/contact/add', 
    [   //validasi dengan validator-express
        body('name').custom((value) => {
            // cek apakah nama sudah ada di data.json
            if(findContactByName(value)) {
                throw new Error('Nama sudah digunakan')
            }
            // tidak menginjinkan nama menggunakan karakter spesial. Hanya menginjinkan spasi dan huruf latin
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
        const {name, phoneNumber, email} = req.body
        addContact(name, phoneNumber, email)
        res.redirect('/contact')
    }
})

app.get('/contact/add', (req, res) => {
    const contact = req.body
    res.render('add-contact', {title: 'Add new contact', layout, contact})
})

app.get('/contact/update/:name', (req, res) => {
    const contact = deleteContact(req.params.name)
    res.render('update-contact', {title: 'Update contact', layout, contact})
})

app.post('/contact/update',
    [
        body('name').custom((value, {req}) => {
        // apakah nama yang baru berbeda dengan nama lama, jika iya maka...
        if(value !== req.body.oldName) {
            // cek apakah nama tersebut sudah pernah digunakan
            if(findContactByName(value)) {
                throw new Error('Nama sudah digunakan')
            }  
        } 
        // tidak mengijinkan nama menggunakan karakter spesial. Hanya dibolehkan menggunakan spasi dan huruf latin
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

app.get('/contact/details/:name', async (req, res) => {
    try {
        const contact = await getContact(req.params.name)
        res.render('detail-contact', {title: 'Contact details', layout, contact})
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/contact/delete/:name', (req, res) => {
    deleteContactByName(req.params.name)
    res.redirect('/contact')
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})