let UserAccount = {}
document.addEventListener("DOMContentLoaded",()=>{
    
  const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{7,15}$/;

  // logged in logic
  UserAccount = localStorage.getItem("TestingGit");
  if (UserAccount){
    UserAccount = JSON.parse(UserAccount)
    //login button
    if(document.location.pathname==='/index.html'){
      const login = document.querySelector('.rout-wrap.login a');
      const route_container = document.querySelector('.links-wrap');

      add_route(route_container, 'addMaterials', 'Stock Materials +');
      if (UserAccount.role=='foreman'||UserAccount.role=='admin'){
        add_route(route_container, 'materials', 'View Materials');
      }

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

  if (document.location.pathname==='/addMaterials.html'){
    const type = document.querySelector('#type');
    const supplier = document.querySelector('#supplier');
    const type_sugestions = document.querySelector('#type_sugestions');
    const supplier_sugestions = document.querySelector('#supplier_sugestions');
    const type_btn = document.querySelector('.quick-btn.type');
    const supplier_btn = document.querySelector('.quick-btn.supplier');
    const name = document.querySelector('#name');
    const unit_cost = document.querySelector('#unit_cost');
    const total_quantity = document.querySelector('#total_quantity');
    const form_add_material = document.querySelector('#add-form');
    
    document.querySelector(".section").addEventListener("click",()=>{window.location.href = "index.html";})
    document.querySelectorAll(".form-boundary, .row").forEach(element =>{
      element.addEventListener("click",(e)=>e.stopPropagation());
    });

    let sugest_type = [];
    let sugest_suppier = [];
    input_options(type, type_sugestions, type_btn,sugest_type, 'type');
    input_options(supplier, supplier_sugestions, supplier_btn, sugest_suppier, 'supplier')

    
    type.addEventListener('input',(e)=>replacement(e,1));
    supplier.addEventListener('input',(e)=>replacement(e,1));
    name.addEventListener('input',(e)=>replacement(e,1));
    unit_cost.addEventListener('input',(e)=>replacement(e,6));
    total_quantity.addEventListener('input',(e)=>replacement(e,6));

    form_add_material.addEventListener('submit', (e)=>{
      e.preventDefault();

      data = {
        "type": JSON.parse(type.textContent),
        "name": name.value,
        "unit_cost": JSON.parse(unit_cost.value),
        "supplier": JSON.parse(supplier.textContent),
        "total_quantity": JSON.parse(total_quantity.value)
      }

      fetch('http://127.0.0.1:8000/materials/general/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${UserAccount.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if(data.message ==='Saved'){
          document.querySelector('.form-wrap h3').textContent = "Add More Items"
          type.value ='';
          supplier.value = '';
          name.value = '';
          total_quantity.value = '';
          unit_cost.value='';
        }
        })
      .catch(error => alert(error))
    })

  }

  if (document.location.pathname==='/materials.html'){
    const initial_state = {
      container: document.querySelector('.history .table-entries'),
      paginatorDisplay: document.querySelector('#page-display'),
      prevBtn: document.querySelector('#prev-page'),
      nextBtn: document.querySelector('#next-page'),
      entriesOptions: document.querySelector('#entries-per-page'),
      pageJump: document.querySelector('#page-jump'),
      currentPage: 1,
      entriesPerPage: 10
    }
    let histories = [];


    table_logic(initial_state, histories, 'general');
    
  }
  

});

  
  
function table_logic(state, dataStore, url){
    
  table_entries(state, dataStore,url);

  state.prevBtn.addEventListener('click', ()=>{
    if(state.currentPage > 1){
      state.currentPage--;
      console.log(dataStore.length);
      tableRender(dataStore,state);
      paginationControls(dataStore,state);
    }
  });

  state.nextBtn.addEventListener('click', ()=>{
    const totalPages = Math.ceil(dataStore.length / state.entriesPerPage);
    if (state.currentPage < totalPages){
      state.currentPage++;
      console.log(dataStore.length);
      tableRender(dataStore,state);
      paginationControls(dataStore,state);        
    }
  });

  state.entriesOptions.addEventListener('change', ()=>{
    state.entriesPerPage = parseFloat(state.entriesOptions.value);
    state.currentPage = 1;
    console.log(dataStore);
    tableRender(dataStore,state);
    paginationControls(dataStore,state);
  });

  state.pageJump.addEventListener('change', ()=>{
    state.currentPage = parseInt(state.pageJump.value);
    tableRender(dataStore,state);
    paginationControls(dataStore,state)
  });
}

