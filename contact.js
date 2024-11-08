// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initializeContactForm();
});

// Form Validation
function validateForm(data) {
    let isValid = true;

    // Clear previous errors
    clearErrors();

    // Name validation
    if (data.name.length < 2) {
        showInputError('name', 'Please enter a valid name');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showInputError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showInputError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    // Message validation
    if (data.message.length < 10) {
        showInputError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

// Show input error message
function showInputError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Remove any existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    input.classList.add('error');
    input.parentElement.appendChild(errorDiv);
}

// Clear all errors
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorInputs = document.querySelectorAll('.error');
    
    errorMessages.forEach(error => error.remove());
    errorInputs.forEach(input => input.classList.remove('error'));
}

// Validate single input
function validateInput(input) {
    input.classList.remove('error');
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Initialize Contact Form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            message: form.message.value.trim()
        };

        // Validate form data
        if (!validateForm(formData)) return;

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with actual API endpoint)
            await simulateFormSubmission(formData);
            
            // Show success message
            showNotification('Message sent successfully! We\'ll contact you soon.', 'success');
            
            // Reset form
            form.reset();
            clearErrors();

        } catch (error) {
            // Show error message
            showNotification('Failed to send message. Please try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Add input validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', formData);
            resolve();
        }, 2000);
    });
}

// Show notification
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    initializeContactForm();
    initializeHamburgerMenu(); // Add this line
});

// Add this new function
function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    body.appendChild(overlay);

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    }

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking overlay
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on window resize if open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
}