'use client';

import { useParams, useRouter } from 'next/navigation';
import { Clock, Users, Star, Heart, Edit, Trash2, Play, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { recipes, updateRecipe, deleteRecipe } = useStore();
  
  const recipe = recipes.find(r => r.id === params.id);
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header title="Receita não encontrada" />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Receita não encontrada</h2>
            <p className="text-muted-foreground">A receita que você procura não existe.</p>
            <Button asChild>
              <Link href="/receitas">Voltar às Receitas</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja deletar esta receita?')) {
      deleteRecipe(recipe.id);
      router.push('/receitas');
    }
  };

  const handleFavorite = () => {
    updateRecipe(recipe.id, { isFavorite: !recipe.isFavorite });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        title={recipe.title}
        rightAction={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleFavorite}>
              <Heart className={cn(
                "h-4 w-4",
                recipe.isFavorite ? "fill-red-500 text-red-500" : ""
              )} />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/receitas/${recipe.id}/editar`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        }
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Image */}
        {recipe.photos[0] && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={recipe.photos[0]}
              alt={recipe.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Recipe Info */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{recipe.title}</h1>
                <Badge>{recipe.categoryName}</Badge>
              </div>
              
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.totalTimeMin}min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{recipe.servings} porções</span>
                </div>
                {recipe.difficulty && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span className="capitalize">{recipe.difficulty}</span>
                  </div>
                )}
              </div>

              {recipe.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {recipe.allergens.length > 0 && (
                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                  <p className="text-sm font-medium text-yellow-800">
                    ⚠️ Contém: {recipe.allergens.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card>
          <CardHeader>
            <CardTitle>Ingredientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="font-medium">{ingredient.ingredientName}</span>
                <div className="text-right">
                  <span className="font-medium text-primary">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                  {ingredient.note && (
                    <p className="text-xs text-muted-foreground">{ingredient.note}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Modo de Preparo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recipe.steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  {step.order}
                </div>
                <div className="flex-1 space-y-2">
                  <p className="leading-relaxed">{step.text}</p>
                  {step.timerSeconds && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {Math.floor(step.timerSeconds / 60)}min {step.timerSeconds % 60}s
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notes */}
        {recipe.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed">{recipe.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button asChild size="lg" className="h-14">
            <Link href={`/receitas/${recipe.id}/cozinha`}>
              <Play className="h-5 w-5 mr-2" />
              Modo Cozinha
            </Link>
          </Button>
          
          <Button variant="destructive" size="lg" onClick={handleDelete} className="h-14">
            <Trash2 className="h-5 w-5 mr-2" />
            Deletar
          </Button>
        </div>
      </main>
    </div>
  );
}