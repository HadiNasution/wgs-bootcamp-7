const {checkFile, saveContact} = require('./contact')
const yargs = require('yargs')

checkFile()

yargs.command({
    command: 'add',
    describe: 'Add new contact',
    builder: {
        name: {
            describe: 'Nama lengkap',
            demandOption: true,
            stype: 'string',
        },
        phoneNumber: {
            describe: 'Nomor Handphone',
            demandOption: true,
            stype: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: true,
            stype: 'string',
        },
    },
    handler(argv) {
        saveContact(argv.name, argv.phoneNumber, argv.email)
    }
})

yargs.parse()

/*

yargs.command({
    command: 'list',
    describe: 'Show all contact list',
    handler() {
        listContact()
    }
})

yargs.command({
    command: 'detail',
    describe: 'Show contact detail by name',
    builder: {
        name: {
            describe: 'Nama yang dicari',
            demandOption: true,
            stype: 'string',
        },
    },
    handler(argv) {
        detailContact(argv.name)
    }
})

yargs.command({
    command: 'delete',
    describe: 'Delete contact by name',
    builder: {
        name: {
            describe: 'Nama yang ingin dihapus',
            demandOption: true,
            stype: 'string',
        },
    },
    handler(argv) {
        deleteContactByName(argv.name)
    }
})
const main = async () => {
    checkFile()

    const name = await ask('Siapa nama anda? ')
    const phoneNumber = await ask('Tuliskan No HP anda: ')
    const email = await ask('Tuliskan email anda: ')

    saveContact(name, phoneNumber, email)
}

main()
*/

