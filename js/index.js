//Shows the first 50 monsters on page load
let currentPage = 1;
let limit = 50;

async function loadMonsterImages(page){
    const monsterContainer = document.getElementById('monster-container');

    // Pulling data from the server
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {

            const monsterHeader = document.createElement('h3');
            monsterHeader.textContent = element.name;

            const monsterAge = document.createElement('h4');
            monsterAge.textContent = `Age: ${element.age}`;

            const monsterDescription = document.createElement('p');
            monsterDescription.textContent = element.description;

            monsterContainer.append(monsterHeader, monsterAge , monsterDescription)
            
        });
        
    })
    allowingTogglingOfPages();
    
}

function addingForm(){
    const monsterFormContainer = document.getElementById('create-monster');
    const monsterForm = document.createElement('form');

    const monsterFormNameInput = document.createElement('input');
    monsterFormNameInput.placeholder = 'Enter name of monster'
    monsterFormNameInput.required = true;

    const monsterFormAgeInput = document.createElement('input');
    monsterFormAgeInput.placeholder = 'Enter age of monster'
    monsterFormAgeInput.required = true;

    const monsterFormDescriptionInput = document.createElement('input');
    monsterFormDescriptionInput.placeholder = 'Enter description of monster'
    monsterFormDescriptionInput.required = true;
    
    const monsterFormSubmit = document.createElement('button');
    monsterFormSubmit.type = 'submit';
    monsterFormSubmit.textContent = 'Create monster';

    monsterForm.append(monsterFormNameInput, monsterFormAgeInput, monsterFormDescriptionInput, monsterFormSubmit);
    monsterFormContainer.appendChild(monsterForm);

    monsterForm.addEventListener('submit', function(e){
        e.preventDefault();
        fetch(`http://localhost:3000/monsters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "name": monsterFormNameInput.value,
                "age": monsterFormAgeInput.value,
                "description": monsterFormDescriptionInput.value,
            })
        })
        .then(res => res.json())
        .then(data => console.log(data)
        )
    })
}

function allowingTogglingOfPages(){
    const forwardButton = document.getElementById('forward');
    const backButton = document.getElementById('back');

    forwardButton.addEventListener('click', function(){
        currentPage++;
        loadMonsterImages(currentPage)
    })

    backButton.addEventListener('click', function(){
        if(currentPage > 1){
            currentPage--;
            loadMonsterImages(currentPage)
        }
        
    })
}


function main(){
    loadMonsterImages(currentPage);
    addingForm();
}

document.addEventListener('DOMContentLoaded', function(){
    main();
})