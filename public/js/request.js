const url = '/api/data';

function renderBody(data) {
    const html = data.map(ele => {
        return `
        <li>
            <img src="${ele.image}" alt="${ele.name}" />
            <p>${ele.name}</p>
        </li>
        `
    }).join('');
    document.querySelector('.content').innerHTML = html;
    
}

fetch(url).then(res => res.json()).then(data => {
    renderBody(data)
})
