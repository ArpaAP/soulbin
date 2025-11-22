import { redirect } from 'next/navigation';

export default function DiaryPage() {
  redirect('/dashboard/diary/write');
}
