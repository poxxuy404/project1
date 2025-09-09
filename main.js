import './style.css'
import { ProductManager } from './products.js'
import { CartManager } from './cart.js'
import { Router } from './router.js'

// Initialize the application
class App {
  constructor() {
    this.productManager = new ProductManager()
    this.cartManager = new CartManager()
    this.router = new Router()
    
    this.init()
  }

  init() {
    // Initialize cart manager
    this.cartManager.init()
    
    // Initialize products
    this.productManager.init()
    
    // Initialize router
    this.router.init()
    
    // Set up event listeners
    this.setupEventListeners()
    
    // Load initial page
    this.router.navigateToHash()
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const page = link.dataset.page
        this.router.navigateTo(page)
      })
    })

    // Category filters
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const category = btn.dataset.category
        this.productManager.filterByCategory(category)
        
        // Update active state
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
      })
    })

    // Products grid delegation
    document.getElementById('products-grid').addEventListener('click', (e) => {
      if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(e.target.dataset.productId)
        this.cartManager.addToCart(productId)
      }
    })

    // Cart page delegation
    document.getElementById('cart-items').addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.productId)
      
      if (e.target.classList.contains('quantity-increase')) {
        this.cartManager.increaseQuantity(productId)
      } else if (e.target.classList.contains('quantity-decrease')) {
        this.cartManager.decreaseQuantity(productId)
      } else if (e.target.classList.contains('remove-btn')) {
        this.cartManager.removeFromCart(productId)
      }
    })

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', () => {
      this.handleCheckout()
    })

    // Contact form
    document.getElementById('contact-form').addEventListener('submit', (e) => {
      e.preventDefault()
      this.handleContactForm(e.target)
    })
  }

  handleCheckout() {
    const cartItems = this.cartManager.getCartItems()
    const total = this.cartManager.getTotal()
    
    if (cartItems.length === 0) {
      alert('Your cart is empty!')
      return
    }
    
    alert(`Thank you for your order!\nTotal: $${total.toFixed(2)}\n\nYour groceries will be delivered soon!`)
    this.cartManager.clearCart()
  }

  handleContactForm(form) {
    const formData = new FormData(form)
    alert('Thank you for your message! We\'ll get back to you soon.')
    form.reset()
  }
}

// Start the application
new App()