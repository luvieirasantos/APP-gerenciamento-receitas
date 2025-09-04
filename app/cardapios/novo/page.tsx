'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Plus, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { useStore } from '@/lib/store';
import { generateId, generateMenuId, getWeekRef } from '@/lib/utils';
import { Menu, MenuDay } from '@/lib/types';

export default function NewMenuPage() {
  const router = useRouter();
  const { addMenu, settings } = useStore();
  
  const [menu, setMenu] = useState<Partial<Menu>>({
    title: '',
    unit: '',
    days: [],
  });

  const [daysCount, setDaysCount] = useState(5);

  const generateDays = () => {
    // Always start on Monday
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1); // Get Monday of current week

    const days: MenuDay[] = [];

    for (let i = 0; i < daysCount; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      const categories = [
        {
          name: 'Parte fria',
          subcategories: [
            { name: 'Fixo', type: 'fixo' as const, items: [] },
            { name: 'Rotativo', type: 'rotativo' as const, items: [] },
          ],
        },
        {
          name: 'Parte quente',
          subcategories: [
            { name: 'Fixo', type: 'fixo' as const, items: [] },
            { name: 'Rotativo', type: 'rotativo' as const, items: [] },
          ],
        },
        {
          name: 'Molhos',
          subcategories: [
            { name: 'Molhos', type: 'fixo' as const, items: [] },
          ],
        },
        {
          name: 'Adicionais',
          subcategories: [
            { name: 'Adicionais', type: 'fixo' as const, items: [] },
          ],
        },
      ];

      days.push({
        date: date.toISOString().split('T')[0],
        categories,
      });
    }

    setMenu(prev => ({ ...prev, days }));
  };

  const handleSave = () => {
    if (!menu.title || !menu.days?.length) {
      alert('Preencha o título e gere os dias do cardápio');
      return;
    }

    // Use current Monday for week reference
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    const weekRef = getWeekRef(monday);

    const newMenu: Menu = {
      id: generateMenuId(),
      title: menu.title,
      weekRef,
      unit: menu.unit || 'Principal',
      days: menu.days,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addMenu(newMenu);
    router.push(`/cardapios/${newMenu.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Novo Cardápio"
        rightAction={
          <Button onClick={handleSave} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        }
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Cardápio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={menu.title}
                onChange={(e) => setMenu(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Cardápio Semana 01 - Janeiro"
                className="text-lg py-6"
              />
            </div>
            
            <div>
              <Label htmlFor="unit">Unidade/Local (opcional)</Label>
              <Input
                id="unit"
                value={menu.unit}
                onChange={(e) => setMenu(prev => ({ ...prev, unit: e.target.value }))}
                placeholder="Ex: Matriz, Filial Centro, etc."
                className="text-lg py-6"
              />
            </div>
          </CardContent>
        </Card>

        {/* Menu Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Configuração do Cardápio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Período</Label>
              <p className="text-sm text-muted-foreground">
                O cardápio sempre começa na segunda-feira da semana atual
              </p>
            </div>

            <div>
              <Label htmlFor="daysCount">Quantidade de Dias</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  type="button"
                  variant={daysCount === 5 ? "default" : "outline"}
                  onClick={() => setDaysCount(5)}
                  className="flex-1"
                >
                  5 Dias (Seg-Sex)
                </Button>
                <Button
                  type="button"
                  variant={daysCount === 7 ? "default" : "outline"}
                  onClick={() => setDaysCount(7)}
                  className="flex-1"
                >
                  7 Dias (Seg-Dom)
                </Button>
              </div>
            </div>

            <Button onClick={generateDays} className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Gerar Estrutura de Dias
            </Button>
          </CardContent>
        </Card>

        {/* Generated Days Preview */}
        {menu.days && menu.days.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Estrutura Gerada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {menu.days.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <span className="font-medium">
                        {new Date(day.date).toLocaleDateString('pt-BR', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                      <div className="text-sm text-muted-foreground">
                        {day.categories.length} categorias: {day.categories.map(c => c.name).join(', ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Estrutura criada! Após salvar, você poderá adicionar receitas a cada refeição.
                </p>
                <Button onClick={handleSave} size="lg" className="w-full">
                  <Save className="h-5 w-5 mr-2" />
                  Salvar e Continuar Editando
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cancel Button */}
        <Button variant="outline" onClick={() => router.back()} className="w-full">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
      </main>
    </div>
  );
}