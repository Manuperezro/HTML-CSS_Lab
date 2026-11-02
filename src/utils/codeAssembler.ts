import type { CodeBlock, ChallengeId } from '../types/challenge';

export const FINAL_VALID_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bristol Brew Café</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Bristol Brew Café</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#menu">Menu</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main>
    <section id="home" class="hero">
      <h2>Fresh Coffee in the Heart of Bristol</h2>
      <p>Enjoy freshly brewed coffee and homemade cakes.</p>
      <img src="images/coffee.jpg" alt="Freshly prepared coffee">
      <a href="#menu" class="button">Explore Our Menu</a>
    </section>
    <section id="about">
      <h2>About Our Café</h2>
      <img src="images/cafe-interior.jpg" alt="Bristol Brew Café interior">
      <p>An independent coffee haven nestled in the heart of Bristol, serving specialty single-origin roasts, locally sourced dairy, and artisan baked treats every single morning.</p>
    </section>
    <section id="menu">
      <h2>Our Menu</h2>
      <div class="menu-grid">
        <article class="menu-card">
          <h3>Flat White</h3>
          <p>Rich double espresso with velvety steamed milk.</p>
          <p class="price">£3.50</p>
        </article>
        <article class="menu-card">
          <h3>Cappuccino</h3>
          <p>Bold espresso topped with deep froth and organic cocoa.</p>
          <p class="price">£3.60</p>
        </article>
        <article class="menu-card">
          <h3>Homemade Cake</h3>
          <p>Freshly baked daily seasonal spiced sponge.</p>
          <p class="price">£4.00</p>
        </article>
      </div>
    </section>
    <section id="contact">
      <h2>Visit Us</h2>
      <p>📍 14 Harbourside Walk, Bristol BS1 5TY</p>
      <p>⏰ Open Daily: 7:30am – 6:00pm</p>
      <a href="mailto:hello@bristolbrew.co.uk" class="contact-link">Get In Touch</a>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Bristol Brew Café. All rights reserved. (Educational project for BTEC Unit 15)</p>
  </footer>
</body>
</html>`;

export const FINAL_VALID_CSS = `/* Base Styles */
body {
  background-color: #f7f3ed;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color: #2b1810;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

header {
  background-color: #3d2314;
  color: #ffffff;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

header h1 {
  margin: 0;
  font-size: 1.75rem;
  letter-spacing: -0.5px;
  color: #ffffff;
}

nav a {
  color: #f5e9d8;
  text-decoration: none;
  margin-left: 20px;
  font-weight: 600;
  transition: color 0.2s;
  padding: 6px 12px;
  border-radius: 4px;
}

nav a:hover {
  color: #e59957;
  background: rgba(255,255,255,0.05);
}

main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  background-color: #ffffff;
  padding: 40px;
  text-align: center;
  border-radius: 14px;
  margin: 20px 0 40px;
  box-shadow: 0 4px 20px rgba(61, 35, 20, 0.08);
}

.hero h2 {
  font-size: 2.2rem;
  color: #3d2314;
  margin-top: 0;
}

.hero p {
  font-size: 1.15rem;
  color: #634f45;
  max-width: 600px;
  margin: 0 auto 25px;
}

.hero img {
  width: 100%;
  max-height: 380px;
  border-radius: 10px;
  object-fit: cover;
  margin: 10px 0 30px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.1);
}

.button {
  display: inline-block;
  background-color: #c97a3e;
  color: #ffffff;
  padding: 14px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.3px;
  box-shadow: 0 4px 12px rgba(201, 122, 62, 0.3);
  transition: transform 0.2s, background-color 0.2s;
}

.button:hover {
  background-color: #b56b32;
  transform: translateY(-2px);
}

#about, #menu, #contact {
  background: #ffffff;
  padding: 35px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 3px 15px rgba(61, 35, 20, 0.05);
}

#about h2, #menu h2, #contact h2 {
  color: #3d2314;
  margin-top: 0;
  font-size: 1.8rem;
  border-bottom: 2px solid #f1e6da;
  padding-bottom: 10px;
}

#about img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 8px;
  margin: 15px 0;
}

/* Flexbox Menu Grid */
.menu-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 25px;
}

