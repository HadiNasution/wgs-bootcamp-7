const fs = require('fs');

// lokasi file data JSON
const filePath = 'data/data.json';

// cek folder 'data', jika tidak ada maka buat folder 'data' baru
if(!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
    console.log('==FOLDER DATA SUDAH DIBUAT==')
}

// cek file 'data.json' jika tidak ada maka buat file 'data.json' baru
if(!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
    console.log('==FILE DATA.JSON SUDAH DIBUAT==')
}

// untuk membaca file 'data.json' lalu di parsing kebentuk objek
const loadContact = () => {
    const fileBuffer = fs.readFileSync(filePath, 'utf-8')
    const contacts = JSON.parse(fileBuffer)
    return contacts
}

// untuk menyimpan data kontak yang menerima 3 argumen, argumen tersebut akan disimpan
// kedalam file 'data.json'. Sebelum disimpan, data/pertanyaan akan divalidasi dulu
function saveContact(name, phoneNumber, email) {
    const contact = {name, phoneNumber, email}
    const contacts = loadContact()
    
    contacts.push(contact)
    fs.writeFileSync(filePath, JSON.stringify(contacts))
    console.log('==DATA SUDAH DISIMPAN==')
}

// menghapus kontak berdasarkan nama
function deleteContactByName(name) {
    const contacts = loadContact()
    const indexToDelete = contacts.findIndex(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (indexToDelete !== -1) {
        // Menghapus elemen dari array tanpa meninggalkan nilai undefined
        contacts.splice(indexToDelete, 1);
        fs.writeFileSync(filePath, JSON.stringify(contacts))
        console.log(`==${name} BERHASIL DIHAPUS==`)
    } else {
        console.log(`==${name} TIDAK DITEMUKAN==`);
    }
}

function isNameDuplicate(name) {
    const contacts = loadContact()
    const isDuplicate = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    return isDuplicate
}

// menampilkan detail kontak berdasarkan nama
function detailContactByName(name) {
    const contacts = loadContact()
    const contact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    
    if(!contact) {
        console.log(`==${name} TIDAK DITEMUKAN==`)
        return false
    }
    return contact
}

// update kontak, menerima 4 argumen. Argumen selain 'name' optional
function updateContactByName(name, newName, newPhoneNumber, newEmail) {
    const contacts = loadContact()
    const contact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())

    if(!contact) {
        console.log(`==${name} TIDAK DITEMUKAN==`)
        return false
    }
    // jika tidak ada data baru, maka akan menggunakan data yang lama
    const updatedName = (newName) ? newName : contact.name
    const updatedPhoneNumber = (newPhoneNumber) ? newPhoneNumber : contact.phoneNumber
    const updatedEmail = (newEmail) ? newEmail : contact.email

    const newContact = {
        name: updatedName, 
        phoneNumber: updatedPhoneNumber, 
        email: updatedEmail
    }

    const indexToDelete = contacts.findIndex(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (indexToDelete !== -1) {
        contacts.splice(indexToDelete, 1, newContact);
        fs.writeFileSync(filePath, JSON.stringify(contacts))
        console.log(`==${name} BERHASIL DIUPDATE==`)
    } else {
        console.log(`==${name} GAGAL DI UPDATE==`);
    }
}

// export fungsi sebagai local module
module.exports = {loadContact, saveContact, detailContactByName,isNameDuplicate, deleteContactByName, updateContactByName}