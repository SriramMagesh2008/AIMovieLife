import "./globals.css";

export const metadata = {
  title: "AILifeMovie",
  description: "Turn memories into cinematic life stories"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}