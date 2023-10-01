export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <main
      className={"min-h-screen bg-slate-50 flex justify-center items-center"}
    >
      {children}
    </main>
  );
}
