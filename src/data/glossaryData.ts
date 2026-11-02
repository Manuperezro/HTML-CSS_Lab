import type { GlossaryItem } from '../types/challenge';

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'HTML',
    category: 'HTML',
    definition: 'HyperText Markup Language. The standard language used to create the structure and content of web pages.',
    codeSnippet: '<!DOCTYPE html>\n<html>...</html>',
    realWorldAnalogy: 'Like the brick walls, wooden frames, and beams of a coffee shop building.',
    commonMistake: 'Thinking HTML handles visual design like colours and fonts (that is CSS\'s job).'
  },
  {
    term: 'CSS',
    category: 'CSS',
    definition: 'Cascading Style Sheets. The style sheet language used to describe the presentation, colours, layout, and fonts of a document written in HTML.',
    codeSnippet: 'body {\n  background-color: #f5e9d8;\n  color: #333;\n}',
    realWorldAnalogy: 'Like the interior decoration, paint on the walls, and furniture fabrics of Bristol Brew Café.',
    commonMistake: 'Forgetting the semicolon at the end of a CSS declaration.'
  },
  {
    term: 'Tag',
    category: 'HTML',
    definition: 'The building blocks of HTML enclosed in angle brackets (< >). Usually come in pairs: opening tag and closing tag.',
    codeSnippet: '<p>Paragraph text</p>',
    realWorldAnalogy: 'Bookends that mark where a section of text starts and finishes.',
    commonMistake: 'Forgetting the forward slash (/) in the closing tag, e.g. <p> instead of </p>.'
  },
  {
    term: 'Element',
    category: 'HTML',
    definition: 'An individual component of an HTML document, consisting of the opening tag, content, and closing tag (or a self-closing tag).',
    codeSnippet: '<h1>Bristol Brew Café</h1>',
    realWorldAnalogy: 'A whole sandwich, from the top bread slice to the filling and the bottom bread slice.',
    commonMistake: 'Confusing "tag" (the markup brackets) with the "element" (the whole component including its content).'
  },
  {
    term: 'Attribute',
    category: 'HTML',
    definition: 'Special words inside the opening tag that provide extra information or settings for an HTML element.',
    codeSnippet: '<img src="images/coffee.jpg" alt="Fresh flat white">',
    realWorldAnalogy: 'Like a name tag or dietary sticker placed on a coffee cup specifying its size and roast.',
    commonMistake: 'Putting attributes in the closing tag instead of the opening tag.'
  },
  {
    term: 'Selector',
    category: 'CSS',
    definition: 'The part of a CSS rule that points to the HTML element(s) you want to style.',
    codeSnippet: 'h1 { color: #633d2d; }\n.hero { padding: 40px; }',
    realWorldAnalogy: 'Calling out a customer\'s name in a café to hand them their drink order.',
    commonMistake: 'Forgetting the dot (.) before a class name, e.g. writing hero instead of .hero.'
  },
  {
    term: 'Property',
    category: 'CSS',
    definition: 'The visual characteristic or aspect of the element you want to change (such as color, font-size, or margin).',
    codeSnippet: 'color: #333333;\nfont-size: 18px;',
    realWorldAnalogy: 'The attribute you want to paint, like "wall color" or "table height".',
    commonMistake: 'Typing property values where the property name should be.'
  },
  {
    term: 'Value',
    category: 'CSS',
    definition: 'The specific setting or measurement you assign to a CSS property.',
    codeSnippet: 'background-color: #f5e9d8; /* #f5e9d8 is the value */',
    realWorldAnalogy: 'The specific shade of paint you pick from the store, e.g. "Warm Cream".',
    commonMistake: 'Leaving off measurement units (such as px or rem) for lengths like 20px.'
  },
  {
    term: 'head',
    category: 'HTML',
    definition: 'The container for metadata (data about data), page title, character set, and links to stylesheets. Its content is not displayed directly on the webpage.',
    codeSnippet: '<head>\n  <meta charset="UTF-8">\n  <title>Bristol Brew Café</title>\n  <link rel="stylesheet" href="style.css">\n</head>',
    realWorldAnalogy: 'Like the brain or the café\'s paperwork behind the counter: vital information, not for public display.',
    commonMistake: 'Placing visible content like headings or images inside the <head> element.'
  },
  {
    term: 'body',
    category: 'HTML',
    definition: 'The main container for all visible content of an HTML document, including headings, paragraphs, images, tables, and links.',
    codeSnippet: '<body>\n  <header>...</header>\n  <main>...</main>\n  <footer>...</footer>\n</body>',
    realWorldAnalogy: 'The physical seating area, counter, and dining room of the café where customers sit and eat.',
    commonMistake: 'Opening a <body> tag inside the <head> element.'
  },
  {
    term: 'header',
    category: 'HTML',
    definition: 'A semantic container for introductory content or navigational links, usually found at the top of a webpage.',
    codeSnippet: '<header>\n  <h1>Bristol Brew Café</h1>\n  <nav>...</nav>\n</header>',
    realWorldAnalogy: 'The storefront sign and welcoming entrance awning of the café.',
    commonMistake: 'Confusing <header> (visible top banner) with <head> (invisible metadata) or <h1> (main heading).'
  },
  {
    term: 'nav',
    category: 'HTML',
    definition: 'A semantic element that contains major navigation links allowing visitors to move between pages or sections.',
    codeSnippet: '<nav>\n  <a href="#home">Home</a>\n  <a href="#menu">Menu</a>\n</nav>',
    realWorldAnalogy: 'The signpost inside the café pointing to "Order Counter", "Restrooms", and "Garden Patio".',
    commonMistake: 'Wrapping every single link on the page in a <nav>; it is intended for main site navigation.'
  },
  {
    term: 'main',
    category: 'HTML',
    definition: 'The dominant content unique to the document, excluding repeated headers, footers, and sidebars.',
    codeSnippet: '<main>\n  <section id="hero">...</section>\n  <section id="menu">...</section>\n</main>',
    realWorldAnalogy: 'The café\'s main dining room floor where the core experience takes place.',
    commonMistake: 'Having more than one visible <main> element on a single web page.'
  },
  {
    term: 'section',
    category: 'HTML',
    definition: 'A standalone thematic grouping of content, typically introduced by a heading.',
    codeSnippet: '<section id="menu">\n  <h2>Our Menu</h2>\n  <article>...</article>\n</section>',
    realWorldAnalogy: 'A distinct zone of the café, such as the "Barista Station" or the "Bakery Display".',
    commonMistake: 'Using <section> purely for visual styling instead of a generic <div>.'
  },
  {
    term: 'article',
    category: 'HTML',
    definition: 'A self-contained, reusable piece of content that makes sense on its own, such as a product card, blog post, or review.',
    codeSnippet: '<article class="menu-card">\n  <h3>Flat White</h3>\n  <p>£3.50</p>\n</article>',
    realWorldAnalogy: 'An individual menu item card on the table or a printed postcard flyer.',
    commonMistake: 'Using <article> when the content cannot stand alone independently.'
  },
  {
    term: 'footer',
    category: 'HTML',
    definition: 'The section typically at the bottom of a webpage containing copyright notices, contact links, and legal info.',
    codeSnippet: '<footer>\n  <p>&copy; 2026 Bristol Brew Café. All rights reserved.</p>\n</footer>',
    realWorldAnalogy: 'The footer notes printed at the very bottom of a paper restaurant receipt.',
    commonMistake: 'Placing main interactive features exclusively in the footer where users won\'t see them.'
  },
  {
    term: 'class',
    category: 'HTML',
    definition: 'An attribute used to assign one or more reusable classification names to HTML elements for styling with CSS.',
    codeSnippet: '<article class="menu-card featured">...</article>\n/* CSS: .menu-card { ... } */',
    realWorldAnalogy: 'A staff uniform: multiple baristas can wear the same green apron.',
    commonMistake: 'Starting class names with a number or forgetting the dot in CSS (.menu-card).'
  },
  {
    term: 'id',
    category: 'HTML',
    definition: 'A unique identifier attribute for an HTML element. Must be unique within the entire HTML document.',
    codeSnippet: '<section id="menu">...</section>\n/* CSS: #menu { ... } */',
    realWorldAnalogy: 'A passport number or table number: only one table can be Table 1.',
    commonMistake: 'Reusing the same id value on multiple elements across the same page.'
  },
  {
    term: 'href',
    category: 'HTML',
    definition: 'Hypertext Reference. Specifies the URL or internal anchor (#) destination for an anchor (<a>) or link (<link>) tag.',
    codeSnippet: '<a href="#menu">Jump to Menu</a>\n<link rel="stylesheet" href="style.css">',
    realWorldAnalogy: 'The destination address written on an envelope or ticket.',
    commonMistake: 'Forgetting the hash symbol (#) for internal page links, e.g. writing href="menu" instead of href="#menu".'
  },
  {
    term: 'src',
    category: 'HTML',
    definition: 'Source. Specifies the file path or web address of an external resource, such as an image file.',
    codeSnippet: '<img src="images/coffee.jpg" alt="Fresh artisan coffee">',
    realWorldAnalogy: 'The exact pantry shelf where the barista finds the roasted coffee beans.',
    commonMistake: 'Typing an incorrect path or file extension (e.g. coffee.png instead of images/coffee.jpg).'
  },
  {
    term: 'alt',
    category: 'HTML',
    definition: 'Alternative text. Describes the image for screen readers used by visually impaired visitors or when the image fails to load.',
    codeSnippet: '<img src="images/cake.jpg" alt="Slice of homemade carrot cake with walnuts">',
    realWorldAnalogy: 'A friendly barista verbally describing the cake display to a visually impaired guest.',
    commonMistake: 'Leaving alt empty or writing generic phrases like "image" or "picture".'
  },
  {
    term: 'padding',
    category: 'CSS',
    definition: 'The space between the element\'s content and its border (the inner cushion).',
    codeSnippet: '.button {\n  padding: 12px 24px;\n}',
    realWorldAnalogy: 'The foam padding inside a fragile coffee cup shipping box.',
    commonMistake: 'Confusing padding (inside the border) with margin (outside the border).'
  },
  {
    term: 'margin',
    category: 'CSS',
    definition: 'The transparent space outside an element\'s border, creating breathing room between different elements.',
    codeSnippet: '.menu-card {\n  margin-bottom: 20px;\n}',
    realWorldAnalogy: 'The walkway distance between adjacent tables in the café so chairs don\'t bump.',
    commonMistake: 'Expecting margin background colour to show (margins are always transparent).'
  },
  {
    term: 'display',
    category: 'CSS',
    definition: 'Defines how an element behaves in the document flow, such as block, inline, inline-block, flex, or none.',
    codeSnippet: '.menu-grid {\n  display: flex;\n}',
    realWorldAnalogy: 'Deciding whether customers queue in a single line (block) or sit side by side along the bar (flex).',
    commonMistake: 'Expecting flex properties like justify-content to work without first setting display: flex.'
  },
  {
    term: 'flex',
    category: 'CSS',
    definition: 'A CSS display mode and shorthand property that enables Flexible Box Layout for aligning and distributing items efficiently.',
    codeSnippet: '.menu-card {\n  flex: 1;\n}',
    realWorldAnalogy: 'Accordion-style seating that stretches to fill available space comfortably.',
    commonMistake: 'Applying display: flex to the children rather than the parent container.'
  },
  {
    term: 'gap',
    category: 'CSS',
    definition: 'Sets the spacing (gutters) between grid or flex items without needing tricky margin hacks.',
    codeSnippet: '.menu-grid {\n  display: flex;\n  gap: 20px;\n}',
    realWorldAnalogy: 'The uniform 20-centimetre gap between freshly baked cookies on a baking tray.',
    commonMistake: 'Using gap on older display types like display: block where it has no effect.'
  }
];
