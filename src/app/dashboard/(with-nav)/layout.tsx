import { DashboardNavigation } from '@/components/DashboardNavigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Navigation */}
      <div className="pb-[76px]">{children}</div>

      <DashboardNavigation />
    </>
  );
}
