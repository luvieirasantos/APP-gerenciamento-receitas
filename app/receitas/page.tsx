'use client';

import { useState, useMemo } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function RecipesPage() {
  const { recipes, categories } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.ingredientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || recipe.categoryId === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchQuery, selectedCategory]);

  const favoriteRecipes = filteredRecipes.filter(recipe => recipe.isFavorite);
  const regularRecipes = filteredRecipes.filter(recipe => !recipe.isFavorite);

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header 
        title="Banco de Receitas"
        rightAction={
          <Button asChild size="sm">
            <Link href="/receitas/nova">
              <Plus className="h-4 w-4 mr-2" />
              Nova
            </Link>
          </Button>
        }
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar receita, ingrediente ou tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-lg py-6"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('')}
              className="whitespace-nowrap"
            >
              Todas
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredRecipes.length} receita{filteredRecipes.length !== 1 ? 's' : ''} encontrada{filteredRecipes.length !== 1 ? 's' : ''}
          </p>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchQuery('')}
            >
              Limpar busca
            </Button>
          )}
        </div>

        {/* Favorite Recipes */}
        {favoriteRecipes.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              ⭐ Receitas Favoritas
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* All Recipes */}
        {regularRecipes.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">
              {favoriteRecipes.length > 0 ? 'Outras Receitas' : 'Todas as Receitas'}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {regularRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredRecipes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? 'Nenhuma receita encontrada' : 'Nenhuma receita ainda'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {searchQuery 
                ? `Não encontramos receitas para "${searchQuery}". Tente buscar com outros termos.`
                : 'Comece criando sua primeira receita para o banco de dados.'
              }
            </p>
            <Button asChild size="lg">
              <Link href="/receitas/nova">
                <Plus className="h-5 w-5 mr-2" />
                Criar Primera Receita
              </Link>
            </Button>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}