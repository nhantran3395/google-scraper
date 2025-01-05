export default function UnauthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <main className={"min-h-screen bg-slate-50 flex flex-1"}>{children}</main>
  );
}
