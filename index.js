import { menuArray } from '/data'

// global variables
const orderArray = []
const cartTitle = document.getElementById("cart-title")
const total = document.querySelector('total')
   

   function renderMenu(menuArray) {   
   
      let menuHtml = ''
   
   menuArray.forEach(function(menu){
      
   menuHtml +=`<div class="menu-container"> 
               <span class="emoji">${menu.emoji}</span>
                  <div class="items-container">
                     <h2 class="menu-name">${menu.name}</h2>
                     <p class="menu-ingredients">${menu.ingredients}</p>
                     <p class="menu-price">$${menu.price}</p>
               </div>
         <div>
         <button type="button" class="menu-btn" data-id="${menu.id}">+</button>
         </div> 
            </div>
         <hr>`   
   });
      document.getElementById("menu-section").innerHTML = menuHtml; 
   }   
   
   renderMenu(menuArray) 

 
   document.addEventListener('click', function(e) {
        if(e.target.classList.contains("menu-btn")) {
       const itemId = e.target.dataset.id; 
       const itemSelected = menuArray.find(function(currentItem){
         return currentItem.id == itemId;
       });
        
       if (itemSelected){
        orderArray.push(itemSelected)
        
      
       if (orderArray.length === 1){
        cartTitle.style.display = 'flex'; 
      }
        
         renderOrder()
         renderTotal()  
   
       }   
      }
      
    if(e.target.classList.contains("remove-btn")) {
      const itemId = e.target.dataset.id; 
      const index = orderArray.findIndex(function(item) {
       return item.id == itemId;   
      });  
      
        if (index !== -1) {
         orderArray.splice(index, 1);
       renderOrder()
       renderTotal()
       
        }
       }
        
  
        
      if(e.target.classList.contains("complete-order-btn")) {
         const formModal = document.getElementById("form-modal")
         formModal.style.display = "flex";
      } 
      
      if(e.target.classList.contains("modal-close-btn")) {
         const formModal = document.getElementById("form-modal")
         formModal.style.display = "none";
         
         document.getElementById("payment-form").reset()
      }
      
      if (e.target.classList.contains("thnks-close-btn")){
         document.getElementById("thank-you-msg").style.display = "none";
         
         document.getElementById("payment-form").reset();
      }
       
   });   
   
   
   function renderOrder(){
      let ordersHtml = ''
      
      orderArray.forEach(function(item) {
         ordersHtml += `
      <div class="selections">
         <div class="selection-name">
         <h2>${item.name}</h2>
         <button class="remove-btn" data-id="${item.id}">remove</button>
         </div>
         <h2 class="selection-price">$${item.price}</h2>
      </div>
         `
      }); 
      document.getElementById("cart-items").innerHTML = ordersHtml; 
      
   }

renderTotal()



   function renderTotal() {
      let totalPrice = 0
      for(let item of orderArray) {
         totalPrice += item.price
      }

   const totalDiv = document.getElementById("total-price"); 
   
   if (orderArray.length > 0) {
      totalDiv.style.display = "flex"; 
      totalDiv.innerHTML = `
 <div class="total">
   <div class="total-line">
      <h2 class="label">Total Price:</h2>
      <h2 class="amount">$${totalPrice}</h2>  
      </div>
      <button class="complete-order-btn" id="complete-order-btn">Complete Button</button>
   </div>
      `; 
      
 } else {
   totalDiv.style.display = "none"
   totalDiv.innerHTML = ""
 }
  } 


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("payment-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const thankYouMessage = document.getElementById("thank-you-msg");

    thankYouMessage.innerHTML = `Thank you, ${name} for your payment!
      <div class="thnks-close-btn-container">
        <button class="thnks-close-btn" id="thnks-close-btn">X</button>
      </div>`;
    document.getElementById("form-modal").style.display = "none";
    thankYouMessage.style.display = "block";
  });
});


