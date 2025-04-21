# use-funnel

[![npm version](https://img.shields.io/npm/v/use-funnel.svg)](https://www.npmjs.com/package/use-funnel)
[![license](https://img.shields.io/npm/l/use-funnel.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/use-funnel)](https://bundlephobia.com/package/use-funnel)
[![types](https://img.shields.io/npm/types/use-funnel.svg)](https://www.npmjs.com/package/use-funnel)

A lightweight React hook to make HTML table columns sticky on both left and right sides. Great for data tables and dashboards.

> 🎬 **[Live Demo](https://chinmay.annadate.in/demos/use-funnel)**

## ✨ Features

- Sticky left and/or right columns
- Automatically handles offsets
- Customizable shadow, z-index, and more
- Compatible with any third party UI Library

## 📦 Installation

```bash
npm install use-funnel
```

## 🚀 Usage
Pass tableRef directly to the table element

```typescript
const tableRef = useRef<HTMLTableElement>(null);
useStickyColumns(tableRef, { numLeftSticky: 2, numRightSticky: 1 });
```

Full example
```css
.striped-table {
  tr:nth-child(odd) td {
    background-color: white;
  }
  tr:nth-child(even) td {
    background-color: #fafbfc;
  }
}
```

```typescript
import ExampleTable from "@/components/examples/ExampleTable";
import { useRef, useState } from "react";
import useStickyColumns from "use-funnel";

const Page = () => {
  const tableRef = useRef<HTMLTableElement | null>(null);

  const [numLeftSticky, setNumLeftSticky] = useState(2);
  const [numRightSticky, setNumRightSticky] = useState(3);

  useStickyColumns(tableRef, {
    numLeftSticky,
    numRightSticky,
    stickyZIndex: 10, # default
    leftShadow: "inset -2px 0 0 0 rgba(0, 0, 0, 0.1)", # default
    rightShadow: "inset 2px 0 0 0 rgba(0, 0, 0, 0.1)",
    deps: [], # any dependencies to reload the table
  });

  return (
    <div className="m-4 md:m-20 space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          Left Sticky Columns:
          <input
            type="number"
            value={numLeftSticky}
            onChange={(e) => setNumLeftSticky(Number(e.target.value))}
            min={1}
            className="rounded border px-2 py-1 w-20"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          Right Sticky Columns:
          <input
            type="number"
            value={numRightSticky}
            onChange={(e) => setNumRightSticky(Number(e.target.value))}
            min={1}
            className="rounded border px-2 py-1 w-20"
          />
        </label>
      </div>

      {/* Table Container */}
      <div className="max-h-[600px] overflow-hidden rounded-xl border">
        <div className="flex overflow-auto next-ui-table-thead striped-table max-h-[600px]">
          <div className="w-0 grow">
            <ExampleTable tableRef={tableRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
```
