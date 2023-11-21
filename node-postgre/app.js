const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {body, validationResult, check } = require('express-validator')
const app = express()
const {getAllContact, getContact,getContactName, deleteContact, addContact, updateContact} = require('./utils/model')

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
            // tidak menginjinkan nama menggunakan karakter spesial. Hanya menginjinkan spasi dan huruf latin
            const regex = /^[a-zA-Z0-9 ]*$/;
            if(!regex.test(value)) {
                throw new Error('Nama harus menggunakan huruf latin')
            }
            return true
        }),
        check('phoneNumber', 'Nomor HP tidak valid').isMobilePhone('id-ID'),
        check('email', 'Email tidak valid').isEmail()
    ], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){ // jika mendapati validasi error maka
        const contact = req.body
        res.render('add-contact', {title: 'Add new contact', layout, error: errors.array(), contact})
    } else { // jika tidak mendapatkan validasi error maka
        try {
            const {name, phoneNumber, email} = req.body
            await addContact(name, phoneNumber, email)
            res.redirect('/contact')
        } catch (error) {
            console.error('Error message:', error);
            res.status(500).send('Internal Server Error');
        }
    }
})

app.get('/contact/add', (req, res) => {
    const contact = req.body
    res.render('add-contact', {title: 'Add new contact', layout, contact})
})

app.get('/contact/update/:id', async (req, res) => {
    try {
        const contact = await getContact(req.params.id)
        res.render('update-contact', {title: 'Update contact', layout, contact})
    } catch (error) {
        console.error('Error message:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/contact/update',
    [
        body('name').custom((value) => {
        // tidak mengijinkan nama menggunakan karakter spesial. Hanya dibolehkan menggunakan spasi dan huruf latin
        const regex = /^[a-zA-Z0-9 ]*$/;
        if(!regex.test(value)) {
            throw new Error('Nama harus menggunakan huruf latin')
        }
        return true
        }),
        check('phoneNumber', 'Nomor HP tidak valid').isMobilePhone('id-ID'),
        check('email', 'Email tidak valid').isEmail()
    ], async (req, res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        const contact = req.body
        res.render('update-contact', {title: 'Update contact', layout, error: errors.array(), contact})
    } else {
        try {
            const {id, name, phoneNumber, email} = req.body
            await updateContact(name, phoneNumber, email, id)
            res.redirect('/contact')
        } catch (error) {
            console.error('Error message:', error);
            res.status(500).send('Internal Server Error');
        }
    }
})

app.get('/contact/details/:id', async (req, res) => {
    try {
        const contact = await getContact(req.params.id)
        res.render('detail-contact', {title: 'Contact details', layout, contact})
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.get('/contact/delete/:id', async (req, res) => {
    try {
        await deleteContact(req.params.id)
        res.redirect('/contact')
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})