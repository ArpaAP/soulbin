'use client';

import { useState } from 'react';

import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { LinedInput } from '@/components/ui/lined-input';
import { LinedSelect, LinedSelectItem } from '@/components/ui/lined-select';
import { OutlinedInput } from '@/components/ui/outlined-input';
import { OutlinedSelect, OutlinedSelectItem } from '@/components/ui/outlined-select';

export default function ComponentsDemoPage() {
  const [selectValue1, setSelectValue1] = useState('');
  const [selectValue2, setSelectValue2] = useState('option1');
  const [selectValue3, setSelectValue3] = useState('');
  const [selectValue4, setSelectValue4] = useState('');
  const [selectValue5, setSelectValue5] = useState('option1');
  const [selectValue6, setSelectValue6] = useState('');

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('Initial value');
  const [inputValue3, setInputValue3] = useState('');

  const [linedInputValue1, setLinedInputValue1] = useState('');
  const [linedInputValue2, setLinedInputValue2] = useState('Initial value');
  const [linedInputValue3, setLinedInputValue3] = useState('');

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);

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

        {/* Outlined Input Component */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-h3">Outlined Input Component Test</h1>
            <p className="text-b1 text-zinc-600">
              Floating Label 애니메이션이 적용된 텍스트 입력 컴포넌트
            </p>
          </div>

          {/* Basic Input */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Basic Input</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <OutlinedInput label="Placeholder" value={inputValue1} onChange={setInputValue1} />

              <OutlinedInput label="Placeholder" value={inputValue2} onChange={setInputValue2} />
            </div>
          </div>

          {/* Error State */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Error State</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <OutlinedInput
                label="Email"
                value={inputValue3}
                onChange={setInputValue3}
                error="Selection Required"
              />
            </div>
          </div>

          {/* Disabled State */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Disabled State</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <OutlinedInput label="Placeholder" value="" onChange={() => {}} disabled />
              <OutlinedInput
                label="Placeholder"
                value="Disabled with value"
                onChange={() => {}}
                disabled
              />
            </div>
          </div>
        </section>

        {/* Lined Input Component */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-h3">Lined Input Component Test</h1>
            <p className="text-b1 text-zinc-600">
              하단 Border만 있는 Lined 스타일의 텍스트 입력 컴포넌트
            </p>
          </div>

          {/* Basic Input */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Basic Input</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <LinedInput
                label="Placeholder"
                value={linedInputValue1}
                onChange={setLinedInputValue1}
              />

              <LinedInput
                label="Placeholder"
                value={linedInputValue2}
                onChange={setLinedInputValue2}
              />
            </div>
          </div>

          {/* Error State */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Error State</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <LinedInput
                label="Email"
                value={linedInputValue3}
                onChange={setLinedInputValue3}
                error="Selection Required"
              />
            </div>
          </div>

          {/* Disabled State */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Disabled State</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <LinedInput label="Placeholder" value="" onChange={() => {}} disabled />
              <LinedInput
                label="Placeholder"
                value="Disabled with value"
                onChange={() => {}}
                disabled
              />
            </div>
          </div>
        </section>

        {/* Checkbox Component */}
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-h3">Checkbox Component Test</h1>
            <p className="text-b1 text-zinc-600">Figma 디자인에 맞춘 체크박스 컴포넌트</p>
          </div>

          {/* Basic Checkbox */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Basic Checkbox</h2>
            <div className="flex flex-wrap gap-6">
              <Checkbox
                label="Label"
                checked={checked1}
                onCheckedChange={(checked) => {
                  if (checked !== 'indeterminate') setChecked1(checked);
                }}
              />
              <Checkbox
                label="Label"
                checked={checked2}
                onCheckedChange={(checked) => {
                  if (checked !== 'indeterminate') setChecked2(checked);
                }}
              />
              <Checkbox label="Label" />
            </div>
          </div>

          {/* Without Label */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Without Label</h2>
            <div className="flex flex-wrap gap-6">
              <Checkbox
                checked={checked3}
                onCheckedChange={(checked) => {
                  if (checked !== 'indeterminate') setChecked3(checked);
                }}
              />
              <Checkbox checked={true} />
              <Checkbox checked={false} />
            </div>
          </div>

          {/* Disabled State */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Disabled State</h2>
            <div className="flex flex-wrap gap-6">
              <Checkbox label="Label" disabled />
              <Checkbox label="Label" checked disabled />
              <Checkbox disabled />
              <Checkbox checked disabled />
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="flex flex-col gap-4">
            <h2 className="text-h5">Interactive Demo</h2>
            <div className="flex flex-col gap-4">
              <Checkbox
                label="동의합니다"
                checked={checked1}
                onCheckedChange={(checked) => {
                  if (checked !== 'indeterminate') setChecked1(checked);
                }}
              />
              <p className="text-c1 text-gray-text">상태: {checked1 ? '체크됨' : '체크 안됨'}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
