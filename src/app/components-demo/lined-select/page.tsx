'use client';

import { useState } from 'react';

import {
  LinedSelect,
  LinedSelectItem,
} from '@/components/ui/lined-select';

export default function LinedSelectDemo() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('option2');
  const [value3, setValue3] = useState('');

  return (
    <div className="min-h-screen bg-white p-g6">
      <div className="mx-auto max-w-4xl space-y-g8">
        <div>
          <h1 className="text-h1 mb-g4">Lined Select Component</h1>
          <p className="text-b2 text-gray-text">
            하단 border만 있는 선택 컴포넌트입니다. 라벨이 플로팅 애니메이션으로 동작합니다.
          </p>
        </div>

        {/* Default State */}
        <section className="space-y-g4">
          <h2 className="text-h3">기본 상태 (Default)</h2>
          <div className="w-[300px]">
            <LinedSelect
              label="Label"
              value={value1}
              onValueChange={setValue1}
            >
              <LinedSelectItem value="option1">Menu Element 1</LinedSelectItem>
              <LinedSelectItem value="option2">Menu Element 2</LinedSelectItem>
              <LinedSelectItem value="option3">Menu Element 3</LinedSelectItem>
              <LinedSelectItem value="option4">Menu Element 4</LinedSelectItem>
            </LinedSelect>
          </div>
          <p className="text-b3 text-gray-text">
            선택된 값: {value1 || '없음'}
          </p>
        </section>

        {/* Selected State */}
        <section className="space-y-g4">
          <h2 className="text-h3">선택된 상태 (Populated)</h2>
          <div className="w-[300px]">
            <LinedSelect
              label="Label"
              value={value2}
              onValueChange={setValue2}
            >
              <LinedSelectItem value="option1">Menu Element 1</LinedSelectItem>
              <LinedSelectItem value="option2">Menu Element 2</LinedSelectItem>
              <LinedSelectItem value="option3">Menu Element 3</LinedSelectItem>
              <LinedSelectItem value="option4">Menu Element 4</LinedSelectItem>
            </LinedSelect>
          </div>
          <p className="text-b3 text-gray-text">
            선택된 값: {value2}
          </p>
        </section>

        {/* Error State */}
        <section className="space-y-g4">
          <h2 className="text-h3">에러 상태 (Error)</h2>
          <div className="w-[300px]">
            <LinedSelect
              label="Label"
              value={value3}
              onValueChange={setValue3}
              error="Selection Required"
            >
              <LinedSelectItem value="option1">Menu Element 1</LinedSelectItem>
              <LinedSelectItem value="option2">Menu Element 2</LinedSelectItem>
              <LinedSelectItem value="option3">Menu Element 3</LinedSelectItem>
              <LinedSelectItem value="option4">Menu Element 4</LinedSelectItem>
            </LinedSelect>
          </div>
        </section>

        {/* Multiple Instances */}
        <section className="space-y-g4">
          <h2 className="text-h3">여러 개의 선택 박스</h2>
          <div className="space-y-g5">
            <div className="w-[300px]">
              <LinedSelect label="First Select" value="" onValueChange={() => {}}>
                <LinedSelectItem value="a">Option A</LinedSelectItem>
                <LinedSelectItem value="b">Option B</LinedSelectItem>
              </LinedSelect>
            </div>
            <div className="w-[300px]">
              <LinedSelect label="Second Select" value="" onValueChange={() => {}}>
                <LinedSelectItem value="1">Option 1</LinedSelectItem>
                <LinedSelectItem value="2">Option 2</LinedSelectItem>
              </LinedSelect>
            </div>
          </div>
        </section>

        {/* States Explanation */}
        <section className="space-y-g4">
          <h2 className="text-h3">상태 설명</h2>
          <ul className="text-b2 list-disc list-inside space-y-g2">
            <li>
              <strong>Default (기본)</strong>: 라벨이 중앙에 위치, 하단 border 회색, 아래 화살표
            </li>
            <li>
              <strong>Focus (포커스)</strong>: 클릭 시 라벨이 위로 이동하며 초록색으로 변경,
              드롭다운 메뉴 펼쳐짐, border 초록색, 위 화살표
            </li>
            <li>
              <strong>Populated (선택됨)</strong>: 값 선택 후 라벨이 위쪽에 회색으로 유지,
              선택된 값 표시, border 회색
            </li>
            <li>
              <strong>Error (에러)</strong>: border와 라벨이 빨간색, 하단에 에러 메시지 표시
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
