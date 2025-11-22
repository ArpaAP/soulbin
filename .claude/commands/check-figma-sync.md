# Check Figma Design Variables Sync

Figma 디자인의 디자인 변수와 `src/app/globals.css`의 Tailwind CSS v4 커스텀 테마 변수가 동기화되어 있는지 확인합니다.

## 작업 순서

1. **Figma 디자인 변수 가져오기**
   - `mcp__figma-desktop__get_variable_defs` 도구를 사용하여 현재 Figma 파일의 디자인 변수 정의를 가져옵니다
   - clientLanguages: "typescript"
   - clientFrameworks: "react,nextjs,tailwindcss"

2. **globals.css 파싱**
   - `src/app/globals.css` 파일을 읽어 `@theme inline` 블록 내의 모든 커스텀 변수를 추출합니다
   - 다음 카테고리로 분류:
     - Typography (--text-h1, --text-b1, --text-l1, --text-c1 등)
     - Spacing (--spacing-g0 ~ g8)
     - Border Width (--border-width-bw1 ~ bw3)
     - Border Radius (--radius-br1 ~ br4)
     - Colors (--color-primary-green, --color-white, 등)

3. **비교 분석**
   - Figma 변수와 globals.css 변수를 비교하여:
     - ✅ **완벽히 동기화된 변수들** (이름과 값이 일치)
     - ⚠️ **값이 다른 변수들** (이름은 같지만 값이 다름)
     - ➕ **Figma에만 있는 변수들** (globals.css에 추가 필요)
     - ➖ **globals.css에만 있는 변수들** (Figma에 없거나 더 이상 사용되지 않음)

4. **결과 보고**
   - 각 카테고리별로 명확하게 정리된 결과를 출력합니다
   - 불일치가 있는 경우 구체적인 권장사항을 제시합니다
   - 동기화가 필요한 변수가 있다면 업데이트 방법을 안내합니다

## 참고사항

- Figma Desktop 앱이 실행 중이어야 합니다
- Figma에서 확인하려는 파일이 열려 있어야 합니다
- CLAUDE.md의 "Figma Design Integration" 섹션에 명시된 대로, 디자인 토큰은 Figma 디자인 변수와 동기화되어야 합니다
