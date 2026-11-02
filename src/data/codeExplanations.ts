import type { CodeExplanation } from '../types/challenge';

export const CODE_EXPLANATIONS: Record<string, CodeExplanation> = {
  doctype: {
    title: '<!DOCTYPE html>',
    elementOrProperty: '<!DOCTYPE html>',
    type: 'HTML Element',
    whatItDoes: 'Declares the document type and tells the browser to render the page in standard modern HTML5 mode.',
    whyUsed: 'Without it, older browsers might switch into "quirks mode", causing erratic styling and unexpected bugs.',
    syntaxExample: '<!DOCTYPE html>\n<html lang="en">',
    commonMistake: 'Writing a closing tag for DOCTYPE or putting other tags before it. It must always be the very first line.'
  },
  html: {
    title: '<html lang="en">',
    elementOrProperty: '<html lang="en">',
    type: 'HTML Element',
    whatItDoes: 'The root element that wraps every single piece of HTML code in the document.',
    whyUsed: 'Provides a structured container and declares the primary language of the page (lang="en" for English) for screen readers and search engines.',
    syntaxExample: '<html lang="en">\n  <head>...</head>\n  <body>...</body>\n</html>',
    commonMistake: 'Placing DOCTYPE inside the html tag, or having multiple html tags on one page.'
  },
  head: {
    title: '<head>',
    elementOrProperty: '<head>',
    type: 'HTML Element',
    whatItDoes: 'Contains machine-readable metadata, character encoding, title, viewport settings, and links to external CSS.',
    whyUsed: 'Informs the browser how to handle the page before rendering the visible content.',
    syntaxExample: '<head>\n  <meta charset="UTF-8">\n  <title>Bristol Brew Café</title>\n</head>',
    commonMistake: 'Putting visible headings (like <h1>) or text inside <head>. Visible content must go inside <body>.'
  },
  title: {
    title: '<title>',
    elementOrProperty: '<title>',
    type: 'HTML Element',
    whatItDoes: 'Defines the document\'s title shown on the browser tab and in search engine results.',
    whyUsed: 'Essential for user orientation when having multiple tabs open, and crucial for SEO (Search Engine Optimisation).',
    syntaxExample: '<title>Bristol Brew Café - Fresh Coffee</title>',
    commonMistake: 'Expecting the <title> text to appear on the webpage canvas like an <h1> header.'
  },
  body: {
    title: '<body>',
    elementOrProperty: '<body>',
    type: 'HTML Element',
    whatItDoes: 'Represents the entire visible content of an HTML document.',
    whyUsed: 'All text, images, buttons, navigation menus, and footers must be placed inside <body> to be seen by users.',
    syntaxExample: '<body>\n  <header>...</header>\n  <main>...</main>\n</body>',
    commonMistake: 'Closing the </body> tag before all content has ended or placing <link rel="stylesheet"> directly in the body.'
  },
  header: {
    title: '<header>',
    elementOrProperty: '<header>',
    type: 'HTML Element',
    whatItDoes: 'Represents introductory content, typically a logo or café title and navigation bar.',
    whyUsed: 'Gives semantic meaning to the top of the webpage, aiding screen readers and search indexing.',
    syntaxExample: '<header>\n  <h1>Bristol Brew Café</h1>\n  <nav>...</nav>\n</header>',
    commonMistake: 'Confusing <header> with <head> (metadata container) or <h1> (top-level heading).'
  },
  nav: {
    title: '<nav>',
    elementOrProperty: '<nav>',
    type: 'HTML Element',
    whatItDoes: 'Represents a section of a page that links to other pages or to parts within the page.',
    whyUsed: 'Tells assistive technologies (like screen readers) where the primary navigation links are located.',
    syntaxExample: '<nav>\n  <a href="#menu">Menu</a>\n  <a href="#about">About</a>\n</nav>',
    commonMistake: 'Putting plain paragraphs inside <nav> without anchor (<a>) links.'
  },
  anchor: {
    title: '<a href="...">',
    elementOrProperty: '<a> Anchor Link',
    type: 'HTML Element',
    whatItDoes: 'Creates a clickable hyperlink that directs the user to another page or an on-page section.',
    whyUsed: 'Enables hyperlinking, the core founding concept of the World Wide Web.',
    syntaxExample: '<a href="#menu" class="button">Explore Our Menu</a>',
    commonMistake: 'Forgetting the href attribute, which leaves the link completely unclickable.'
  },
  main: {
    title: '<main>',
    elementOrProperty: '<main>',
    type: 'HTML Element',
    whatItDoes: 'Specifies the main content of the document, which must be unique to this page.',
    whyUsed: 'Allows accessibility tools to offer a "Skip to main content" shortcut for keyboard users.',
    syntaxExample: '<main>\n  <section id="hero">...</section>\n</main>',
    commonMistake: 'Nesting <main> inside an <article>, <aside>, <header>, or <footer>.'
  },
  section: {
    title: '<section>',
    elementOrProperty: '<section>',
    type: 'HTML Element',
    whatItDoes: 'Defines a thematic grouping of content, typically with its own heading.',
    whyUsed: 'Organises long web pages into logical, manageable chapters (e.g. Hero, About, Menu, Contact).',
    syntaxExample: '<section id="menu">\n  <h2>Our Menu</h2>\n  ...\n</section>',
    commonMistake: 'Using <section> solely as a styling wrapper instead of a generic <div>.'
  },
  article: {
    title: '<article>',
    elementOrProperty: '<article>',
    type: 'HTML Element',
    whatItDoes: 'Represents a self-contained composition that is independently deliverable or reusable.',
    whyUsed: 'Ideal for product cards (like a Flat White menu card) that make complete sense on their own.',
    syntaxExample: '<article class="menu-card">\n  <h3>Flat White</h3>\n  <p>£3.50</p>\n</article>',
    commonMistake: 'Nesting an entire page inside a single <article> tag.'
  },
  img: {
    title: '<img src="..." alt="...">',
    elementOrProperty: '<img> Image',
    type: 'HTML Element',
    whatItDoes: 'Embeds an image into the webpage document.',
    whyUsed: 'Shows visual photos, logos, and illustrations to create an engaging café atmosphere.',
    syntaxExample: '<img src="images/coffee.jpg" alt="Artisan flat white coffee">',
    commonMistake: 'Forgetting the alt attribute or creating a closing </img> tag (img is void / self-closing).'
  },
  linkCss: {
    title: '<link rel="stylesheet" href="style.css">',
    elementOrProperty: '<link> Stylesheet',
    type: 'HTML Element',
    whatItDoes: 'Connects an external CSS stylesheet file to the HTML document.',
    whyUsed: 'Separates presentation (CSS) from content (HTML), making sites faster and much easier to maintain.',
    syntaxExample: '<head>\n  <link rel="stylesheet" href="style.css">\n</head>',
    commonMistake: 'Using <script src="style.css"> (which is for JavaScript) or mistyping the file name as styles.css.'
  },
  cssSelector: {
    title: 'CSS Selector (e.g. header, .hero)',
    elementOrProperty: 'CSS Selector',
    type: 'CSS Selector',
    whatItDoes: 'Targets the specific HTML element(s) to which styling declarations should be applied.',
    whyUsed: 'Gives precise control over which elements look like what across the entire document.',
    syntaxExample: 'header { background-color: #633d2d; }\n.hero { text-align: center; }',
    commonMistake: 'Forgetting the dot prefix for class selectors (e.g. writing hero instead of .hero).'
  },
  cssProperty: {
    title: 'CSS Property (e.g. background-color, color)',
    elementOrProperty: 'CSS Property',
    type: 'CSS Property',
    whatItDoes: 'Specifies the stylistic attribute you want to adjust on the targeted element.',
    whyUsed: 'Allows complete visual customization of layout, typography, borders, and colours.',
    syntaxExample: 'background-color: #f5e9d8;\ncolor: #2b1810;',
    commonMistake: 'Putting the colon on the wrong side or mixing up British and American spellings (it is color, not colour).'
  },
  displayFlex: {
    title: 'display: flex;',
    elementOrProperty: 'display: flex',
    type: 'CSS Property',
    whatItDoes: 'Turns an element into a flex container, aligning its direct children into a flexible row or column.',
    whyUsed: 'Solves complex alignment problems easily, such as placing menu cards side-by-side.',
    syntaxExample: '.menu-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n}',
    commonMistake: 'Applying display: flex to the children cards instead of their parent grid wrapper.'
  },
  flexWrap: {
    title: 'flex-wrap: wrap;',
    elementOrProperty: 'flex-wrap: wrap',
    type: 'CSS Property',
    whatItDoes: 'Allows flex items to wrap onto multiple lines when there is not enough horizontal room.',
    whyUsed: 'Essential for mobile-friendly responsive designs so cards don\'t squash into illegible columns.',
    syntaxExample: '.menu-grid {\n  display: flex;\n  flex-wrap: wrap;\n}',
    commonMistake: 'Leaving flex-wrap at default nowrap and wondering why cards overflow the screen on mobile phones.'
  },
  gap: {
    title: 'gap: 20px;',
    elementOrProperty: 'gap: 20px',
    type: 'CSS Property',
    whatItDoes: 'Controls the space between grid or flex items.',
    whyUsed: 'Much cleaner and more robust than applying tricky margins to children elements.',
    syntaxExample: '.menu-grid {\n  display: flex;\n  gap: 20px;\n}',
    commonMistake: 'Expecting gap to work when display is set to block.'
  }
};
