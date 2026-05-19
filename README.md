# Achu Pradeep Portfolio

A stunning, dark luxury single-page portfolio website for Achu Pradeep — Linux DevOps Engineer & AI Agent Developer.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![GitHub Pages](https://img.shields.io/badge/Platform-GitHub%20Pages-blue) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Features

- **Dark Luxury Aesthetic** — Deep dark backgrounds with amber/gold accents
- **Smooth Scroll Animations** — Intersection Observer powered reveal effects
- **Interactive Particle Field** — Animated star field in hero section
- **Typing Effect** — Cycling taglines in hero area
- **Project Showcase** — Featured projects from GitHub with stats
- **Responsive Design** — Mobile-first, works on all devices
- **Accessible Navigation** — Sticky navbar with scroll effects
- **No Dependencies** — Pure HTML, CSS, JavaScript

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. **Fork or push this repository to your GitHub account**
   
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/achupradeep3050/achupradeep3050.github.io.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Select **main** branch and **/ (root)** folder
   - Click **Save**

3. **Your site will be live at**
   ```
   https://achupradeep3050.github.io/
   ```

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/achupradeep3050/achupradeep3050.github.io.git

# Navigate to folder
cd achupradeep3050.github.io

# Serve locally (using Python)
python3 -m http.server 8000

# Or using PHP
php -S localhost:8000

# Or using Node.js
npx serve

# Open in browser
open http://localhost:8000
```

## 📁 Project Structure

```
portfolio/
├── index.html      # Main HTML structure
├── style.css       # All styles and animations
├── script.js       # JavaScript interactions
└── README.md       # This file
```

## 🎨 Customization

### Update Personal Information

Edit `index.html` to customize:
- Name, title, and bio
- Contact links (GitHub, LinkedIn, Email)
- Projects and descriptions
- Experience timeline

### Modify Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --amber: #f5c542;           /* Primary accent color */
    --gold: #ffd700;            /* Secondary accent */
    --bg-primary: #0a0a0f;      /* Main background */
    --bg-secondary: #0d0d1a;     /* Alternating sections */
}
```

### Update Projects

Modify the project cards in `index.html`:

```html
<div class="project-card reveal">
    <h3 class="project-name">Your Project</h3>
    <div class="project-stats">
        <span class="stat"><i class="fas fa-star"></i> 100+</span>
    </div>
    <p class="project-description">Description here...</p>
    <a href="https://github.com/yourusername/project" class="project-link">
        View Project <i class="fas fa-arrow-right"></i>
    </a>
</div>
```

## 🔧 Technologies Used

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, animations, Grid/Flexbox
- **JavaScript** — Vanilla ES6+, Intersection Observer API
- **Google Fonts** — Space Grotesk + Inter
- **Font Awesome 6** — Icons via CDN

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

This portfolio is open source and available under the MIT License.

---

**Built with ❤️ for Achu Pradeep**

*Questions? Issues? Create a GitHub issue or reach out!*