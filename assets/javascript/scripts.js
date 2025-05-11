document.addEventListener("DOMContentLoaded",()=>{
    
  const userfield = document.querySelector('#username');
  const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{7,15}$/;


  //To check if current document accepts data
  if (userfield){

    //Select form fields
    const contact = document.querySelector('#contact');
    const address = document.querySelector('#address');
    const DOB = document.querySelector('#dateOfBirth');
    //const button = document.querySelector('.form-items.btn');
    const passwordField = document.querySelector('#password');
    const formLogin =document.querySelector('#loginform');
    const formRegister =document.querySelector('#registerForm');

    //To remove index file routing on form items
    document.querySelector(".section").addEventListener("click",()=>{window.location.href = "index.html";})
    document.querySelectorAll(".form-boundary, .row").forEach(element =>{
      element.addEventListener("click",(e)=>e.stopPropagation());
    });

    // field input listeners
    passwordField.addEventListener('input',(e)=>replacement(e,2));
    userfield.addEventListener('input',(e)=>replacement(e,1));
    

    //field listenesrs for registration
    if(address){
      contact.addEventListener('input',(e)=>replacement(e,3));
      address.addEventListener('input',(e)=>replacement(e,4));
      DOB.addEventListener('input',(e)=>replacement(e,5));

      formRegister.addEventListener('submit',(e)=>{
        e.preventDefault();

        if (!isValidContact(contact.value.trim())) {
          UserAlert(contact, "Enter a valid phone number or email address");
          return;
        }        

        data = {
          "username":userfield.value, 
          "contact":contact.value, 
          "address":address.value, 
          "dateOfBirth":DOB.value, 
          "password":passwordField.value
        };

        fetch('http://127.0.0.1:8000/accounts/user/',{
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data =>{
          alert("Registration Successful!");
          window.location.href = "index.html";
        })
        .catch(error => alert(error));
      });
  

    }else {
      formLogin.addEventListener('submit',(e)=>{
        e.preventDefault();
  
        const username = userfield.value.trim();
        const password = passwordField.value;
        const remember = form.querySelector('input[type="checkbox"]').checked;
        data = {'username':username, 'password':password}
  
        fetch('http://127.0.0.1:8000/accounts/login/',{
          method:'POST',
          headers: {
            'content-Type':'application/json'
          },
          body:JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          alert("Login Successful!");
            if(remember){
                localStorage.setItem("username",username);
            }
            window.location.href = "index.html";
        })
        .catch(error => alert(error))
      });
    }


  } 
  
  function isValidContact(value) {
    return emailRegex.test(value) || phoneRegex.test(value);
  }  

});

function replacement(event, pin){
    const input = event.target;

    switch (pin) {
      case 1: //username
        input.value = input.value.replace(/[^a-zA-Z0-9 ]/g,()=>UserAlert(input));    
        break;
      case 2: //password
        input.value = input.value.replace(/[^a-zA-Z0-9 @.!#$%&*]/g,()=>UserAlert(input));    
        break;
      case 3: //contacts
        input.value = input.value.replace(/[^a-zA-Z0-9.@ ]/g,()=>UserAlert(input));    
        break;
      case 4: //address
        input.value = input.value.replace(/[^a-zA-Z0-9. ,/_-]/g,()=>UserAlert(input));    
        break;
      case 5: //date of birth
        input.value = input.value.replace(/[^0-9-]/g,()=>UserAlert(input));    
        break;    
      default:
        break;
    }    

}
function UserAlert( input, msg = "AlphaNumeric characters Only"){
  if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("char-warning")){
    const message = document.createElement("div");
    message.textContent = msg;
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
