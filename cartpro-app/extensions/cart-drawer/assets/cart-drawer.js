/**
 * CartPro - Cart Drawer JavaScript
 * Handles cart functionality, upsells, and UI interactions
 */

class CartProDrawer {
  constructor() {
    this.drawer = document.getElementById('cartpro-drawer');
    this.overlay = document.getElementById('cartpro-overlay');
    this.closeBtn = document.getElementById('cartpro-close');
    this.itemsContainer = document.getElementById('cartpro-items');
    this.subtotalElement = document.getElementById('cartpro-subtotal');
    this.checkoutBtn = document.getElementById('cartpro-checkout');
    this.settings = window.CartProSettings || {};
    this.cart = null;
    this.timerInterval = null;

    this.init();
  }

  init() {
    // Event listeners
    this.closeBtn?.addEventListener('click', () => this.close());
    this.overlay?.addEventListener('click', () => this.close());
    this.checkoutBtn?.addEventListener('click', () => this.goToCheckout());

    // Listen for cart updates
    document.addEventListener('cartpro:open', () => this.open());
    document.addEventListener('cartpro:refresh', () => this.refresh());

    // Intercept "Add to Cart" buttons
    this.interceptAddToCart();

    // Load cart on init
    this.refresh();

    // Start timer if enabled
    if (this.settings.timerEnabled) {
      this.startTimer();
    }
  }

