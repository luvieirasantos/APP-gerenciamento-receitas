'use client';

import { useState } from 'react';
import { Plus, Calendar, Filter, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { MenuDayCard } from '@/components/menu/MenuDayCard';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function MenusPage() {
  const { menus, deleteMenu } = useStore();
  const [selectedWeek, setSelectedWeek] = useState<string>('');

  const filteredMenus = selectedWeek
    ? menus.filter(menu => menu.weekRef === selectedWeek)
    : menus;

  const handleDelete = (menuId: string, menuTitle: string) => {
    if (confirm(`Tem certeza que deseja deletar o cardápio "${menuTitle}"?`)) {
      deleteMenu(menuId);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header 
        title="Cardápios"
        rightAction={
          <Button asChild size="sm">
            <Link href="/cardapios/novo">
              <Plus className="h-4 w-4 mr-2" />
              Novo
            </Link>
          </Button>
        }
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{menus.length}</div>
              <p className="text-sm text-muted-foreground">Cardápios criados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {menus.reduce((acc, menu) => acc + menu.days.length, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Dias planejados</p>
            </CardContent>
          </Card>
        </div>

        {/* Menus List */}
        {filteredMenus.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Cardápios Salvos</h2>
            {filteredMenus.map((menu) => (
              <Link key={menu.id} href={`/cardapios/${menu.id}`}>
                <Card className="transition-all hover:shadow-md active:scale-[0.98]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{menu.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{menu.weekRef}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(menu.id, menu.title);
                          }}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {menu.unit && (
                      <p className="text-sm text-muted-foreground">Unidade: {menu.unit}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{menu.days.length} dias</span>
                        </div>
                        <div>
                          {menu.days.reduce((acc, day) => acc + (day.categories?.length || 0), 0)} categorias
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {menu.days.slice(0, 3).map((day) => (
                          <Badge key={day.date} variant="outline" className="text-xs">
                            {new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' })}
                          </Badge>
                        ))}
                        {menu.days.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{menu.days.length - 3} dias
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Calendar className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum cardápio ainda</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Comece criando seu primeiro cardápio semanal para organizar as refeições.
            </p>
            <Button asChild size="lg">
              <Link href="/cardapios/novo">
                <Plus className="h-5 w-5 mr-2" />
                Criar Primeiro Cardápio
              </Link>
            </Button>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}