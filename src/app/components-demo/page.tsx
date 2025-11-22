'use client';

import { useState } from 'react';

import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { LinedSelect, LinedSelectItem } from '@/components/ui/lined-select';
import { OutlinedSelect, OutlinedSelectItem } from '@/components/ui/outlined-select';

export default function ComponentsDemoPage() {
  const [selectValue1, setSelectValue1] = useState('');
  const [selectValue2, setSelectValue2] = useState('option1');
  const [selectValue3, setSelectValue3] = useState('');
  const [selectValue4, setSelectValue4] = useState('');
  const [selectValue5, setSelectValue5] = useState('option1');
  const [selectValue6, setSelectValue6] = useState('');

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 font-sans">
      <main className="flex w-full max-w-5xl flex-col gap-24 pb-48">
        <div className="flex flex-col gap-4">
          <h1 className="text-h3">Button Component Test</h1>
          <p className="text-b1 text-zinc-600">피그마 디자인 시스템에 맞춰 구현된 버튼 컴포넌트</p>
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
              <OutlinedSelect label="Label" value={selectValue1} onValueChange={setSelectValue1}>
                <OutlinedSelectItem value="option1">Menu Element</OutlinedSelectItem>
                <OutlinedSelectItem value="option2">Menu Element</OutlinedSelectItem>
                <OutlinedSelectItem value="option3">Menu Element</OutlinedSelectItem>
                <OutlinedSelectItem value="option4">Menu Element</OutlinedSelectItem>
              </OutlinedSelect>

              <OutlinedSelect label="Label" value={selectValue2} onValueChange={setSelectValue2}>
                <OutlinedSelectItem value="option1">Menu Element</OutlinedSelectItem>
                <OutlinedSelectItem value="option2">Menu Element</OutlinedSelectItem>
                <OutlinedSelectItem value="option3">Menu Element</OutlinedSelectItem>
                <OutlinedSelectItem value="option4">Menu Element</OutlinedSelectItem>
              </OutlinedSelect>
            </div>
          </div>

          {/* Error State */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Error State</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <OutlinedSelect
                label="Label"
                value={selectValue3}
                onValueChange={setSelectValue3}
                error="Selection Required"
              >
                <OutlinedSelectItem value="option1">Menu Element</OutlinedSelectItem>
                <OutlinedSelectItem value="option2">Menu Element</OutlinedSelectItem>
                <OutlinedSelectItem value="option3">Menu Element</OutlinedSelectItem>
                <OutlinedSelectItem value="option4">Menu Element</OutlinedSelectItem>
              </OutlinedSelect>
            </div>
          </div>
        </section>

        {/* Lined Select Component */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-h3">Lined Select Component Test</h1>
            <p className="text-b1 text-zinc-600">
              하단 Border만 있는 Lined 스타일의 드롭다운 컴포넌트
            </p>
          </div>

          {/* Basic Lined Select */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Basic Lined Select</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <LinedSelect label="Label" value={selectValue4} onValueChange={setSelectValue4}>
                <LinedSelectItem value="option1">Menu Element</LinedSelectItem>
                <LinedSelectItem value="option2">Menu Element</LinedSelectItem>
                <LinedSelectItem value="option3">Menu Element</LinedSelectItem>
                <LinedSelectItem value="option4">Menu Element</LinedSelectItem>
              </LinedSelect>

              <LinedSelect label="Label" value={selectValue5} onValueChange={setSelectValue5}>
                <LinedSelectItem value="option1">Menu Element</LinedSelectItem>
                <LinedSelectItem value="option2">Menu Element</LinedSelectItem>
                <LinedSelectItem value="option3">Menu Element</LinedSelectItem>
                <LinedSelectItem value="option4">Menu Element</LinedSelectItem>
              </LinedSelect>
            </div>
          </div>

          {/* Error State */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Error State</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <LinedSelect
                label="Label"
                value={selectValue6}
                onValueChange={setSelectValue6}
                error="Selection Required"
              >
                <LinedSelectItem value="option1">Menu Element</LinedSelectItem>
                <LinedSelectItem value="option2">Menu Element</LinedSelectItem>
                <LinedSelectItem value="option3">Menu Element</LinedSelectItem>
                <LinedSelectItem value="option4">Menu Element</LinedSelectItem>
              </LinedSelect>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