  async open() {
    await this.refresh();
    this.drawer?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.drawer?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  async refresh() {
    try {
      const response = await fetch('/cart.js');
      this.cart = await response.json();
      this.render();
      this.updateFreeShippingBar();
      if (this.settings.upsellEnabled) {
        this.loadUpsells();
      }
    } catch (error) {
      console.error('CartPro: Error fetching cart', error);
    }
  }

  render() {
    if (!this.cart || this.cart.item_count === 0) {
      this.renderEmpty();
      return;
    }

    const itemsHTML = this.cart.items.map(item => this.renderItem(item)).join('');
    this.itemsContainer.innerHTML = itemsHTML;
    this.updateSubtotal();

    // Add event listeners to quantity buttons
    this.attachItemListeners();
  }

  renderItem(item) {
    const price = this.formatMoney(item.final_line_price);
    const unitPrice = this.formatMoney(item.final_price);
    const image = item.image || item.featured_image?.url || '';

    return `
      <div class="cartpro-item" data-key="${item.key}">
        <img src="${image}" alt="${item.product_title}" class="cartpro-item__image" />
        <div class="cartpro-item__details">
          <h4 class="cartpro-item__title">${item.product_title}</h4>
          ${item.variant_title ? `<p class="cartpro-item__variant">${item.variant_title}</p>` : ''}
          <p class="cartpro-item__price">${unitPrice}</p>
          <div class="cartpro-item__quantity">
            <button class="cartpro-item__qty-btn" data-action="decrease" data-key="${item.key}">-</button>
            <span class="cartpro-item__qty-value">${item.quantity}</span>
            <button class="cartpro-item__qty-btn" data-action="increase" data-key="${item.key}">+</button>
          </div>
          <button class="cartpro-item__remove" data-key="${item.key}">Remove</button>
        </div>
        <div class="cartpro-item__total">${price}</div>
      </div>
    `;
  }

  renderEmpty() {
    this.itemsContainer.innerHTML = `
      <div class="cartpro-empty">
        <div class="cartpro-empty__icon">🛒</div>
        <p class="cartpro-empty__text">Your cart is empty</p>
        <a href="/collections/all" class="cartpro-empty__btn">Continue Shopping</a>
      </div>
    `;
    this.subtotalElement.textContent = this.formatMoney(0);
  }

  attachItemListeners() {
    // Quantity buttons
    document.querySelectorAll('.cartpro-item__qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = e.target.dataset.key;
        const action = e.target.dataset.action;
        const item = this.cart.items.find(i => i.key === key);
        if (!item) return;

        const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        this.updateQuantity(key, newQty);
      });
    });

    // Remove buttons
    document.querySelectorAll('.cartpro-item__remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = e.target.dataset.key;
        this.updateQuantity(key, 0);
      });
    });
  }

  async updateQuantity(key, quantity) {
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity })
      });
      this.cart = await response.json();
      this.render();
      this.updateFreeShippingBar();
    } catch (error) {
      console.error('CartPro: Error updating quantity', error);
    }
  }

  updateSubtotal() {
    const subtotal = this.formatMoney(this.cart.total_price);
    this.subtotalElement.textContent = subtotal;
  }

  updateFreeShippingBar() {
    if (!this.settings.freeShippingEnabled) return;

    const bar = document.getElementById('cartpro-shipping-bar');
    const progress = document.getElementById('cartpro-shipping-progress');
    const text = document.getElementById('cartpro-shipping-text');

    if (!bar || !progress || !text) return;

    const threshold = this.settings.freeShippingThreshold * 100; // Convert to cents
    const current = this.cart?.total_price || 0;
    const percentage = Math.min((current / threshold) * 100, 100);

    progress.style.width = `${percentage}%`;

    if (current >= threshold) {
      text.textContent = '🎉 You qualify for free shipping!';
      bar.style.backgroundColor = '#d1fae5';
    } else {
      const remaining = this.formatMoney(threshold - current);
      const message = this.settings.freeShippingMessage.replace('{amount}', remaining);
      text.textContent = `Add ${remaining} more for free shipping!`;
    }
  }

  async loadUpsells() {
    const container = document.getElementById('cartpro-upsell-products');
    if (!container) return;

    try {
      // Get product recommendations based on cart
      // For now, we'll fetch from a collection or featured products
      const response = await fetch('/products.json?limit=6');
      const data = await response.json();

      const products = data.products
        .filter(p => !this.isProductInCart(p.id))
        .slice(0, this.settings.maxUpsellProducts || 3);

      const html = products.map(p => this.renderUpsellProduct(p)).join('');
      container.innerHTML = html;

      this.attachUpsellListeners();
    } catch (error) {
      console.error('CartPro: Error loading upsells', error);
    }
  }

  renderUpsellProduct(product) {
    const variant = product.variants[0];
    const price = this.formatMoney(variant.price);
    const image = product.images[0] || '';

    return `
      <div class="cartpro-upsell-product" data-variant-id="${variant.id}">
        <img src="${image}" alt="${product.title}" class="cartpro-upsell-product__image" />
        <div class="cartpro-upsell-product__details">
          <h5 class="cartpro-upsell-product__title">${product.title}</h5>
          <p class="cartpro-upsell-product__price">${price}</p>
          <button class="cartpro-upsell-product__add" data-variant-id="${variant.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  }

  attachUpsellListeners() {
    document.querySelectorAll('.cartpro-upsell-product__add').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const variantId = e.target.dataset.variantId;
        await this.addToCart(variantId, 1);
      });
    });
  }

  async addToCart(variantId, quantity = 1) {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity })
      });

      if (response.ok) {
        await this.refresh();
        this.showNotification('Product added to cart!');
      }
    } catch (error) {
      console.error('CartPro: Error adding to cart', error);
    }
  }

  isProductInCart(productId) {
    return this.cart?.items.some(item => item.product_id === productId);
  }

  goToCheckout() {
    window.location.href = '/checkout';
  }

  interceptAddToCart() {
    // Intercept form submissions for "Add to Cart"
    document.addEventListener('submit', (e) => {
      if (e.target.matches('form[action="/cart/add"]')) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const variantId = formData.get('id');
        const quantity = parseInt(formData.get('quantity') || '1');

        this.addToCart(variantId, quantity);
        this.open();
      }
    });

    // Intercept AJAX add to cart
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);

      if (args[0] === '/cart/add.js' && response.ok) {
        setTimeout(() => {
          this.open();
        }, 100);
      }

      return response;
    };
  }

  startTimer() {
    const timerElement = document.getElementById('cartpro-countdown');
    if (!timerElement) return;

    let timeLeft = this.settings.timerDuration || 600;

    this.timerInterval = setInterval(() => {
      timeLeft--;

      if (timeLeft <= 0) {
        clearInterval(this.timerInterval);
        timeLeft = this.settings.timerDuration || 600;
      }

      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }

  formatMoney(cents) {
    const amount = (cents / 100).toFixed(2);
    return `$${amount}`;
  }

  showNotification(message) {
    // Simple notification - can be enhanced
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cartPro = new CartProDrawer();
  });
} else {
  window.cartPro = new CartProDrawer();
}

// Global function to open cart
window.openCartPro = function() {
  document.dispatchEvent(new Event('cartpro:open'));
};
