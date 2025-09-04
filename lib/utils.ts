import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RecipeIngredient, ShoppingListItem } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function generateMenuId(): string {
  // Get existing menus from localStorage to determine next sequential ID
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('restaurant-app-storage');
      if (stored) {
        const data = JSON.parse(stored);
        const menus = data.state?.menus || [];
        const maxId = Math.max(...menus.map((m: any) => parseInt(m.id) || 0), 0);
        return (maxId + 1).toString();
      }
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
    }
  }
  return '1'; // Fallback for first menu
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(date));
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}min`;
  }
  if (minutes > 0) {
    return `${minutes}min ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
}

export function scaleIngredients(ingredients: RecipeIngredient[], originalServings: number, newServings: number): RecipeIngredient[] {
  const scale = newServings / originalServings;
  
  return ingredients.map(ingredient => ({
    ...ingredient,
    quantity: Math.round((ingredient.quantity * scale) * 100) / 100,
  }));
}

export function aggregateShoppingList(recipes: Array<{ recipe: any; servings: number }>): ShoppingListItem[] {
  const aggregated: Record<string, ShoppingListItem> = {};
  
  recipes.forEach(({ recipe, servings }) => {
    const scaledIngredients = scaleIngredients(recipe.ingredients, recipe.servings, servings);
    
    scaledIngredients.forEach(ingredient => {
      const key = `${ingredient.ingredientName}-${ingredient.unit}`;
      
      if (aggregated[key]) {
        aggregated[key].totalQuantity += ingredient.quantity;
        if (!aggregated[key].recipes.includes(recipe.title)) {
          aggregated[key].recipes.push(recipe.title);
        }
      } else {
        aggregated[key] = {
          ingredientName: ingredient.ingredientName,
          totalQuantity: ingredient.quantity,
          unit: ingredient.unit,
          recipes: [recipe.title],
          category: getCategoryForIngredient(ingredient.ingredientName),
        };
      }
    });
  });
  
  return Object.values(aggregated);
}

function getCategoryForIngredient(ingredientName: string): string {
  const categories: Record<string, string> = {
    'Berinjela': 'Hortifruti',
    'Tomate': 'Hortifruti',
    'Pepino': 'Hortifruti',
    'Cebola roxa': 'Hortifruti',
    'Hortelã': 'Hortifruti',
    'Salsa': 'Hortifruti',
    'Limão': 'Hortifruti',
    'Queijo feta': 'Laticínios',
    'Carne moída': 'Açougue',
    'Grão de bico': 'Secos',
    'Arroz': 'Secos',
    'Lentilha': 'Secos',
    'Tahine': 'Temperos',
    'Azeite': 'Temperos',
    'Sal': 'Temperos',
    'Pimenta do reino': 'Temperos',
    'Orégano': 'Temperos',
  };
  
  return categories[ingredientName] || 'Outros';
}

export function getWeekRef(date: Date): string {
  const year = date.getFullYear();
  const start = new Date(year, 0, 1);
  const days = Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((days + start.getDay() + 1) / 7);
  return `${year}-${week.toString().padStart(2, '0')}`;
}