function table_entries(dict, data_store, str){
  fetch(`http://127.0.0.1:8000/materials/${str}/`,{
    method:'GET',
    headers:{
      'Authorization':`Bearer ${UserAccount.token}`,
      'Content-Type':'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    data_store.splice(0, data_store.length, ...data);
    dict.currentPage = 1;
    tableRender(data_store, dict);
    paginationControls(data_store, dict);
    
  })
  .catch(error => console.error(error))

}

function input_options(input, options_container, input_btn, options, str){

  input.addEventListener('input', async ()=>{
    const query = input.value.trim();
    if (query ===""){
      options_container.innerHTML = '';
      input_btn.style.display = 'none';
      return;
    }

    fetch(`http://127.0.0.1:8000/materials/${str}/`,{method:'GET',headers:{'Authorization':`Bearer ${UserAccount.token}`,'content-Type':'application/json'}})
    .then(response => response.json())
    .then(data => {
      options = data;
    })
    .catch(error => console(error))
    options_container.innerHTML = '';

    if (options.length > 0){
      options.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item.name;
        div.onclick = ()=> {
          input.value = item.name;
          input.textContent = item.id;
          options_container.innerHTML = '';
          input_btn.style.display = 'none';
        };
        options_container.appendChild(div);
      })
      input_btn.style.display = options_container.textContent.includes(query)? 'none':'flex';
    } else {
        input_btn.style.display = 'flex';
      }
  });
  input_btn.addEventListener('click',()=>{
    const value = input.value
    if (value==='') return;

    fetch(`http://127.0.0.1:8000/materials/${str}/`,{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${UserAccount.token}` },
      body: JSON.stringify({name:value})
      });
      input.dispatchEvent(new Event('input'));
  });
}

function paginationControls(list, dict){
  const totalPages = Math.ceil(list.length / dict.entriesPerPage);
  
  dict.paginatorDisplay.querySelector('span').textContent = `${totalPages}`;
      dict.pageJump.textContent = dict.currentPage;
  
  dict.pageJump.innerHTML = ''
  for (let i = 1; i <= totalPages; i++){
    const option = document.createElement('option');
    option.value= i;
    option.textContent = i;
    console.log(i)
    if(i ===  dict.currentPage) option.selected = true;
    dict.pageJump.appendChild(option);
  }

  dict.prevBtn.disabled = dict.currentPage === 1;
  dict.nextBtn.disabled = dict.currentPage === totalPages;

}

function tableRender(list, dict){
  const container = dict.container;
  container.innerHTML ='';
  const start = (dict.currentPage - 1) * dict.entriesPerPage;
  const end = start + dict.entriesPerPage;
  console.log(start)
  const visibleData = list.slice(start, end);

  if(visibleData.length > 0){
    visibleData.forEach(entry =>{
      const table_row = document.createElement('tr');
      Object.values(entry).forEach(item =>{
        const table_cell = document.createElement('td');
        table_cell.textContent = item;
        table_row.appendChild(table_cell)
      });
      container.appendChild(table_row);
    });
  }
}

function add_route( parent_element, special_class, text_value){
  const div = document.createElement('div');
  const link = document.createElement('a');
  const span = document.createElement('span');
   
  span.textContent = text_value;
  link.href = `${special_class}.html`;
  div.classList = `rout-wrap ${special_class}`;

  link.appendChild(span);
  div.appendChild(link);
  parent_element.appendChild(div);
}

function isValidContact(value) {
  return emailRegex.test(value) || phoneRegex.test(value);
}

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
      case 6: //numbers    
      input.value = input.value.replace(/[^0-9]/g,()=>UserAlert(input));
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
