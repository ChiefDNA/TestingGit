document.addEventListener("DOMContentLoaded",()=>{
    source = document.URL + 'assets/javascript/content.json'
    fetch(source)
    .then(response => response.json())
    .then(data =>{
        console.log("succesfully called the file",data)
        data.forEach(item => {
            document.querySelector('#paragraphs').innerHTML += `<div class="parag"><p>${item.content}</p></div>`
        });
    })
    .catch(error => console.error('Error:', error));
});

