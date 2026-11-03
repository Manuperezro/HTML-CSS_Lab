import type { Challenge } from '../types/challenge';

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: 'Where Do the Files Belong?',
    subtitle: 'Organise the Bristol Brew Café project files and folders',
    difficulty: 'Very Easy',
    category: 'file-explorer',
    activeTab: 'files',
    learningObjectives: [
      'Understand how professional web projects organise HTML, CSS, and media assets',
      'Learn why index.html is the essential home page file',
      'Distinguish between root files and assets stored in subfolders'
    ],
    conceptsIntroduced: [
      'Project root directory',
      'index.html entry point',
      'style.css stylesheet',
      'images/ folder and asset organization'
    ],
    instructions: [
      'The café website files are completely jumbled up in the project explorer!',
      'Drag and organise the files into their proper places:',
      '• index.html and style.css belong directly in the project root (bristol-cafe/)',
      '• All three image files (coffee.jpg, cafe-interior.jpg, cake.jpg) belong inside the images/ subfolder',
      'Once organized, click "Check Answer" to test your project structure.'
    ],
    funFact: 'A real commercial website can easily contain hundreds or thousands of files. Professional developers always separate HTML, CSS, and media into distinct folders to avoid chaos!',
    hints: [
      'Look closely at the file extensions: .html, .css, and .jpg.',
      '.html contains structure, .css contains styling, and .jpg is an image asset.',
      'Root folder gets index.html and style.css; images/ folder gets coffee.jpg, cafe-interior.jpg, and cake.jpg.'
    ],
    previewMode: 'raw',
    initialBlocks: [
      { id: 'f-cake', content: 'cake.jpg', type: 'file', tagType: 'file', category: 'root', label: 'Image file (Cake)' },
      { id: 'f-index', content: 'index.html', type: 'file', tagType: 'file', category: 'images', label: 'HTML Webpage' },
      { id: 'f-coffee', content: 'coffee.jpg', type: 'file', tagType: 'file', category: 'root', label: 'Image file (Coffee)' },
      { id: 'f-style', content: 'style.css', type: 'file', tagType: 'file', category: 'images', label: 'CSS Stylesheet' },
      { id: 'f-interior', content: 'cafe-interior.jpg', type: 'file', tagType: 'file', category: 'root', label: 'Image file (Interior)' }
    ]
  },
  {
    id: 2,
    title: 'The HTML Document Is Broken!',
    subtitle: 'Reconstruct the foundational HTML5 document skeleton',
    difficulty: 'Easy',
    category: 'html-order',
    activeTab: 'index.html',
    learningObjectives: [
      'Build a valid HTML5 document skeleton from scratch',
      'Understand the role of <!DOCTYPE html>, <html>, <head>, and <body>',
      'Learn the strict relationship between opening tags and closing tags'
    ],
    conceptsIntroduced: [
      '<!DOCTYPE html> doctype declaration',
      '<html> root element with lang="en"',
      '<head> metadata container and <title>',
      '<body> visible canvas container'
    ],
    instructions: [
      'The HTML document skeleton for Bristol Brew Café has been completely scrambled!',
      'Drag and arrange the blocks into the standard HTML5 structure from top to bottom:',
      '1. Start with the <!DOCTYPE html> declaration',
      '2. Open the <html> element',
      '3. Nest the <head> section containing <meta> and <title>, then close </head>',
      '4. Open <body>, then close </body>',
      '5. Finish by closing </html> at the very bottom.'
    ],
    funFact: 'The text inside the <title> tag does not appear on the webpage canvas! Instead, it appears on the browser tab and in Google search engine snippets.',
    hints: [
      'Which element must surround the entire document, and what declaration comes before it?',
      'The <head> must come before the <body>, and both live inside <html>.',
      'Correct order: <!DOCTYPE html> → <html lang="en"> → <head> → <meta charset="UTF-8"> → <title>... → </head> → <body> → </body> → </html>.'
    ],
    previewMode: 'partial',
    initialBlocks: [
      { id: 'b2-body-close', content: '</body>', type: 'tag-close', tagType: 'html', explanationKey: 'body' },
      { id: 'b2-head-open', content: '<head>', type: 'tag-open', tagType: 'html', explanationKey: 'head' },
      { id: 'b2-html-close', content: '</html>', type: 'tag-close', tagType: 'html', explanationKey: 'html' },
      { id: 'b2-doctype', content: '<!DOCTYPE html>', type: 'tag-self', tagType: 'html', explanationKey: 'doctype' },
      { id: 'b2-title', content: '<title>Bristol Brew Café</title>', type: 'tag-self', tagType: 'html', explanationKey: 'title' },
      { id: 'b2-html-open', content: '<html lang="en">', type: 'tag-open', tagType: 'html', explanationKey: 'html' },
      { id: 'b2-body-open', content: '<body>', type: 'tag-open', tagType: 'html', explanationKey: 'body' },
      { id: 'b2-meta', content: '<meta charset="UTF-8">', type: 'tag-self', tagType: 'html', explanationKey: 'head' },
      { id: 'b2-head-close', content: '</head>', type: 'tag-close', tagType: 'html', explanationKey: 'head' }
    ]
  },
  {
    id: 3,
    title: 'Build the Café Header',
    subtitle: 'Assemble the header banner and semantic navigation bar',
    difficulty: 'Easy to Medium',
    category: 'html-nesting',
    activeTab: 'index.html',
    learningObjectives: [
      'Implement semantic HTML5 header and navigation landmarks',
      'Nest navigation links inside the <nav> element',
      'Understand anchor (<a>) links and the href attribute'
    ],
    conceptsIntroduced: [
      '<header> semantic top banner',
      '<h1> primary site heading',
      '<nav> navigation container',
      '<a href="#id"> internal jump links'
    ],
    instructions: [
      'Now that the skeleton is built, let\'s construct the café header!',
      'Assemble the blocks so that:',
      '• The <header> contains the café title <h1>Bristol Brew Café</h1>',
      '• The <nav> element sits inside the header and groups the four navigation links (Home, Menu, About, Contact)',
      '• Notice how code indentation visually shows which elements are inside other elements!'
    ],
    funFact: 'Semantic HTML tags like <header> and <nav> help screen readers announce "Navigation landmark" so visually impaired visitors can jump straight to café sections using keyboard shortcuts!',
    hints: [
      'The <header> element should wrap both the café title and the navigation.',
      'Place all four <a> links between the <nav> and </nav> tags.',
      'Structure: <header> → <h1>...</h1> → <nav> → four <a> links → </nav> → </header>.'
    ],
    previewMode: 'partial',
    initialBlocks: [
      { id: 'b3-a-contact', content: '<a href="#contact">Contact</a>', type: 'tag-self', tagType: 'html', explanationKey: 'anchor' },
      { id: 'b3-header-open', content: '<header>', type: 'tag-open', tagType: 'html', explanationKey: 'header' },
      { id: 'b3-a-home', content: '<a href="#home">Home</a>', type: 'tag-self', tagType: 'html', explanationKey: 'anchor' },
      { id: 'b3-nav-close', content: '</nav>', type: 'tag-close', tagType: 'html', explanationKey: 'nav' },
      { id: 'b3-h1', content: '<h1>Bristol Brew Café</h1>', type: 'tag-self', tagType: 'html', explanationKey: 'header' },
      { id: 'b3-a-about', content: '<a href="#about">About</a>', type: 'tag-self', tagType: 'html', explanationKey: 'anchor' },
      { id: 'b3-header-close', content: '</header>', type: 'tag-close', tagType: 'html', explanationKey: 'header' },
      { id: 'b3-nav-open', content: '<nav>', type: 'tag-open', tagType: 'html', explanationKey: 'nav' },
      { id: 'b3-a-menu', content: '<a href="#menu">Menu</a>', type: 'tag-self', tagType: 'html', explanationKey: 'anchor' }
    ]
  },
  {
    id: 4,
    title: 'Welcome to Bristol Brew Café',
    subtitle: 'Construct the café Hero banner with imagery and action button',
    difficulty: 'Medium',
    category: 'html-order',
    activeTab: 'index.html',
    learningObjectives: [
      'Define the <main> landmark for primary page content',
      'Build a prominent Hero section with id="home" and class="hero"',
      'Embed images with accessible alt text and understand anchor buttons'
    ],
    conceptsIntroduced: [
      '<main> primary content container',
      '<section id="home" class="hero">',
      '<h2> subheading',
      '<img> void element with src and alt attributes',
      '<a class="button"> styled button link'
    ],
    instructions: [
      'Let\'s build the main Hero section that welcomes visitors to the café!',
      'Arrange the blocks in logical reading order inside the <main> element:',
      '1. Open <main>',
      '2. Open <section id="home" class="hero">',
      '3. Heading: <h2>Fresh Coffee in the Heart of Bristol</h2>',
      '4. Description: <p>Enjoy freshly brewed coffee and homemade cakes.</p>',
      '5. Hero photo: <img src="images/coffee.jpg" alt="Freshly prepared coffee">',
      '6. Call to Action: <a href="#menu" class="button">Explore Our Menu</a>',
      '7. Close </section> and </main>'
    ],
    funFact: 'The alt attribute is not just for screen readers; if a customer has a slow phone connection and images fail to load, the browser displays the alt text instead so they still know what was there!',
    hints: [
      'The <main> element wraps the entire section.',
      'Place the <h2> first, then the <p>, then the <img>, followed by the call-to-action button.',
      'Remember to close </section> before closing </main>.'
    ],
    previewMode: 'partial',
    initialBlocks: [
      { id: 'b4-cta', content: '<a href="#menu" class="button">Explore Our Menu</a>', type: 'tag-self', tagType: 'html', explanationKey: 'anchor' },
      { id: 'b4-main-open', content: '<main>', type: 'tag-open', tagType: 'html', explanationKey: 'main' },
      { id: 'b4-sec-close', content: '</section>', type: 'tag-close', tagType: 'html', explanationKey: 'section' },
      { id: 'b4-h2', content: '<h2>Fresh Coffee in the Heart of Bristol</h2>', type: 'tag-self', tagType: 'html', explanationKey: 'section' },
      { id: 'b4-img', content: '<img src="images/coffee.jpg" alt="Freshly prepared coffee">', type: 'tag-self', tagType: 'html', explanationKey: 'img' },
      { id: 'b4-sec-open', content: '<section id="home" class="hero">', type: 'tag-open', tagType: 'html', explanationKey: 'section' },
      { id: 'b4-p', content: '<p>Enjoy freshly brewed coffee and homemade cakes.</p>', type: 'tag-self', tagType: 'html', explanationKey: 'section' },
      { id: 'b4-main-close', content: '</main>', type: 'tag-close', tagType: 'html', explanationKey: 'main' }
    ]
  },
  {
    id: 5,
    title: 'Create the Café Content',
    subtitle: 'Build About and Menu sections using semantic <article> cards',
    difficulty: 'Medium',
    category: 'html-nesting',
    activeTab: 'index.html',
    learningObjectives: [
      'Understand the difference between <section> and <article>',
      'Construct a repeatable card component pattern for café menu items',
      'Nest headings, descriptions, and prices neatly inside articles'
    ],
    conceptsIntroduced: [
      '<section id="about"> and <section id="menu">',
      '<article class="menu-card"> for self-contained items',
      '<h3> card headings',
      '<div class="menu-grid"> container'
    ],
    instructions: [
      'Now let\'s give customers the delicious details: About our café and the Menu!',
      'Assemble the content blocks in proper hierarchical order:',
      '1. Place the About section first with interior photo and story',
      '2. Follow with the Menu section (<section id="menu">)',
      '3. Place the three individual <article class="menu-card"> items (Flat White, Cappuccino, Homemade Cake) inside the menu grid',
      'Notice how each menu card is an <article> because it could stand completely on its own!'
    ],
    funFact: 'In HTML5, an <article> is defined as a self-contained composition that could be syndicated or shared independently, such as a product card, news post, or forum reply.',
    hints: [
      'Think of <section id="menu"> as the broad area, and each <article> as an individual item card on the counter.',
      'The About section should come before the Menu section.',
      'Each menu article contains an <h3> name, a <p> description, and a price.'
    ],
    previewMode: 'partial',
    initialBlocks: [
      { id: 'b5-card-cake', content: '<article class="menu-card">\n  <h3>Homemade Cake</h3>\n  <p>Freshly baked artisan seasonal sponge.</p>\n  <p class="price">£4.00</p>\n</article>', type: 'tag-self', tagType: 'html', explanationKey: 'article' },
      { id: 'b5-about-sec', content: '<section id="about">\n  <h2>About Our Café</h2>\n  <img src="images/cafe-interior.jpg" alt="Bristol Brew Café interior">\n  <p>An independent coffee haven nestled in the heart of Bristol.</p>\n</section>', type: 'tag-self', tagType: 'html', explanationKey: 'section' },
      { id: 'b5-card-cappuccino', content: '<article class="menu-card">\n  <h3>Cappuccino</h3>\n  <p>Velvety froth with rich cocoa dusting.</p>\n  <p class="price">£3.60</p>\n</article>', type: 'tag-self', tagType: 'html', explanationKey: 'article' },
      { id: 'b5-menu-open', content: '<section id="menu">\n  <h2>Our Menu</h2>\n  <div class="menu-grid">', type: 'tag-open', tagType: 'html', explanationKey: 'section' },
      { id: 'b5-card-flatwhite', content: '<article class="menu-card">\n  <h3>Flat White</h3>\n  <p>Rich espresso with silky steamed milk.</p>\n  <p class="price">£3.50</p>\n</article>', type: 'tag-self', tagType: 'html', explanationKey: 'article' },
      { id: 'b5-menu-close', content: '  </div>\n</section>', type: 'tag-close', tagType: 'html', explanationKey: 'section' }
    ]
  },
  {
    id: 6,
    title: 'Why Does the Website Look So Plain?',
    subtitle: 'Connect the external CSS stylesheet inside the <head> element',
    difficulty: 'Medium',
    category: 'css-connect',
    activeTab: 'index.html',
    learningObjectives: [
      'Connect an external stylesheet using the <link> tag',
      'Understand the rel="stylesheet" and href attributes',
      'Learn the critical importance of exact filename matching'
    ],
    conceptsIntroduced: [
      '<link> element',
      'rel="stylesheet" relationship',
      'href="style.css" external file path',
      'CSS linking inside <head>'
    ],
    instructions: [
      'Look at the live preview: the HTML structure is there, but everything looks completely plain, black, and unstyled!',
      'The café has a style.css file ready in the project, but index.html has a broken link.',
      'From the three candidate code blocks in the tray, pick the ONLY correct tag to link style.css and place it inside <head>:',
      '• Option A: <link rel="stylesheet" href="style.css">',
      '• Option B: <script src="style.css"></script>',
      '• Option C: <link rel="stylesheet" href="styles.css">',
      'Watch what happens to the preview the moment the correct link is in place!'
    ],
    funFact: 'CSS stands for Cascading Style Sheets. By keeping styling in a separate style.css file, you can style hundreds of pages on a website from a single file!',
    hints: [
      'Check the File Explorer on the left: what is the EXACT name of the CSS file? (Is it style.css or styles.css?)',
      '<script> is used for JavaScript programs, while <link rel="stylesheet"> is used for CSS stylesheets.',
      'The correct tag is <link rel="stylesheet" href="style.css">, placed directly inside <head>.'
    ],
    previewMode: 'styled',
    initialBlocks: [
      { id: 'b6-script-wrong', content: '<script src="style.css"></script>', type: 'tag-self', tagType: 'html', label: 'Option B (<script>)', explanationKey: 'linkCss' },
      { id: 'b6-correct', content: '<link rel="stylesheet" href="style.css">', type: 'tag-self', tagType: 'html', label: 'Option A (rel="stylesheet" href="style.css")', explanationKey: 'linkCss' },
      { id: 'b6-typo-wrong', content: '<link rel="stylesheet" href="styles.css">', type: 'tag-self', tagType: 'html', label: 'Option C (styles.css typo)', explanationKey: 'linkCss' }
    ]
  },
  {
    id: 7,
    title: 'The CSS Has Been Scrambled!',
    subtitle: 'Reassemble scrambled CSS rules with correct syntax and punctuation',
    difficulty: 'Medium to Hard',
    category: 'css-assembly',
    activeTab: 'style.css',
    learningObjectives: [
      'Master the anatomical structure of a CSS rule',
      'Understand Selectors, Declarations, Properties, and Values',
      'Correctly place curly braces { }, colons :, and semicolons ;'
    ],
    conceptsIntroduced: [
      'CSS Selector (body, h1)',
      'Declaration block enclosed in { }',
      'Property: value; syntax',
      'Hex color values and font families'
    ],
    instructions: [
      'Switch over to style.css! The stylesheet rules for the page body and café title have been scrambled.',
      'Assemble two valid CSS rules:',
      'Rule 1 (Body):',
      'body { background-color: #f5e9d8; font-family: Arial, sans-serif; }',
      'Rule 2 (Heading 1):',
      'h1 { color: #633d2d; text-align: center; }',
      'Remember the syntax: selector { property: value; }'
    ],
    funFact: 'In CSS, every declaration MUST end with a semicolon (;). Forgetting a single semicolon is one of the most common mistakes made by professional developers too!',
    hints: [
      'Start each rule with its selector (body or h1), then open the curly brace {.',
      'Inside the curly braces, place property: value; declarations.',
      'End each rule by closing the curly brace }.'
    ],
    previewMode: 'styled',
    initialBlocks: [
      { id: 'b7-semi1', content: '#f5e9d8;', type: 'value', tagType: 'css', explanationKey: 'cssProperty' },
      { id: 'b7-h1-sel', content: 'h1', type: 'selector', tagType: 'css', explanationKey: 'cssSelector' },
      { id: 'b7-close2', content: '}', type: 'bracket', tagType: 'css' },
      { id: 'b7-prop-font', content: 'font-family: Arial, sans-serif;', type: 'declaration', tagType: 'css', explanationKey: 'cssProperty' },
      { id: 'b7-open1', content: '{', type: 'bracket', tagType: 'css' },
      { id: 'b7-prop-bg', content: 'background-color:', type: 'property', tagType: 'css', explanationKey: 'cssProperty' },
      { id: 'b7-body-sel', content: 'body', type: 'selector', tagType: 'css', explanationKey: 'cssSelector' },
      { id: 'b7-open2', content: '{', type: 'bracket', tagType: 'css' },
      { id: 'b7-h1-color', content: 'color: #633d2d;', type: 'declaration', tagType: 'css', explanationKey: 'cssProperty' },
      { id: 'b7-close1', content: '}', type: 'bracket', tagType: 'css' },
      { id: 'b7-h1-align', content: 'text-align: center;', type: 'declaration', tagType: 'css', explanationKey: 'cssProperty' }
    ]
  },
  {
    id: 8,
    title: 'Make the Café Look Professional',
    subtitle: 'Organise CSS declarations into the correct selector blocks',
    difficulty: 'Hard',
    category: 'css-categorize',
    activeTab: 'style.css',
    learningObjectives: [
      'Apply CSS declarations to matching element and class selectors',
      'Understand padding, border-radius, background colours, and text decorations',
      'Distinguish between header, navigation links (nav a), .hero, and .button'
    ],
    conceptsIntroduced: [
      'Element vs Class selectors (header vs .hero)',
      'Descendant selector nav a',
      'Internal padding vs external spacing',
      'border-radius for rounded modern corners',
      'text-decoration: none for button links'
    ],
    instructions: [
      'Several CSS declarations are jumbled across four selectors:',
      '• header: Needs dark brown background (#3d2314), white text (#ffffff), and 20px padding.',
      '• nav a: Needs cream text (#f5e9d8), text-decoration: none, and 8px 16px padding.',
      '• .hero: Needs white background (#ffffff), 12px border-radius, and 40px padding.',
      '• .button: Needs warm amber background (#c97a3e), white text, and 6px border-radius.',
      'Drag each declaration block under its rightful selector and watch the café transform!'
    ],
    funFact: 'A dot prefix like .hero means you are targeting a class. Classes can be applied to as many elements as you want, making your CSS reusable and professional!',
    hints: [
      'A dot (.) indicates a class selector, e.g. .hero or .button.',
      'Button styling (border-radius: 6px and warm amber background) belongs on .button, not on the entire header.',
      'nav a controls the links: text-decoration: none removes the default blue underline.'
    ],
    previewMode: 'styled',
    initialBlocks: [
      { id: 'b8-1', content: 'background-color: #3d2314;', category: 'header', type: 'declaration', tagType: 'css' },
      { id: 'b8-2', content: 'color: #ffffff;', category: 'header', type: 'declaration', tagType: 'css' },
      { id: 'b8-3', content: 'padding: 20px;', category: 'header', type: 'declaration', tagType: 'css' },
      { id: 'b8-4', content: 'color: #f5e9d8;', category: 'nav a', type: 'declaration', tagType: 'css' },
      { id: 'b8-5', content: 'text-decoration: none;', category: 'nav a', type: 'declaration', tagType: 'css' },
      { id: 'b8-6', content: 'padding: 8px 16px;', category: 'nav a', type: 'declaration', tagType: 'css' },
      { id: 'b8-7', content: 'background-color: #ffffff;', category: '.hero', type: 'declaration', tagType: 'css' },
      { id: 'b8-8', content: 'border-radius: 12px;', category: '.hero', type: 'declaration', tagType: 'css' },
      { id: 'b8-9', content: 'padding: 40px;', category: '.hero', type: 'declaration', tagType: 'css' },
      { id: 'b8-10', content: 'background-color: #c97a3e;', category: '.button', type: 'declaration', tagType: 'css' },
      { id: 'b8-11', content: 'color: #ffffff;', category: '.button', type: 'declaration', tagType: 'css' },
      { id: 'b8-12', content: 'border-radius: 6px;', category: '.button', type: 'declaration', tagType: 'css' }
    ]
  },
  {
    id: 9,
    title: 'Everything Is Squashed Together!',
    subtitle: 'Master the CSS Box Model using margin, padding, and borders',
    difficulty: 'Hard',
    category: 'box-model',
    activeTab: 'style.css',
    learningObjectives: [
      'Understand the CSS Box Model: Content, Padding, Border, and Margin',
      'Use padding to create internal cushion between text and box borders',
      'Use margin-bottom and margin-top to create external space between separate boxes'
    ],
    conceptsIntroduced: [
      'padding (inner spacing inside the border)',
      'margin-bottom & margin-top (outer spacing between boxes)',
      'border & border-left (the visible box edge)',
      'The CSS Box Model hierarchy'
    ],
    instructions: [
      'Look at the live preview: the About box, Menu cards, and Contact box have 0px margin and 0px padding, so all the text is crammed against the edges and the boxes are glued together!',
      'Assign each CSS Box Model declaration from the tray into its matching selector in style.css:',
      '• .about-box: Needs padding: 30px; (inner cushion) and margin-bottom: 25px; (outer space below).',
      '• .menu-card: Needs padding: 20px; (inner cushion), margin-bottom: 16px; (space between cards), and border-left: 4px solid #c97a3e; (amber accent bar).',
      '• .contact-box: Needs padding: 24px; (inner cushion), margin-top: 20px; (outer space above), and border: 2px dashed #c97a3e; (dashed frame).',
      'Watch the live preview expand with clean breathing room as you add each property!'
    ],
    funFact: 'In CSS, every single HTML element is treated as a rectangular box with four layers from inside out: Content → Padding (inner cushion) → Border (the frame) → Margin (outer personal space)!',
    hints: [
      'Remember: padding creates space INSIDE the box border, while margin creates space OUTSIDE the box border.',
      'Check the numbers in the instructions: .about-box gets 30px padding & 25px margin-bottom; .menu-card gets 20px padding, 16px margin-bottom, and border-left.',
      '.contact-box gets padding: 24px;, margin-top: 20px;, and border: 2px dashed #c97a3e;.'
    ],
    previewMode: 'responsive',
    initialBlocks: [
      { id: 'b9-about-pad', content: 'padding: 30px;', category: 'tray', type: 'declaration', tagType: 'css', explanationKey: 'padding', label: 'Inner Cushion (30px)' },
      { id: 'b9-card-mar', content: 'margin-bottom: 16px;', category: 'tray', type: 'declaration', tagType: 'css', explanationKey: 'margin', label: 'Gap Between Cards (16px)' },
      { id: 'b9-contact-bor', content: 'border: 2px dashed #c97a3e;', category: 'tray', type: 'declaration', tagType: 'css', explanationKey: 'border', label: 'Dashed Box Frame' },
      { id: 'b9-card-pad', content: 'padding: 20px;', category: 'tray', type: 'declaration', tagType: 'css', explanationKey: 'padding', label: 'Card Inner Cushion (20px)' },
      { id: 'b9-about-mar', content: 'margin-bottom: 25px;', category: 'tray', type: 'declaration', tagType: 'css', explanationKey: 'margin', label: 'Outer Space Below (25px)' },
      { id: 'b9-contact-pad', content: 'padding: 24px;', category: 'tray', type: 'declaration', tagType: 'css', explanationKey: 'padding', label: 'Contact Inner Cushion (24px)' },
      { id: 'b9-card-bor', content: 'border-left: 4px solid #c97a3e;', category: 'tray', type: 'declaration', tagType: 'css', explanationKey: 'border', label: 'Amber Left Accent Bar' },
      { id: 'b9-contact-mar', content: 'margin-top: 20px;', category: 'tray', type: 'declaration', tagType: 'css', explanationKey: 'margin', label: 'Outer Space Above (20px)' }
    ]
  },
  {
    id: 10,
    title: 'SAVE BRISTOL BREW CAFÉ!',
    subtitle: 'Final Mission: Inspect the code and repair 10 real-world bugs in index.html & style.css',
    difficulty: 'Advanced Beginner',
    category: 'multi-bug',
    activeTab: 'index.html',
    learningObjectives: [
      'Synthesise all HTML and CSS skills learned throughout the course',
      'Read real HTML and CSS source code to spot syntax, path, and box-model bugs',
      'Observe live visual changes in the webpage preview as each line of code is repaired'
    ],
    conceptsIntroduced: [
      'Full-stack source code debugging',
      'Before & after code comparison',
      'Validation of HTML5 and CSS standards',
      'Production readiness and website export'
    ],
    instructions: [
      'CRITICAL MISSION: The Bristol Brew Café website was saved with 10 bugs across index.html and style.css!',
      'Inspect the highlighted error lines directly inside the index.html and style.css tabs and click "Fix in Code" on each buggy line:',
      '• In index.html (7 Bugs):',
      '  1. Missing closing </main> tag before <footer>',
      '  2. Broken CSS stylesheet link filename (styles.css → style.css)',
      '  3. <header> accidentally placed outside before <body>',
      '  4. <nav> placed outside the <header>',
      '  5. Broken hero coffee image path (coffee.jpg → images/coffee.jpg)',
      '  6. Missing accessible alt attribute on homemade cake image',
      '  10. Broken Contact navigation link (href="#contactus" → href="#contact")',
      '• In style.css (3 Bugs):',
      '  7. Missing dot on CSS class selector (hero → .hero)',
      '  8. Missing semicolon ; after header padding (breaking the dark header background)',
      '  9. Squashed 0px margin and padding on .menu-card (0px → 24px padding & 16px margin-bottom)',
      'Watch both the source code and the live website preview heal each time you fix a line!'
    ],
    funFact: 'In 2026, the average professional developer spends approximately 40% of their working hours reading existing code and fixing bugs rather than writing new code from scratch!',
    hints: [
      'Switch between the index.html tab (7 bugs) and the style.css tab (3 bugs) at the top of the Code Editor.',
      'Look for the red highlighted lines in the code—each shows the broken code and lets you fix it in place.',
      'Watch the Live Preview on the right after every single fix to see how that specific line of code affects the website!'
    ],
    previewMode: 'final',
    initialBlocks: []
  }
];
