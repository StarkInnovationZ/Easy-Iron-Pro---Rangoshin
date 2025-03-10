// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i') || themeToggle; // Handle both cases
    if (body.classList.contains('dark-theme')) {
        icon.className = 'fa-solid fa-sun'; // Font Awesome Sun Icon
    } else {
        icon.className = 'fa-solid fa-moon'; // Font Awesome Moon Icon
    }
});

// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.className = 'bx bx-x';
    } else {
        icon.className = 'bx bx-menu';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            navToggle.querySelector('i').className = 'bx bx-menu';
        }
    });
});

// Products Data
const products = [
    {
        id: 1,
        name: "Easy Iron Pro Basic",
        price: 299.99 * 83, // Convert to INR
        image: "./image.png",
        description: "Perfect for home use with smart ironing features"
    },
    {
        id: 2,
        name: "Easy Iron Pro Plus",
        price: 499.99 * 83, // Convert to INR
        image: "./image.png",
        description: "Advanced features for professional results"
    }
];

// Shopping Cart
let cart = [];

// Initialize Products
function initializeProducts() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">₹${product.price.toFixed(2)}</div> <!-- Updated to ₹ -->
            <button onclick="addToCart(${product.id})" class="btn btn-primary">
                Add to Cart <i class='bx bx-cart-add'></i>
            </button>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    showNotification('Item added to cart!');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Item removed from cart!');
}

// Update Cart UI
function updateCartUI() {
    const cartContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');

    // Update cart items
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>₹${item.price.toFixed(2)} x ${item.quantity}</p> <!-- Updated to ₹ -->
            </div>
            <button onclick="removeFromCart(${item.id})" class="btn btn-danger">
                <i class='bx bx-trash'></i>
            </button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₹${total.toFixed(2)}`; // Updated to ₹

    // Update cart count
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message.replace('$', '₹'); // Replace $ with ₹
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Toggle Cart Sidebar
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }

    // Here you would typically integrate with a payment gateway
    showNotification('Processing your order...');
    
    // Simulate order processing
    setTimeout(() => {
        cart = [];
        updateCartUI();
        document.getElementById('cartSidebar').classList.remove('active');
        showNotification('Order placed successfully!');
    }, 2000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    updateCartUI();
});

// Testimonials
const testimonials = [
    {
        content: "Easy Iron Pro has revolutionized our laundry service. The automation and precision are unmatched!",
        author: "Sarah Johnson",
        role: "Laundry Service Owner",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
    },
    {
        content: "This smart ironing system has saved us countless hours. It's a game-changer for our hotel.",
        author: "Michael Chen",
        role: "Hotel Manager",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
    },
    {
        content: "The best investment we've made for our dry cleaning business. Customer satisfaction is at an all-time high!",
        author: "Emily Rodriguez",
        role: "Business Owner",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
    }
];

let currentTestimonial = 0;
const testimonialSlider = document.getElementById('testimonialSlider');
const testimonialDots = document.getElementById('testimonialDots');

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => showTestimonial(index));
    testimonialDots.appendChild(dot);
});

function showTestimonial(index) {
    currentTestimonial = index;
    updateTestimonials();
    updateDots();
}

function updateTestimonials() {
    const testimonial = testimonials[currentTestimonial];
    testimonialSlider.innerHTML = `
        <div class="testimonial-card animate-fadeIn">
            <div class="testimonial-rating">
                ${'<i class="bx bxs-star"></i>'.repeat(testimonial.rating)}
            </div>
            <p>${testimonial.content}</p>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.author}">
                <div>
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        </div>
    `;
}

function updateDots() {
    const dots = testimonialDots.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

// Auto-advance testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Newsletter Form
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to our newsletter!');
        form.reset();
    });
});

// Intersection Observer for animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
        }
    });
}, { threshold: 0.1 });

// Add animation to sections
document.querySelectorAll('section').forEach(section => {
    animateOnScroll.observe(section);
});

// Add animation to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    animateOnScroll.observe(card);
});

// Initialize the first testimonial
showTestimonial(0);

function showCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');

    // Show the checkout form and hide cart items and footer
    checkoutForm.style.display = 'block';
    cartItems.style.display = 'none';
    cartFooter.style.display = 'none';

    // Smoothly scroll to the checkout form
    checkoutForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.getElementById('checkoutDetailsForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const deliveryDate = document.getElementById('deliveryDate').value;

    // Simulate order processing
    setTimeout(() => {
        // Hide the checkout form
        document.getElementById('checkoutForm').style.display = 'none';

        // Show the order confirmation
        document.getElementById('orderConfirmation').style.display = 'block';
        document.getElementById('expectedDate').textContent = deliveryDate;

        // Clear the cart
        cart = [];
        updateCartUI();
    }, 1000);
});