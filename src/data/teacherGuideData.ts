import type { TeacherGuideItem } from '../types/challenge';

export const TEACHER_GUIDE_DATA: TeacherGuideItem[] = [
  {
    challengeId: 1,
    title: 'Challenge 1: Where Do the Files Belong?',
    learningObjectives: [
      'Understand project directory structures in professional web development',
      'Identify role of index.html as the default server entry point',
      'Separate structural, presentation, and media assets into dedicated directories'
    ],
    newConcepts: ['Root directory', 'index.html entry point', 'style.css presentation file', 'images/ asset subfolder'],
    expectedSolutionSummary: 'Move index.html and style.css into the root folder (bristol-cafe/), and move coffee.jpg, cafe-interior.jpg, and cake.jpg into the images/ subfolder.',
    expectedCode: {
      html: `bristol-cafe/
├── index.html
├── style.css
└── images/
    ├── coffee.jpg
    ├── cafe-interior.jpg
    └── cake.jpg`
    },
    commonMisconceptions: [
      'Students often assume all files can sit in one single folder without organization.',
      'Students may not realize web servers look for "index.html" specifically when a domain is requested.'
    ],
    suggestedQuestions: [
      'Why does almost every website use "index.html" as its home page filename?',
      'What problems would arise on a 500-page corporate website if all 2,000 images were in the root directory?'
    ],
    extensionTasks: [
      'Research what happens when an Apache or Nginx web server encounters a directory without an index.html file (Directory Listing vulnerability).',
      'Propose a folder structure for a multi-page café website with separate pages for menu, catering, and booking.'
    ]
  },
  {
    challengeId: 2,
    title: 'Challenge 2: The HTML Document Is Broken!',
    learningObjectives: [
      'Construct a standard HTML5 document skeleton in correct order',
      'Distinguish between <head> (metadata container) and <body> (visible content)',
      'Understand nesting rules: children elements strictly enclosed inside parent elements'
    ],
    newConcepts: ['<!DOCTYPE html>', '<html lang="en">', '<head>', '<meta charset="UTF-8">', '<title>', '<body>'],
    expectedSolutionSummary: '<!DOCTYPE html> followed by <html>, with <head> containing meta and title, followed by <body>, then closing </body> and </html>.',
    expectedCode: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Bristol Brew Café</title>
  </head>
  <body>
  </body>
</html>`
    },
    commonMisconceptions: [
      'Students frequently put <body> inside <head> or close tags in the wrong order (e.g. <body> inside <html> after closing </html>).',
      'Students expect the text in <title> to appear as a large header on the page.'
    ],
    suggestedQuestions: [
      'Where does the text inside the <title> tag actually appear to the user?',
      'Why is <!DOCTYPE html> placed outside of the <html> element?'
    ],
    extensionTasks: [
      'Add a <meta name="viewport" content="width=device-width, initial-scale=1.0"> tag and explain its role in mobile responsiveness.'
    ]
  },
  {
    challengeId: 3,
    title: 'Challenge 3: Build the Café Header',
    learningObjectives: [
      'Implement semantic HTML5 layout elements (<header>, <nav>)',
      'Understand visual nesting and indentation in code readability',
      'Create internal navigation anchors with href attributes'
    ],
    newConcepts: ['<header> semantic banner', '<nav> navigation landmark', '<h1> document hierarchy', '<a href="#id"> anchor links'],
    expectedSolutionSummary: '<header> containing <h1>Bristol Brew Café</h1> and a <nav> containing four <a> links pointing to #home, #menu, #about, and #contact.',
    expectedCode: {
      html: `<header>
  <h1>Bristol Brew Café</h1>
  <nav>
    <a href="#home">Home</a>
    <a href="#menu">Menu</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
</header>`
    },
    commonMisconceptions: [
      'Leaving navigation links floating outside the <nav> element.',
      'Placing more than one <h1> element on the page, violating BTEC Level 3 accessibility and SEO best practice.'
    ],
    suggestedQuestions: [
      'How does a screen reader announce a <nav> element to a visually impaired user?',
      'What does the # symbol mean in an href attribute?'
    ],
    extensionTasks: [
      'Explain how anchor navigation jumps smoothly when CSS "scroll-behavior: smooth;" is enabled.'
    ]
  },
  {
    challengeId: 4,
    title: 'Challenge 4: Welcome to Bristol Brew Café (Hero Section)',
    learningObjectives: [
      'Build a prominent Hero section inside <main>',
      'Understand the role of attributes: id, class, src, and alt',
      'Recognise why anchor tags can be styled as call-to-action buttons'
    ],
    newConcepts: ['<main> content boundary', '<section class="hero">', '<h2> subheading', '<img> void element', 'alt text accessibility', 'Button class on link'],
    expectedSolutionSummary: '<main> containing <section id="home" class="hero"> with <h2>, <p>, <img>, and <a class="button">.',
    expectedCode: {
      html: `<main>
  <section id="home" class="hero">
    <h2>Fresh Coffee in the Heart of Bristol</h2>
    <p>Enjoy freshly brewed coffee and homemade cakes.</p>
    <img src="images/coffee.jpg" alt="Freshly prepared coffee">
    <a href="#menu" class="button">Explore Our Menu</a>
  </section>
</main>`
    },
    commonMisconceptions: [
      'Omitting the alt attribute or giving it a useless description like "picture".',
      'Trying to close <img> with </img> (void elements must not have closing tags).'
    ],
    suggestedQuestions: [
      'Why do we use an <a> tag with class="button" instead of an HTML <button> tag for navigation?',
      'Why must id values be unique, while classes can be reused?'
    ],
    extensionTasks: [
      'Investigate WCAG 2.1 AA accessibility guidelines for descriptive alternative text.'
    ]
  },
  {
    challengeId: 5,
    title: 'Challenge 5: Create the Café Content (About & Menu)',
    learningObjectives: [
      'Differentiate between <section> (thematic area) and <article> (self-contained item)',
      'Construct a repeatable card component pattern for café menu items',
      'Structure multiple hierarchical sections within the <main> element'
    ],
    newConcepts: ['<article> self-contained unit', 'Card pattern', '<h3> sub-headings', 'Price formatting'],
    expectedSolutionSummary: 'An About section with café interior image and paragraph, followed by a Menu section holding a container with three distinct menu-card articles.',
    expectedCode: {
      html: `<section id="about">
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
      <p>£3.50</p>
    </article>
    <article class="menu-card">
      <h3>Cappuccino</h3>
      <p>Velvety froth with rich cocoa dusting.</p>
      <p>£3.60</p>
    </article>
    <article class="menu-card">
      <h3>Homemade Cake</h3>
      <p>Freshly baked artisan seasonal sponge.</p>
      <p>£4.00</p>
    </article>
  </div>
</section>`
    },
    commonMisconceptions: [
      'Treating <article> and <section> as interchangeable without understanding semantic independence.',
      'Placing <h3> before <h2>, breaking heading hierarchy.'
    ],
    suggestedQuestions: [
      'If you shared a single menu card on social media, would it make sense by itself? Why does that justify using <article>?',
      'Why is a <div> used for .menu-grid instead of a semantic tag?'
    ],
    extensionTasks: [
      'Add dietary badges (e.g. "Vegan", "Gluten-Free") using <span> tags inside each article.'
    ]
  },
  {
    challengeId: 6,
    title: 'Challenge 6: Why Does the Website Look So Plain? (Connect CSS)',
    learningObjectives: [
      'Link an external stylesheet to an HTML document',
      'Understand the attributes rel="stylesheet" and href="style.css"',
      'Recognise exact filename matching in relative paths'
    ],
    newConcepts: ['<link> tag', 'rel="stylesheet" attribute', 'External CSS vs inline CSS', 'Filename precision'],
    expectedSolutionSummary: 'Place <link rel="stylesheet" href="style.css"> inside the <head> element. Reject <script src="..."> and <link href="styles.css">.',
    expectedCode: {
      html: `<head>
  <meta charset="UTF-8">
  <title>Bristol Brew Café</title>
  <link rel="stylesheet" href="style.css">
</head>`
    },
    commonMisconceptions: [
      'Using <script> for stylesheets or confusing style.css with styles.css (off-by-one letter error).',
      'Placing the <link> tag inside <body> instead of <head>.'
    ],
    suggestedQuestions: [
      'What happens if the href filename does not match the actual CSS file name on the server?',
      'Why is external CSS preferred over writing styles inside an HTML style attribute?'
    ],
    extensionTasks: [
      'Discuss how the browser caches style.css to speed up subsequent page visits.'
    ]
  },
  {
    challengeId: 7,
    title: 'Challenge 7: The CSS Has Been Scrambled!',
    learningObjectives: [
      'Analyse the anatomy of a CSS rule: selector, declaration block, property, value',
      'Correctly use punctuation: curly braces { }, colon :, and semicolon ;',
      'Style fundamental body background and primary heading colours'
    ],
    newConcepts: ['CSS rule anatomy', 'Selector', 'Declaration block', 'Property-value pairs', 'Hexadecimal colour codes (#f5e9d8, #633d2d)'],
    expectedSolutionSummary: 'Assemble: body { background-color: #f5e9d8; font-family: Arial, sans-serif; } and h1 { color: #633d2d; text-align: center; }',
    expectedCode: {
      css: `body {
  background-color: #f5e9d8;
  font-family: Arial, sans-serif;
}

h1 {
  color: #633d2d;
  text-align: center;
}`
    },
    commonMisconceptions: [
      'Placing the semicolon before the value or swapping property and value.',
      'Using an equals sign = instead of a colon : in CSS declarations.'
    ],
    suggestedQuestions: [
      'What is the purpose of the semicolon at the end of each declaration?',
      'Why do we provide a fallback font like "sans-serif" after "Arial"?'
    ],
    extensionTasks: [
      'Explain how Hex colour codes represent Red, Green, and Blue light values (00 to FF).'
    ]
  },
  {
    challengeId: 8,
    title: 'Challenge 8: Make the Café Look Professional (Style Header & Hero)',
    learningObjectives: [
      'Apply CSS element and class selectors appropriately',
      'Distinguish between internal spacing (padding) and external spacing (margin)',
      'Style interactive anchor elements as rounded call-to-action buttons'
    ],
    newConcepts: ['Class selector (.)', 'Descendant selector (nav a)', 'padding vs margin', 'border-radius', 'text-decoration: none'],
    expectedSolutionSummary: 'Assign correct declarations to header (dark brown bg, padding), nav a (cream colour, no underline), .hero (white bg, rounded corners, padding), and .button (warm accent, padding, border-radius).',
    expectedCode: {
      css: `header {
  background-color: #3d2314;
  color: #ffffff;
  padding: 20px;
}

nav a {
  color: #f5e9d8;
  text-decoration: none;
  padding: 8px 16px;
}

.hero {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
}

.button {
  background-color: #c97a3e;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
}`
    },
    commonMisconceptions: [
      'Applying button styling directly to the hero section container.',
      'Confusing element selectors (header) with class selectors (.hero).'
    ],
    suggestedQuestions: [
      'What visual problem occurs if an <a> tag does not have text-decoration: none?',
      'How does border-radius change the perceived feel of a modern website?'
    ],
    extensionTasks: [
      'Add a :hover pseudo-class to the .button selector to create an interactive hover transition.'
    ]
  },
  {
    challengeId: 9,
    title: 'Challenge 9: Everything Is Squashed Together! (CSS Box Model: Margin & Padding)',
    learningObjectives: [
      'Master the four layers of the CSS Box Model: Content, Padding, Border, and Margin',
      'Use padding to create internal cushion inside containers and cards',
      'Use margin-bottom and margin-top to create external separation between adjacent elements'
    ],
    newConcepts: ['CSS Box Model', 'padding (inner spacing)', 'margin-bottom & margin-top (outer spacing)', 'border & border-left'],
    expectedSolutionSummary: 'Assign padding: 30px; and margin-bottom: 25px; to .about-box; assign padding: 20px;, margin-bottom: 16px;, and border-left: 4px solid #c97a3e; to .menu-card; assign padding: 24px;, margin-top: 20px;, and border: 2px dashed #c97a3e; to .contact-box.',
    expectedCode: {
      css: `.about-box {
  padding: 30px;
  margin-bottom: 25px;
}

.menu-card {
  padding: 20px;
  margin-bottom: 16px;
  border-left: 4px solid #c97a3e;
}

.contact-box {
  padding: 24px;
  margin-top: 20px;
  border: 2px dashed #c97a3e;
}`
    },
    commonMisconceptions: [
      'Confusing padding (space inside the border that shows the element\'s background colour) with margin (transparent space outside the border).',
      'Using padding when trying to push two separate cards away from each other.'
    ],
    suggestedQuestions: [
      'If an element has a white background and a brown border, does increasing padding or margin add more white space inside the border?',
      'Why do we use border-left on .menu-card instead of a full 4-sided border?'
    ],
    extensionTasks: [
      'Open Chrome DevTools (F12) and inspect the visual Box Model diagram in the Computed styles panel.'
    ]
  },
  {
    challengeId: 10,
    title: 'Challenge 10: SAVE BRISTOL BREW CAFÉ! (Final 10-Bug Mission)',
    learningObjectives: [
      'Synthesise all HTML and CSS skills in a comprehensive source-code repair scenario',
      'Read HTML and CSS source code to spot syntax errors, path errors, and box-model bugs',
      'Observe live visual changes in the webpage preview as each line of code is fixed'
    ],
    newConcepts: ['Source code debugging', 'Before & after code inspection', 'Error triage', 'Cross-file coordination between index.html and style.css'],
    expectedSolutionSummary: 'Diagnose and fix all 10 bugs across index.html and style.css: 1. Add missing </main>, 2. Correct href to style.css, 3. Place <header> inside <body>, 4. Nest <nav> inside <header>, 5. Fix coffee image path to images/coffee.jpg, 6. Add alt="Homemade artisan cake", 7. Fix class selector to .hero, 8. Add missing semicolon after header padding, 9. Fix 0px padding and margin on .menu-card to 24px padding & 16px margin-bottom, 10. Correct link href to #contact.',
    expectedCode: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
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
          <p class="price">£4.00</p>
        </article>
      </div>
    </section>
    <section id="contact">
      <h2>Visit Us</h2>
      <p>12 Harbourside Walk, Bristol BS1 5TY</p>
      <p>Open Daily: 7:30am – 6:00pm</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Bristol Brew Café. All rights reserved.</p>
  </footer>
</body>
</html>`,
      css: `body {
  background-color: #f7f3ed;
  font-family: 'Plus Jakarta Sans', Arial, sans-serif;
  color: #2b1810;
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

.hero {
  background-color: #ffffff;
  padding: 40px;
  text-align: center;
  border-radius: 12px;
  margin: 20px 40px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.hero img {
  max-width: 100%;
  max-height: 380px;
  border-radius: 8px;
  object-fit: cover;
  margin: 20px 0;
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
  max-height: 350px;
  object-fit: cover;
  border-radius: 8px;
}

.menu-grid {
  display: flex;
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
}`
    },
    commonMisconceptions: [
      'Trying to fix bugs in isolation without checking the relationship between HTML tags and CSS selectors.',
      'Overlooking case sensitivity and path prefixes in asset references.'
    ],
    suggestedQuestions: [
      'Which of the 10 errors would completely prevent the page from displaying versus just affecting appearance?',
      'Why is semantic validation in BTEC Unit 15 graded higher than simply having a page that "looks okay"?'
    ],
    extensionTasks: [
      'Download the full project ZIP and run it on a local web server (e.g. Python http.server or VS Code Live Server).'
    ]
  }
];
