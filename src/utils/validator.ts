import type { ChallengeId, CodeBlock, ValidationFeedback } from '../types/challenge';
import type { BugFixState } from './codeAssembler';

export function validateChallenge(
  challengeId: ChallengeId,
  blocks: CodeBlock[],
  attemptCount: number,
  bugState?: BugFixState
): ValidationFeedback {
  switch (challengeId) {
    case 1: {
      // Challenge 1: File organization
      // root: index.html, style.css
      // images: coffee.jpg, cafe-interior.jpg, cake.jpg
      const rootFiles = blocks.filter(b => b.category === 'root').map(b => b.content);
      const imageFiles = blocks.filter(b => b.category === 'images').map(b => b.content);

      const hasIndexInRoot = rootFiles.includes('index.html');
      const hasStyleInRoot = rootFiles.includes('style.css');
      const coffeeInImages = imageFiles.includes('coffee.jpg');
      const interiorInImages = imageFiles.includes('cafe-interior.jpg');
      const cakeInImages = imageFiles.includes('cake.jpg');

      const isAllCorrect = hasIndexInRoot && hasStyleInRoot && coffeeInImages && interiorInImages && cakeInImages && rootFiles.length === 2 && imageFiles.length === 3;

      if (isAllCorrect) {
        return {
          isValid: true,
          attemptNumber: attemptCount,
          messageType: 'success',
          title: 'Outstanding Project Organization!',
          message: 'Excellent work! You have properly structured the Bristol Brew Café project. The web server will immediately locate index.html, style.css will provide the styling, and the images folder keeps all visual assets organized.',
          positiveHighlights: [
            'index.html is correctly in the root folder as the site entry point',
            'style.css is in the root directory for straightforward linking',
            'All three image files are placed neatly inside the images/ subfolder'
          ]
        };
      }

      // Check specific error patterns
      let conceptual = 'Look at the file extensions of each file. Which files provide structure and styling, and which ones are photos?';
      let specific = 'Files ending in .jpg are images. Standard web convention is to place all image files inside the "images" folder, keeping index.html and style.css in the root directory.';
      let visual = 'Project Structure:\n📁 bristol-cafe/\n  ├── 📄 index.html\n  ├── 📄 style.css\n  └── 📁 images/\n      ├── 🖼️ coffee.jpg\n      ├── 🖼️ cafe-interior.jpg\n      └── 🖼️ cake.jpg';

      if (!hasIndexInRoot) {
        specific = 'index.html is currently missing from the root directory. Web servers look for index.html in the root folder when someone visits the café domain.';
      } else if (!coffeeInImages || !interiorInImages || !cakeInImages) {
        specific = 'One or more .jpg image files are still sitting in the root directory instead of the images/ folder.';
      } else if (!hasStyleInRoot) {
        specific = 'style.css is placed in the images folder! CSS stylesheets belong in the root directory.';
      }

      if (attemptCount === 1) {
        return {
          isValid: false,
          attemptNumber: 1,
          messageType: 'conceptual',
          title: 'Not Quite Organized Yet',
          message: conceptual
        };
      } else if (attemptCount === 2) {
        return {
          isValid: false,
          attemptNumber: 2,
          messageType: 'specific',
          title: 'Folder Structure Clue',
          message: specific
        };
      } else {
        return {
          isValid: false,
          attemptNumber: attemptCount,
          messageType: 'visual',
          title: 'Target Folder Structure',
          message: 'Here is the standard layout for the Bristol Brew Café files:',
          visualStructureHint: visual
        };
      }
    }

    case 2: {
      // Challenge 2: HTML skeleton
      // Expected sequence:
      // <!DOCTYPE html>
      // <html lang="en">
      // <head>
      // <meta charset="UTF-8"> (or title)
      // <title>Bristol Brew Café</title> (or meta)
      // </head>
      // <body>
      // </body>
      // </html>
      const ids = blocks.map(b => b.id);
      const doctypeIndex = ids.indexOf('b2-doctype');
      const htmlOpenIndex = ids.indexOf('b2-html-open');
      const headOpenIndex = ids.indexOf('b2-head-open');
      const metaIndex = ids.indexOf('b2-meta');
      const titleIndex = ids.indexOf('b2-title');
      const headCloseIndex = ids.indexOf('b2-head-close');
      const bodyOpenIndex = ids.indexOf('b2-body-open');
      const bodyCloseIndex = ids.indexOf('b2-body-close');
      const htmlCloseIndex = ids.indexOf('b2-html-close');

      const isDoctypeFirst = doctypeIndex === 0;
      const isHtmlOpenAfterDoctype = htmlOpenIndex === 1;
      const isHeadOpenAfterHtml = headOpenIndex === 2;
      const isMetaAndTitleInsideHead = (metaIndex === 3 || metaIndex === 4) && (titleIndex === 3 || titleIndex === 4);
      const isHeadClosed = headCloseIndex === 5;
      const isBodyOpenAfterHead = bodyOpenIndex === 6;
      const isBodyClosed = bodyCloseIndex === 7;
      const isHtmlClosedAtEnd = htmlCloseIndex === 8;

      const isAllValid = isDoctypeFirst && isHtmlOpenAfterDoctype && isHeadOpenAfterHtml &&
        isMetaAndTitleInsideHead && isHeadClosed && isBodyOpenAfterHead && isBodyClosed && isHtmlClosedAtEnd;

      if (isAllValid) {
        return {
          isValid: true,
          attemptNumber: attemptCount,
          messageType: 'success',
          title: 'HTML Skeleton Perfectly Restored!',
          message: 'Fantastic job! You built a 100% valid HTML5 document. The DOCTYPE informs the browser, <head> holds the metadata, and <body> is ready for all visible café content.',
          positiveHighlights: [
            '<!DOCTYPE html> is on line 1 informing modern rendering',
            '<html> strictly wraps the entire document',
            '<head> contains <meta> and <title> before closing',
            '<body> opens after <head> is closed and closes before </html>'
          ]
        };
      }

      // Check common mistakes
      let conceptual = 'Think about the two main parts of an HTML document: one part stores invisible metadata about the page, and the other holds all the visible content you see on screen. Which one comes first?';
      let specific = 'The <head> element must come BEFORE the <body> element. Both <head> and <body> must be nested inside <html lang="en">...</html>.';
      let visual = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Bristol Brew Café</title>
  </head>
  <body>
  </body>
</html>`;

      if (doctypeIndex !== 0) {
        specific = '<!DOCTYPE html> must always be on the very first line of any HTML5 document.';
      } else if (bodyOpenIndex < headCloseIndex) {
        specific = 'You placed <body> before or inside the <head> element! Remember: <head> contains page settings, while <body> holds visible content and must come afterwards.';
      } else if (htmlCloseIndex !== ids.length - 1) {
        specific = '</html> must be the very last tag in your document because it closes the entire HTML page.';
      }

      if (attemptCount === 1) {
        return { isValid: false, attemptNumber: 1, messageType: 'conceptual', title: 'Check Document Order', message: conceptual };
      } else if (attemptCount === 2) {
        return { isValid: false, attemptNumber: 2, messageType: 'specific', title: 'Nesting Clue', message: specific };
      } else {
        return { isValid: false, attemptNumber: attemptCount, messageType: 'visual', title: 'Target HTML Skeleton', message: 'Arrange the blocks to match this standard HTML5 structure:', visualStructureHint: visual };
      }
    }

    case 3: {
      // Challenge 3: Header and Navigation
      // Expected:
      // <header>
      // <h1>Bristol Brew Café</h1>
      // <nav>
      // <a>Home</a>, <a>Menu</a>, <a>About</a>, <a>Contact</a> (in any sensible order)
      // </nav>
      // </header>
      const ids = blocks.map(b => b.id);
      const headerOpenIndex = ids.indexOf('b3-header-open');
      const h1Index = ids.indexOf('b3-h1');
      const navOpenIndex = ids.indexOf('b3-nav-open');
      const navCloseIndex = ids.indexOf('b3-nav-close');
      const headerCloseIndex = ids.indexOf('b3-header-close');

      const linkIds = ['b3-a-home', 'b3-a-menu', 'b3-a-about', 'b3-a-contact'];
      const linkIndices = linkIds.map(id => ids.indexOf(id));

      const isHeaderOpenFirst = headerOpenIndex === 0;
      const isHeaderCloseLast = headerCloseIndex === ids.length - 1;
      const isH1BeforeNav = h1Index > headerOpenIndex && h1Index < navOpenIndex;
      const isNavInsideHeader = navOpenIndex > headerOpenIndex && navCloseIndex < headerCloseIndex;
      const areAllLinksInsideNav = linkIndices.every(idx => idx > navOpenIndex && idx < navCloseIndex);

      if (isHeaderOpenFirst && isHeaderCloseLast && isH1BeforeNav && isNavInsideHeader && areAllLinksInsideNav) {
        return {
          isValid: true,
          attemptNumber: attemptCount,
          messageType: 'success',
          title: 'Header and Navigation Built Beautifully!',
          message: 'Brilliant work! You correctly placed the <h1> café title and nested all four navigation links inside the semantic <nav> element.',
          positiveHighlights: [
            '<header> serves as the top landmark for the website',
            '<nav> wraps the navigation links for accessibility',
            'All anchor links are properly enclosed within the nav element'
          ]
        };
      }

      let conceptual = 'Think about hierarchy: what element is the main container for the top banner, and which element should group navigation links?';
      let specific = 'The <header> opens first and closes last. Inside it, place <h1>Bristol Brew Café</h1>, followed by the <nav> element holding the four <a> links.';
      let visual = `<header>
  <h1>Bristol Brew Café</h1>
  <nav>
    <a href="#home">Home</a>
    <a href="#menu">Menu</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
</header>`;

      if (!areAllLinksInsideNav) {
        specific = 'One or more navigation links are outside the <nav> element. The <nav> element must wrap all <a> links so screen readers can identify the menu.';
      } else if (!isNavInsideHeader) {
        specific = 'The <nav> element is outside the <header>. The header is designed to contain both the café branding (<h1>) and its navigation menu.';
      }

      if (attemptCount === 1) return { isValid: false, attemptNumber: 1, messageType: 'conceptual', title: 'Check Navigation Placement', message: conceptual };
      if (attemptCount === 2) return { isValid: false, attemptNumber: 2, messageType: 'specific', title: 'Header Nesting Clue', message: specific };
      return { isValid: false, attemptNumber: attemptCount, messageType: 'visual', title: 'Correct Header Code Structure', message: 'Compare your blocks against this structure:', visualStructureHint: visual };
    }

    case 4: {
      // Challenge 4: Hero section inside main
      // Expected:
      // <main>
      // <section id="home" class="hero">
      // <h2>Fresh Coffee in the Heart of Bristol</h2>
      // <p>Enjoy freshly brewed coffee and homemade cakes.</p>
      // <img src="images/coffee.jpg" alt="Freshly prepared coffee">
      // <a href="#menu" class="button">Explore Our Menu</a>
      // </section>
      // </main>
      const ids = blocks.map(b => b.id);
      const mainOpen = ids.indexOf('b4-main-open');
      const secOpen = ids.indexOf('b4-sec-open');
      const h2 = ids.indexOf('b4-h2');
      const p = ids.indexOf('b4-p');
      const img = ids.indexOf('b4-img');
      const cta = ids.indexOf('b4-cta');
      const secClose = ids.indexOf('b4-sec-close');
      const mainClose = ids.indexOf('b4-main-close');

      const isMainFirst = mainOpen === 0;
      const isSecOpen = secOpen === 1;
      const isContentInside = h2 > secOpen && p > h2 && img > p && cta > img;
      const isSecClose = secClose === 6;
      const isMainClose = mainClose === 7;

      if (isMainFirst && isSecOpen && isContentInside && isSecClose && isMainClose) {
        return {
          isValid: true,
          attemptNumber: attemptCount,
          messageType: 'success',
          title: 'Hero Section Created!',
          message: 'Superb! You structured the Hero section logically inside <main>. The <h2> provides the heading, the paragraph introduces the café, the image has descriptive alt text, and the anchor is styled as an action button.',
          positiveHighlights: [
            '<main> wraps the unique primary content of the page',
            'The hero section uses both id="home" and class="hero"',
            'The <img> tag includes accessibility alt text',
            'The call-to-action anchor tag links smoothly to #menu'
          ]
        };
      }

      let conceptual = 'What is the highest-level landmark for the main content of a webpage? And what order would a user naturally read the hero section?';
      let specific = '<main> wraps the entire hero section. Inside the section, order the content: heading (<h2>) first, introductory text (<p>), the photo (<img>), then the button (<a>).';
      let visual = `<main>
  <section id="home" class="hero">
    <h2>Fresh Coffee in the Heart of Bristol</h2>
    <p>Enjoy freshly brewed coffee and homemade cakes.</p>
    <img src="images/coffee.jpg" alt="Freshly prepared coffee">
    <a href="#menu" class="button">Explore Our Menu</a>
  </section>
</main>`;

      if (mainOpen !== 0 || mainClose !== ids.length - 1) {
        specific = '<main> must wrap the entire section from start to finish. Close </section> before closing </main>.';
      }

      if (attemptCount === 1) return { isValid: false, attemptNumber: 1, messageType: 'conceptual', title: 'Content Flow Clue', message: conceptual };
      if (attemptCount === 2) return { isValid: false, attemptNumber: 2, messageType: 'specific', title: 'Section Ordering Clue', message: specific };
      return { isValid: false, attemptNumber: attemptCount, messageType: 'visual', title: 'Target Hero Structure', message: 'Ensure your blocks match this order:', visualStructureHint: visual };
    }

    case 5: {
      // Challenge 5: About and Menu sections
      // About section first, then Menu section containing 3 articles
      const ids = blocks.map(b => b.id);
      const aboutIdx = ids.indexOf('b5-about-sec');
      const menuOpenIdx = ids.indexOf('b5-menu-open');
      const menuCloseIdx = ids.indexOf('b5-menu-close');
      const flatWhiteIdx = ids.indexOf('b5-card-flatwhite');
      const cappuccinoIdx = ids.indexOf('b5-card-cappuccino');
      const cakeIdx = ids.indexOf('b5-card-cake');

      const isAboutBeforeMenu = aboutIdx < menuOpenIdx;
      const areCardsInsideMenu = flatWhiteIdx > menuOpenIdx && flatWhiteIdx < menuCloseIdx &&
                                cappuccinoIdx > menuOpenIdx && cappuccinoIdx < menuCloseIdx &&
                                cakeIdx > menuOpenIdx && cakeIdx < menuCloseIdx;

      if (isAboutBeforeMenu && areCardsInsideMenu && menuOpenIdx === 1 && menuCloseIdx === ids.length - 1) {
        return {
          isValid: true,
          attemptNumber: attemptCount,
          messageType: 'success',
          title: 'Semantic Content Sections Completed!',
          message: 'Excellent architectural thinking! You put the About section first, and used <section> for the menu container while using individual <article> tags for each coffee and cake card.',
          positiveHighlights: [
            'Used <section> for thematic page divisions',
            'Used <article> for self-contained, repeatable menu items',
            'All three menu cards are properly enclosed within the menu grid'
          ]
        };
      }

      let conceptual = 'Consider the difference between a broad page topic (like the Menu) and an individual product item (like Flat White). Which tag is best for individual self-contained cards?';
      let specific = 'Place the About section first. Then open <section id="menu"> with its grid wrapper, place the three <article class="menu-card"> blocks inside, and close the section at the bottom.';
      let visual = `<section id="about">
  ...
</section>
<section id="menu">
  <h2>Our Menu</h2>
  <div class="menu-grid">
    <article class="menu-card"> ... </article>
    <article class="menu-card"> ... </article>
    <article class="menu-card"> ... </article>
  </div>
</section>`;

      if (!areCardsInsideMenu) {
        specific = 'One or more <article class="menu-card"> cards are outside the menu section. They should all sit between the opening menu tag and the closing </section> tag.';
      }

      if (attemptCount === 1) return { isValid: false, attemptNumber: 1, messageType: 'conceptual', title: 'Section vs Article Concept', message: conceptual };
      if (attemptCount === 2) return { isValid: false, attemptNumber: 2, messageType: 'specific', title: 'Content Placement Clue', message: specific };
      return { isValid: false, attemptNumber: attemptCount, messageType: 'visual', title: 'Target Content Layout', message: 'Organise your blocks following this structure:', visualStructureHint: visual };
    }

    case 6: {
      // Challenge 6: Connect CSS file
      // Option b6-correct is: <link rel="stylesheet" href="style.css">
      const selectedBlock = blocks[0];

      if (selectedBlock && selectedBlock.id === 'b6-correct') {
        return {
          isValid: true,
          attemptNumber: attemptCount,
          messageType: 'success',
          title: 'Styles Connected Successfully!',
          message: 'Boom! Look at that live preview: the website suddenly springs to life with colour, typography, and layout! You chose <link rel="stylesheet" href="style.css">, which is the exact way to link CSS.',
          positiveHighlights: [
            '<link> tag correctly references rel="stylesheet"',
            'href="style.css" precisely matches the file name in the explorer',
            'Preview instantly updated to show the styled café'
          ]
        };
      }

      let title = 'CSS Connection Failed';
      let msg = '';
      if (selectedBlock?.id === 'b6-script-wrong') {
        msg = '<script src="style.css"> is used to load JavaScript code files, not CSS stylesheets! Browsers will ignore stylesheets loaded via script tags.';
      } else if (selectedBlock?.id === 'b6-typo-wrong') {
        msg = 'Almost! Your link says href="styles.css" with an extra "s". Look at the File Explorer on the left: the file is called style.css. Even a one-letter typo prevents styles from loading!';
      } else {
        msg = 'Choose the correct block that links style.css as a stylesheet and place it at the top.';
      }

      if (attemptCount === 1) {
        return { isValid: false, attemptNumber: 1, messageType: 'conceptual', title, message: 'Check the file name in the explorer and remember which HTML tag links stylesheets.' };
      } else if (attemptCount === 2) {
        return { isValid: false, attemptNumber: 2, messageType: 'specific', title, message: msg };
      } else {
        return {
          isValid: false,
          attemptNumber: attemptCount,
          messageType: 'visual',
          title,
          message: 'To link a CSS stylesheet, use:',
          visualStructureHint: '<link rel="stylesheet" href="style.css">'
        };
      }
    }

    case 7: {
      // Challenge 7: Scrambled CSS rules
      // Rule 1: body { background-color: #f5e9d8; font-family: Arial, sans-serif; }
      // Rule 2: h1 { color: #633d2d; text-align: center; } (or similar order)
      const ids = blocks.map(b => b.id);
      const str = blocks.map(b => b.content).join(' ');

      const hasBodyBlock = /body\s*\{\s*(background-color:\s*#f5e9d8;|font-family:\s*Arial,\s*sans-serif;|\s*)+\}/.test(str);
      const hasH1Block = /h1\s*\{\s*(color:\s*#633d2d;|text-align:\s*center;|\s*)+\}/.test(str);

      if (hasBodyBlock && hasH1Block) {
        return {
          isValid: true,
          attemptNumber: attemptCount,
          messageType: 'success',
          title: 'CSS Syntax Assembled Perfectly!',
          message: 'Brilliant! You mastered CSS rule anatomy. You started with the selector, opened { curly braces }, placed property: value; declarations, and closed with }.',
          positiveHighlights: [
            'Selector correctly identifies the target HTML element',
            'Curly braces { } define the declaration block',
            'Properties and values are paired with a colon and terminated with a semicolon'
          ]
        };
      }

      let conceptual = 'Remember the anatomy of a CSS rule: Selector first, followed by an opening curly brace {, then property: value; declarations, and finally a closing curly brace }.';
      let specific = 'Assemble the body rule first with background-color: #f5e9d8; and font-family: Arial, sans-serif;. Then assemble the h1 rule with color: #633d2d; and text-align: center;.';
      let visual = `body {
  background-color: #f5e9d8;
  font-family: Arial, sans-serif;
}

h1 {
  color: #633d2d;
  text-align: center;
}`;

      if (ids.indexOf('b7-body-sel') > ids.indexOf('b7-prop-bg')) {
        specific = 'You placed a CSS property before the selector! The selector (e.g. body) must come first so the browser knows which element to style.';
      }

      if (attemptCount === 1) return { isValid: false, attemptNumber: 1, messageType: 'conceptual', title: 'CSS Rule Anatomy', message: conceptual };
      if (attemptCount === 2) return { isValid: false, attemptNumber: 2, messageType: 'specific', title: 'Brackets & Properties Clue', message: specific };
      return { isValid: false, attemptNumber: attemptCount, messageType: 'visual', title: 'Target CSS Rules', message: 'Assemble the pieces into these two rules:', visualStructureHint: visual };
    }

    case 8: {
      // Challenge 8: Categorize CSS declarations into header, nav a, .hero, .button
      const headerBlocks = blocks.filter(b => b.category === 'header').map(b => b.content);
      const navBlocks = blocks.filter(b => b.category === 'nav a').map(b => b.content);
      const heroBlocks = blocks.filter(b => b.category === '.hero').map(b => b.content);
      const buttonBlocks = blocks.filter(b => b.category === '.button').map(b => b.content);

      const hasHeaderBg = headerBlocks.some(c => c.includes('#3d2314'));
      const hasHeaderPadding = headerBlocks.some(c => c.includes('padding: 20px;'));
      const hasNavColor = navBlocks.some(c => c.includes('#f5e9d8'));
      const hasNavNoUnderline = navBlocks.some(c => c.includes('text-decoration: none;'));
      const hasHeroBg = heroBlocks.some(c => c.includes('#ffffff'));
      const hasHeroRadius = heroBlocks.some(c => c.includes('border-radius: 12px;'));
      const hasButtonBg = buttonBlocks.some(c => c.includes('#c97a3e'));
      const hasButtonRadius = buttonBlocks.some(c => c.includes('border-radius: 6px;'));

      const isAllCategorized = hasHeaderBg && hasHeaderPadding && hasNavColor && hasNavNoUnderline &&
        hasHeroBg && hasHeroRadius && hasButtonBg && hasButtonRadius;

      if (isAllCategorized) {
        return {
          isValid: true,
          attemptNumber: attemptCount,
          messageType: 'success',
          title: 'Professional Styling Applied!',
          message: 'Incredible work! You sorted each CSS declaration into its proper selector bucket. The header is rich and dark, navigation links look clean, the hero banner is crisp white with soft rounded corners, and the button pops with amber!',
          positiveHighlights: [
            'header styles provide contrast for the branding',
            'nav a removes default browser link underlines',
            '.hero creates a modern card effect with 12px border-radius',
            '.button styles an anchor link to look like an interactive button'
          ]
        };
      }

      let conceptual = 'Think about what each selector represents: header is the dark top banner, nav a is the links, .hero is the large white welcome box, and .button is the orange clickable button.';
      let specific = 'Check the border-radius declarations: border-radius: 12px belongs on .hero, while border-radius: 6px belongs on .button. Dark brown (#3d2314) belongs to header.';
      let visual = `header { background-color: #3d2314; color: #ffffff; padding: 20px; }
nav a  { color: #f5e9d8; text-decoration: none; padding: 8px 16px; }
.hero  { background-color: #ffffff; border-radius: 12px; padding: 40px; }
.button{ background-color: #c97a3e; color: #ffffff; border-radius: 6px; }`;

      if (attemptCount === 1) return { isValid: false, attemptNumber: 1, messageType: 'conceptual', title: 'Selector Matching Clue', message: conceptual };
      if (attemptCount === 2) return { isValid: false, attemptNumber: 2, messageType: 'specific', title: 'Check Properties Distribution', message: specific };
      return { isValid: false, attemptNumber: attemptCount, messageType: 'visual', title: 'Target Selector Mapping', message: 'Ensure declarations are mapped to the right selectors:', visualStructureHint: visual };
    }

    case 9: {
      // Challenge 9: Flexbox menu cards
      // Needs:
      // display: flex; flex-wrap: wrap; gap: 20px; for grid
      // flex: 1; min-width: 200px; for card
      const gridIds = blocks.filter(b => b.id.startsWith('b9-grid')).map(b => b.content);
      const cardIds = blocks.filter(b => b.id.startsWith('b9-card')).map(b => b.content);

      const hasFlex = gridIds.some(c => c.includes('display: flex;'));
      const hasWrap = gridIds.some(c => c.includes('flex-wrap: wrap;'));
      const hasGap = gridIds.some(c => c.includes('gap: 20px;'));
      const hasFlexGrow = cardIds.some(c => c.includes('flex: 1;'));
      const hasMinWidth = cardIds.some(c => c.includes('min-width: 200px;'));

      if (hasFlex && hasWrap && hasGap && hasFlexGrow && hasMinWidth) {
        return {
          isValid: true,
          attemptNumber: attemptCount,
          messageType: 'success',
          title: 'Flexbox Layout Repaired!',
          message: 'Sensational! Look at that preview: the menu cards snapped from an ugly vertical stack into an elegant, responsive horizontal row. When resized, they wrap smoothly!',
          positiveHighlights: [
            'display: flex creates a flex container',
            'flex-wrap: wrap allows items to wrap on mobile screens',
            'gap: 20px creates clean spacing between cards without margins',
            'flex: 1 and min-width: 200px give cards equal flexible widths'
          ]
        };
      }

      let conceptual = 'Why are the cards stacked? By default, <div> has display: block;. What modern CSS display property makes child elements sit side-by-side in a flexible row?';
      let specific = 'Apply display: flex; flex-wrap: wrap; and gap: 20px; to the container (.menu-grid). Then apply flex: 1; and min-width: 200px; to each card (.menu-card).';
      let visual = `.menu-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.menu-card {
  flex: 1;
  min-width: 200px;
}`;

      if (!hasFlex) {
        specific = 'You need display: flex; on the parent .menu-grid container to activate Flexbox!';
      }

      if (attemptCount === 1) return { isValid: false, attemptNumber: 1, messageType: 'conceptual', title: 'Why Stacked?', message: conceptual };
      if (attemptCount === 2) return { isValid: false, attemptNumber: 2, messageType: 'specific', title: 'Flexbox Properties Clue', message: specific };
      return { isValid: false, attemptNumber: attemptCount, messageType: 'visual', title: 'Target Flexbox Code', message: 'Set up your Flexbox rules like this:', visualStructureHint: visual };
    }

    case 10: {
      // Challenge 10: Multi-bug mission (10 bugs)
      const currentBugs = bugState || {
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

      const fixedCount = Object.values(currentBugs).filter(Boolean).length;
      const isComplete = fixedCount === 10;

      if (isComplete) {
        return {
          isValid: true,
          attemptNumber: attemptCount,
          messageType: 'success',
          score: 100,
          totalItems: 10,
          fixedErrorsCount: 10,
          title: 'CONGRATULATIONS! YOU SAVED BRISTOL BREW CAFÉ!',
          message: 'All 10 critical bugs have been diagnosed and resolved! You have successfully built and repaired a full commercial café homepage using professional HTML5 and CSS standards.',
          positiveHighlights: [
            'Fixed HTML tag pairing, closing tags, and semantic hierarchy',
            'Corrected stylesheet linking and relative image paths',
            'Implemented accessible alt descriptions and working navigation links',
            'Fixed CSS syntax errors, class selectors, and responsive Flexbox grid'
          ]
        };
      }

      return {
        isValid: false,
        attemptNumber: attemptCount,
        messageType: 'info',
        score: Math.round((fixedCount / 10) * 100),
        totalItems: 10,
        fixedErrorsCount: fixedCount,
        title: `Diagnostic Progress: ${fixedCount} of 10 Bugs Repaired`,
        message: `You have resolved ${fixedCount} of the 10 errors. Check the Diagnostic Bug Inspector checklist to locate the remaining ${10 - fixedCount} problems in index.html and style.css!`
      };
    }

    default:
      return {
        isValid: false,
        attemptNumber: attemptCount,
        messageType: 'info',
        title: 'Ready',
        message: 'Arrange code blocks and click Check Answer.'
      };
  }
}
