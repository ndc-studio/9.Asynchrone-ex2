const input = document.getElementById('input');
const form = document.getElementById('form');
const sectionDiv = document.getElementById('div');

form.addEventListener('submit', function(event) {
    event.preventDefault()
    let name = input.value.trim();
    if (name === "") {
        alert('Please enter a name');
        return;
    }

    const select = document.getElementById('select');
    const selectedOption = select.options[select.selectedIndex];
    let country;

    switch (selectedOption.value) {
        case 'FR':
            country = 'FR';
            break;
        case 'EN':
            country = 'US';
            break;
        case 'SP':
            country = 'ES';
            break;
        case 'GE':
            country = 'DE';
            break;
        case 'IT':
            country = 'IT';
            break;
        default:
            country = 'US'; // Ou une valeur par défaut si nécessaire
    }
    
    const stoKey = `result_${name}_${country}`;
    const cache = localStorage.getItem(stoKey);
    if (cache) {
        let div = document.createElement('div');
        div.innerHTML = cache;
        sectionDiv.appendChild(div);
    } else {
        fetch('https://api.agify.io?name=' + name + '&country_id=' + country)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {  
            let div = document.createElement('div');
            let result = `${data.name} is ${data.age} years old`;
            div.innerHTML = result;
            sectionDiv.appendChild(div);
            localStorage.setItem(stoKey, result);
        })
        .catch(function(error) {
            console.log(error);
            alert('An error occurred while fetching data.');
        });
    }

    input.value = '';
});