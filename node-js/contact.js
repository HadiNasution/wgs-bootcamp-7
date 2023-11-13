const fs = require('fs');
const validator = require('validator');

// const rl = readLine.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

const filePath = 'data.json';

function checkFile() {
    if(!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]', 'utf-8');
    }
}

// const ask = (question) => {
//     return new Promise((resolve, rejects) => {
//         rl.question(question, (data) => {
//             resolve(data)
//         })
//     });
// }

const loadContact = () => {
    const fileBuffer = fs.readFileSync(filePath, 'utf-8')
    const contacts = JSON.parse(fileBuffer)
    return contacts
}

const saveContact = (name, phoneNumber, email) => {
    const contact = {name, phoneNumber, email}
    const contacts = loadContact()

    const duplicate = contacts.find((contact) => contact.name == name)
    if(duplicate) {
        console.log('Nama sudah terdaftar.')
        return false
    }

    if(!validator.isMobilePhone(phoneNumber, 'id-ID')) {
        console.log('Nomor HP tidak valid')
        return false
    }

    if(email) {
        if(!validator.isEmail(email)) {
            console.log('Email tidak valid.')
            return false
        }
    }

    contacts.push(contact)
    fs.writeFileSync(filePath, JSON.stringify(contacts))
    console.log('Data sudah disimpan.')
}




module.exports = {checkFile, saveContact}

/*
const listContact = () => {
    const contacts = loadContact()
    console.log('DAFTAR KONTAK')
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.name} - ${contact.phoneNumber} - ${contact.email}`)
    });
} 
function deleteContactByName(name) {
    const contacts = loadContact()
    const indexToDelete = contacts.findIndex(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (indexToDelete !== -1) {
        // Menghapus elemen dari array tanpa meninggalkan nilai undefined
        contacts.splice(indexToDelete, 1);
        fs.writeFileSync(filePath, JSON.stringify(contacts))
        console.log(`${name} berhasil dihapus.`)
    } else {
        console.log(`${name} tidak ditemukan.`);
    }
}
const detailContact = (name) => {
    const contacts = loadContact()
    const contact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
    
    if(!contact) {
        console.log(`${name} tidak ditemukan.`)
        return false
    }
    console.log(`Nama : ${contact.name}`)
    console.log(`No Hanphone : ${contact.phoneNumber}`)
    console.log(`Email : ${contact.email}`)
    
}
function askPhoneNumber() {
    function recursiveAsk() {
        rl.question('Nomor HP kamu? ', number => {
            if (validator.isMobilePhone(number, 'id-ID')) {
                console.log('Ok, Valid!');
                dataObj.number = number;
                askEmail();
            } else {
                console.log('Nomor HP tidak valid. Silakan coba lagi.');
                recursiveAsk();
            }
        });
    }
    recursiveAsk();
}

function askEmail() {
    function recursiveAsk() {
        rl.question('Email kamu? ', email => {
            if (validator.isEmail(email)) {
                console.log('Ok, Valid!');
                dataObj.email = email;

                // save data kontak ke data.json
                saveDataToFile(dataObj);

                // read data kontak data.json
                readData(dataObj);

                // end prompt
                rl.close();
            } else {
                console.log('Email tidak valid. Silakan coba lagi.');
                recursiveAsk();
            }
        });
    }
    recursiveAsk();
}

function main() {
    rl.question('Nama kamu? ', name => {
        console.log(`Yo! ${name}`);
        dataObj.name = name;
        askPhoneNumber();
    });
}

function checkFile() {
    if(!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]', 'utf-8');
    }
}

function saveDataToFile(data) {
    dataArr.push(dataObj);
    const jsonData = JSON.stringify(dataArr, null, 2);
    
    fs.writeFile('data.json', jsonData, 'utf8', err => {
        if (err) {
            console.error('Gagal menyimpan data ke file:', err);
        } else {
            console.log('Data berhasil disimpan ke file data.json');
        }
    });
}

function readData(data) {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        try {   
            console.log(`File contains : ${dataArr}`);
        } catch (err) {
            console.log(err);
        }
    });
}
*/