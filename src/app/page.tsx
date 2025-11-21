'use client';

import { Button } from '@/components/ui/button';
import {
  FloatingSelect,
  FloatingSelectItem,
} from '@/components/ui/floating-select';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [selectValue1, setSelectValue1] = useState('');
  const [selectValue2, setSelectValue2] = useState('option1');
  const [selectValue3, setSelectValue3] = useState('');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 font-sans">
      <main className="flex w-full max-w-5xl flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-h3">Button Component Test</h1>
          <p className="text-b1 text-zinc-600">
            피그마 디자인 시스템에 맞춰 구현된 버튼 컴포넌트
          </p>
        </div>

        {/* Flat Buttons */}
        <section className="flex flex-col gap-4">
          <h2 className="text-h5">Flat Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="flat">Button</Button>
            <Button variant="flat">
              <ShoppingCart />
              Button
            </Button>
            <Button variant="flat" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Outline Buttons */}
        <section className="flex flex-col gap-4">
          <h2 className="text-h5">Outline Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">Button</Button>
            <Button variant="outline">
              <ShoppingCart />
              Button
            </Button>
            <Button variant="outline" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="flex flex-col gap-4">
          <h2 className="text-h5">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="flat" size="sm">
              Small
            </Button>
            <Button variant="flat" size="default">
              Default
            </Button>
            <Button variant="flat" size="lg">
              Large
            </Button>
          </div>
        </section>

        {/* Icon Buttons */}
        <section className="flex flex-col gap-4">
          <h2 className="text-h5">Icon Buttons</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="flat" size="icon">
              <ShoppingCart />
            </Button>
            <Button variant="outline" size="icon">
              <ShoppingCart />
            </Button>
            <Button variant="flat" size="icon-sm">
              <ShoppingCart />
            </Button>
            <Button variant="outline" size="icon-lg">
              <ShoppingCart />
            </Button>
          </div>
        </section>

        {/* Other Variants */}
        <section className="flex flex-col gap-4">
          <h2 className="text-h5">Other Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="destructive">Destructive</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        {/* Dropdown Component */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-h3">Dropdown Component Test</h1>
            <p className="text-b1 text-zinc-600">
              Floating Label 애니메이션이 적용된 드롭다운 컴포넌트
            </p>
          </div>

          {/* Basic Dropdown */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Basic Dropdown</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FloatingSelect
                label="Label"
                value={selectValue1}
                onValueChange={setSelectValue1}
              >
                <FloatingSelectItem value="option1">
                  Menu Element
                </FloatingSelectItem>
                <FloatingSelectItem value="option2">
                  Menu Element
                </FloatingSelectItem>
                <FloatingSelectItem value="option3">
                  Menu Element
                </FloatingSelectItem>
                <FloatingSelectItem value="option4">
                  Menu Element
                </FloatingSelectItem>
              </FloatingSelect>

              <FloatingSelect
                label="Label"
                value={selectValue2}
                onValueChange={setSelectValue2}
              >
                <FloatingSelectItem value="option1">
                  Menu Element
                </FloatingSelectItem>
                <FloatingSelectItem value="option2">
                  Menu Element
                </FloatingSelectItem>
                <FloatingSelectItem value="option3">
                  Menu Element
                </FloatingSelectItem>
                <FloatingSelectItem value="option4">
                  Menu Element
                </FloatingSelectItem>
              </FloatingSelect>
            </div>
          </div>

          {/* Error State */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Error State</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FloatingSelect
                label="Label"
                value={selectValue3}
                onValueChange={setSelectValue3}
                error="Selection Required"
              >
                <FloatingSelectItem value="option1">
                  Menu Element
                </FloatingSelectItem>
                <FloatingSelectItem value="option2">
                  Menu Element
                </FloatingSelectItem>
                <FloatingSelectItem value="option3">
                  Menu Element
                </FloatingSelectItem>
                <FloatingSelectItem value="option4">
                  Menu Element
                </FloatingSelectItem>
              </FloatingSelect>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
