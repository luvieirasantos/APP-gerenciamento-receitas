'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Plus, Upload, ShoppingCart, Calendar, BookOpen, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { useStore } from '@/lib/store';
import { initializeSeedData } from '@/lib/seed-data';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const { recipes, menus } = useStore();

  useEffect(() => {
    initializeSeedData();
  }, []);

  const quickActions = [
    {
      title: 'Novo Cardápio',
      description: 'Monte o cardápio da semana',
      icon: Calendar,
      href: '/cardapios/novo',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      title: 'Nova Receita',
      description: 'Adicione uma receita ao banco',
      icon: BookOpen,
      href: '/receitas/nova',
      color: 'bg-green-50 text-green-600 border-green-200',
    },
    {
      title: 'Lista de Compras',
      description: 'Veja os ingredientes necessários',
      icon: ShoppingCart,
      href: '/lista-compras',
      color: 'bg-orange-50 text-orange-600 border-orange-200',
    },
    {
      title: 'Importar Planilha',
      description: 'Importe dados de Excel/CSV',
      icon: Upload,
      href: '/importar',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header title="Cardápios & Receitas" />
      
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Sistema de Cardápios</h1>
          </div>
          <p className="text-muted-foreground">
            Gerencie receitas e cardápios de forma simples e visual
          </p>
        </div>

        {/* Quick Actions Grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Ações Rápidas</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} href={action.href}>
                  <Card className="h-full transition-all hover:shadow-md active:scale-[0.98]">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={cn("rounded-lg p-3 border", action.color)}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{action.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                        <Plus className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Atividade Recente</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/receitas">Ver Todas</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  Receitas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recipes.length}</div>
                <p className="text-sm text-muted-foreground">
                  receitas no seu banco
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Cardápios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{menus.length}</div>
                <p className="text-sm text-muted-foreground">
                  cardápios criados
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* My Menus */}
        {menus.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Meus Cardápios</h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/cardapios">Ver Todos</Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {menus.slice(0, 6).map((menu) => (
                <Link key={menu.id} href={`/cardapios/${menu.id}`}>
                  <Card className="h-full transition-all hover:shadow-md active:scale-[0.98]">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-blue-50 p-3 border border-blue-200">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{menu.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {menu.days.length} dias • {menu.unit || 'Principal'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Kitchen Mode Quick Access */}
        {recipes.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Modo Cozinha</h2>
            <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-orange-100 p-3">
                    <ChefHat className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Última Receita</h3>
                    <p className="text-sm text-muted-foreground">
                      {recipes[0]?.title || 'Nenhuma receita encontrada'}
                    </p>
                  </div>
                  {recipes[0] && (
                    <Button asChild>
                      <Link href={`/receitas/${recipes[0].id}/cozinha`}>
                        Cozinhar
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}