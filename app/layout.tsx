import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await params để lấy locale theo chuẩn Next.js 16
  const { locale } = await params;

  const isVi = locale === "vi";

  // Định tuyến đường dẫn ảnh tương ứng với ngôn ngữ
  const ogImageUrl = isVi ? "/jp.png" : "/ko.png";

  return {
    title: isVi ? "Trang chủ" : "Home",
    openGraph: {
      title: isVi ? "Tiêu đề chia sẻ" : "Share Title",
      description: isVi ? "Mô tả chia sẻ" : "Share Description",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: isVi ? "Ảnh đại diện tiếng Việt" : "English OG Image",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
