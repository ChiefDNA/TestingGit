document.addEventListener("DOMContentLoaded",()=>{
    
  const userfield = document.querySelector('#username');
  if (userfield){

    const passwordField = document.querySelector('#password');
    const form =document.querySelector('#loginform');

    document.querySelector(".section").addEventListener("click",()=>{window.location.href = "index.html";})
    document.querySelectorAll(".form-boundary, .row").forEach(element =>{
      element.addEventListener("click",(e)=>e.stopPropagation());
    });

    passwordField.addEventListener('input',replacement);
    userfield.addEventListener('input',replacement);

    form.addEventListener('submit',(e)=>{
      e.preventDefault();

      const username = userfield.value.trim();
      const password = passwordField.value.trim();
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
    });
  }  
});

function replacement(event){
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g,()=>UserAlert(input));

}
function UserAlert( input){
  if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("char-warning")){
    const message = document.createElement("div");
    message.textContent ="AlphaNumeric characters Only";
    message.className = "char-warning";
    input.parentElement.appendChild(message);

    setTimeout(()=>{
      if (message && message.parentElement){
        message.remove();
      }
    },2000);
  }
  return "";
}
