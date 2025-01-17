// Function to get query parameter by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function fetchData(index) {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data[index];
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function updateMetaDescription(description) {
    
}

function renderDetails() {
    const id = getQueryParam('id');

    fetchData(id).then(data => {
        const details = document.querySelector('#title');
        details.innerHTML = `
            ${data.title}
        `;
        const author= document.querySelector('#author');
        author.innerHTML = `
            Autor: ${data.author}
        `;
        const date = document.querySelector('#date');
        date.innerHTML = `
            <i>Horario: ${data.date}</i>
        `;
        const description = document.querySelector('#desc');
        description.innerHTML = `
            ${data.desc}
        `;
        const bio = document.querySelector('#bio');
        bio.innerHTML = `
            ${data.bio}
        `;
        if(data.img){
            const imgponente = document.querySelector('#imgponente');
            imgponente.src= `${data.img}`;
        }
        document.title= data.title;

        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', data.desc);
        }
        if(data.bio2){
            const bio2autor = document.querySelector('#bioautor2');
            bio2autor.style = `display: block;`;
            const bio2 = document.querySelector('#bio2');
            bio2.innerHTML = `
                ${data.bio2}
            `;
        }
        if(data.img2){
            const img2 = document.querySelector('#imgponente2');
            img2.src= `${data.img2}`;
        }
    });
}