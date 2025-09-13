# @dynamic-middle-ellipsis/core

[![NPM](https://img.shields.io/npm/v/@dynamic-middle-ellipsis/core)](https://www.npmjs.com/package/@dynamic-middle-ellipsis/core)
[![GitHub Repo stars](https://img.shields.io/github/stars/LalitSinghRana/dynamic-middle-ellipsis)](https://github.com/LalitSinghRana/dynamic-middle-ellipsis.git)

Framework-agnostic text truncation with middle ellipsis - core utilities for precise text measurement and truncation.

### 🔗 [Live Demo](https://dynamic-middle-ellipsis-react.vercel.app/)

![demo](../../media/demo-high-frame-rate.gif)

## Features
- 🚀 **Smart Truncation**: Truncates in the middle, preserving important start/end content
- 📱 **Responsive**: Automatically adapts to container width changes  
- 🎯 **Precise**: Font-aware calculations prevent over/under truncation
- 🔧 **Complex Layouts**: Handles nested containers, siblings, padding, margins
- 📝 **Multi-line Support**: Wraps to multiple lines before truncating
- ⚡ **Performance**: O(h) width calculations with ResizeObserver
- 🏗️ **Framework Agnostic**: Works with any JavaScript framework or vanilla JS
- 🎨 **TypeScript**: Full TypeScript support with proper types

## Installation

```bash
npm install @dynamic-middle-ellipsis/core
```

## Quick Start

```tsx
import createMiddleEllipsisUtils from '@dynamic-middle-ellipsis/core';

const truncateOnResize = createMiddleEllipsisUtils();

// Basic usage
const targetElement = document.getElementById('my-element-id');
const cleanup = truncateOnResize({
  targetElement,
  originalText: targetElement.innerText 
});

// Cleanup when done
cleanup();
```

## API Reference

### `truncateOnResize(options)`

Sets up automatic text truncation that responds to container resize events.

**Parameters:**
- `targetElement: HTMLElement` - The element containing the text to truncate
- `originalText: string` - The original text content
- `ellipsisSymbol?: string` - Custom ellipsis symbol (default: "...")
- `lineLimit?: number` - Maximum lines before truncation (default: 1)
- `boundingElement?: HTMLElement` - Container element for shared space calculations

**Returns:** `() => void` - Cleanup function to disconnect the ResizeObserver

### `setFontWidthMap(customMap)`

Configure custom font width mappings for precise calculations.

**Parameters:**
- `customMap: FontWidthMap` - Custom font family character width mappings

### `FontWidthMap` Type

```typescript
type FontWidthMap = {
  [fontFamily: string]: {
    [character: string]: number;
  };
};
```

## Advanced Usage

### Custom Font Width Mapping

For pixel-perfect truncation across different browsers and fonts, you need to generate **font width mapping** for all the font-family in your website. 
    
1. Create `custom-font-family-map.ts` file:
  ```tsx
  import type { FontWidthMap } from "@lalit-rana/dynamic-middle-ellipsis";

  const chromeFontWidthMap: FontWidthMap = {};
  const firefoxFontWidthMap: FontWidthMap = {};

  export const customFontWidthMap: FontWidthMap = {
    ...chrome,
    ...firefox,
  };
  ```
2. Open your website in chrome.
3. Copy everything from [generate-font-width-mapping](../../tools/generate-font-width-mapping.js) and paste it in the browser console.
      - This'll generate character widths mapping for all font-families in your project.
4. Copy the return object from the console and paste it against `chromeFontWidthMap` in `custom-font-family-map.ts`.
5. Repeat for Firefox.
6. Pass `customFontWidthMap` to `createMiddleEllipsis`:
  ```tsx
  import createMiddleEllipsis from "@dynamic-middle-ellipsis/react";
  import { customFontWidthMap } from "./custom-font-width-map";

  const truncateOnResize = createMiddleEllipsisUtils({
    customFontWidthMap,
  });
  ```

## Related Packages

- [`@dynamic-middle-ellipsis/react`](https://www.npmjs.com/package/@dynamic-middle-ellipsis/react) - React components built on this core

## License

MIT © [Lalit Rana](https://github.com/LalitSinghRana)

