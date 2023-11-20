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
    return executeQuery('SELECT * FROM contact')
}

function getContact(name) {
    return executeQuery('SELECT * FROM contact WHERE name=$1', [name])
}

function deleteContact(name){
    return executeQuery('DELETE FROM contact WHERE name=$1', [name])
}

function addContact(name, phoneNumber, email) {
    return executeQuery('INSERT INTO contact(name,phonenumber,email) VALUES ($1,$2,$3)',[name, phoneNumber, email])
}

module.exports = {getAllContact, getContact, deleteContact, addContact}