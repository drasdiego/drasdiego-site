import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjetoDetalhe } from '@/components/ProjetosPages';
import { PROJETOS, findProjeto } from '@/lib/projetos';
import { buildPageMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJETOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const projeto = findProjeto(slug);
  if (!projeto) return {};
  return buildPageMetadata('en', `/projetos/${slug}`, projeto.en.title, projeto.en.short);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projeto = findProjeto(slug);
  if (!projeto) notFound();
  return <ProjetoDetalhe lang="en" projeto={projeto} />;
}
