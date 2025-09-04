import { Metadata } from 'next';
import MenuDetailClient from './MenuDetailClient';

export async function generateStaticParams() {
  // Now using sequential IDs (1, 2, 3, etc.) for menus
  // Generate static params for the first 200 possible menu IDs
  const ids = [];
  for (let i = 1; i <= 200; i++) {
    ids.push({ id: i.toString() });
  }
  return ids;
}

export const metadata: Metadata = {
  title: 'Detalhes do Cardápio',
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function MenuDetailPage({ params }: PageProps) {
  return <MenuDetailClient menuId={params.id} />;
}