.menu-card {
  flex: 1;
  min-width: 240px;
  background: #fbf9f6;
  padding: 24px;
  border-radius: 10px;
  border-left: 4px solid #c97a3e;
  border-top: 1px solid #f0e6dc;
  border-right: 1px solid #f0e6dc;
  border-bottom: 1px solid #f0e6dc;
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);
}

.menu-card h3 {
  margin-top: 0;
  color: #3d2314;
  font-size: 1.3rem;
}

.menu-card .price {
  font-weight: 800;
  color: #c97a3e;
  font-size: 1.25rem;
  margin-bottom: 0;
}

.contact-link {
  display: inline-block;
  margin-top: 10px;
  color: #c97a3e;
  font-weight: 700;
  text-decoration: none;
}

footer {
  text-align: center;
  padding: 35px 20px;
  background-color: #2b1810;
  color: #cfbcaa;
  margin-top: 50px;
  font-size: 0.95rem;
}`;

export interface BugFixState {
  bug1_mainClose: boolean;
  bug2_cssLink: boolean;
  bug3_headerInsideBody: boolean;
  bug4_navInsideHeader: boolean;
  bug5_coffeePath: boolean;
  bug6_cakeAlt: boolean;
  bug7_heroSelector: boolean;
  bug8_cssSemicolon: boolean;
  bug9_flexDisplay: boolean;
  bug10_contactLink: boolean;
}

export const INITIAL_BUG_STATE: BugFixState = {
  bug1_mainClose: false,
  bug2_cssLink: false,
  bug3_headerInsideBody: false,
  bug4_navInsideHeader: false,
  bug5_coffeePath: false,
  bug6_cakeAlt: false,
  bug7_heroSelector: false,
  bug8_cssSemicolon: false,
  bug9_flexDisplay: false,
  bug10_contactLink: false
};

export function assemblePreviewContent(
  challengeId: ChallengeId,
  blocks: CodeBlock[],
  bugState: BugFixState = INITIAL_BUG_STATE,
  isCompleted: boolean = false
): { html: string; css: string } {
  // If challenge is already completed or challenge 10 is all green, render full valid site
  if (isCompleted && challengeId === 10) {
    return { html: FINAL_VALID_HTML, css: FINAL_VALID_CSS };
  }

  switch (challengeId) {
    case 1: {
      // Challenge 1: File organization.
      // If student hasn't organized yet, show a welcome preview with placeholder message
      const areFilesOrganized = blocks.every(b => {
        if (b.content.endsWith('.jpg')) return b.category === 'images';
        return b.category === 'root';
      });

      if (areFilesOrganized) {
        return {
          html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bristol Brew Café</title>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 40px; background: #faf7f2; color: #2b1810; }
    .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); max-width: 500px; margin: 0 auto; }
    h2 { color: #2e7d32; }
    .badge { display: inline-block; background: #e8f5e9; color: #2e7d32; padding: 6px 14px; border-radius: 20px; font-weight: bold; margin-bottom: 15px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">✓ Files Organised</div>
    <h2>Project Structure Ready!</h2>
    <p>index.html and style.css are in the root directory, and image assets are safely stored in images/.</p>
    <p>Next step: Rebuild the HTML document skeleton!</p>
  </div>
</body>
</html>`,
          css: ''
        };
      }

      return {
        html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Bristol Brew Café</title>
  <style>
    body { font-family: sans-serif; text-align: center; padding: 40px; background: #faf7f2; color: #2b1810; }
    .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); max-width: 500px; margin: 0 auto; }
    h2 { color: #d32f2f; }
    .badge { display: inline-block; background: #ffebee; color: #c62828; padding: 6px 14px; border-radius: 20px; font-weight: bold; margin-bottom: 15px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">⚠ Files Unorganised</div>
    <h2>Where Do the Files Belong?</h2>
    <p>The web server cannot locate index.html because files are in the wrong folders!</p>
    <p>Drag the files in the left panel into their correct locations to establish the project structure.</p>
  </div>
</body>
</html>`,
        css: ''
      };
    }

    case 2: {
      // Challenge 2: HTML Skeleton
      // If body is empty, inject an informative visual card so the preview is not a blank white page
      const hasBodyOpen = blocks.some(b => b.id === 'b2-body-open');
      const hasHeadClosed = blocks.some(b => b.id === 'b2-head-close');
      const hasTitle = blocks.some(b => b.id === 'b2-title');

      const isOrdered = blocks.map(b => b.id).indexOf('b2-head-close') < blocks.map(b => b.id).indexOf('b2-body-open');

      const statusCardHtml = `
  <style>
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #faf7f2; color: #2b1810; margin: 0; padding: 30px; display: flex; align-items: center; justify-content: center; min-height: 80vh; text-align: center; }
    .card { background: white; border: 2px dashed ${isOrdered ? '#c97a3e' : '#e2e8f0'}; border-radius: 12px; padding: 30px; max-width: 460px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 16px; font-size: 0.8rem; font-weight: bold; margin-bottom: 12px; }
    .badge-ok { background: #e8f5e9; color: #2e7d32; }
    .badge-warn { background: #fff3e0; color: #b45309; }
    .code-tag { font-family: monospace; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #e65100; font-weight: bold; }
  </style>
  <div class="card">
    <div style="font-size: 2.2rem; margin-bottom: 8px;">☕</div>
    ${isOrdered && hasTitle && hasBodyOpen && hasHeadClosed ? `
      <div class="badge badge-ok">✓ HTML Skeleton Assembled</div>
      <h3 style="margin-top: 0; color: #3d2314;">Document Skeleton Ready!</h3>
      <p style="color: #64748b; font-size: 0.88rem; line-height: 1.5;">
        The browser has loaded <span class="code-tag">&lt;head&gt;</span> metadata and tab title <strong>"Bristol Brew Café"</strong>.
      </p>
      <p style="background: #fdfbf7; border: 1px solid #f1e6da; padding: 10px; border-radius: 6px; font-size: 0.82rem; color: #8c6b54;">
        ℹ️ The <span class="code-tag">&lt;body&gt;</span> is currently empty. In Challenge 3, you will build the visible Café Header!
      </p>
    ` : `
      <div class="badge badge-warn">⏳ HTML Skeleton In Progress</div>
      <h3 style="margin-top: 0; color: #3d2314;">Rebuilding Skeleton</h3>
      <p style="color: #64748b; font-size: 0.88rem; line-height: 1.5;">
        Arrange the tags in the center editor so <span class="code-tag">&lt;!DOCTYPE html&gt;</span> is first, followed by <span class="code-tag">&lt;head&gt;</span>, then <span class="code-tag">&lt;body&gt;</span>.
      </p>
    `}
  </div>`;

      let assembled = blocks.map(b => b.content).join('\n');
      if (assembled.includes('<body>') && assembled.includes('</body>')) {
        assembled = assembled.replace('<body>', `<body>${statusCardHtml}`);
      } else {
        assembled = `${assembled}\n${statusCardHtml}`;
      }

      return {
        html: assembled,
        css: ''
      };
    }

    case 3: {
      // Challenge 3: Café Header
      const assembledHeader = blocks.map(b => b.content).join('\n');
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bristol Brew Café</title>
  <style>
    body { font-family: sans-serif; margin: 0; padding: 20px; background: #fdfbf7; }
    header { background: #3d2314; color: white; padding: 15px 30px; border-radius: 8px; }
    h1 { margin: 0 0 10px 0; font-size: 1.6rem; color: #ffffff; }
    nav a { color: #f5e9d8; margin-right: 15px; text-decoration: none; font-weight: bold; }
    nav a:hover { color: #c97a3e; }
  </style>
</head>
<body>
  ${assembledHeader}
  <main style="padding: 20px; color: #666;">
    <p><em>(Hero section will be built in Challenge 4)</em></p>
  </main>
</body>
</html>`;
      return { html, css: '' };
    }

    case 4: {
      // Challenge 4: Hero section
      const assembledHero = blocks.map(b => b.content).join('\n');
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bristol Brew Café</title>
  <style>
    body { font-family: sans-serif; margin: 0; background: #fdfbf7; color: #2b1810; }
    header { background: #3d2314; color: white; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; }
    nav a { color: #f5e9d8; margin-left: 15px; text-decoration: none; font-weight: bold; }
    .hero { background: white; padding: 30px; text-align: center; border-radius: 12px; margin: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
    .hero img { max-width: 100%; max-height: 280px; border-radius: 8px; object-fit: cover; margin: 15px 0; }
    .button { display: inline-block; background: #c97a3e; color: white; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <header>
    <h1>Bristol Brew Café</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#menu">Menu</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  ${assembledHero}
</body>
</html>`;
      return { html, css: '' };
    }

    case 5: {
      // Challenge 5: About and Menu sections
      const assembledBody = blocks.map(b => b.content).join('\n');
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bristol Brew Café</title>
  <style>
    body { font-family: sans-serif; margin: 0; background: #fdfbf7; color: #2b1810; }
    header { background: #3d2314; color: white; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; }
    nav a { color: #f5e9d8; margin-left: 15px; text-decoration: none; font-weight: bold; }
    main { max-width: 900px; margin: 0 auto; padding: 20px; }
    section { background: white; padding: 25px; border-radius: 8px; margin-bottom: 25px; }
    img { max-width: 100%; max-height: 250px; border-radius: 8px; object-fit: cover; }
    .menu-grid { display: flex; gap: 15px; flex-wrap: wrap; margin-top: 15px; }
    .menu-card { flex: 1; min-width: 180px; background: #faf6f0; padding: 15px; border-radius: 6px; border-left: 3px solid #c97a3e; }
    .price { font-weight: bold; color: #c97a3e; }
  </style>
</head>
<body>
  <header>
    <h1>Bristol Brew Café</h1>
    <nav><a href="#home">Home</a><a href="#about">About</a><a href="#menu">Menu</a></nav>
  </header>
  <main>
    ${assembledBody}
  </main>
</body>
</html>`;
      return { html, css: '' };
    }

    case 6: {
      // Challenge 6: Connect CSS file
      // If student selected the correct link block (<link rel="stylesheet" href="style.css">)
      const correctBlock = blocks.find(b => b.id === 'b6-correct');
      const isConnected = correctBlock && blocks[0]?.id === 'b6-correct';

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bristol Brew Café</title>
  ${blocks.map(b => b.content).join('\n')}
  ${isConnected ? `<style>${FINAL_VALID_CSS}</style>` : ''}
</head>
<body>
  <header>
    <h1>Bristol Brew Café</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#menu">Menu</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  <main>
    <section id="home" class="hero">
      <h2>Fresh Coffee in the Heart of Bristol</h2>
      <p>Enjoy freshly brewed coffee and homemade cakes.</p>
      <img src="images/coffee.jpg" alt="Freshly prepared coffee">
      <br>
      <a href="#menu" class="button">Explore Our Menu</a>
    </section>
    <section id="about">
      <h2>About Our Café</h2>
      <img src="images/cafe-interior.jpg" alt="Interior">
      <p>An independent coffee haven nestled in the heart of Bristol.</p>
    </section>
    <section id="menu">
      <h2>Our Menu</h2>
      <div class="menu-grid">
        <article class="menu-card">
          <h3>Flat White</h3>
          <p>Rich espresso with silky steamed milk.</p>
          <p class="price">£3.50</p>
        </article>
        <article class="menu-card">
          <h3>Cappuccino</h3>
          <p>Velvety froth with rich cocoa dusting.</p>
          <p class="price">£3.60</p>
        </article>
      </div>
    </section>
  </main>
</body>
</html>`;
      return { html, css: isConnected ? FINAL_VALID_CSS : '/* No stylesheet linked */' };
    }

    case 7: {
      // Challenge 7: CSS Rebuild (body and h1 rules)
      const assembledCss = blocks.map(b => b.content).join(' ');
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bristol Brew Café</title>
  <style>
    ${assembledCss}
    /* Base fallbacks */
    header { padding: 20px; }
  </style>
</head>
<body>
  <header>
    <h1>Bristol Brew Café</h1>
    <nav style="text-align: center;">
      <a href="#home" style="margin: 0 10px;">Home</a>
      <a href="#menu" style="margin: 0 10px;">Menu</a>
      <a href="#about" style="margin: 0 10px;">About</a>
    </nav>
  </header>
  <main style="max-width: 800px; margin: 20px auto; padding: 20px; text-align: center;">
    <h2>Testing Your Assembled CSS</h2>
    <p>Watch the body background colour and the h1 title colour change as you assemble valid CSS syntax!</p>
  </main>
</body>
</html>`;
      return { html, css: assembledCss };
    }

    case 8: {
      // Challenge 8: Header and hero CSS declarations categorized
      // Group declarations by category or current block order
      let headerRules = '';
      let navRules = '';
      let heroRules = '';
      let buttonRules = '';

      blocks.forEach(b => {
        if (b.category === 'header') headerRules += b.content + '\n';
        else if (b.category === 'nav a') navRules += b.content + '\n';
        else if (b.category === '.hero') heroRules += b.content + '\n';
        else if (b.category === '.button') buttonRules += b.content + '\n';
      });

      const customCss = `
body { font-family: sans-serif; margin: 0; background-color: #f7f3ed; }
header {
  ${headerRules}
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav a {
  ${navRules}
}
.hero {
  ${heroRules}
  max-width: 800px;
  margin: 30px auto;
}
.hero img { max-width: 100%; max-height: 250px; border-radius: 8px; margin: 15px 0; }
.button {
  display: inline-block;
  ${buttonRules}
}
`;

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bristol Brew Café</title>
  <style>${customCss}</style>
</head>
<body>
  <header>
    <h1 style="margin:0;">Bristol Brew Café</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#menu">Menu</a>
      <a href="#about">About</a>
    </nav>
  </header>
  <section class="hero">
    <h2>Fresh Coffee in the Heart of Bristol</h2>
    <p>Enjoy freshly brewed coffee and homemade cakes.</p>
    <img src="images/coffee.jpg" alt="Coffee">
    <br>
    <a href="#menu" class="button">Explore Our Menu</a>
  </section>
</body>
</html>`;
      return { html, css: customCss };
    }

    case 9: {
      // Challenge 9: Flexbox menu grid
      const gridDeclarations = blocks
        .filter(b => b.id.startsWith('b9-grid'))
        .map(b => b.content)
        .join('\n');

      const cardDeclarations = blocks
        .filter(b => b.id.startsWith('b9-card'))
        .map(b => b.content)
        .join('\n');

      const dynamicCss = `
body { font-family: sans-serif; background: #f7f3ed; margin: 0; padding: 20px; }
.menu-grid {
  ${gridDeclarations}
}
.menu-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #c97a3e;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  ${cardDeclarations}
}
.menu-card h3 { margin-top: 0; color: #3d2314; }
.menu-card .price { font-weight: bold; color: #c97a3e; font-size: 1.15rem; }
`;

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bristol Brew Café</title>
  <style>${dynamicCss}</style>
</head>
<body>
  <h2 style="color: #3d2314;">Our Seasonal Menu (Flexbox Test)</h2>
  <div class="menu-grid">
    <article class="menu-card">
      <h3>Flat White</h3>
      <p>Rich espresso with silky steamed milk.</p>
      <p class="price">£3.50</p>
    </article>
    <article class="menu-card">
      <h3>Cappuccino</h3>
      <p>Velvety froth with rich cocoa dusting.</p>
      <p class="price">£3.60</p>
    </article>
    <article class="menu-card">
      <h3>Homemade Cake</h3>
      <p>Freshly baked artisan seasonal sponge.</p>
      <p class="price">£4.00</p>
    </article>
  </div>
</body>
</html>`;
      return { html, css: dynamicCss };
    }

    case 10: {
      // Challenge 10: 10 Bugs
      const cssLinkTag = bugState.bug2_cssLink
        ? '<link rel="stylesheet" href="style.css">'
        : '<link rel="stylesheet" href="styles.css">'; // broken stylesheet link

      const coffeePath = bugState.bug5_coffeePath ? 'images/coffee.jpg' : 'coffee.jpg';
      const cakeAlt = bugState.bug6_cakeAlt ? 'alt="Homemade artisan cake"' : '';
      const contactHref = bugState.bug10_contactLink ? '#contact' : '#contactus';

      const navBlock = `<nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#menu">Menu</a>
      <a href="${contactHref}">Contact</a>
    </nav>`;

      let headerInsideHtml = '';
      let headerOutsideHtml = '';
      if (bugState.bug3_headerInsideBody) {
        if (bugState.bug4_navInsideHeader) {
          headerInsideHtml = `<header>
    <h1>Bristol Brew Café</h1>
    ${navBlock}
  </header>`;
        } else {
          headerInsideHtml = `<header>
    <h1>Bristol Brew Café</h1>
  </header>
  ${navBlock}`;
        }
      } else {
        // Bug 3: Header is outside body!
        headerOutsideHtml = `<header>
  <h1>Bristol Brew Café</h1>
  ${bugState.bug4_navInsideHeader ? navBlock : ''}
</header>`;
        if (!bugState.bug4_navInsideHeader) {
          headerInsideHtml = navBlock;
        }
      }

      const mainClose = bugState.bug1_mainClose ? '</main>' : '<!-- Missing </main> tag! -->';

      const heroSelector = bugState.bug7_heroSelector ? '.hero' : 'hero';
      const cssSemicolon = bugState.bug8_cssSemicolon ? ';' : '';
      const flexDisplay = bugState.bug9_flexDisplay ? 'display: flex;' : 'display: grid-flex;';

      const assembledCss = `body {
  background-color: #f7f3ed;
  font-family: 'Plus Jakarta Sans', Arial, sans-serif;
  color: #2b1810${cssSemicolon}
  margin: 0;
  padding: 0;
}

header {
  background-color: #3d2314;
  color: #ffffff;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav a {
  color: #f5e9d8;
  text-decoration: none;
  margin-left: 20px;
  font-weight: 600;
}

${heroSelector} {
  background-color: #ffffff;
  padding: 40px;
  text-align: center;
  border-radius: 12px;
  margin: 20px 40px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.hero img {
  max-width: 100%;
  max-height: 350px;
  border-radius: 8px;
  object-fit: cover;
  margin: 15px 0;
}

.button {
  display: inline-block;
  background-color: #c97a3e;
  color: #ffffff;
  padding: 12px 28px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 700;
}

#about, #menu, #contact {
  padding: 20px 40px;
}

#about img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 8px;
}

.menu-grid {
  ${flexDisplay}
  flex-wrap: wrap;
  gap: 20px;
}

.menu-card {
  flex: 1;
  min-width: 220px;
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border-left: 4px solid #c97a3e;
}

.menu-card .price {
  font-weight: 700;
  color: #c97a3e;
  font-size: 1.15rem;
}

footer {
  text-align: center;
  padding: 30px;
  background-color: #2b1810;
  color: #d8c8ba;
  margin-top: 40px;
}`;

      // If bug2 is fixed, apply CSS in style block or simulated link
      const styleTag = bugState.bug2_cssLink ? `<style>${assembledCss}</style>` : '';

      const assembledHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Bristol Brew Café</title>
  ${cssLinkTag}
  ${styleTag}
</head>
${headerOutsideHtml}
<body>
  ${headerInsideHtml}
  <main>
    <section id="home" class="hero">
      <h2>Fresh Coffee in the Heart of Bristol</h2>
      <p>Enjoy freshly brewed coffee and homemade cakes.</p>
      <img src="${coffeePath}" alt="Freshly prepared coffee">
      <br>
      <a href="#menu" class="button">Explore Our Menu</a>
    </section>
    <section id="about">
      <h2>About Our Café</h2>
      <img src="images/cafe-interior.jpg" alt="Bristol Brew Café interior">
      <p>An independent coffee haven nestled in the heart of Bristol.</p>
    </section>
    <section id="menu">
      <h2>Our Menu</h2>
      <div class="menu-grid">
        <article class="menu-card">
          <h3>Flat White</h3>
          <p>Rich espresso with silky steamed milk.</p>
          <p class="price">£3.50</p>
        </article>
        <article class="menu-card">
          <h3>Cappuccino</h3>
          <p>Velvety froth with rich cocoa dusting.</p>
          <p class="price">£3.60</p>
        </article>
        <article class="menu-card">
          <h3>Homemade Cake</h3>
          <p>Freshly baked artisan seasonal sponge.</p>
          <img src="images/cake.jpg" ${cakeAlt} style="width: 100%; max-height: 180px; object-fit: cover; border-radius: 6px; margin: 10px 0;">
          <p class="price">£4.00</p>
        </article>
      </div>
    </section>
    <section id="contact">
      <h2>Visit Us</h2>
      <p>14 Harbourside Walk, Bristol BS1 5TY</p>
      <p>Open Daily: 7:30am – 6:00pm</p>
    </section>
  ${mainClose}
  <footer>
    <p>&copy; 2026 Bristol Brew Café. All rights reserved.</p>
  </footer>
</body>
</html>`;

      return { html: assembledHtml, css: assembledCss };
    }

    default:
      return { html: FINAL_VALID_HTML, css: FINAL_VALID_CSS };
  }
}
