document.addEventListener('DOMContentLoaded', function() {
    // Load and insert header
    fetchComponent('/src/components/header.html', 'header-placeholder', function() {
        // Điều chỉnh đường dẫn dựa trên vị trí trang hiện tại
        const currentPath = window.location.pathname;
        const isInSubfolder = currentPath.includes('/pages/');
        
        // Đường dẫn gốc (thay đổi tùy theo độ sâu thư mục)
        const basePath = isInSubfolder ? '../../' : './';
        // const pagesPath = isInSubfolder ? '../' : 'pages/';
        
        // Cập nhật đường dẫn cho logo và hình ảnh
        const logoLink = document.getElementById('logo-link');
        const logoImage = document.getElementById('logo-image');
        
        if (logoLink) logoLink.href = basePath + 'index.html';
        if (logoImage) logoImage.src = basePath + 'assets/images/company/logo.png';
        
        // Cập nhật đường dẫn cho các liên kết trong menu
        const homeLink = document.getElementById('home-link');
        const aboutLink = document.getElementById('about-link');
        const productsLink = document.getElementById('products-link');
        const projectsLink = document.getElementById('projects-link');
        const contactLink = document.getElementById('contact-link');
        
        if (homeLink) homeLink.href = basePath + 'index.html';
        if (aboutLink) aboutLink.href = basePath + 'about.html';
        if (productsLink) productsLink.href = basePath + 'pages/products/index.html';
        if (projectsLink) projectsLink.href = basePath + 'pages/projects/index.html';
        if (contactLink) contactLink.href = basePath + 'contact.html';
        
        // Set active class on the current page's nav link
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            // Kiểm tra đường dẫn tương đối
            if (currentPath.endsWith(linkPath) || 
                (linkPath !== 'index.html' && currentPath.includes(linkPath))) {
                link.classList.add('active');
            }
        });
        
        // Cải thiện menu mobile
        initializeMobileMenu();
    });
    
    // Load and insert footer
    fetchComponent('/src/components/footer.html', 'footer-placeholder', function() {
        const phoneButton = document.querySelector('.phone-btn');
        
        if (phoneButton) {
            phoneButton.addEventListener('mouseover', function() {
                this.querySelector('i').style.animation = 'pulse 0.8s infinite';
            });
            
            phoneButton.addEventListener('mouseout', function() {
                this.querySelector('i').style.animation = 'pulse 1.5s infinite';
            });
        }
    });
    
    // Hàm khởi tạo menu mobile được tách riêng để có thể gọi từ bất kỳ đâu
    function initializeMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinksMenu = document.querySelector('.nav-links');
        
        if (mobileMenuToggle && navLinksMenu) {
            // Xóa bất kỳ event listener cũ
            mobileMenuToggle.replaceWith(mobileMenuToggle.cloneNode(true));
            const newMobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            // Thêm event listener mới
            newMobileMenuToggle.addEventListener('click', function() {
                navLinksMenu.classList.toggle('active');
                this.setAttribute('aria-expanded', 
                    this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
            });
            
            // Đóng menu khi click ra ngoài
            document.addEventListener('click', function(event) {
                const isClickInsideMenu = navLinksMenu.contains(event.target);
                const isClickOnToggle = newMobileMenuToggle.contains(event.target);
                
                if (!isClickInsideMenu && !isClickOnToggle && navLinksMenu.classList.contains('active')) {
                    navLinksMenu.classList.remove('active');
                    newMobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Đóng menu khi click vào link
            const menuLinks = navLinksMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navLinksMenu.classList.remove('active');
                    newMobileMenuToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }
    
    // Helper function to fetch and insert components
    function fetchComponent(url, placeholderId, callback) {
        const placeholder = document.getElementById(placeholderId);
        if (placeholder) {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    placeholder.innerHTML = data;
                    if (callback && typeof callback === 'function') {
                        callback();
                    }
                })
                .catch(error => {
                    console.error(`Error loading ${url}:`, error);
                });
        }
    }
    
    // Khởi tạo menu mobile ngay cả khi không dùng header component
    if (document.querySelector('.mobile-menu-toggle')) {
        initializeMobileMenu();
    }
});

