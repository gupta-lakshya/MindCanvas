export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-screen overflow-hidden bg-cream">{children}</div>;
}
