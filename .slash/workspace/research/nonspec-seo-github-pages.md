# Research: SEO Best Practices for React SPA on GitHub Pages
Date: 2026-04-14

## Summary
This comprehensive guide covers all SEO techniques applicable to React Single Page Applications deployed on GitHub Pages. Since GitHub Pages is a static hosting platform without SSR capability, special attention is given to client-side SEO strategies, pre-rendering considerations, and GitHub Pages-specific configurations.

## Findings

### 1. SEO Techniques for GitHub Pages (Static Site, No SSR)

GitHub Pages fully supports static file hosting, making it suitable for SEO when properly configured. The platform supports meta tags, sitemaps, and structured data - everything Google needs to index and rank your site. However, it lacks built-in SEO tools like automatic sitemap generation or meta tag management that CMS platforms provide.

**Key Considerations:**
- GitHub Pages is faster than most shared hosting, improving Core Web Vitals scores
- Static sites can rank just as well as dynamic sites when configured correctly
- No server-side code (PHP, Python, Node.js) - pure static files only

**Source:** https://wrigo.io/blog/github-pages-seo-setup-guide-how-to-rank-your-developer-documentation-site

---

### 2. Meta Tags Checklist

Every React SPA needs these in `public/index.html`:

```html
<!-- Primary Meta Tags -->
<title>Your Name — Role | Tech Stack</title>
<meta name="description" content="[155 chars max] Specific description with keywords and metrics" />
<meta name="robots" content="index, follow" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://yoursite.com/" />
<meta property="og:title" content="Your Title" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://yoursite.com/og-image.jpg" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yourhandle" />
<meta name="twitter:title" content="Your Title" />
<meta name="twitter:description" content="Your description" />
<meta name="twitter:image" content="https://yoursite.com/og-image.jpg" />

<!-- Canonical -->
<link rel="canonical" href="https://yoursite.com/" />

<!-- Viewport & Charset -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta charset="utf-8" />

<!-- Theme Color -->
<meta name="theme-color" content="#ffffff" />
```

**Best Practices:**
- Keep title under 60 characters
- Keep description under 155 characters
- Use react-helmet-async for per-page dynamic meta tags

**Source:** https://dev.to/xuanhai0913/my-react-portfolio-seo-checklist-from-0-to-rich-results-in-48-hours-15me

---

### 3. Structured Data (JSON-LD) for Component Library/Demo Site

For a component library/demo site, recommended schemas include:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Your Component Library",
  "description": "A React component library for building UI",
  "url": "https://yoursite.com",
  "applicationCategory": "DeveloperTechnology",
  "operatingSystem": "Web Browser",
  "programmingLanguage": ["TypeScript", "React"],
  "author": {
    "@type": "Person",
    "name": "Your Name"
  },
  "license": {
    "@type": "CreativeWork",
    "url": "https://github.com/yourrepo/LICENSE"
  }
}
</script>
```

**Additional Recommended Schemas:**
- WebSite schema with searchAction for internal search
- FAQPage schema for documentation questions
- BreadcrumbList for component navigation hierarchy

**Tools:**
- @power-seo/schema - Type-safe JSON-LD with 23 schema builders
- react-schemaorg - Google-maintained React schema.org library

**Sources:**
- https://github.com/google/react-schemaorg
- https://www.npmjs.com/package/@power-seo/schema

---

### 4. robots.txt Best Practices for GitHub Pages

```text
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
```

**GitHub Pages Specific:**
- Place robots.txt in the `public/` folder
- For SPA with client-side routing, ensure sitemap contains proper redirect links
- Google no longer follows redirects in 404.html (since 2019)

**SPA Special Handling:**
For GitHub Pages SPA deployments, consider using sitemap.txt instead of sitemap.xml as some crawlers handle text files better for SPAs.

**Source:** https://github.com/rafgraph/spa-github-pages

---

### 5. Sitemap.xml Generation for SPA on GitHub Pages

**Options for React:**

1. **react-router-sitemap** - Generate from React Router config
```bash
npm install react-router-sitemap --save-dev
```

2. **sitemap** - More flexible approach
```bash
npm install sitemap --save-dev
```

**Example script:**
```javascript
const { createSitemap } = require('sitemap');
const routes = [
  { url: '/', changefreq: 'daily', priority: 1 },
  { url: '/components', changefreq: 'weekly', priority: 0.8 },
  { url: '/docs', changefreq: 'weekly', priority: 0.8 }
];

