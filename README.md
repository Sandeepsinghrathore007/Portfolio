# Sandeep Singh Rathore — Portfolio v2

Modern, client-focused portfolio built to attract freelance projects in AI development.

## 📁 Folder Structure

```
myPortfolio/
├── index.html          ← Main page (all sections)
├── css/
│   └── style.css       ← All styles (dark theme, responsive)
├── js/
│   └── script.js       ← Canvas animation, navbar, reveals, form
└── README.md
```

## 🚀 Deploy on GitHub Pages (Step by Step)

### Option A — Replace existing repo (Recommended)

1. Go to your existing repo: `github.com/Sandeepsinghrathore007/myPortfolio`
2. Delete all existing files (or create a new branch `v2`)
3. Upload the 3 files + folders from this project:
   - `index.html`
   - `css/style.css`
   - `js/script.js`
4. In repo **Settings → Pages**:
   - Source: `Deploy from a branch`
   - Branch: `main` → `/ (root)`
   - Click Save
5. Wait ~2 min → live at `https://sandeepsinghrathore007.github.io/myPortfolio/`

### Option B — Git CLI

```bash
# Clone your repo
git clone https://github.com/Sandeepsinghrathore007/myPortfolio.git
cd myPortfolio

# Remove old React files
rm -rf src public package.json package-lock.json vite.config.js etc.

# Copy new files
cp /path/to/portfolio_v2/index.html .
mkdir css js
cp /path/to/portfolio_v2/css/style.css css/
cp /path/to/portfolio_v2/js/script.js js/

# Push
git add .
git commit -m "Rebuild: client-focused portfolio v2"
git push origin main
```

Pages will auto-deploy. No npm install needed — pure HTML/CSS/JS!

---

## ⚙️ Customization Checklist

Before going live, update these in `index.html`:

| Find | Replace with |
|------|-------------|
| `91XXXXXXXXXX` | Your actual WhatsApp number (no spaces/+) |
| `sandeep@example.com` | Your real email |
| Project demo links | Real URLs or keep placeholders |
| `SmartShop Assistant` project | Your own real chatbot project (if any) |

---

## 💡 Further Improvements

### Short term (do this week)
- [ ] Add your real WhatsApp number everywhere it says `91XXXXXXXXXX`
- [ ] Add a real profile photo (optional — add it to the hero right section)
- [ ] Connect the contact form to **Formspree** (free, no backend needed):
  - Sign up at [formspree.io](https://formspree.io)
  - Replace form action in `script.js` with your Formspree endpoint
- [ ] Add Google Analytics (copy paste 1 script tag)

### Medium term (this month)
- [ ] Add a real AI chatbot project with a live demo link
- [ ] Add a **Testimonials** section once you get your first 1–2 clients
- [ ] Add a **Pricing** section (₹5,000–₹15,000 ranges work well for local businesses)
- [ ] Replace OrderFlow Automator with a real n8n automation demo

### Long term (3 months)
- [ ] Add a blog section (one article = more Google traffic)
- [ ] Add case studies with before/after screenshots
- [ ] Add a WhatsApp Business catalog link

---

## 🔧 Tech Notes

- **No build step** — just open `index.html` in a browser
- **No npm** — zero dependencies
- **Canvas animation** — pure JS, ~60fps, GPU friendly
- **Fonts** — loaded from Google Fonts CDN (no local files needed)
- **Form** — currently redirects to WhatsApp. Connect Formspree for email delivery.
- **SEO** — title, meta description, OG tags already set

---

## 📊 Performance

- Page size: ~15KB (HTML + CSS + JS, no images)
- First Contentful Paint: < 1s
- No render-blocking scripts
- Google Fonts loaded with `font-display: swap` via preconnect

---

Built with purpose. No frameworks. No overhead. Just results. 🚀
# Portfolio
