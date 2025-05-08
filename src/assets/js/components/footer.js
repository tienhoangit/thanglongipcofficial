// Script for Back to Top button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scrolling for Back to Top button
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Add animation to contact link in CTA section
document.addEventListener('DOMContentLoaded', function() {
    const phoneButton = document.querySelector('.phone-btn');
    
    phoneButton.addEventListener('mouseover', function() {
        this.querySelector('i').style.animation = 'pulse 0.8s infinite';
    });
    
    phoneButton.addEventListener('mouseout', function() {
        this.querySelector('i').style.animation = 'pulse 1.5s infinite';
    });
});