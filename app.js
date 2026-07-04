/* ============================================
   ColdMax - Carrito de Compras (localStorage)
   ============================================ */

const Cart = {
    KEY: 'coldmax_cart',

    getCart: function () {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : [];
    },

    saveCart: function (cart) {
        localStorage.setItem(this.KEY, JSON.stringify(cart));
        this.updateCount();
    },

    addItem: function (product) {
        const cart = this.getCart();
        const existing = cart.find(function (item) { return item.id === product.id; });

        if (existing) {
            if (existing.quantity >= existing.stock) {
                return false;
            }
            existing.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                img: product.img,
                stock: product.stock || 999,
                quantity: 1
            });
        }

        this.saveCart(cart);
        return true;
    },

    removeItem: function (id) {
        let cart = this.getCart();
        cart = cart.filter(function (item) { return item.id !== id; });
        this.saveCart(cart);
    },

    updateQuantity: function (id, quantity) {
        const cart = this.getCart();
        const item = cart.find(function (item) { return item.id === id; });

        if (item) {
            if (quantity <= 0) {
                this.removeItem(id);
            } else if (quantity > item.stock) {
                return false;
            } else {
                item.quantity = quantity;
                this.saveCart(cart);
            }
        }
        return true;
    },

    getTotal: function () {
        const cart = this.getCart();
        return cart.reduce(function (sum, item) {
            return sum + (item.precio * item.quantity);
        }, 0);
    },

    getTotalItems: function () {
        const cart = this.getCart();
        return cart.reduce(function (sum, item) {
            return sum + item.quantity;
        }, 0);
    },

    clearCart: function () {
        localStorage.removeItem(this.KEY);
        this.updateCount();
    },

    updateCount: function () {
        const countEl = document.querySelector('.cart-count');
        if (!countEl) return;

        const total = this.getTotalItems();
        countEl.textContent = total;

        if (total > 0) {
            countEl.classList.remove('vacia');
        } else {
            countEl.classList.add('vacia');
        }
    },

    formatPrice: function (num) {
        return '$' + num.toLocaleString('es-AR');
    }
};

// =============================================
// Cargar navbar y footer desde partials
// =============================================
function toggleMenu() {
    var menu = document.getElementById('navbarMenu');
    if (menu) menu.classList.toggle('abierta');
}

function loadPartial(id, file) {
    fetch(file)
        .then(function (r) { return r.text(); })
        .then(function (html) {
            var el = document.getElementById(id);
            if (el) el.innerHTML = html;

            if (id === 'navbar-placeholder') {
                Cart.updateCount();

                var hamburger = document.getElementById('hamburger');
                if (hamburger) {
                    hamburger.addEventListener('click', toggleMenu);
                }

                // Marcar link activo
                var currentPage = window.location.pathname.split('/').pop() || 'index.html';
                var links = document.querySelectorAll('.navbar-menu a');
                links.forEach(function (link) {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('activa');
                    }
                });
            }
        });
}

// Actualizar contador al cargar cualquier pagina
document.addEventListener('DOMContentLoaded', function () {
    loadPartial('navbar-placeholder', 'navbar.html');
    loadPartial('footer-placeholder', 'footer.html');
    Cart.updateCount();
});
