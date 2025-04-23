document.addEventListener("DOMContentLoaded",()=>{
    counter = 1;
    fetch('assets/javascript/content.json')
    .then(response => response.json())
    .then(data =>{
        data.forEach(item => {
            document.querySelector('#paragraphs').innerHTML += `<div class="parag"><p>${item.content}</p></div>`
            counter++;
        });
    })
    .catch(error => console.error('Error:', error));
})