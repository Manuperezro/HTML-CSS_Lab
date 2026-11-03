import { describe, it, expect } from 'vitest';
import { validateChallenge } from '../utils/validator';
import { FINAL_VALID_HTML, FINAL_VALID_CSS } from '../utils/codeAssembler';
import { CHALLENGES } from '../data/challenges';
import type { CodeBlock } from '../types/challenge';

describe('Bristol Café Code Lab - Validation Engine Tests', () => {
  // Test Challenge 1: File organization
  it('Challenge 1: rejects when files are in wrong folders and gives conceptual clue on attempt 1', () => {
    const initialBlocks = CHALLENGES[0].initialBlocks;
    const result1 = validateChallenge(1, initialBlocks, 1);
    expect(result1.isValid).toBe(false);
    expect(result1.messageType).toBe('conceptual');

    const result2 = validateChallenge(1, initialBlocks, 2);
    expect(result2.isValid).toBe(false);
    expect(result2.messageType).toBe('specific');

    const result3 = validateChallenge(1, initialBlocks, 3);
    expect(result3.isValid).toBe(false);
    expect(result3.messageType).toBe('visual');
    expect(result3.visualStructureHint).toBeDefined();
  });

  it('Challenge 1: accepts when index.html & style.css are in root and images are in images/', () => {
    const validBlocks: CodeBlock[] = [
      { id: 'f-index', content: 'index.html', type: 'file', category: 'root' },
      { id: 'f-style', content: 'style.css', type: 'file', category: 'root' },
      { id: 'f-coffee', content: 'coffee.jpg', type: 'file', category: 'images' },
      { id: 'f-interior', content: 'cafe-interior.jpg', type: 'file', category: 'images' },
      { id: 'f-cake', content: 'cake.jpg', type: 'file', category: 'images' }
    ];

    const result = validateChallenge(1, validBlocks, 1);
    expect(result.isValid).toBe(true);
    expect(result.messageType).toBe('success');
    expect(result.positiveHighlights).toBeDefined();
  });

  // Test Challenge 2: HTML Skeleton
  it('Challenge 2: validates proper HTML5 skeleton structure', () => {
    const validSkeleton: CodeBlock[] = [
      { id: 'b2-doctype', content: '<!DOCTYPE html>', type: 'tag-self' },
      { id: 'b2-html-open', content: '<html lang="en">', type: 'tag-open' },
      { id: 'b2-head-open', content: '<head>', type: 'tag-open' },
      { id: 'b2-meta', content: '<meta charset="UTF-8">', type: 'tag-self' },
      { id: 'b2-title', content: '<title>Bristol Brew Café</title>', type: 'tag-self' },
      { id: 'b2-head-close', content: '</head>', type: 'tag-close' },
      { id: 'b2-body-open', content: '<body>', type: 'tag-open' },
      { id: 'b2-body-close', content: '</body>', type: 'tag-close' },
      { id: 'b2-html-close', content: '</html>', type: 'tag-close' }
    ];

    const result = validateChallenge(2, validSkeleton, 1);
    expect(result.isValid).toBe(true);
    expect(result.messageType).toBe('success');
  });

  it('Challenge 2: detects invalid structure when body is placed inside head', () => {
    const invalidSkeleton: CodeBlock[] = [
      { id: 'b2-doctype', content: '<!DOCTYPE html>', type: 'tag-self' },
      { id: 'b2-html-open', content: '<html lang="en">', type: 'tag-open' },
      { id: 'b2-head-open', content: '<head>', type: 'tag-open' },
      { id: 'b2-body-open', content: '<body>', type: 'tag-open' }, // wrong!
      { id: 'b2-meta', content: '<meta charset="UTF-8">', type: 'tag-self' },
      { id: 'b2-title', content: '<title>Bristol Brew Café</title>', type: 'tag-self' },
      { id: 'b2-head-close', content: '</head>', type: 'tag-close' },
      { id: 'b2-body-close', content: '</body>', type: 'tag-close' },
      { id: 'b2-html-close', content: '</html>', type: 'tag-close' }
    ];

    const result = validateChallenge(2, invalidSkeleton, 2);
    expect(result.isValid).toBe(false);
    expect(result.message).toContain('head');
  });

  // Test Challenge 3: Header and Navigation
  it('Challenge 3: validates header with nested navigation and links', () => {
    const validHeader: CodeBlock[] = [
      { id: 'b3-header-open', content: '<header>', type: 'tag-open' },
      { id: 'b3-h1', content: '<h1>Bristol Brew Café</h1>', type: 'tag-self' },
      { id: 'b3-nav-open', content: '<nav>', type: 'tag-open' },
      { id: 'b3-a-home', content: '<a href="#home">Home</a>', type: 'tag-self' },
      { id: 'b3-a-menu', content: '<a href="#menu">Menu</a>', type: 'tag-self' },
      { id: 'b3-a-about', content: '<a href="#about">About</a>', type: 'tag-self' },
      { id: 'b3-a-contact', content: '<a href="#contact">Contact</a>', type: 'tag-self' },
      { id: 'b3-nav-close', content: '</nav>', type: 'tag-close' },
      { id: 'b3-header-close', content: '</header>', type: 'tag-close' }
    ];

    const result = validateChallenge(3, validHeader, 1);
    expect(result.isValid).toBe(true);
  });

  // Test Challenge 6: CSS link choice
  it('Challenge 6: accepts <link rel="stylesheet" href="style.css"> and rejects typos or script', () => {
    const correctChoice = [{ id: 'b6-correct', content: '<link rel="stylesheet" href="style.css">', type: 'tag-self' as const }];
    const wrongScript = [{ id: 'b6-script-wrong', content: '<script src="style.css"></script>', type: 'tag-self' as const }];
    const wrongTypo = [{ id: 'b6-typo-wrong', content: '<link rel="stylesheet" href="styles.css">', type: 'tag-self' as const }];

    expect(validateChallenge(6, correctChoice, 1).isValid).toBe(true);
    expect(validateChallenge(6, wrongScript, 2).message).toContain('script');
    expect(validateChallenge(6, wrongTypo, 2).message).toContain('styles.css');
  });

  // Test Challenge 7: CSS Rules
  it('Challenge 7: validates scrambled CSS rules for body and h1', () => {
    const validCssBlocks: CodeBlock[] = [
      { id: 'b7-body-sel', content: 'body', type: 'selector' },
      { id: 'b7-open1', content: '{', type: 'bracket' },
      { id: 'b7-prop-bg', content: 'background-color: #f5e9d8;', type: 'declaration' },
      { id: 'b7-prop-font', content: 'font-family: Arial, sans-serif;', type: 'declaration' },
      { id: 'b7-close1', content: '}', type: 'bracket' },
      { id: 'b7-h1-sel', content: 'h1', type: 'selector' },
      { id: 'b7-open2', content: '{', type: 'bracket' },
      { id: 'b7-h1-color', content: 'color: #633d2d;', type: 'declaration' },
      { id: 'b7-h1-align', content: 'text-align: center;', type: 'declaration' },
      { id: 'b7-close2', content: '}', type: 'bracket' }
    ];

    const result = validateChallenge(7, validCssBlocks, 1);
    expect(result.isValid).toBe(true);
  });

  // Test Challenge 9: CSS Box Model (Margin, Padding & Borders)
  it('Challenge 9: validates Margin, Padding, and Border declarations on .about-box, .menu-card, and .contact-box', () => {
    const validBoxModelBlocks: CodeBlock[] = [
      { id: 'b9-about-pad', content: 'padding: 30px;', category: '.about-box', type: 'declaration' },
      { id: 'b9-about-mar', content: 'margin-bottom: 25px;', category: '.about-box', type: 'declaration' },
      { id: 'b9-card-pad', content: 'padding: 20px;', category: '.menu-card', type: 'declaration' },
      { id: 'b9-card-mar', content: 'margin-bottom: 16px;', category: '.menu-card', type: 'declaration' },
      { id: 'b9-card-bor', content: 'border-left: 4px solid #c97a3e;', category: '.menu-card', type: 'declaration' },
      { id: 'b9-contact-pad', content: 'padding: 24px;', category: '.contact-box', type: 'declaration' },
      { id: 'b9-contact-mar', content: 'margin-top: 20px;', category: '.contact-box', type: 'declaration' },
      { id: 'b9-contact-bor', content: 'border: 2px dashed #c97a3e;', category: '.contact-box', type: 'declaration' }
    ];

    const result = validateChallenge(9, validBoxModelBlocks, 1);
    expect(result.isValid).toBe(true);

    // Also verify initial unassigned state fails validation
    const initialChallenge9 = CHALLENGES[8].initialBlocks;
    expect(validateChallenge(9, initialChallenge9, 1).isValid).toBe(false);
  });

  // Test Challenge 10: Multi-bug checklist
  it('Challenge 10: validates full completion when all 10 bugs are fixed', () => {
    const allFixed = {
      bug1_mainClose: true,
      bug2_cssLink: true,
      bug3_headerInsideBody: true,
      bug4_navInsideHeader: true,
      bug5_coffeePath: true,
      bug6_cakeAlt: true,
      bug7_heroSelector: true,
      bug8_cssSemicolon: true,
      bug9_flexDisplay: true,
      bug10_contactLink: true
    };

    const result = validateChallenge(10, [], 1, allFixed);
    expect(result.isValid).toBe(true);
    expect(result.fixedErrorsCount).toBe(10);
    expect(result.score).toBe(100);
  });

  // Test Code Assembler
  it('Code Assembler: final website outputs valid HTML5 and CSS', () => {
    expect(FINAL_VALID_HTML).toContain('<!DOCTYPE html>');
    expect(FINAL_VALID_HTML).toContain('<html lang="en">');
    expect(FINAL_VALID_HTML).toContain('<header>');
    expect(FINAL_VALID_HTML).toContain('<nav>');
    expect(FINAL_VALID_HTML).toContain('<main>');
    expect(FINAL_VALID_HTML).toContain('class="menu-card"');
    expect(FINAL_VALID_HTML).toContain('alt="Freshly prepared coffee"');
    expect(FINAL_VALID_HTML).toContain('<footer>');

    expect(FINAL_VALID_CSS).toContain('display: flex');
    expect(FINAL_VALID_CSS).toContain('flex-wrap: wrap');
    expect(FINAL_VALID_CSS).toContain('gap: 20px');
    expect(FINAL_VALID_CSS).toContain('.menu-card');
  });
});
