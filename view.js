let $ = require('jquery')
let fs = require('fs')
let filename = 'contacts'
let sno = 0

$('#add_to_list').on('click', () => {
    let name = $('#name').val()
    let email = $('#email').val()

    fs.appendFile('contacts', name + ',' + email + '\n')

    addEntry(name, email)
})

function addEntry(name, email) {
    let updateString = ""
    console.log(name + "//" + email)

    if (name && email) {
        sno++
        updateString = '<tr><td>' + sno + '</td><td>' + name + '</td><td>' + email + '</td></tr>'

        // TODO: Can't use JQuery append
        // $('#contact_table').append(updateString)

        document.getElementById('contact_table').innerHTML += updateString

        // let table = document.getElementById("contact_table").lastChild
        // let attach = document.createTextNode(updateString)
        // table.appendChild(attach)
    }
}

function loadAndDisplayContacts() {
    //Check if file exists
    if (fs.existsSync(filename)) {
        let data = fs.readFileSync(filename, 'utf8').split('\n')

        let count = 0
        data.forEach((contact, index) => {
            count++

            if (contact != "") {
                console.log(count + "//" + contact)

                let [name, email] = contact.split(',')
                addEntry(name, email)
            }
        })

    } else {
        console.log("File Doesn\'t Exist. Creating new file.")
        fs.writeFile(filename, '', (err) => {
            if (err)
                console.log(err)
        })
    }
}

loadAndDisplayContacts()
