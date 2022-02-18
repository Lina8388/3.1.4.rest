const url = 'http://localhost:8080/api/admin'


const newName = document.getElementById('nameN');
const newLastName = document.getElementById('surnameN');
const newAge = document.getElementById('ageN');
const newEmail = document.getElementById('emailN')
const newPassword = document.getElementById('passwordN');
const newUser = document.getElementById('newUser');

const idE = document.getElementById('idE')
const nameE = document.getElementById('nameE')
const surnameE = document.getElementById('surnameE')
const ageE = document.getElementById('ageE')
const emailE = document.getElementById('emailE')
const passwordE = document.getElementById('passwordE')
const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
const formEdit = document.getElementById('modalEdit')

const idD = document.getElementById('idD')
const nameD = document.getElementById('nameD')
const surnameD = document.getElementById('surnameD')
const ageD = document.getElementById('ageD')
const emailD = document.getElementById('emailD')
const passwordD = document.getElementById('passwordD')
const formD = document.getElementById('modalDelete')


//------------------get role--------------------------------
function selectRole(r) {
    let roles = [];
    if (r.indexOf("USER") >= 0) {
        roles.push({"id": 2});
    }
    if (r.indexOf("ADMIN") >= 0) {
        roles.push({"id": 1});
    }
    return roles;
}


//------------------table all user--------------------------------
allUsers()

async function allUsers() {
    let output = '';
    fetch(url, {
        mode: "no-cors",
    })
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                output += `<tr>
                                    <td >${user.id}</td>
                                    <td >${user.name}</td>
                                    <td >${user.surname}</td>
                                    <td >${user.age}</td>
                                    <td >${user.email}</td>
                                     <td >`
                for (const r of user.roles) {
                    output += r.role.replace('ROLE_', '') + " ";
                }

                output += `</td>
                                <td><button class="btn btn-primary editButton"  >Edit</button></td>
                                <td><button class="btn btn-danger deleteButton " >Delete</button></td>
</tr>`;
            });
            document.querySelector('tbody').innerHTML = output;
        })
}


//----------new user --------------------------------

newUser.addEventListener('submit', e => {
    e.preventDefault();

    let newRoles = selectRole(Array.from(document.getElementById("rolesN").selectedOptions)
        .map(role => role.value));
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            name: newName.value,
            surname: newLastName.value,
            age: newAge.value,
            email: newEmail.value,
            password: newPassword.value,

            roles: newRoles

        })
    }).then(res => {
        res.json().then(user => {
            let newUser = [];
            newUser.push(user);
            allUsers(newUser)
        })
    })

        .catch(error => console.log(error))
    newName.value = ''
    newLastName.value = ''
    newAge.value = ''
    newEmail.value = ''
    newPassword.value = ''
    document.getElementById('usersTableTab').click();
})


//---------- update user --------------------------------
async function getPassword(id) {
    let user = await (await fetch('api/admin/' + id)).json();
    let password = $('#passwordE').val(user.password);
}

let idForm = 0
const openModal = (element, event, selector, handler) => {
    console.log(handler)
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}


openModal(document, 'click', '.editButton', e => {

    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nameF = fila.children[1].innerHTML
    const surnameF = fila.children[2].innerHTML
    const ageF = fila.children[3].innerHTML
    const emailF = fila.children[4].innerHTML

    idE.value = idForm
    nameE.value = nameF
    surnameE.value = surnameF
    ageE.value = ageF
    emailE.value = emailF
    passwordE.value = getPassword(idForm)
    modalEdit.show()
    console.log('working edit form')
})

formEdit.addEventListener('submit', e => {
    e.preventDefault();
    let rolesE = selectRole(Array.from(document.getElementById("rolesE").selectedOptions)
        .map(role => role.value));

    fetch('api/admin/' + idForm, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            id: idE.value,
            name: nameE.value,
            surname: surnameE.value,
            age: ageE.value,
            email: emailE.value,
            password: passwordE.value,
            roles: rolesE

        })
    })
        .then(() => allUsers())
        .catch(error => console.log(error))

    modalEdit.hide();
})


//---------- удаление юзера --------------------------------
async function getPasswordD(id) {
    let user = await (await fetch('api/admin/' + id)).json();
    let password = $('#passwordD').val(user.password);
}

const openModalD = (element, event, selector, handler) => {
    console.log(handler)
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

openModalD(document, 'click', '.deleteButton', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nameF = fila.children[1].innerHTML
    const surnameF = fila.children[2].innerHTML
    const ageF = fila.children[3].innerHTML
    const emailF = fila.children[4].innerHTML

    idD.value = idForm
    nameD.value = nameF
    surnameD.value = surnameF
    ageD.value = ageF
    emailD.value = emailF
    passwordD.value = getPasswordD(idForm)
    modalDelete.show()
})

formD.addEventListener('submit', e => {
    e.preventDefault();

    fetch('api/admin/' + idForm, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => allUsers())
        .catch(error => console.log(error))
    modalDelete.hide();
})



const URL2 = 'http://91.241.64.178:7081/api/users'

fetch(URL2, {
    method: 'Post',
    headers: {
        'Content-Type': 'application/json'},
    body: JSON.stringify(
        {
            "id": 3,
            "name": "James",
            "lastName": "Brown",
            "age": 23
        }
    )


    })

    .then(res=> console.log(res.json()) )



























