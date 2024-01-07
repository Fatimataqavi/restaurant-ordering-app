import { menuArray } from "./data.js"
const modal = document.getElementById('modal')
const paymentForm = document.getElementById('payment-form')

/* eventlisteners */
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        addToCart(e.target.dataset.add)
    }else if(e.target.dataset.remove){
        foodItemRemove(e.target.dataset.remove)
    }else if(e.target.id === "order-btn"){
       modal.style.display = 'inline'
    }
})
document.addEventListener('submit', function(e){
    e.preventDefault()
    const paymentFormData=  new FormData(paymentForm)
    const name= paymentFormData.get('name')
    
    document.getElementById('order-section').innerHTML = `<div class="success-msg">
    Thanks, ${name}! Your order is on its way!</div>`
    modal.style.display = 'none'
})

 const orderItems=[]
/* add each item to cart */
function addToCart(foodId){
    let ordersHtml =''
    let totalPrice=''
    const ordreObj= menuArray.map((food)=>{
    
        if(food.id == foodId){
           const itemAlreadythere= orderItems.includes(food)
           itemAlreadythere ? alert('This item is already added to your order'):
         orderItems.push(food)
        }  
    })
    
     if (orderItems.length > 0){
            orderItems.forEach((item)=>
            ordersHtml += `
                  <div class="order-inner" id="order-inner">
                     <p class="order-title">${item.name}<span id="remove" 
                     data-remove=${item.id}>remove</span></p>
                     <p class="order-price">$${item.price}</p>
                  </div>`,
                  
                 totalPrice += `
                  <hr/>
                  <div class="final-order">
                     <div class="total" >
                        <h5>Total price</h5>
                        <p>$${getTotalPrice()}</p>
                     </div>
                     <button class="order-btn" id="order-btn" >Complete order</button>
                    <div>
                 ` 
             )
            }
             document.getElementById('order').innerHTML= ordersHtml 
             document.getElementById('total-order').innerHTML= totalPrice 
             
             
 render()
}

function getTotalPrice(){
    let prices=[]
    orderItems.forEach(function(item){
        const singlePrice=  parseInt(item.price)
        prices.push(singlePrice)
    })
        let total = prices.reduce((total, currentPrice)=>
          total + currentPrice,0
        )
    return total
}

function foodItemRemove(itemId){
     const index = orderItems.findIndex((item)=> item.id === itemId)
       orderItems.splice(index, 1)
       getTotalPrice(orderItems)
       document.getElementById("order-inner").classList.add('hidden')
       addToCart()
} 

function displayFoodHtml(){
    let foodHtml='' 
    menuArray.forEach(food=>{
        foodHtml += `
        <div class="container">
            <div class="item-emoji">${food.emoji}</div>
            <div class="item-description">
                <h4>${food.name}</h4>
                <p>${food.ingredients}</p>
                <h6>$${food.price}</h6>
            </div>
            <i class="fa-thin fa-plus add-icon" id="add-to-cart"
             data-add="${food.id}"></i>
          </div>
          `
    })
   return foodHtml
   render()
}

function render(){
    document.getElementById('feed').innerHTML= displayFoodHtml();
}
render()