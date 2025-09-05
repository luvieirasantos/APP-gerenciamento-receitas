'use client';

import { Clock, Users, Star, Heart, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Recipe } from '@/lib/types';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const { updateRecipe } = useStore();

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateRecipe(recipe.id, { isFavorite: !recipe.isFavorite });
  };

  if (onClick) {
    return (
      <div onClick={onClick} className="block">
        <Card className="h-full transition-all hover:shadow-md active:scale-[0.98]">
          <CardHeader className="p-0">
            <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
              {recipe.photos[0] ? (
                <Image
                  src={recipe.photos[0]}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <BookOpen className="h-12 w-12" />
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavorite}
                className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm"
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    recipe.isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                  )}
                />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-medium line-clamp-2">{recipe.title}</h3>
                {recipe.categoryName && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {recipe.categoryName}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {recipe.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{recipe.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Link href={`/receitas/${recipe.id}`} className="block">
      <Card className="h-full transition-all hover:shadow-md active:scale-[0.98]">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
            {recipe.photos[0] ? (
              <Image
                src={recipe.photos[0]}
                alt={recipe.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <BookOpen className="h-12 w-12" />
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavorite}
              className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  recipe.isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                )}
              />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-medium line-clamp-2">{recipe.title}</h3>
              {recipe.categoryName && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {recipe.categoryName}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
              <div className="flex flex-wrap gap-1">
                {recipe.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {recipe.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{recipe.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}