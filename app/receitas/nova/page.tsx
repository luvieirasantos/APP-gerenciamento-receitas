'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Plus, Clock, Users, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/layout/Header';
import { useStore } from '@/lib/store';
import { generateId } from '@/lib/utils';
import { Recipe, RecipeIngredient, RecipeStep } from '@/lib/types';

export default function NewRecipePage() {
  const router = useRouter();
  const { categories, ingredients, addRecipe, settings } = useStore();
  
  const [recipe, setRecipe] = useState<Partial<Recipe>>({
    title: '',
    categoryId: '',
    servings: settings.defaultServings,
    totalTimeMin: 30,
    ingredients: [],
    steps: [],
    notes: '',
    allergens: [],
    photos: [],
    tags: [],
    difficulty: 'fácil',
  });

  const [currentIngredient, setCurrentIngredient] = useState({
    ingredientName: '',
    quantity: 0,
    unit: '',
    note: '',
  });

  const [currentStep, setCurrentStep] = useState({
    text: '',
    timerSeconds: 0,
    photoUrl: '',
  });

  const addIngredient = () => {
    if (!currentIngredient.ingredientName || !currentIngredient.quantity) return;
    
    const newIngredient: RecipeIngredient = {
      ingredientId: generateId(),
      ingredientName: currentIngredient.ingredientName,
      quantity: currentIngredient.quantity,
      unit: currentIngredient.unit,
      note: currentIngredient.note || undefined,
    };
    
    setRecipe(prev => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), newIngredient],
    }));
    
    setCurrentIngredient({ ingredientName: '', quantity: 0, unit: '', note: '' });
  };

  const addStep = () => {
    if (!currentStep.text) return;
    
    const newStep: RecipeStep = {
      order: (recipe.steps?.length || 0) + 1,
      text: currentStep.text,
      photoUrl: currentStep.photoUrl || undefined,
      timerSeconds: currentStep.timerSeconds || undefined,
    };
    
    setRecipe(prev => ({
      ...prev,
      steps: [...(prev.steps || []), newStep],
    }));
    
    setCurrentStep({ text: '', timerSeconds: 0, photoUrl: '' });
  };

  const handleSave = () => {
    if (!recipe.title || !recipe.categoryId) {
      alert('Preencha pelo menos o título e a categoria');
      return;
    }

    const newRecipe: Recipe = {
      id: generateId(),
      title: recipe.title,
      categoryId: recipe.categoryId,
      categoryName: categories.find(c => c.id === recipe.categoryId)?.name,
      servings: recipe.servings || settings.defaultServings,
      totalTimeMin: recipe.totalTimeMin || 30,
      difficulty: recipe.difficulty || 'fácil',
      ingredients: recipe.ingredients || [],
      steps: recipe.steps || [],
      notes: recipe.notes,
      allergens: recipe.allergens || [],
      photos: recipe.photos || [],
      tags: recipe.tags || [],
      isDraft: false,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addRecipe(newRecipe);
    router.push(`/receitas/${newRecipe.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title="Nova Receita"
        rightAction={
          <Button onClick={handleSave} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        }
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6 mb-20 lg:mb-0">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título da Receita</Label>
              <Input
                id="title"
                value={recipe.title}
                onChange={(e) => setRecipe(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Babaganuche Tradicional"
                className="text-lg py-6"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={recipe.categoryId}
                onValueChange={(value) => setRecipe(prev => ({ ...prev, categoryId: value }))}
              >
                <SelectTrigger className="text-lg py-6">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="servings" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Porções
                </Label>
                <Input
                  id="servings"
                  type="number"
                  value={recipe.servings}
                  onChange={(e) => setRecipe(prev => ({ ...prev, servings: parseInt(e.target.value) }))}
                  min={1}
                  className="text-lg py-6"
                />
              </div>
              
              <div>
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Tempo (min)
                </Label>
                <Input
                  id="time"
                  type="number"
                  value={recipe.totalTimeMin}
                  onChange={(e) => setRecipe(prev => ({ ...prev, totalTimeMin: parseInt(e.target.value) }))}
                  min={1}
                  className="text-lg py-6"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card>
          <CardHeader>
            <CardTitle>Ingredientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recipe.ingredients?.map((ingredient, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div>
                  <span className="font-medium">{ingredient.ingredientName}</span>
                  <span className="ml-2 text-muted-foreground">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                  {ingredient.note && (
                    <span className="ml-2 text-xs text-muted-foreground">({ingredient.note})</span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setRecipe(prev => ({
                      ...prev,
                      ingredients: prev.ingredients?.filter((_, i) => i !== index),
                    }));
                  }}
                >
                  Remover
                </Button>
              </div>
            ))}
            
            {/* Add Ingredient Form */}
            <div className="space-y-3 rounded-lg border p-4">
              <h4 className="font-medium">Adicionar Ingrediente</h4>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="Nome do ingrediente"
                  value={currentIngredient.ingredientName}
                  onChange={(e) => setCurrentIngredient(prev => ({ ...prev, ingredientName: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Qtd"
                    value={currentIngredient.quantity || ''}
                    onChange={(e) => setCurrentIngredient(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 0 }))}
                  />
                  <Input
                    placeholder="Unidade"
                    value={currentIngredient.unit}
                    onChange={(e) => setCurrentIngredient(prev => ({ ...prev, unit: e.target.value }))}
                  />
                </div>
              </div>
              <Input
                placeholder="Observação (opcional)"
                value={currentIngredient.note}
                onChange={(e) => setCurrentIngredient(prev => ({ ...prev, note: e.target.value }))}
              />
              <Button onClick={addIngredient} size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Ingrediente
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Modo de Preparo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recipe.steps?.map((step, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {step.order}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{step.text}</p>
                    {step.timerSeconds && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {Math.floor(step.timerSeconds / 60)}min {step.timerSeconds % 60}s
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setRecipe(prev => ({
                        ...prev,
                        steps: prev.steps?.filter((_, i) => i !== index)
                          .map((s, i) => ({ ...s, order: i + 1 })),
                      }));
                    }}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            ))}
            
            {/* Add Step Form */}
            <div className="space-y-3 rounded-lg border p-4">
              <h4 className="font-medium">
                Passo {(recipe.steps?.length || 0) + 1}
              </h4>
              <Textarea
                placeholder="Descreva o passo do preparo..."
                value={currentStep.text}
                onChange={(e) => setCurrentStep(prev => ({ ...prev, text: e.target.value }))}
                rows={3}
                className="resize-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Timer (opcional)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      onChange={(e) => {
                        const minutes = parseInt(e.target.value) || 0;
                        setCurrentStep(prev => ({ 
                          ...prev, 
                          timerSeconds: (minutes * 60) + (prev.timerSeconds % 60) 
                        }));
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Seg"
                      onChange={(e) => {
                        const seconds = parseInt(e.target.value) || 0;
                        setCurrentStep(prev => ({ 
                          ...prev, 
                          timerSeconds: Math.floor(prev.timerSeconds / 60) * 60 + seconds 
                        }));
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Label>Foto (URL)</Label>
                  <Input
                    placeholder="https://..."
                    value={currentStep.photoUrl}
                    onChange={(e) => setCurrentStep(prev => ({ ...prev, photoUrl: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={addStep} size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Passo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
              <Input
                id="tags"
                placeholder="Ex: árabe, vegetariano, entrada"
                value={recipe.tags?.join(', ')}
                onChange={(e) => setRecipe(prev => ({ 
                  ...prev, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) 
                }))}
              />
            </div>
            
            <div>
              <Label htmlFor="allergens">Alergênicos (separados por vírgula)</Label>
              <Input
                id="allergens"
                placeholder="Ex: glúten, leite, ovos"
                value={recipe.allergens?.join(', ')}
                onChange={(e) => setRecipe(prev => ({ 
                  ...prev, 
                  allergens: e.target.value.split(',').map(allergen => allergen.trim()).filter(Boolean) 
                }))}
              />
            </div>
            
            <div>
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                placeholder="Dicas, conservação, variações..."
                value={recipe.notes}
                onChange={(e) => setRecipe(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Section */}
        <div className="sticky bottom-20 lg:bottom-0 bg-background border-t p-4 -mx-4">
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.back()} className="flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Salvar Receita
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}