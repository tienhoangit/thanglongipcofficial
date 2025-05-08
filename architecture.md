# Thang Long IPC Website - Technical Architecture

## 1. Project Architecture

### 1.1 Directory Structure
```
thanglong-ipc/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── products/     # Product images
│   │   │   ├── projects/     # Project photos
│   │   │   └── company/      # Company photos and logos
│   │   ├── css/
│   │   │   ├── main.css     # Main stylesheet
│   │   │   ├── variables.css # CSS custom properties
│   │   │   ├── components/   # Component styles
│   │   │   │   ├── header.css
│   │   │   │   ├── footer.css
│   │   │   │   ├── forms.css
│   │   │   │   └── cards.css
│   │   │   └── pages/       # Page-specific styles
│   │   └── js/
│   │       ├── main.js      # Main JavaScript file
│   │       └── components/   # Component scripts
│   │           ├── form-handler.js
│   │           ├── image-lazy-load.js
│   │           └── mobile-menu.js
│   ├── pages/
│   │   ├── index.html      # Home page
│   │   ├── about.html      # About page
│   │   ├── products/       # Product pages
│   │   ├── projects/       # Project pages
│   │   └── contact.html    # Contact page
│   └── components/         # Reusable HTML components
│       ├── header.html
│       ├── footer.html
│       └── forms/
├── public/                 # Static assets
│   ├── robots.txt
│   └── sitemap.xml
└── docs/                  # Documentation
    ├── README.md
    └── CHANGELOG.md
```

### 1.2 Technology Stack
- **HTML5**: Semantic markup for better accessibility and SEO
- **CSS3**: 
  - Custom Properties for theming
  - Flexbox/Grid for layouts
  - Mobile-first responsive design
- **JavaScript**: 
  - Vanilla JS for interactivity
  - No framework dependencies
  - Module pattern for organization
- **FormFree**: Form handling and submission
- **Build Tools**: (Optional)
  - HTML Include for component reuse
  - CSS/JS minification
  - Image optimization

## 2. Component Architecture

### 2.1 Core Components
1. **Header Component**
   - Logo
   - Navigation menu
   - Mobile menu toggle
   - Contact info

2. **Footer Component**
   - Company info
   - Quick links
   - Social media
   - Contact details

3. **Form Components**
   - Contact form
   - Quote request form
   - Form validation
   - FormFree integration

4. **Product Components**
   - Product cards
   - Product details
   - Technical specifications
   - Image galleries

5. **Project Components**
   - Project cards
   - Case study layout
   - Project gallery
   - Timeline visualization

### 2.2 Styling Architecture
```css
/* CSS Variables */
:root {
  /* Colors */
  --color-primary: #294099;
  --color-secondary: #F58433;
  --color-text: #333333;
  --color-background: #ffffff;
  
  /* Typography */
  --font-primary: 'Arial', sans-serif;
  --font-size-base: 16px;
  
  /* Layout */
  --container-max-width: 1200px;
  --container-padding: 1rem;
  
  /* Breakpoints */
  --breakpoint-mobile: 480px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
}
```

## 3. Responsive Design Strategy

### 3.1 Breakpoints
- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px

### 3.2 Mobile-First Approach
```css
/* Base styles (mobile) */
.component {
  width: 100%;
}

/* Tablet styles */
@media (min-width: 481px) {
  .component {
    width: 50%;
  }
}

/* Desktop styles */
@media (min-width: 769px) {
  .component {
    width: 33.33%;
  }
}
```

## 4. Performance Optimization

### 4.1 Image Optimization
- WebP format with fallbacks
- Lazy loading implementation
- Responsive images using srcset
- Image compression workflow

### 4.2 Code Optimization
- CSS minification
- JavaScript bundling
- Critical CSS extraction
- Defer non-critical resources

### 4.3 Performance Targets
- Lighthouse score ≥ 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Total Blocking Time < 300ms

## 5. SEO Implementation

### 5.1 Technical SEO
```html
<!-- Meta Tags Template -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="[Page-specific description]">
<meta name="keywords" content="[Relevant keywords]">
<title>[Page Title] | Thang Long IPC</title>

<!-- Open Graph Tags -->
<meta property="og:title" content="[Page Title]">
<meta property="og:description" content="[Description]">
<meta property="og:image" content="[Image URL]">
<meta property="og:url" content="[Page URL]">
```

### 5.2 Schema.org Implementation
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Thang Long IPC",
  "url": "https://thanglongipc.com",
  "logo": "https://thanglongipc.com/assets/images/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "024.39517151",
    "contactType": "customer service"
  }
}
</script>
```

## 6. Form Implementation

### 6.1 FormFree Integration
```javascript
// FormFree configuration
const formConfig = {
  endpoint: '[FormFree-Endpoint]',
  successRedirect: '/thank-you.html',
  errorRedirect: '/error.html'
};

// Form validation and submission
function handleFormSubmit(event) {
  event.preventDefault();
  // Validation logic
  // FormFree submission
}
```

## 7. Testing Strategy

### 7.1 Manual Testing
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing
- Form submission testing
- Navigation and linking
- Content rendering
- Responsive design verification

### 7.2 Automated Testing (Optional)
- Lighthouse CI
- HTML validation
- CSS validation
- JavaScript linting
- Accessibility testing

## 8. Deployment Strategy

### 8.1 GitHub Pages Deployment
1. Repository setup
2. GitHub Actions workflow
3. Custom domain configuration
4. SSL certificate setup

### 8.2 Cloudflare Pages Alternative
1. Cloudflare Pages setup
2. Build configuration
3. Domain management
4. Cache optimization

## 9. Documentation Requirements

### 9.1 Technical Documentation
- Setup instructions
- Development workflow
- Component documentation
- Build process
- Deployment process

### 9.2 Content Management Guide
- File structure
- Content update process
- Image optimization guidelines
- SEO best practices

## 10. Monitoring & Maintenance

### 10.1 Performance Monitoring
- Google Analytics setup
- Lighthouse monitoring
- Error tracking
- Form submission monitoring

### 10.2 Backup Strategy
- Source code version control
- Asset backup
- Documentation backup
- Regular testing of restore procedures