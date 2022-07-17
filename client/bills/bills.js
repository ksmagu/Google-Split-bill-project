const userToken = localStorage.getItem('userData');
const userId = JSON.parse(userToken).user.id;
let groupId = Number(sessionStorage.getItem('onClickGroupId'));

console.log(groupId)

const fetchBills = async () => {
    try {
        const response = await fetch(`http://localhost:8080/api/bills/${groupId}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(userToken).token}`,
            },
        });
        console.log(response)
        return await response.json();
    } catch (err) {
        alert('Unexpected error!');
        // location.replace('../login/login.html');
        console.log(err);
    }
};


const displayBills = (data) => {
    data.forEach((bill) => {
        const table = document.querySelector('.tableOutput');
        const tableRow = document.createElement('tr');
        const id = document.createElement('td');
        const description = document.createElement('td');
        const amount = document.createElement('td');

        id.textContent=bill.id;
        description.textContent=bill.description;
        amount.textContent=` € ${bill.amount}`;

    tableRow.append(id, description,amount)
    table.append(tableRow);
    });
};

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
    group_id: groupId,
    amount: event.target.elements.amount.value,
    description: event.target.elements.description.value,
    };

    await fetch('http://localhost:8080/api/bills', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(userToken).token}`,
        },
    });
    document.querySelector('.tableOutput').textContent = '';
    const bills = await fetchBills();
    displayBills(bills)
});


document.addEventListener('DOMContentLoaded', async () => {
    if (!localStorage.getItem('userData')) location.replace('../login/login.html');
    const bills = await fetchBills();
    displayBills(bills);

});



