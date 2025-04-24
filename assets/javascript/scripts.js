document.addEventListener("DOMContentLoaded",()=>{
    const source = new URL('assets/javascript/content.json', document.URL);
    fetch(source)
    .then(response => response.json())
    .then(data =>{
        console.log("succesfully proccesed data");
        data.forEach(item => {
            document.querySelector('#paragraphs').innerHTML += `<div class="parag"><p>${item.content}</p></div>`
        });
    })
    .catch(error => console.error('Error:', error));
});