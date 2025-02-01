const search = document.getElementById('inputSearch')
let nomeCidade = document.querySelector('.nomeCidade');
let temperatura = document.querySelector('.temperatura');
let imgTemperatura = document.querySelector('.imgTemperatura')
let estadoPais = document.querySelector('.estadoPais')
let descricao = document.querySelector('.descricao')


async function falarTempo() {

    const url = `https://api.weatherstack.com/current?access_key=2f2cda3be052a4dcf5fcc69cfb9317d9&query=${search.value}`

    const options = {
        method: 'GET'
    }

    try {
        nomeCidade.innerText = "Carregando...";
        const response = await fetch(url, options);
        const result = await response.json();

        if (result.error) {
            nomeCidade.innerText = "Cidade não encontrada!"
        }else {
            const cityName = result.location.name;
            const temperature = result.current.temperature;
            const imgTemp = result.current.weather_icons;
            const estado = result.location.region;
            const pais = result.location.country;

            nomeCidade.innerHTML = `<h2>${cityName}</h2>`
            estadoPais.innerHTML = `${estado}, ${pais}`
            temperatura.innerText = `${temperature}° C`
            imgTemperatura.innerHTML = `<img src="${imgTemp}" alt="">`
        }
    } catch (error) {
        nomeCidade.innerText = "Erro interno"
    }
}

document.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        falarTempo();
    }
});