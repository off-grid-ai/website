import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Off Grid AI - Run AI Locally on Your Phone',
  description:
    'Run AI on iOS, Android, macOS, and Windows using hardware you own. Local models keep your prompts on your device; remote models connect only to servers you choose.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
