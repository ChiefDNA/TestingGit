document.addEventListener("DOMContentLoaded",()=>{
    
  const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{7,15}$/;

  // logged in logic
  UserAccount = localStorage.getItem("TestingGit");
  if (UserAccount){
    //login button
    UserAccount = JSON.parse(UserAccount);
    const login = document.querySelector('.rout-wrap.login a')
    login.textContent = 'Log Out';
    login.href = '';
    //user identifier bunner
    const banner = document.querySelector('.banner');
    const nameBanner = document.createElement('ul');
    const idBanner = document.createElement('ul');

    nameBanner.textContent = 'Welcome Back '+UserAccount.username;
    idBanner.textContent = 'User Id '+UserAccount.userId;

    banner.appendChild(nameBanner);
    banner.appendChild(idBanner);
    banner.classList.add('occupied');

    login.addEventListener('click',(e)=>{
      login.textContent = 'Log In';
      login.href = 'login.html';
      banner.innerHtml = '';
      banner.classList.remove('occupied');
      localStorage.clear('TestingGit');
    });
  }


  // login logic
  if (document.location.pathname==='/login.html'){
    //exit on clicking ouside form
    document.querySelector(".section").addEventListener("click",()=>{window.location.href = "index.html";})
    document.querySelectorAll(".form-boundary, .row").forEach(element =>{
      element.addEventListener("click",(e)=>e.stopPropagation());
    });

    const contact = document.querySelector('#contact');
    const userfield = document.querySelector('#username');
    const passwordField = document.querySelector('#password');
    const loginType = document.querySelector('.user-contact');
    const formLogin =document.querySelector('#loginform');

    loginType.addEventListener('click', function(){
      const isUsernameVisible = !userfield.classList.contains('form-items-Sw');

      if (isUsernameVisible){
        userfield.className = 'form-items-Sw';
        contact.className = 'form-items';
        userfield.toggleAttribute('required');
        contact.toggleAttribute('required');
      } else {
        userfield.className = 'form-items';
        contact.className = 'form-items-Sw';
        userfield.toggleAttribute('required');
        contact.toggleAttribute('required');
      }
    })

    //login submiting
    formLogin.addEventListener('submit',(e)=>{
      e.preventDefault();

      const username = userfield.value.trim();
      const password = passwordField.value;
      const remember = formLogin.querySelector('input[type="checkbox"]').checked;

      if (userfield.classList.contains('form-items-Sw')){
        data = {'contact':contact.value, 'password':password};
      } else {
        data = {'username':username, 'password':password};
      }
      
    // field input listeners
    passwordField.addEventListener('input',(e)=>replacement(e,2));
    userfield.addEventListener('input',(e)=>replacement(e,1));
    contact.addEventListener('input',(e)=>replacement(e,3));

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
              localStorage.setItem("TestingGit",JSON.stringify(data));
          }
          window.location.href = "index.html";
      })
      .catch(error => alert(error))
    });

  }

  //To check if current document accepts data
  if (document.location.pathname==='/registration.html'){
    //exit to index file on clicking outside the form
    document.querySelector(".section").addEventListener("click",()=>{window.location.href = "index.html";})
    document.querySelectorAll(".form-boundary, .row").forEach(element =>{
      element.addEventListener("click",(e)=>e.stopPropagation());
    });

    //Select form fields
    const contact = document.querySelector('#contact');
    const address = document.querySelector('#address');
    const userfield = document.querySelector('#username');
    const DOB = document.querySelector('#dateOfBirth');
    const passwordField = document.querySelector('#password');
    const formRegister =document.querySelector('#registerForm');

    // field input listeners
    passwordField.addEventListener('input',(e)=>replacement(e,2));
    userfield.addEventListener('input',(e)=>replacement(e,1));
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
