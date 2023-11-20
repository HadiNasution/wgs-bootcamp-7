const fs = require('fs');

// lokasi file data JSON
const filePath = 'data/data.json'
const dirPath = './data'

// cek folder 'data', jika tidak ada maka buat folder 'data' baru
if(!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
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
function saveContact(contact) {
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
        // Menghapus elemen dari array tanpa meninggalkan nilai undefined dan menambah array baru
        contacts.splice(indexToDelete, 1);
        fs.writeFileSync(filePath, JSON.stringify(contacts))
        console.log(`==${name} BERHASIL DIHAPUS==`)
    } else {
        console.log(`==${name} TIDAK DITEMUKAN==`);
    }
}

// untuk memeriksa apakah ada nama yang duplikat
function findContactByName(name) {
    const contacts = loadContact()
    const contact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    return contact
}

// update kontak dengan memodifikasi kontak lama menggunakan .splice()
function updateContactByName(newContact) {
    const contacts = loadContact()

    const indexToDelete = contacts.findIndex(contact => contact.name.toLowerCase() ===  newContact.oldName.toLowerCase())
    // hapus oldName sebelum ditulis ke data.json
    delete newContact.oldName

    if (indexToDelete !== -1) {
        contacts.splice(indexToDelete, 1, newContact)
        fs.writeFileSync(filePath, JSON.stringify(contacts))
        console.log(`==${newContact.name} BERHASIL DIUPDATE==`)
    } else {
        console.log(`==${newContact.name} GAGAL DI UPDATE==`)
    }
}

// export fungsi sebagai local module
module.exports = {loadContact, saveContact, findContactByName, deleteContactByName, updateContactByName}