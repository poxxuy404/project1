export class Router {
  constructor() {
    this.currentPage = 'home'
  }

  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      this.navigateToHash()
    })
  }

  navigateTo(page) {
    // Update hash without triggering hashchange
    history.pushState(null, null, `#${page}`)
    this.showPage(page)
  }

  navigateToHash() {
    const hash = window.location.hash.slice(1) || 'home'
    this.showPage(hash)
  }

  showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(pageEl => {
      pageEl.classList.remove('active')
    })

    // Show target page
    const targetPage = document.getElementById(`${page}-page`)
    if (targetPage) {
      targetPage.classList.add('active')
    }

    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active')
    })

    const activeLink = document.querySelector(`[data-page="${page}"]`)
    if (activeLink) {
      activeLink.classList.add('active')
    }

    this.currentPage = page

    // Special handling for cart page
    if (page === 'cart') {
      // Trigger cart display update
      const cartEvent = new CustomEvent('cartPageVisible')
      document.dispatchEvent(cartEvent)
    }
  }

  getCurrentPage() {
    return this.currentPage
  }
}