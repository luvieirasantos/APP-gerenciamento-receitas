'use client';

import { useState, useMemo } from 'react';
import { ShoppingCart, Download, Package, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { ShoppingListCard } from '@/components/shopping/ShoppingListCard';
import { useStore } from '@/lib/store';
import { aggregateShoppingList } from '@/lib/utils';

export default function ShoppingListPage() {
  const { menus, recipes } = useStore();
  const [selectedMenuId, setSelectedMenuId] = useState<string>('');

  const shoppingList = useMemo(() => {
    if (!selectedMenuId) return [];
    
    const menu = menus.find(m => m.id === selectedMenuId);
    if (!menu) return [];

    const recipesWithServings: Array<{ recipe: any; servings: number }> = [];
    
    menu.days.forEach(day => {
      day.meals.forEach(meal => {
        meal.items.forEach(item => {
          if (item.recipeId) {
            const recipe = recipes.find(r => r.id === item.recipeId);
            if (recipe) {
              recipesWithServings.push({
                recipe,
                servings: recipe.servings, // Could be customized per menu item
              });
            }
          }
        });
      });
    });

    return aggregateShoppingList(recipesWithServings);
  }, [selectedMenuId, menus, recipes]);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, typeof shoppingList> = {};
    shoppingList.forEach(item => {
      const category = item.category || 'Outros';
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
    });
    return groups;
  }, [shoppingList]);

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header 
        title="Lista de Compras"
        rightAction={
          shoppingList.length > 0 && (
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          )
        }
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Menu Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Selecionar Cardápio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedMenuId} onValueChange={setSelectedMenuId}>
              <SelectTrigger className="text-lg py-6">
                <SelectValue placeholder="Escolha um cardápio para gerar a lista" />
              </SelectTrigger>
              <SelectContent>
                {menus.map((menu) => (
                  <SelectItem key={menu.id} value={menu.id}>
                    {menu.title} ({menu.weekRef})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Shopping List */}
        {shoppingList.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Lista Agregada</h2>
              <div className="text-sm text-muted-foreground">
                {shoppingList.length} itens diferentes
              </div>
            </div>

            {Object.entries(groupedByCategory).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <h3 className="font-medium text-primary flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  {category}
                </h3>
                <div className="space-y-2 pl-6">
                  {items.map((item, index) => (
                    <ShoppingListCard key={index} item={item} />
                  ))}
                </div>
              </div>
            ))}
            
            {/* Export Options */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">Lista pronta para usar!</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar PDF
                    </Button>
                    <Button className="h-12">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : selectedMenuId ? (
          <div className="text-center py-12">
            <div className="rounded-full bg-muted p-6 mb-4 mx-auto w-fit">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lista vazia</h3>
            <p className="text-muted-foreground">
              Este cardápio não possui receitas com ingredientes.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="rounded-full bg-muted p-6 mb-4 mx-auto w-fit">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Selecione um cardápio</h3>
            <p className="text-muted-foreground">
              Escolha um cardápio acima para gerar a lista de compras.
            </p>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}