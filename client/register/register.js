
const createUser = async (data) => {
    try {
        const response = await fetch(
            'http://localhost:8080/api/auth/register',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const user = await response.json();
        console.log(user)
        return user;
    } catch (err) {
        alert('err');
        console.log(err);
    }
};

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const password = document.getElementById('password');
    const repeatPassword = document.getElementById('repeatPassword');
    const pass = matchPassword(password,repeatPassword)
    const data = {
        full_name: event.target.elements.full_name.value,
        email: event.target.elements.email.value,
        pass
    };
    const userData = await createUser(data);
    console.log(userData.insertId)
    if (userData.insertId) {
        location.replace('../login/login.html');
    } else if (userData.error) {
        alert(userData.error)
    }
    else {
        alert('Not Registered, incorrect input data!');
    }
    

});


const matchPassword = (password, repeatPassword) =>
    password === repeatPassword ? password : alert('Passwords does not match!');

