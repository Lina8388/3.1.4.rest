console.log('js app работает!');




const url = 'http://localhost:8080/admin'
let result = '';
const userList = document.querySelector('.user-list');
const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'));
const formEdit = document.querySelector('.form-edit');
const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'));
const formDelete = document.querySelector('.form-delete');
const newUser = document.querySelector('#newUser');
const tabNewUser = document.querySelector('#tabNewUser');
const formNew = document.querySelector('#formNewUser');
//const selectRoles = document.querySelector('.selectRoles');
//const newEnabled = document.getElementById('newEnabled');
//const newUsername = document.getElementById('newUsername');
const newPassword = document.getElementById('passwordN');
const newFirstName = document.getElementById('nameN');
const newLastName = document.getElementById('surnameN');
const newAge = document.getElementById('ageN');
//const newListRoleNames = document.getElementById('newListRoleNames');
let idForm = 0;



newUser.addEventListener('click', ()=>{

    newPassword.value = '';
    newFirstName.value = '';
    newLastName.value = '';
    newAge.value = '';
    //newListRoleNames.value = '';
    //selectRoles.children[0].className = 'form-group text-center w-50 mx-auto'
})

const getAllUsers = users => {
    users.sort((a, b) => Number(a.id) - Number(b.id)).forEach(user => {
        let userRoles = '';
        user.roles.forEach(role => {userRoles += role.name.substring(5) + ' '});
        result += `
            <tr id="user_${user.id}">
                <th scope="row">${user.id}</th>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>
                    <span>${userRoles}</span>
                </td>
                <td><button type="button" class="btn btn-info btnEdit" data-toggle="modal">Изменить</button></td>
                <td><button type="button" class="btn btn-danger btnDelete" data-toggle="modal">Удалить</button></td>
            </tr>
            `;
    })
    userList.innerHTML = result;
}



const openModal = (element, event, selector) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)) {
            selectRoles.children[0].className = 'form-group text-center list-role w-75 mx-auto'
            getUserInfo(e);
        }
    })
}





//Open edit
openModal(document, 'click', '.btnEdit')

//Open delete
openModal(document, 'click', '.btnDelete')

//Add new user
formNew.addEventListener('submit', e => {
    e.preventDefault();

    let roles = getRoles(Array.from(document.getElementById('newListRoleNames').selectedOptions));
    fetch(url, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({

            password:newPassword.value,
            name:newFirstName.value,
            surname:newLastName.value,
            age:newAge.value,
            roles: roles
        })
    }).then(res => {
        res.json().then(user => {
            let newUser = [];
            newUser.push(user);
            getAllUsers(newUser);
        })
    }).catch(error => console.log(error))

    document.getElementById('userTableLink').click();
})

//Edit user
/*formEdit.addEventListener('submit', e => {
    e.preventDefault();

    let enabled = document.getElementById('enabled');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let age = document.getElementById('age');
    let listRoleNames = document.getElementById('listRoleNames');
    let roles = getRoles(Array.from(document.getElementById('listRoleNames').selectedOptions));
    fetch(url+idForm, {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            enabled:enabled.checked,
            username:username.value,
            password:password.value,
            firstName:firstName.value,
            lastName:lastName.value,
            age:age.value,
            roles: roles
        })
    }).then(res => {
        res.json().then(user => {
            let roleNames = '';
            user.roles.forEach(role => {roleNames += role.name.substring(5) + ' '})
            const row = document.getElementById(`user_${idForm}`);
            row.children[1].innerHTML = user.username;
            row.children[2].innerHTML = user.firstName;
            row.children[3].innerHTML = user.lastName;
            row.children[4].innerHTML = user.age;
            row.children[5].innerHTML = roleNames;
        })
    }).catch(error => console.log(error))

    modalEdit.hide();
})

//Delete user
formDelete.addEventListener('submit', e => {
    e.preventDefault();

    fetch(url+idForm, {method:'DELETE'})
        .then(res => {
            document.getElementById(`user_${idForm}`).remove();
        }).catch(error => console.log(error))

    modalDelete.hide();
})
*/



























