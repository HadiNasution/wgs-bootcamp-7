const {query} = require('./db')

// Fungsi dengan penanganan kesalahan
async function executeQuery(sql, params) {
    try {
      const result = await query(sql, params);
      return result.rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error; // Re-throw error agar dapat ditangani di tingkat yang lebih tinggi
    }
}

function getAllContact() {
    return executeQuery('SELECT * FROM contact ORDER BY id ASC')
}

function getContact(id) {
    return executeQuery('SELECT * FROM contact WHERE id=$1', [id])
}

function getContactName(name) {
    return executeQuery('SELECT name FROM contact WHERE name=$1', [name])
}

function deleteContact(id){
    return executeQuery('DELETE FROM contact WHERE id=$1', [id])
}

function addContact(name, phoneNumber, email) {
    return executeQuery('INSERT INTO contact(name,phonenumber,email) VALUES ($1,$2,$3)', [name, phoneNumber, email])
}

function updateContact(name, phoneNumber, email, id){
    return executeQuery('UPDATE contact SET name=$1, phonenumber=$2, email=$3 WHERE id=$4', [name, phoneNumber, email, id])
}

module.exports = {getAllContact, getContact,getContactName, deleteContact, addContact, updateContact}