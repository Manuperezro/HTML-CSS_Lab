import JSZip from 'jszip';
import { FINAL_VALID_HTML, FINAL_VALID_CSS } from './codeAssembler';

export async function exportProjectZip(): Promise<void> {
  const zip = new JSZip();

  // 1. Add index.html
  zip.file('index.html', FINAL_VALID_HTML);

  // 2. Add style.css
  zip.file('style.css', FINAL_VALID_CSS);

  // 3. Add README.txt
  const readmeText = `========================================================
BRISTOL BREW CAFÉ - FINAL WEBSITE PROJECT
Level 3 BTEC Computing - Unit 15: Website Development
========================================================

Congratulations on completing the Bristol Café Code Lab!

This project directory represents a complete, professional,
standards-compliant small business website built with semantic
HTML5 and modern responsive CSS (Flexbox).

Project Structure:
bristol-cafe/
├── index.html        (Main webpage document)
├── style.css         (Cascading Style Sheet)
├── README.txt        (Project documentation)
└── images/           (Optimised media assets)
    ├── coffee.jpg         (Hero artisan flat white photo)
    ├── cafe-interior.jpg  (About section coffee shop interior)
    └── cake.jpg           (Artisan homemade cake photo)

Key Features:
- Semantic HTML5 Landmarks: <header>, <nav>, <main>, <section>, <article>, <footer>
- Accessible markup with descriptive alt attributes and aria considerations
- Responsive CSS Flexbox card grid layout (.menu-grid, .menu-card)
- Clean typography and cohesive warm café colour palette
- No external runtime dependencies; runs 100% offline in any browser!

How to Run Locally:
1. Double-click "index.html" to open the website in any web browser.
2. Or open the folder in Visual Studio Code and use the "Live Server" extension.

Created with Bristol Café Code Lab.
`;
  zip.file('README.txt', readmeText);

  // 4. Add image folder and fetch images
  const imgFolder = zip.folder('images');
  const imageNames = ['coffee.jpg', 'cafe-interior.jpg', 'cake.jpg'];

  if (imgFolder) {
    for (const imgName of imageNames) {
      try {
        const response = await fetch(`images/${imgName}`);
        if (response.ok) {
          const blob = await response.blob();
          imgFolder.file(imgName, blob);
        }
      } catch (err) {
        console.warn(`Could not bundle image images/${imgName}:`, err);
      }
    }
  }

  // 5. Generate and download zip
  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = 'bristol-brew-cafe-project.zip';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);
}

export function downloadFile(filename: string, content: string, contentType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
