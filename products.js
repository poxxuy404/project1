export class ProductManager {
  constructor() {
    this.products = [
      // Fruits
      { id: 1, name: 'Fresh Bananas', price: 2.99, category: 'fruits', description: 'Sweet and ripe bananas, perfect for smoothies', emoji: '🍌' },
      { id: 2, name: 'Red Apples', price: 4.99, category: 'fruits', description: 'Crisp and juicy red apples, great for snacking', emoji: '🍎' },
      { id: 3, name: 'Orange Pack', price: 6.99, category: 'fruits', description: 'Fresh oranges packed with vitamin C', emoji: '🍊' },
      { id: 4, name: 'Fresh Strawberries', price: 8.99, category: 'fruits', description: 'Sweet and juicy strawberries, locally grown', emoji: '🍓' },
      
      // Vegetables
      { id: 5, name: 'Green Broccoli', price: 3.99, category: 'vegetables', description: 'Fresh broccoli crowns, rich in nutrients', emoji: '🥦' },
      { id: 6, name: 'Baby Carrots', price: 2.49, category: 'vegetables', description: 'Sweet baby carrots, perfect for snacking', emoji: '🥕' },
      { id: 7, name: 'Bell Peppers', price: 5.99, category: 'vegetables', description: 'Colorful bell peppers, great for cooking', emoji: '🫑' },
      { id: 8, name: 'Fresh Spinach', price: 4.49, category: 'vegetables', description: 'Organic spinach leaves, perfect for salads', emoji: '🥬' },
      
      // Dairy
      { id: 9, name: 'Whole Milk', price: 3.79, category: 'dairy', description: 'Fresh whole milk, locally sourced', emoji: '🥛' },
      { id: 10, name: 'Greek Yogurt', price: 5.99, category: 'dairy', description: 'Creamy Greek yogurt, high in protein', emoji: '🥛' },
      { id: 11, name: 'Cheddar Cheese', price: 7.99, category: 'dairy', description: 'Sharp cheddar cheese, aged to perfection', emoji: '🧀' },
      { id: 12, name: 'Farm Eggs', price: 4.99, category: 'dairy', description: 'Fresh farm eggs from free-range hens', emoji: '🥚' },
      
      // Bakery
      { id: 13, name: 'Artisan Bread', price: 4.99, category: 'bakery', description: 'Freshly baked artisan sourdough bread', emoji: '🍞' },
      { id: 14, name: 'Croissants', price: 6.99, category: 'bakery', description: 'Buttery French croissants, baked daily', emoji: '🥐' },
      { id: 15, name: 'Bagels', price: 5.49, category: 'bakery', description: 'Fresh New York style bagels', emoji: '🥯' },
      { id: 16, name: 'Chocolate Muffins', price: 7.99, category: 'bakery', description: 'Rich chocolate chip muffins', emoji: '🧁' }
    ]
    
    this.currentFilter = 'all'
  }

  init() {
    this.renderProducts()
  }

  getProducts() {
    return this.products
  }

  getProductById(id) {
    return this.products.find(product => product.id === id)
  }

  filterByCategory(category) {
    this.currentFilter = category
    this.renderProducts()
  }

  getFilteredProducts() {
    if (this.currentFilter === 'all') {
      return this.products
    }
    return this.products.filter(product => product.category === this.currentFilter)
  }

  renderProducts() {
    const productsGrid = document.getElementById('products-grid')
    const products = this.getFilteredProducts()
    
    productsGrid.innerHTML = products.map(product => `
      <div class="product-card">
        <div class="product-image">
          ${product.emoji}
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('')
  }
}