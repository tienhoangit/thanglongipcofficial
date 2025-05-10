// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        const toggleMenu = (show) => {
            navLinks.classList.toggle('active', show);
            mobileMenuToggle.setAttribute('aria-expanded', show ? 'true' : 'false');
            document.body.classList.toggle('menu-open', show);
        };

        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const willShow = !navLinks.classList.contains('active');
            toggleMenu(willShow);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !mobileMenuToggle.contains(e.target) && 
                !navLinks.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        // Set active state for current page
        const currentPath = window.location.pathname;
        const currentPage = currentPath.endsWith('/') ? currentPath : currentPath + '/';
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            const linkPath = link.getAttribute('href');
            const normalizedLink = linkPath.endsWith('/') ? linkPath : linkPath + '/';
            if (currentPage.includes(normalizedLink) && linkPath !== '/') {
                link.classList.add('active');
            } else if (currentPage === '/' && linkPath === '/') {
                link.classList.add('active');
            }
        });

        // Handle ESC key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu(false);
            }
        });
    }
});

// Lazy Loading Images
// document.addEventListener('DOMContentLoaded', () => {
//     const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
//     if ('IntersectionObserver' in window) {
//         const imageObserver = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     const img = entry.target;
//                     img.src = img.dataset.src;
//                     img.classList.remove('lazy');
//                     imageObserver.unobserve(img);
//                 }
//             });
//         });

//         lazyImages.forEach(img => imageObserver.observe(img));
//     }
// });

// Form Validation
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            showError(input, 'Trường này là bắt buộc');
        } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value)) {
            isValid = false;
            showError(input, 'Email không hợp lệ');
        } else if (input.type === 'tel' && !validatePhone(input.value)) {
            isValid = false;
            showError(input, 'Số điện thoại không hợp lệ');
        } else if (input.tagName.toLowerCase() === 'select' && !input.value) {
            isValid = false;
            showError(input, 'Vui lòng chọn một mục');
        } else {
            clearError(input);
        }
    });

    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) {
        isValid = false;
    }

    return isValid;
};

const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone) => {
    return /^[0-9]{10,11}$/.test(phone.replace(/[^0-9]/g, ''));
};

const showError = (input, message) => {
    const errorDiv = input.nextElementSibling?.classList.contains('error-message') 
        ? input.nextElementSibling 
        : document.createElement('div');
    
    if (!input.nextElementSibling?.classList.contains('error-message')) {
        errorDiv.className = 'error-message';
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    
    errorDiv.textContent = message;
    input.classList.add('error');
};

const clearError = (input) => {
    const errorDiv = input.nextElementSibling;
    if (errorDiv?.classList.contains('error-message')) {
        errorDiv.remove();
    }
    input.classList.remove('error');
};

// Form Submission Handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm(form)) {
                return;
            }

            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Đang gửi...';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset();
                    showMessage('success', 'Gửi thành công! Chúng tôi sẽ liên hệ lại với bạn sớm.');
                } else {
                    throw new Error('Lỗi gửi form');
                }
            } catch (error) {
                showMessage('error', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
                console.error('Form submission error:', error);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }
});

// Show Message
const showMessage = (type, message) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('fade-out');
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
};

// Thêm vào file main.js
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.banner');
    if (!banner) return;
    
    // Phát hiện iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (isIOS) {
        // Tạo giải pháp thay thế cho iOS
        banner.classList.add('ios-fixed');
        
        // Tạo container cho ảnh nền
        const bgContainer = document.createElement('div');
        bgContainer.className = 'ios-bg-container';
        
        // Tạo phần tử ảnh nền
        const bgImage = document.createElement('div');
        bgImage.className = 'ios-bg-image';
        bgImage.style.backgroundImage = "url('assets/images/company/robot-sunward.jpg')";
        
        // Thêm vào DOM
        bgContainer.appendChild(bgImage);
        banner.insertBefore(bgContainer, banner.firstChild);
        
        // Xử lý sự kiện cuộn
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            lastScrollY = window.scrollY;
            
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    // Tính toán vị trí mới cho ảnh nền
                    const bannerRect = banner.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    
                    // Chỉ áp dụng khi banner nằm trong viewport
                    if (bannerRect.bottom > 0 && bannerRect.top < viewportHeight) {
                        // Tỷ lệ hiển thị của banner trong viewport
                        const visibleRatio = Math.min(1, (viewportHeight - bannerRect.top) / viewportHeight);
                        
                        // Di chuyển ảnh nền một chút để tạo hiệu ứng cố định
                        bgImage.style.transform = `translateY(${bannerRect.top * 0.4}px)`;
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
});

// Hiệu ứng gõ và xóa chữ 
const texts = [
    "Mỗi công trình vươn cao, bắt đầu từ những gì sâu nhất.",
    "Chúng tôi chọn ở phía dưới – để công trình ở trên luôn vững.",
    "Mỗi cây cọc là một sự hy sinh thầm lặng cho thành công phía trên.",
    "Nền móng vững – giấc mơ mới đủ lớn để bay xa.",
    "Không ai thấy, nhưng mọi thứ dựa vào chúng tôi.",
    "Vững từ gốc, bền theo năm tháng.",
    "Làm móng – để người khác làm kỳ tích"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // Tốc độ gõ (ms)
const deletingSpeed = 50; // Tốc độ xóa (ms)
const delayBetween = 2000; // Thời gian chờ giữa các câu (ms)

function type() {
    const currentText = texts[textIndex];
    const typingElement = document.getElementById('typing-text');

    if (!isDeleting && charIndex < currentText.length) {
        // Gõ chữ
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        // Xóa chữ
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, deletingSpeed);
    } else if (!isDeleting && charIndex === currentText.length) {
        // Chờ trước khi xóa
        setTimeout(() => {
            isDeleting = true;
            type();
        }, delayBetween);
    } else if (isDeleting && charIndex === 0) {
        // Chuyển sang câu tiếp theo
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, typingSpeed);
    }
}

// Bắt đầu hiệu ứng
document.addEventListener('DOMContentLoaded', () => {
    type();
});
