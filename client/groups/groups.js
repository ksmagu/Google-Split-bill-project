const userToken = localStorage.getItem('userData');
const userId = JSON.parse(userToken).user.id;
console.log(userToken)

//get all groups
const fetchGroups = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/groups', {
            headers: {
                Authorization: `Bearer ${JSON.parse(userToken).token}`,
            },
        });
        return await response.json();
    } catch (err) {
        alert('Unexpected error!');
        location.replace('../login/login.html');
        console.log(err);
    }
};

//get accounts
const userGroups = async () => {
    try {
        const response = await fetch(
            'http://localhost:8080/api/accounts',
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(userToken).token}`,
                },
            }
        );
        return await response.json();
    } catch (err) {
        location.replace('../login/login.html');
        console.log(err);
    }

};

//Display groups
const displayGroups = (data) => {
    const outputEl = document.getElementById('output');
    data.forEach((group) => {
        const button = document.createElement('button');
        const id = document.createElement('h1');
        const name = document.createElement('p');

        button.addEventListener('click', ()=>{
            sessionStorage.setItem('onClickGroupId', group.group_id);
            location.replace('../bills/bills.html')
        });

        button.setAttribute("id", "displayBtn")

        id.textContent = ` ID: ${group.group_id}`;
        name.textContent = group.name;

        button.append(id, name);
        outputEl.append(button);

    });
};


//Add group into database
document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
        group_id: event.target.elements.group_id.value,
    };

    await fetch('http://localhost:8080/api/accounts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(userToken).token}`,
        },
    });
    document.getElementById('output').textContent = '';
    const groups = await userGroups();
    displayGroups(groups);
});



document.addEventListener('DOMContentLoaded', async () => {
    if (!localStorage.getItem('userData')) location.replace('../login/login.html');
    const groups = await userGroups();
    displayGroups(groups);
});