import type { Metadata, Viewport } from 'next';
import '../../globals.css';
import { RootShell } from '@/components/RootShell';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata('en');

export const viewport: Viewport = {
  themeColor: '#f7f8fa',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
