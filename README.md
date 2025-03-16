# Dynamic Middle Ellipsis

Framework agnostic code to dynamically truncate long text in the middle. 

Component wrappers provided for:
  - React (TS/JS)
  - Vanilla (TS/JS)

---
### Features:

- :ocean: **Dynamic**: Automatically truncate on element resize.
- :dart: **Precise**: Use of space,  it does not over or under truncate.
- :gear: **Custom ellipsis string**: Can pass any ellipsis string.
- :zap: **Fast**:
  - Calculating available width is O(h) operation, 
      - where "h" is height of DOM sub-tree from offset-parent to target node.
      - In most cases, this will be a constant O(1) operation.
  - Font character width are calculated at build time and cached in advance. 
      - So we don't have to do this calculation at run time.
  - All calculations and updating DOM element happens in JS land.
      - So that it'll not cause unnecessary re-renders and slow down your webapp.
- :white_check_mark: **Handle all use cases**, e.g.:
  - Parent width is dependent on child (circular dependency).
  - Can handle different font families, sizes and mixed-cases.
  - Wrap to multiple lines before truncating.
  - Truncating text share space with other fixed size elements.
  - Multiple separate truncating element share same space.
  - Accounts for padding and margin on parent element
- :no_entry: **Not a dependency**: In your project, you don't install this as a package dependency. But rather get the code/logic.
- :control_knobs: **Full control**: You get access to full code, so that you can modify it according to your project's need.
- :package: **Component wrappers** available in:
  - React (TS/JS)
  - Vanilla (TS/JS)

---

### Installation:

```bash
npx @lalit-rana/dynamic-middle-ellipsis 
```

Follow the CLI instructions to get the code for your choice of framework and language.

---

### How to use:

###### Simple usage:

React:
```jsx
import MiddleEllipsis from "@/components/MiddleEllipsis";

<MiddleEllipsis.Span
  ellipsisSymbol=" [ - - - - - ] "
  lineLimit={2}
>
  Ellipsis text in center automatically when element resize
</MiddleEllipsis.Span>
```

Vanilla:
```html
<middle-ellipsis-span
  ellipsisSymbol=" [ - - - - - ] "
  lineLimit={2}
>
  Ellipsis text in center automatically when element resize
</middle-ellipsis-span>
```

###### For multiple truncating elements sharing same space:

React:
```jsx
import MiddleEllipsis from "@/components/MiddleEllipsis";
import { Badge } from "@/components/ui/badge";

<MiddleEllipsis.BoundingDiv>
  <Badge className="mr-2">
    <MiddleEllipsis.Span>Truncating text 1</MiddleEllipsis.Span>
  </Badge>
  <Badge className="mr-2">
    <MiddleEllipsis.Span>Truncating text 2</MiddleEllipsis.Span>
  </Badge>
  <Badge>
    <MiddleEllipsis.Span>Truncating text 3</MiddleEllipsis.Span>
  </Badge>
</MiddleEllipsis.BoundingDiv>
```

Vanilla:
```html
<middle-ellipsis-div>
  <custom-badge>
    <middle-ellipsis-span>Truncating text 1</middle-ellipsis-span>
  </custom-badge>
  <custom-badge>
    <middle-ellipsis-span>Truncating text 2</middle-ellipsis-span>
  </custom-badge>
  <custom-badge>
    <middle-ellipsis-span>Truncating text 3</middle-ellipsis-span>
  </custom-badge>
</middle-ellipsis-div>
```