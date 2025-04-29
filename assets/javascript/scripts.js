document.addEventListener("DOMContentLoaded",()=>{
    
  const userfield = document.querySelector('#username');

  //To check if current document accepts data
  if (userfield){

    //Select form fields
    const contact = document.querySelector('#contact');
    const address = document.querySelector('#address');
    const DOB = document.querySelector('#dateOfBirth');
    //const button = document.querySelector('.form-items.btn');
    const passwordField = document.querySelector('#password');
    const form =document.querySelector('#loginform');

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

      form.addEventListener('submit',(e)=>{
        e.preventDefault();
  
        data = {
          "username":userfield.value, 
          "contact":contact.value, 
          "address":address.value, 
          "dateOfBirth":DOB.value, 
          "password":passwordField.value
        };

        fetch('http://127.0.0.1:8000/accounts/',{
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data =>console.log(data))
        .catch(error => console.error(error));
      });
  

    }else {
      form.addEventListener('submit',(e)=>{
        e.preventDefault();
  
        const username = userfield.value.trim();
        const password = passwordField.value;
        const remember = form.querySelector('input[type="checkbox"]').checked;
  
  
        //Log in varifying
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


  }  
});

function replacement(event, pin){
    const input = event.target;

    switch (pin) {
      case 1: //username
        input.value = input.value.replace(/[^a-zA-Z0-9 ]/g,()=>UserAlert(input));    
        break;
      case 2: //password
        //input.value = input.value.replace(/[^a-zA-Z0-9]/g,()=>UserAlert(input));    
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
