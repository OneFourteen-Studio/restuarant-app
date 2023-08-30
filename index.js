import { menuArray } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
  console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const menuContainer = document.getElementById('menu-container')
const orderReview = document.getElementById('order-review')
const receipt = document.getElementById('receipt')
const totalPrice = document.getElementById('total-price')
const modal = document.getElementById('modal')
const message = document.getElementById('message')
const messageContainer = document.getElementById('message-container')
let customerName = document.getElementById('name')
let cardNum = document.getElementById('card-num')
let cvvNum = document.getElementById('cvv-num')
let purchasedFoodArray = []


document.addEventListener('click', (e) => {
    if(e.target.dataset.add) {
        addItemBtn(e.target.dataset.add)
    } else if(e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    } else if(e.target.dataset.complete) {
        completeBtn()
    } else if(e.target.dataset.pay) {
        endMessage()
    }
})

const getMenuHtml = () => {
    const menuHtml = menuArray.map((item) => {
       return `
       <div class="menu-items" id="menu-items">
            <div class="food-img">${item.emoji}</div>
                <div class="food-text">
                    <h3 class="food-name">${item.name}</h3>
                    <p class="ingredients">${item.ingredients}</p>
                    <p class="food-price">$${item.price}</p>
                </div>
        
                <div class="btn-container">
                    <button class="add-item-btn" data-add="${item.uuid}">+</button>
                </div>
            </div>
        </div>`
    }).join('')
    
    return menuHtml
}

const render = () => {
    menuContainer.innerHTML = getMenuHtml()  
}

const addItemBtn = (itemID) =>  {
    orderReview.style.display = 'flex'
    const foodItemObj = menuArray.find((item) => {
        return item.uuid === itemID
    })

    // rendering added food
    purchasedFoodArray.push(foodItemObj)
    purchasedFoodArray.forEach((item, i) => {
        item.id = i + 1
    })
    renderOrderHtml()

    // rendering total price
    renderTotalPrice()
    messageContainer.style.display = 'none'
    
    

}

const renderOrderHtml = () => {
    let receiptHtml = ``
    purchasedFoodArray.forEach((item, i) => {
        receiptHtml += `
        <div class="purchased" id="${item.uuid}">
            <h3 class="food-name">${item.name}</h3>
            <button class="remove-btn" data-remove="${item.uuid}">remove</button>
            <p class="food-price review-price">$${item.price}</p>
        </div>`
        receipt.innerHTML = receiptHtml
        renderTotalPrice()
        
    })
}

const renderTotalPrice = () => {
    let updateTotalPrice = purchasedFoodArray.reduce((total, currentItem) => {
        if(purchasedFoodArray) {
            return total + currentItem.price
        }
    }, 0)
    totalPrice.innerHTML = `$${updateTotalPrice}`
}


const handleRemoveClick = (itemID) => {
    const removedObj = menuArray.find((item) => {
        return item.uuid === itemID
    })
    const index = purchasedFoodArray.indexOf(removedObj)

    purchasedFoodArray.splice(index, 1)
    renderTotalPrice()
    if(purchasedFoodArray.length >= 1) {
        renderOrderHtml() 
    } else {
        let lastItem = document.querySelector('.purchased')
        receipt.removeChild(lastItem)
        receipt.innerHTML += `
        <div class="cart-alert">
            <p class="cart-alert-text" id="cart-alert">Your cart is empty!</p>
        </div>`
    }
}

const completeBtn = () => {
    modal.style.display = 'flex'
}

const endMessage = () => {
    modal.style.display = 'none'
    orderReview.style.display = 'none'
    receipt.innerHTML = ``
    purchasedFoodArray = []
    messageContainer.style.display = 'flex'

    message.textContent = `Thanks, ${customerName.value}! Your order is on it's way!`
    clearInfo()
}

const clearInfo = () => {
    customerName.value = ''
    cardNum.value = ''
    cvvNum.value = ''
}

render()


