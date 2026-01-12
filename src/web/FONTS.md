# Font Customization Guide

## Quick Font Change

### Method 1: Using Google Fonts (Recommended)

1. **Choose your fonts** at [Google Fonts](https://fonts.google.com/)

2. **Add to `index.html`** (before the closing `</head>` tag):

```html
<!-- Example: Using Inter for text and Fira Code for code -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code&display=swap" rel="stylesheet">
```

3. **Update `css/styles.css`** (line 34-35):

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'Fira Code', monospace;
```

4. **Refresh your browser** - Done! ✅

### Method 2: Using System Fonts (No Download)

Edit `css/styles.css` (line 34):

```css
/* macOS optimized */
--font-sans: -apple-system, BlinkMacSystemFont, sans-serif;

/* Windows optimized */
--font-sans: 'Segoe UI', Tahoma, sans-serif;

/* Linux optimized */
--font-sans: Ubuntu, 'Liberation Sans', sans-serif;

/* Classic web-safe */
--font-sans: Georgia, serif;
--font-sans: 'Times New Roman', serif;
--font-sans: Verdana, sans-serif;
```

## Popular Font Combinations

### Modern & Clean

```html
<!-- Add to index.html <head> -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
```

```css
/* Update in styles.css */
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Professional & Readable

```html
<!-- Add to index.html <head> -->
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Source+Code+Pro&display=swap" rel="stylesheet">
```

```css
/* Update in styles.css */
--font-sans: 'Open Sans', sans-serif;
--font-mono: 'Source Code Pro', monospace;
```

### Elegant & Friendly

```html
<!-- Add to index.html <head> -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Fira+Code&display=swap" rel="stylesheet">
```

```css
/* Update in styles.css */
--font-sans: 'Poppins', sans-serif;
--font-mono: 'Fira Code', monospace;
```

### Technical & Crisp

```html
<!-- Add to index.html <head> -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Mono&display=swap" rel="stylesheet">
```

```css
/* Update in styles.css */
--font-sans: 'Roboto', sans-serif;
--font-mono: 'Roboto Mono', monospace;
```

### Classic & Timeless

```html
<!-- Add to index.html <head> -->
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Inconsolata&display=swap" rel="stylesheet">
```

```css
/* Update in styles.css */
--font-sans: 'Lato', sans-serif;
--font-mono: 'Inconsolata', monospace;
```

## Step-by-Step Example

Let's change to **Inter** (main text) and **Fira Code** (code):

### Step 1: Edit `src/web/index.html`

Find the `</head>` tag (around line 10) and add BEFORE it:

```html
    <!-- Custom Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
</head>
```

### Step 2: Edit `src/web/css/styles.css`

Find the Typography section (around line 34) and change:

```css
/* Typography */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'Fira Code', 'Courier New', monospace;
```

### Step 3: Refresh Browser

Hard refresh: **Ctrl+Shift+R** (or **Cmd+Shift+R** on Mac)

Done! ✅

## Advanced: Font Size Adjustments

If you want to adjust font sizes, add to `:root` in `styles.css`:

```css
:root {
    /* ... existing variables ... */

    /* Font sizes */
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
}
```

Then update the body font size:

```css
body {
    font-family: var(--font-sans);
    font-size: var(--font-size-base); /* or 16px, 18px, etc. */
    line-height: 1.6;
}
```

## Troubleshooting

### Fonts not loading?

1. **Check browser console** (F12 → Console) for errors
2. **Verify Google Fonts link** is correct
3. **Hard refresh** the page (Ctrl+Shift+R)
4. **Check spelling** of font names in CSS
5. **Include fallback fonts** in your CSS

### Fonts look different than expected?

1. **Check font weights** - you may need to import more weights
2. **Adjust line-height** if text feels cramped or loose
3. **Increase font-size** if readability is poor

### Want to use local fonts?

Add to `styles.css` at the top:

```css
@font-face {
    font-family: 'MyCustomFont';
    src: url('../fonts/MyCustomFont.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}

:root {
    --font-sans: 'MyCustomFont', sans-serif;
}
```

## Recommended Fonts for Training Content

**For readability (long-form text):**
- Inter
- Open Sans
- Lato
- Source Sans Pro

**For code/YAML (monospace):**
- Fira Code (ligatures!)
- JetBrains Mono
- Source Code Pro
- Roboto Mono

**For headings (can be different from body):**
- Poppins
- Montserrat
- Work Sans

## Quick Copy-Paste Configs

### Config 1: Inter + Fira Code

**In `index.html` before `</head>`:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code&display=swap" rel="stylesheet">
```

**In `styles.css` line 34-35:**
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'Fira Code', monospace;
```

### Config 2: Poppins + JetBrains Mono

**In `index.html` before `</head>`:**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
```

**In `styles.css` line 34-35:**
```css
--font-sans: 'Poppins', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Config 3: System Fonts (No Download)

**In `styles.css` line 34-35:**
```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'SF Mono', Monaco, 'Cascadia Code', Consolas, monospace;
```

## Testing Your Changes

1. Start the web server: `./start-web.sh`
2. Open http://localhost:8000
3. Check different parts of the interface:
   - Header and navigation
   - Module content paragraphs
   - Code blocks and YAML examples
   - Buttons and form elements
4. Adjust as needed!

---

**Need help?** The font variables are in:
- `src/web/css/styles.css` at **line 34-35**

**Pro tip:** Use [Google Fonts](https://fonts.google.com/) to preview combinations before choosing!
