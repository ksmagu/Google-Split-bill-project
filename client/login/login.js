const getUser = async (data) => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const user = await response.json();
        return user;
    } catch (err) {
        console.log(err);
    }
};

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
        email: event.target.elements.email.value,
        password: event.target.elements.password.value,
    };
    if (!data.email || !data.password) return;
    const { token, user } = await getUser(data);
    if (token) {
        localStorage.setItem(
            'userData',
            JSON.stringify({ token: token, user })
        );
        location.replace('../groups/groups.html');
    } else {
        alert('Such user does not exist, please try again or Register!');
    }
});
