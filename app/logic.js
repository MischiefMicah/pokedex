const api_url = `https://pokeapi.co/api/v2/pokemon/`;
const btn = document.querySelector('button');

const capitalization = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getTypes = (data, types) => {
    for (let i = 0; i < 18; i++) {
        types[`${i}`].innerHTML = '';
        types[`${i}`].style.display = 'none';
    }
    for (let i = 0; i < data.types.length; i++) {
        console.log(data.types[`${i}`].type.name);
        document.querySelector(`#${data.types[`${i}`].type.name}`).style.display = 'block';
        document.querySelector(`#${data.types[`${i}`].type.name}`).style.backgroundColor = (colors[`${data.types[`${i}`].type.name}`]);
        document.querySelector(`#${data.types[`${i}`].type.name}`).innerHTML = (capitalization(data.types[`${i}`].type.name));
    }
}

const screenOff = () => {
    document.querySelector('#screenOneWrap').style.display = 'none';
    document.querySelector('#screenOne').style.justifyContent = 'center';
    document.querySelector('#screenTwoWrap').style.display = 'none';
    document.querySelector('#loadingOne').style.display = 'block';
    document.querySelector('#loadingTwo').style.display = 'block';
}

const screenOn = (result) => {
    if (result === 'good') {
        document.querySelector('#screenOneWrap').style.display = 'block';
        document.querySelector('#screenOne').style.justifyContent = 'flex-start';
        document.querySelector('#screenTwoWrap').style.display = 'flex';
        document.querySelector('#loadingOne').style.display = 'none';
        document.querySelector('#loadingTwo').style.display = 'none';
    } else {
        document.querySelector('#screenOneWrap').style.display = 'block';
        document.querySelector('#screenOne').style.justifyContent = 'flex-start';
        document.querySelector('#screenTwoWrap').style.display = 'none';
        document.querySelector('#loadingOne').style.display = 'none';
        document.querySelector('#loadingTwo').style.display = 'none';
    }

}

const weightHeight = (weight, height) => {
    document.querySelector('#weight').innerHTML = `${Math.floor(weight / 4.536)}lbs`;
    document.querySelector('#height').innerHTML = (`${Math.floor(height * 3.97)}"`);
}

const colors = {
    normal: '#a8a878',
    fire: '#da7f3d',
    water: '#6890f0',
    grass: '#78c850',
    electric: '#f8d030',
    ice: '#98d8d8',
    fighting: '#c03028',
    poison: '#a040a0',
    ground: '#e0c068',
    flying: '#a890f0',
    psychic: '#f85888',
    bug: '#a8b820',
    rock: '#b8a038',
    ghost: '#705898',
    dark: '#705848',
    dragon: '#7038f8',
    steel: '#b8b8d0',
    fairy: '#f0b6bc'

}

btn.addEventListener('click', async () => {
    if (document.querySelector('#screenOneWrap').style.display === 'block') screenOff();
    document.querySelector('#loadingOne').style.animation = 'spin 1.2s linear infinite';
    document.querySelector('#loadingTwo').style.animation = 'spin 1.2s linear infinite';
    const inputVal = document.querySelector('input').value;
    try {
        const response = await fetch(`${api_url + inputVal}`);
        const data = await response.json();
        console.log(data);
        document.querySelector('h2').innerHTML = (capitalization(data.name));
        document.querySelector('#order').innerHTML = (`#${data.id}`);
        document.querySelector('img').outerHTML = `<img src="${data.sprites.front_default}" alt="${data.name}">`;
        const typeList = document.getElementsByClassName("type");
        getTypes(data, typeList);
        weightHeight(data.weight, data.height)
        setTimeout( function() {screenOn('good')}, 450);
    }
    catch {
        document.querySelector('h2').innerHTML = `There was an error trying to find ${inputVal}!`;
        document.querySelector('#order').innerHTML = (`#???`);
        document.querySelector('img').outerHTML = `<img src="images/error.png" alt="error">`;
        document.querySelector('img').style.maxWidth = '3.5em'
        document.querySelector('img').style.minWidth = '1em'
        setTimeout( function() {screenOn('bad')}, 450);
    }
})