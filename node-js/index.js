const fs = require('fs');
const readLine = require('readline');
const validator = require('validator');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

// let data = "Ichbal Hadi Nasution"; 

// fs.writeFile("file.txt", data, (err) => { 
//     if (err) 
//         console.log(err); 
//     else { 
//         console.log("File written successfully\n"); 
//     } 
// }); 

// fs.readFile('file.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(`File contains : ${data}`);
// });

//==============================================================================================


// Fungsi askPhoneNumber bertanggung jawab untuk memvalidasi nomor telepon yang dimasukkan oleh pengguna.
// Menggunakan fungsi validator.isMobilePhone untuk memeriksa apakah nomor telepon valid dengan format Indonesia ('id-ID').
// Jika valid, program akan mencetak pesan 'Ok, Valid!' dan melanjutkan ke langkah berikutnya yaitu meminta alamat email.
// Jika tidak valid, akan mencetak pesan kesalahan dan meminta input nomor telepon lagi.
function askPhoneNumber() {
    function recursiveAsk() {
        rl.question('Nomor HP kamu? ', number => {
            if (validator.isMobilePhone(number, 'id-ID')) {
                console.log('Ok, Valid!');
                askEmail();
            } else {
                console.log('Nomor HP tidak valid. Silakan coba lagi.');
                recursiveAsk();
            }
        });
    }
    recursiveAsk();
}

// Fungsi askEmail bertugas untuk memvalidasi alamat email yang dimasukkan oleh pengguna.
// Menggunakan fungsi validator.isEmail untuk memeriksa apakah alamat email valid.
// Jika valid, program mencetak pesan 'Ok, Valid!' dan menutup antarmuka baris perintah (CLI).
// Jika tidak valid, mencetak pesan kesalahan dan meminta input alamat email lagi.
function askEmail() {
    function recursiveAsk() {
        rl.question('Email kamu? ', email => {
            if (validator.isEmail(email)) {
                console.log('Ok, Valid!');
                rl.close();
            } else {
                console.log('Email tidak valid. Silakan coba lagi.');
                recursiveAsk();
            }
        });
    }
    recursiveAsk();
}

// Fungsi main merupakan fungsi utama yang memulai eksekusi program.
// Menggunakan askName untuk meminta nama pengguna, kemudian mencetak pesan sapaan dengan nama yang dimasukkan.
// Selanjutnya, memanggil askPhoneNumber untuk meminta nomor telepon dan memulai serangkaian validasi input pengguna.
function main() {
    rl.question('Nama kamu? ', name => {
        console.log(`Yo! ${name}`);
        askPhoneNumber();
    });
}

// Memanggil fungsi main untuk menjalankan program secara keseluruhan.
main();

