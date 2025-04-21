# use-funnel

[![npm version](https://img.shields.io/npm/v/use-funnel.svg)](https://www.npmjs.com/package/use-funnel)
[![license](https://img.shields.io/npm/l/use-funnel.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/use-funnel)](https://bundlephobia.com/package/use-funnel)
[![types](https://img.shields.io/npm/types/use-funnel.svg)](https://www.npmjs.com/package/use-funnel)

Make funnel eazy

> 🎬 **[Live Demo](https://chinmay.annadate.in/demos/use-funnel)**

## ✨ Features

- Can handle if one of the values in the funnel (not first one) is smaller than the subsequent

## 📦 Installation

```bash
npm install use-funnel
```

## 🚀 Usage

```typescript
const INITIAL_VALUES = [200, 175, 50, 100];
const funnelData = useFunnel(
    INITIAL_VALUES.map((val) => new FunnelInput({ value: val }))
);

<div className="grid grid-cols-[auto_1px_auto_1px_auto_1px_auto]">
  {funnelData.map((data, index) => (
    <FunnelStep
      key={index}
      index={index}
      isLast={index === funnelData.length - 1}
      dataUnit={data}
    />
  ))}
</div>
```

Example for FunnelStep
```typescript
import { FunnelInput } from "use-funnel";
import { FUNNEL_COLORS } from "../_constants/funnel";
import { motion } from "framer-motion";

const FunnelStep = ({
  index,
  isLast,
  dataUnit,
}: {
  index: number;
  isLast: boolean;
  dataUnit: FunnelInput;
}) => {
  return (
    <>
      <div className="relative h-[145px]">
        <motion.div
          className={`h-full w-full ${dataUnit.isCompensated() ? "opacity-50" : ""}`}
          style={{
            backgroundColor: FUNNEL_COLORS[index],
          }}
          initial={{
            clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
          }}
          animate={{ clipPath: dataUnit.polygon }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {dataUnit.isCompensated() && dataUnit.originalValue !== 0 && (
          <motion.div
            className="absolute top-0 h-full w-full"
            style={{
              backgroundColor: FUNNEL_COLORS[index],
            }}
            initial={{
              clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
            }}
            animate={{ clipPath: dataUnit.originalPolygon }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
      </div>
      {!isLast && <div className="bg-slate-200" />}
    </>
  );
};

export default FunnelStep;
```
