# Dynamic Middle Ellipsis

[![GitHub Repo stars](https://img.shields.io/github/stars/LalitSinghRana/dynamic-middle-ellipsis)](https://github.com/LalitSinghRana/dynamic-middle-ellipsis.git)
[![NPM React](https://img.shields.io/npm/v/@dynamic-middle-ellipsis/react?label=@dynamic-middle-ellipsis/react)](https://www.npmjs.com/package/@dynamic-middle-ellipsis/react)
[![NPM Core](https://img.shields.io/npm/v/@dynamic-middle-ellipsis/core?label=@dynamic-middle-ellipsis/core)](https://www.npmjs.com/package/@dynamic-middle-ellipsis/core)

Dynamically truncate long text in the middle for multiple frameworks. Preserves the most important parts of your text with smart, responsive, and pixel-perfect text truncation.

### 🔗 [Live Demo](https://dynamic-middle-ellipsis-react.vercel.app/)

![demo](media/demo-high-frame-rate.gif)

## Packages

This monorepo contains multiple packages for different use cases:

### 🔗 [React](./packages/react) 
[![NPM React](https://img.shields.io/npm/v/@dynamic-middle-ellipsis/react?label=@dynamic-middle-ellipsis/react)](https://www.npmjs.com/package/@dynamic-middle-ellipsis/react)

Components for react projects.

```bash
npm install @dynamic-middle-ellipsis/react
```

```tsx
import createMiddleEllipsis from "@dynamic-middle-ellipsis/react";

const MiddleEllipsis = createMiddleEllipsis();

<MiddleEllipsis.Span>
  This text will truncate in the middle when space is limited
</MiddleEllipsis.Span>
```

### 🔗 [Core](./packages/core) 
[![NPM Core](https://img.shields.io/npm/v/@dynamic-middle-ellipsis/core?label=@dynamic-middle-ellipsis/core)](https://www.npmjs.com/package/@dynamic-middle-ellipsis/core)

Core utils for vanilla js projects.

```bash
npm install @dynamic-middle-ellipsis/core
```

```tsx
import { truncateOnResize, setFontWidthMap } from '@dynamic-middle-ellipsis/core';

// Basic usage
const cleanup = truncateOnResize({
  targetElement: document.getElementById('text-element'),
  originalText: 'This is a very long text that needs truncation.pdf',
});

// Cleanup when done
cleanup();
```