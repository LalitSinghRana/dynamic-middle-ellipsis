# @dynamic-middle-ellipsis/react

[![NPM](https://img.shields.io/npm/v/@dynamic-middle-ellipsis/react)](https://www.npmjs.com/package/@dynamic-middle-ellipsis/react)
[![GitHub Repo stars](https://img.shields.io/github/stars/LalitSinghRana/dynamic-middle-ellipsis)](https://github.com/LalitSinghRana/dynamic-middle-ellipsis.git)

React component to dynamically truncate long text in the middle. Preserves the most important parts of your text with smart, responsive, and pixel-perfect text truncation.

### 🔗 [Live Demo](https://dynamic-middle-ellipsis-react.vercel.app/)

![demo](../../media/demo-high-frame-rate.gif)

## Features

- 🚀 **Smart Truncation**: Truncates in the middle, preserving important start/end content
- 📱 **Responsive**: Automatically adapts to container width changes
- 🎯 **Precise**: Font-aware calculations prevent over/under truncation  
- 🔧 **Complex Layouts**: Handles nested containers, parent element without width, shared siblings, padding, margins, etc.
- 📝 **Multi-line Support**: Wraps to multiple lines before truncating
- ⚡ **Performance**: O(log(n)) width calculations and no re-renders
- 🎨 **Customizable**: Custom ellipsis symbols and line limits
- 🏗️ **TypeScript**: Full TypeScript support with proper types
- ⚛️ **React Optimized**: Hooks-based with proper cleanup and context

## Installation

```bash
npm install @dynamic-middle-ellipsis/react
```

## Quick Start

```tsx
import createMiddleEllipsis from "@dynamic-middle-ellipsis/react";

const MiddleEllipsis = createMiddleEllipsis();

function App() {
  return (
    <MiddleEllipsis.Span>
      This text will truncate in the middle when space is limited
    </MiddleEllipsis.Span>
  );
}
```

## Examples

### Basic Usage
```tsx
<MiddleEllipsis.Span>
  Very long file name that needs truncation.pdf
</MiddleEllipsis.Span>
// Result: "Very long file na...cation.pdf"
```

### Custom Ellipsis Symbol
```tsx
<MiddleEllipsis.Span ellipsisSymbol="[---]">
  Very long file name that needs truncation.pdf
</MiddleEllipsis.Span>
// Result: "Very long file n[---]tion.pdf"
```

### Multi-line Support
```tsx
<MiddleEllipsis.Span lineLimit={2}>
  This text will wrap to 3 lines before truncating in the middle. You can customize however you like.
</MiddleEllipsis.Span>
// Result: 
// This text will wrap to 3 
// lines bef...dle. You can 
// customize however you like.
```

### Multiple Elements Sharing Space
```tsx
<MiddleEllipsis.BoundingDiv>
  <MiddleEllipsis.Span>
    First long text that needs truncation
  </MiddleEllipsis.Span>
  <MiddleEllipsis.Span>
    Second long text that also needs truncation
  </MiddleEllipsis.Span>
</MiddleEllipsis.BoundingDiv>
// Result: "First...tion"  "Second...tion"
```

## API Reference

### createMiddleEllipsis(config?)

Creates a MiddleEllipsis component factory with optional configuration.

**Parameters:**
- `config.customFontWidthMap?: FontWidthMap` - Custom font family mapping for precise calculations.

**Returns:** `MiddleEllipsis` component with `Span` and `BoundingDiv` properties.

### MiddleEllipsis.Span

React component for truncating text content.

**Props:**
- `children: string` - Text content to truncate (required)
- `ellipsisSymbol?: string` - Custom ellipsis symbol (default: "...")  
- `lineLimit?: number` - Maximum lines before truncation (default: 1)
- `...rest` - All standard HTML span props (className, style, onClick, etc.)


### MiddleEllipsis.BoundingDiv

Container component for multiple truncating elements that share available space.

**Props:**
- `children: ReactNode[]` - Child elements (MiddleEllipsis.Span components)
- `...rest` - All standard HTML div props

## Advanced Usage

### Precise Font Width Mapping

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
3. Copy everything from [generate-font-width-mapping](https://github.com/LalitSinghRana/dynamic-middle-ellipsis/blob/main/tools/generate-font-width-mapping.js) and paste it in the browser console.
      - This'll generate character widths mapping for all font-families in your project.
4. Copy the return object from the console and paste it against `chromeFontWidthMap` in `custom-font-family-map.ts`.
5. Repeat for Firefox.
6. Pass `customFontWidthMap` to `createMiddleEllipsis`:
  ```tsx
  import createMiddleEllipsis from "@dynamic-middle-ellipsis/react";
  import { customFontWidthMap } from "./custom-font-width-map";

  const MiddleEllipsis = createMiddleEllipsis({
    customFontWidthMap,
  });
  ```


## Performance Considerations

- Uses ResizeObserver for efficient resize detection
- Minimal re-renders - text updates happen directly in DOM
- O(log(n)) complexity for parent/ancestor div width calculations where n is number of nodes in subtree
- Automatic cleanup on component unmount
- Shared calculations when using BoundingDiv

## Technology Support

- React 16.8+ (hooks support)
- Modern browsers with ResizeObserver
- TypeScript 4.0+ (for TypeScript users)

## Related Packages

- [`@dynamic-middle-ellipsis/core`](https://www.npmjs.com/package/@dynamic-middle-ellipsis/core) - Framework-agnostic core utilities

## License

MIT © [Lalit Rana](https://github.com/LalitSinghRana)
