import SideBar from '@/components/SideBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-5 max-h-screen max-w-screen">
      <SideBar />
      <div className="flex-1 px-5 pt-10">{children}</div>
    </div>
  );
}
