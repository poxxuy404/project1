export class CartManager {
  constructor() {
    this.cartItems = []
    this.loadFromStorage()
  }

  init() {
    this.updateCartDisplay()
    this.updateCartCount()
  }

  loadFromStorage() {
    const stored = localStorage.getItem('freshmart-cart')
    if (stored) {
      this.cartItems = JSON.parse(stored)
    }
  }

  saveToStorage() {
    localStorage.setItem('freshmart-cart', JSON.stringify(this.cartItems))
  }

  addToCart(productId) {
    const existingItem = this.cartItems.find(item => item.id === productId)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      // Get product data (we'll import this later)
      const products = [
        { id: 1, name: 'Fresh Bananas', price: 2.99, category: 'fruits', description: 'Sweet and ripe bananas, perfect for smoothies', emoji: '🍌' },
        { id: 2, name: 'Red Apples', price: 4.99, category: 'fruits', description: 'Crisp and juicy red apples, great for snacking', emoji: '🍎' },
        { id: 3, name: 'Orange Pack', price: 6.99, category: 'fruits', description: 'Fresh oranges packed with vitamin C', emoji: '🍊' },
        { id: 4, name: 'Fresh Strawberries', price: 8.99, category: 'fruits', description: 'Sweet and juicy strawberries, locally grown', emoji: '🍓' },
        { id: 5, name: 'Green Broccoli', price: 3.99, category: 'vegetables', description: 'Fresh broccoli crowns, rich in nutrients', emoji: '🥦' },
        { id: 6, name: 'Baby Carrots', price: 2.49, category: 'vegetables', description: 'Sweet baby carrots, perfect for snacking', emoji: '🥕' },
        { id: 7, name: 'Bell Peppers', price: 5.99, category: 'vegetables', description: 'Colorful bell peppers, great for cooking', emoji: '🫑' },
        { id: 8, name: 'Fresh Spinach', price: 4.49, category: 'vegetables', description: 'Organic spinach leaves, perfect for salads', emoji: '🥬' },
        { id: 9, name: 'Whole Milk', price: 3.79, category: 'dairy', description: 'Fresh whole milk, locally sourced', emoji: '🥛' },
        { id: 10, name: 'Greek Yogurt', price: 5.99, category: 'dairy', description: 'Creamy Greek yogurt, high in protein', emoji: '🥛' },
        { id: 11, name: 'Cheddar Cheese', price: 7.99, category: 'dairy', description: 'Sharp cheddar cheese, aged to perfection', emoji: '🧀' },
        { id: 12, name: 'Farm Eggs', price: 4.99, category: 'dairy', description: 'Fresh farm eggs from free-range hens', emoji: '🥚' },
        { id: 13, name: 'Artisan Bread', price: 4.99, category: 'bakery', description: 'Freshly baked artisan sourdough bread', emoji: '🍞' },
        { id: 14, name: 'Croissants', price: 6.99, category: 'bakery', description: 'Buttery French croissants, baked daily', emoji: '🥐' },
        { id: 15, name: 'Bagels', price: 5.49, category: 'bakery', description: 'Fresh New York style bagels', emoji: '🥯' },
        { id: 16, name: 'Chocolate Muffins', price: 7.99, category: 'bakery', description: 'Rich chocolate chip muffins', emoji: '🧁' }
      ]
      
      const product = products.find(p => p.id === productId)
      if (product) {
        this.cartItems.push({
          ...product,
          quantity: 1
        })
      }
    }
    
    this.saveToStorage()
    this.updateCartCount()
    this.updateCartDisplay()
    
    // Show feedback
    this.showAddedToCartFeedback()
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId)
    this.saveToStorage()
    this.updateCartCount()
    this.updateCartDisplay()
  }

  increaseQuantity(productId) {
    const item = this.cartItems.find(item => item.id === productId)
    if (item) {
      item.quantity += 1
      this.saveToStorage()
      this.updateCartCount()
      this.updateCartDisplay()
    }
  }

  decreaseQuantity(productId) {
    const item = this.cartItems.find(item => item.id === productId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        this.removeFromCart(productId)
        return
      }
      this.saveToStorage()
      this.updateCartCount()
      this.updateCartDisplay()
    }
  }

  getCartItems() {
    return this.cartItems
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  clearCart() {
    this.cartItems = []
    this.saveToStorage()
    this.updateCartCount()
    this.updateCartDisplay()
  }

  updateCartCount() {
    const countElement = document.getElementById('cart-count')
    if (countElement) {
      countElement.textContent = this.getTotalItems()
    }
  }

  updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items')
    const cartTotalElement = document.getElementById('cart-total')
    const checkoutBtn = document.getElementById('checkout-btn')
    
    if (!cartItemsContainer) return

    if (this.cartItems.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add some delicious items to get started!</p>
        </div>
      `
      checkoutBtn.disabled = true
    } else {
      cartItemsContainer.innerHTML = this.cartItems.map(item => `
        <div class="cart-item">
          <div class="cart-item-image">
            ${item.emoji}
          </div>
          <div class="cart-item-info">
            <h3 class="cart-item-name">${item.name}</h3>
            <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn quantity-decrease" data-product-id="${item.id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn quantity-increase" data-product-id="${item.id}">+</button>
            <button class="remove-btn" data-product-id="${item.id}">Remove</button>
          </div>
        </div>
      `).join('')
      
      checkoutBtn.disabled = false
    }
    
    if (cartTotalElement) {
      cartTotalElement.textContent = this.getTotal().toFixed(2)
    }
  }

  showAddedToCartFeedback() {
    // Create a simple notification
    const notification = document.createElement('div')
    notification.textContent = 'Added to cart!'
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #27ae60;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `
    
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease'
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, 2000)
    
    // Add CSS for animations if not already added
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style')
      style.id = 'notification-styles'
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }
  }
}