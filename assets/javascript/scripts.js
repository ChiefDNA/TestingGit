document.addEventListener("DOMContentLoaded",()=>{
    
  document.querySelector('#username').addEventListener('input',replacement);
  document.querySelector('#password').addEventListener('input',replacement);
  const form =document.querySelector('#loginform');
  form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const remember = form.querySelector('input[type="checkbox"]').checked;

    if (username==="admin" && password==="admin"){
        alert("Login Successful!");
        if(remember){
            localStorage.setItem("username",username);
        }
        window.location.href = "index.html";
    }
    else {
        alert("invalid username or password.");
    }
  })  
});

function replacement(event){
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g,'');

}
