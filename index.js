import { menuArray } from './data.js'

const menuContainer = document.getElementById('menu-container')
const receipt = document.getElementById('receipt')
const orderReview = document.getElementById('order-review')


menuArray.forEach(function(item) { 
    let menuItems =  
    `<div class="menu-items" id="menu-items">
        <div class="food-img">${item.emoji}</div>
            <div class="food-text">
                <h3 class="food-name">${item.name}</h3>
                <p class="ingredients">${item.ingredients}</p>
                <p class="food-price">$${item.price}</p>
            </div>

            <div class="btn-container">
                <button class="add-item-btn" id="${item.id}" data-add="${item.id}">+</button>
            </div>
        </div>
    </div>`
    menuContainer.innerHTML += menuItems
 
})

function handleAddItemClick () {
    document.addEventListener('click', function(e) {
        if(e.target.dataset.add){
            orderReview.style.visibility= "visible"
            let names = menuArray.map(function(item) {
                return item.name
            })
        
            let price = menuArray.map(function(item) {
                return item.price
            })
        
            let purchasedItems = 
            `<div class="purchased" id="${e.target.id}">
                <h3 class="food-name">${names[e.target.id]}</h3>
                <button class="remove-btn" id="remove-btn" data-remove="${e.target.id}">remove</button>
                <p class="food-price review-price">$${price[e.target.id]}</p>
            </div>`

            receipt.innerHTML += purchasedItems
        }
        

    })
}

function handleRemoveItemClick () {
    const removeBtn = document.getElementById('remove-btn')
    document.addEventListener('click', function(e) {
        if(e.target.dataset.remove) {
             let childrenofReceipt = document.querySelectorAll(".purchased")
        }
    })
}

handleRemoveItemClick()

handleAddItemClick()

