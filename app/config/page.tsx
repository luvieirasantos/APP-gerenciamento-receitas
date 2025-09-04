'use client';

import { useState } from 'react';
import { Settings, Save, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { useStore } from '@/lib/store';

export default function ConfigPage() {
  const { settings, categories, updateSettings, addCategory } = useStore();
  const [newMealName, setNewMealName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const addMeal = () => {
    if (!newMealName.trim()) return;
    updateSettings({
      mealNames: [...settings.mealNames, newMealName.trim()]
    });
    setNewMealName('');
  };

  const removeMeal = (index: number) => {
    updateSettings({
      mealNames: settings.mealNames.filter((_, i) => i !== index)
    });
  };

  const addNewCategory = () => {
    if (!newCategoryName.trim()) return;
    addCategory({
      id: Math.random().toString(36).substring(2, 15),
      name: newCategoryName.trim(),
      type: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
    });
    setNewCategoryName('');
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header 
        title="Configurações"
        rightAction={
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        }
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Porções Padrão</Label>
              <Select 
                value={settings.defaultServings.toString()} 
                onValueChange={(value) => updateSettings({ defaultServings: parseInt(value) })}
              >
                <SelectTrigger className="text-lg py-6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[2, 4, 6, 8, 10, 12].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} porções
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Espaçamento na Impressão</Label>
              <Select 
                value={settings.spacing} 
                onValueChange={(value: 'compact' | 'normal' | 'large') => updateSettings({ spacing: value })}
              >
                <SelectTrigger className="text-lg py-6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compacto</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="large">Espaçado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Mostrar Alergênicos</Label>
                <p className="text-sm text-muted-foreground">
                  Exibe avisos de alergênicos nas receitas
                </p>
              </div>
              <Switch
                checked={settings.showAllergens}
                onCheckedChange={(checked) => updateSettings({ showAllergens: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Kitchen Mode Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Modo Cozinha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Tamanho da Fonte</Label>
              <Select 
                value={settings.kitchenMode.fontSize} 
                onValueChange={(value: 'normal' | 'large' | 'xlarge') => 
                  updateSettings({ 
                    kitchenMode: { ...settings.kitchenMode, fontSize: value }
                  })
                }
              >
                <SelectTrigger className="text-lg py-6">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                  <SelectItem value="xlarge">Muito Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Avanço Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Passa automaticamente para o próximo passo
                </p>
              </div>
              <Switch
                checked={settings.kitchenMode.autoAdvance}
                onCheckedChange={(checked) => 
                  updateSettings({ 
                    kitchenMode: { ...settings.kitchenMode, autoAdvance: checked }
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Som do Timer</Label>
                <p className="text-sm text-muted-foreground">
                  Toca um som quando o timer termina
                </p>
              </div>
              <Switch
                checked={settings.kitchenMode.timerSound}
                onCheckedChange={(checked) => 
                  updateSettings({ 
                    kitchenMode: { ...settings.kitchenMode, timerSound: checked }
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Meal Names */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Refeição</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {settings.mealNames.map((meal, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="font-medium">{meal}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMeal(index)}
                    disabled={settings.mealNames.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Nova refeição"
                value={newMealName}
                onChange={(e) => setNewMealName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addMeal()}
              />
              <Button onClick={addMeal} disabled={!newMealName.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Categorias de Receitas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <span className="font-medium">{category.name}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Nova categoria"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addNewCategory()}
              />
              <Button onClick={addNewCategory} disabled={!newCategoryName.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Gerenciar Dados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Exportar Todos os Dados
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                Limpar Cache Offline
              </Button>
              
              <Button variant="destructive" className="w-full justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Resetar Aplicativo
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              ⚠️ Ações destrutivas não podem ser desfeitas. Faça backup dos dados importantes.
            </p>
          </CardContent>
        </Card>
      </main>
      
      <BottomNav />
    </div>
  );
}