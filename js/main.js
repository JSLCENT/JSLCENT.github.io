function getQueryParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}

function renderTalkDetails(data) {
    document.getElementById('title').textContent = data.name;
    document.getElementById('description').textContent = data.description;
    document.getElementById('date').textContent = data.date;
    document.getElementById('hour').textContent = data.hour;
    document.getElementsByTagName('title')[0].textContent = data.name + ' - SLCENT XXII';
    for (let author of data.authors) {
        if(!author.picture)
            author.picture='/img/defaultuser.png'
       const authorData=`
                <!-- Autor 1 -->
                <div class="bg-white p-8 rounded-lg shadow-md text-center">
                    <img src="${author.picture}" alt="Foto del ponente" class="w-40 h-40 rounded-full mx-auto mb-4 object-cover bg-gray-200">
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">${author.name}</h3>
                    <p class="text-purple-600 font-semibold mb-4">Puesto / Especialidad</p>
                    <p class="text-gray-700 leading-relaxed">
                        ${author.bio}
                    </p>
                </div>`;
         document.querySelector('#authorsGrid').insertAdjacentHTML('beforeend', authorData);
    }
}

function getDataFromJson() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const id = getQueryParam('id');
            console.log('Query Param ID:', id);
            for (let item of data) {
                if (item.id === Number(id)) {
                    renderTalkDetails(item);
                    break;
                }
            }

        })
        .catch(error => console.error('Error fetching JSON data:', error));
}