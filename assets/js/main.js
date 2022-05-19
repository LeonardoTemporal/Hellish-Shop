
// console.log(navbar)

// evento directamente en el html
// <button onclick="alert('hola')" id="navbarBtn" class="navbar__btn-link">

// navbarBtn.onclick = function () {
//   alert('desde una propiedad del elemento en el html')
// }

// handler
// const fn = function (e) {
//   console.log(navbarNav)
//   navbarNav.classList.toggle('active')
// }

// start navbar btn menu
const navbarBtn = document.getElementById('navbarBtn')
const navbarNav = document.querySelector('.navbar__nav')

navbarBtn.addEventListener('click', function (e) {
  console.log(navbarNav)
  navbarNav.classList.toggle('active')
})
// end navbar btn menu

// navbarBtn.removeEventListener('click', fn)

// Arreglo de Productos
const products = [
  {
    id: 1,
    name: 'HELLSPAWN',
    price: 100,
    image: 'https://i.pinimg.com/564x/90/40/d4/9040d4712b54744f5dbfd2be13fe269c.jpg',
    description: 'Portada del comic #300 de Spawn'
  },
  {
    id: 2,
    name: 'KNY',
    price: 200,
    image: 'https://i.pinimg.com/564x/be/06/1a/be061a0f33c68c1e5240f543f9685879.jpg',
    description: 'Ultimo ataque de los cazadores, arco del distrito rojo'
  },
  {
    id: 3,
    name: 'Kindred',
    price: 300,
    image: 'https://i.pinimg.com/564x/8e/f5/cc/8ef5ccfff4d3beabea78b2a9b75ca304.jpg',
    description: 'La obeja y el lobo. del Moba LoL'
  },
  {
    id: 4,
    name: 'Hollow Knight',
    price: 400,
    image: 'https://i.pinimg.com/564x/fc/86/ce/fc86ceee88150ba00d06cc5db54895bf.jpg', 
    description: 'El pequeño caballero de Hollow',
  },
  {
    id: 5,
    name: 'Inicio del viaje por Teyvat',
    price: 500,
    image: 'https://i.pinimg.com/564x/46/45/47/464547680731e4b2356fd2996b6adc5e.jpg', 
    description: ' Genshin Impact. El viajero junto a su mejor amiga y compañera Paimon!',
  },
  {
    id: 6,
    name: 'Mona',
    price: 400,
    image: 'https://i.pinimg.com/564x/3b/b6/70/3bb6701a7cb14d2a18020f94a56cb172.jpg',
    description: 'Genshin Impact. Mona; la astróloga de Mondstadt'
  },
  {
    id: 7,
    name: 'Shogun Raiden',
    price: 400,
    image: 'https://i.pinimg.com/564x/10/d7/53/10d7534f891ab0e3675a5427c1d319ba.jpg', 
    description: 'Genshin impact. Shogun Ei o Shogun Raiden; La Arconte Electro!. La cual le prometio la eternidad a su pueblo de Inazuma',
  },
  {
    id: 8,
    name: 'Itachi Uchiha',
    price: 600,
    image: 'https://i.pinimg.com/564x/e6/fd/91/e6fd91ad0fc4c4cc8b3183c5faffa0ff.jpg', 
    description: 'El heroe secreto de Konoha... Itachi Uchiha! de Naruto: Shippūden',
  }
]

const wrapperProducts = document.getElementById('wrapper-products')

let productsHTML = ''

// Bucle
// for (let i = 0; i < products.length; i++) {
//   console.log('bucle: ',products[i])
// }

// Iteradores for of
for (let product of products) {
  productsHTML += `
  <div class="wrapper__product">
    <div class="wrapper__product-img">
      <img src="${product.image}" alt="${product.name}" class="wrapper__product-img-item">
    </div>
    <div class="wrapper__product-content">
      <h3 class="wrapper__product-title">${product.name}</h3>
      <p class="wrapper__product-text">
      ${product.description}
      </p>
      <div class="wrapper__product-btn">
      <span class="wrapper__product-btn-text">$ ${product.price}</span>
        <button class="wrapper__product-btn-item" data-id="${product.id}">
          <i class='bx bx-shopping-bag'></i>
          <span class="wrapper__product-btn-text">Añadir al Carrito</span>
        </button>
      </div>
    </div>
    </div>
  `
}

wrapperProducts.insertAdjacentHTML('beforeend', productsHTML)

let cart = []

function find(id) {
  for (let product of products) {
    if (product.id === id) {
      return product
    }
  }
}

function addToCart(id) {
  const product = find(id)
  cart.push(product)
}

wrapperProducts.addEventListener('click', function (e) {
  if (e.target.closest('.wrapper__product-btn-item')) {
    const id = e.target.closest('.wrapper__product-btn-item').dataset.id
    addToCart(+id)
    renderCart()
  }
})

const wrapperCart = document.getElementById('wrapper-cart')

function renderCart() {
  let cartHTML = ''

  for (let product of cart) {
    cartHTML += `
    <div class="cart__item">
    <div class="cart__item-img">
    <img src="${product?.image}" alt="${product.name}" class="cart__item-img-item">
    </div>
    <div class="cart__item-content">
    <h3 class="cart__item-title">${product.name}</h3>
    <p class="cart__item-text">
    ${product.description}
    </p>
    <div class="cart__item-btn">
    <span class="cart__item-btn-text">$ ${product.price}</span>
    <button class="cart__item-btn-item" data-id="${product.id}">
    <i class='bx bx-x'></i>
    </button>
    </div>
    </div>
    </div>
    `
  }
  const cartTotal = document.getElementById('cart-total')

  wrapperCart.innerHTML = cartHTML.length > 0 ? cartHTML : '<p>No hay productos</p>'
  cartTotal.innerHTML = `$ ${sumTotal()}`
}

renderCart()

function sumTotal() {
  let sum = 0
  for (let product of cart) {
    sum += product.price
  }
  return sum
}

function removeFromCart (id) {
  let newArr = []
  for (let product of cart) {
    if(product.id !== id) {
      newArr.push(product)
    }
  }
  cart = newArr
}

wrapperCart.addEventListener('click', function (e) {
  if (e.target.closest('.cart__item-btn-item')) {
    const id = e.target.closest('.cart__item-btn-item').dataset.id
    removeFromCart(+id)
    renderCart()
  }
})

const checkout = document.getElementById('checkout')

checkout.addEventListener('click', function (e) {
  if(e.target.closest('.wrapper__sidebar-cart-btn-link')) {
    alert('Gracias por tu compra')
    cart = []
    renderCart()
  }
})