export type ChallengeId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type DifficultyLevel = 'Very Easy' | 'Easy' | 'Easy to Medium' | 'Medium' | 'Medium to Hard' | 'Hard' | 'Advanced Beginner';

export type ChallengeCategory = 'file-explorer' | 'html-order' | 'html-nesting' | 'css-connect' | 'css-assembly' | 'css-categorize' | 'box-model' | 'flexbox' | 'multi-bug';

export interface CodeBlock {
  id: string;
  content: string;
  type: 'tag-open' | 'tag-close' | 'tag-self' | 'text' | 'selector' | 'property' | 'value' | 'bracket' | 'declaration' | 'file' | 'folder';
  label?: string;
  indent?: number; // visual nesting level (0, 1, 2, 3)
  category?: string; // e.g. for drag groups
  tagType?: 'html' | 'css' | 'file';
  explanationKey?: string;
}

export interface NestableSlot {
  id: string;
  title: string;
  expectedBlockIds?: string[];
  allowedTypes?: string[];
}

export interface ValidationFeedback {
  isValid: boolean;
  score?: number; // 0-100 or completed items count
  totalItems?: number;
  completedItems?: string[];
  attemptNumber: number;
  messageType: 'success' | 'conceptual' | 'specific' | 'visual' | 'info';
  title: string;
  message: string;
  visualStructureHint?: string;
  positiveHighlights?: string[];
  fixedErrorsCount?: number;
}

export interface Challenge {
  id: ChallengeId;
  title: string;
  subtitle: string;
  difficulty: DifficultyLevel;
  category: ChallengeCategory;
  activeTab: 'index.html' | 'style.css' | 'files';
  learningObjectives: string[];
  conceptsIntroduced: string[];
  instructions: string[];
  funFact: string;
  hints: [string, string, string]; // Hint 1 (general), Hint 2 (specific), Hint 3 (visual/solution)
  initialBlocks: CodeBlock[];
  solutionBlocks?: CodeBlock[];
  previewMode: 'raw' | 'partial' | 'styled' | 'responsive' | 'final';
  customData?: Record<string, any>;
}

export interface GlossaryItem {
  term: string;
  category: 'HTML' | 'CSS' | 'General';
  definition: string;
  codeSnippet: string;
  realWorldAnalogy: string;
  commonMistake: string;
}

export interface TeacherGuideItem {
  challengeId: ChallengeId;
  title: string;
  learningObjectives: string[];
  newConcepts: string[];
  expectedSolutionSummary: string;
  expectedCode: {
    html?: string;
    css?: string;
  };
  commonMisconceptions: string[];
  suggestedQuestions: string[];
  extensionTasks: string[];
}

export interface CodeExplanation {
  title: string;
  elementOrProperty: string;
  type: 'HTML Element' | 'HTML Attribute' | 'CSS Property' | 'CSS Selector' | 'Concept';
  whatItDoes: string;
  whyUsed: string;
  syntaxExample: string;
  commonMistake: string;
}
