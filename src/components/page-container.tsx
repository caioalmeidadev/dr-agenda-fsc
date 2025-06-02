export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 p-6" w-full>
      {children}
    </div>
  );
}

export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  );
}

export function PageHeaderContent({ children }: { children: React.ReactNode }) {
  return <div className="w-full space-y-1">{children}</div>;
}

export function PageTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-2xl font-bold">{children}</div>;
}

export function PageDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-muted-foregrond text-sm">{children}</div>;
}
export function PageActions({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>;
}

export function PageContent({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}