const sitemap = createSitemap({
  hostname: 'https://yoursite.com',
  urls: routes
});

sitemap.toFile('./public/sitemap.xml');
```

3. **vite-plugin-sitemap** - For Vite-based projects

**Important for GitHub Pages SPA:**
- Run sitemap generation as part of your build process
- Include in package.json: "build": "vite build && node generate-sitemap.js"

**Sources:**
- https://github.com/kuflash/react-router-sitemap
- https://dev.to/theudemezue/how-to-create-a-sitemapxml-in-react-js-3pk9

---

### 6. Favicon Best Practices (2025/2026)

**Required Sizes:**

| Size | Format | Purpose | Platform |
|------|--------|---------|----------|
| 16x16 | PNG/ICO | Browser tabs | Desktop browsers |
| 32x32 | PNG/ICO | Retina tabs | All |
| 180x180 | PNG | Apple Touch Icon | iOS |
| 192x192 | PNG | Android home | Chrome for Android |
| 512x512 | PNG | PWA install | All PWA |

**HTML Implementation:**
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
```

**SVG Favicon (Modern):**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
```

**Best Practices:**
- Use SVG as primary with PNG fallback for best quality
- Include 16x16 and 32x32 minimum for browser tabs
- Apple Touch Icon 180x180 is critical for iOS
- Cache long-term with versioning: `/favicon.ico?v=2`

**Sources:**
- https://iconmaker.studio/blog/favicon-best-practices-2025
- https://devconsole.dev/blog/complete-guide-favicons-2026

---

### 7. Web Manifest for PWA/SEO Benefits

Create `public/manifest.json`:

```json
{
  "name": "Your Component Library",
  "short_name": "YourLib",
  "description": "A React component library for building UI",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**PWA SEO Benefits:**
- PWAs are fully indexed by search engines
- Improved Core Web Vitals through caching
- Mobile-first installation capability
- Faster load times on repeat visits

**Note:** Web app manifest itself doesn't directly affect SEO, but PWA features improve user engagement metrics which can influence rankings.

**Sources:**
- https://www.mobiloud.com/blog/pwa-seo
- https://create-react-app.dev/docs/making-a-progressive-web-app

---

### 8. Performance-Related SEO (Resource Hints)

**Preconnect:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.yoursite.com" crossorigin>
```

**DNS Prefetch:**
```html
<link rel="dns-prefetch" href="https://analytics.example.com">
```

**Preload Critical Resources:**
```html
<link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossorigin>
```

**Best Practices:**
- Limit preconnect to 4-6 origins maximum
- Pair preconnect with dns-prefetch fallback for Safari
- Preload only critical resources (fonts, LCP images)
- Use fetchpriority="high" on LCP elements

**Performance Impact:**
- preconnect: 100-300ms latency reduction
- dns-prefetch: Lightweight DNS resolution only
- LCP improvement: Up to 27% with proper resource hints

**Sources:**
- https://web.dev/preconnect-and-dns-prefetch
- https://webperfclinic.com/article/resource-hints-preload-preconnect-prefetch-early-hints-guide

---

### 9. Accessibility Attributes That Affect SEO

**Semantic HTML:**
```html
<!-- Primary heading - only one per page -->
<h1>Page Title</h1>

<!-- Proper heading hierarchy -->
<h2>Section</h2>
<h3>Subsection</h3>

<!-- Alt text for images -->
<img src="/demo.gif" alt="Animation showing spinner component fading in" />

<!-- ARIA labels for interactive components -->
<button aria-label="Close modal">
  <span aria-hidden="true">&times;</span>
</button>

<!-- Language attribute -->
<html lang="en">
```

**Key Attributes:**
- `alt` text - Required for images, improves image search
- `aria-label` - Screen reader support, helps semantic understanding
- `lang` attribute - Important for international SEO
- Proper heading hierarchy - Critical for content structure

**Additional Recommendations:**
- Use `<main>` for primary content
- Use `<nav>` for navigation
- Use `<footer>` for footer content
- Implement proper focus management for accessibility

**Sources:**
- https://www.codingtag.com/seo-basics-for-react-apps

---

### 10. GitHub Pages Specific SEO Considerations

#### Custom Domain vs github.io

| Aspect | Custom Domain | github.io Subdomain |
|--------|---------------|---------------------|
| Brand Authority | Higher trust signals | Lower |
| Click-through Rate | Better | Lower |
| SEO Value | Builds domain authority | Limited |
| Cost | $12/year | Free |

**Recommendation:** Always use a custom domain for production sites. Set up both apex and www subdomain for maximum coverage.

**Source:** https://wrigo.io/blog/github-pages-seo-setup-guide-how-to-rank-your-developer-documentation-site

#### 404 Handling for SPA

**Create public/404.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>404 - Page Not Found</title>
  <script>
    // SPA fallback: redirect all 404s to index.html
    // The JavaScript router will handle the URL
    window.location.href = '/';
  </script>
</head>
<body>
  <p>Redirecting to home...</p>
</body>
</html>
```

**Important:** For GitHub Pages, 404.html is the only page GitHub will serve for non-existent routes. This differs from traditional servers that can be configured to serve index.html for all routes.

**SPA Routing on GitHub Pages:**
- Use HashRouter if you cannot configure server-side redirects
- For BrowserRouter, ensure your build includes proper base path
- For Vite: set `base: '/your-repo-name/'` in vite.config.js

**Sources:**
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site
- https://noahtigner.com/articles/github-pages-404-react-router/

#### HTTPS

- Default github.io domains are served over HTTPS automatically
- Custom domains require proper DNS configuration for HTTPS
- Enable "Enforce HTTPS" in Pages settings
- Use only HTTPS in production to avoid mixed content issues

---

## Additional Recommendations

### For Component Library/Demo Sites

1. **Demo Pages:** Each component demo should have unique meta tags
2. **Documentation:** Add structured data for HowTo/FAQ schemas
3. **Code Samples:** Use proper semantic markup for code blocks
4. **GitHub Integration:** Add schema.org codeRepository link

### Pre-rendering Consideration

For optimal SEO on GitHub Pages, consider pre-rendering:
- **React Router Prerender:** Generate static HTML at build time
- **Puppeteer Prerendering:** Capture rendered content for landing pages
- This solves the two-wave indexing issue (Google renders JS, but slowly)

---

## Tools for Validation

| Tool | Purpose |
|------|---------|
| Google Rich Results Test | Validate JSON-LD schemas |
| Google Search Console | Monitor indexing status |
| Meta Tags Debugger | Preview OG/Twitter cards |
| Lighthouse | SEO audit and performance |
| Schema Markup Validator | Validate structured data |

---

## Conclusion

React SPAs on GitHub Pages can achieve excellent SEO with proper configuration. Key priorities:
1. Complete meta tags in index.html + react-helmet for dynamic pages
2. JSON-LD structured data for rich results
3. Properly generated sitemap.xml
4. Custom domain for brand authority
5. Fast performance through resource hints and PWA features

The main limitation is the lack of SSR, which means Google uses a two-phase indexing process. Pre-rendering critical public pages can solve this for content-heavy pages.
