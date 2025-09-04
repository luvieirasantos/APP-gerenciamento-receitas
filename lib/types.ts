export interface Ingredient {
  id: string;
  name: string;
  defaultUnit: string;
}

export interface RecipeIngredient {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
  note?: string;
}

export interface RecipeStep {
  order: number;
  text: string;
  photoUrl?: string;
  timerSeconds?: number;
}

export interface Recipe {
  id: string;
  title: string;
  categoryId: string;
  categoryName?: string;
  servings: number;
  totalTimeMin: number;
  difficulty?: 'fácil' | 'médio' | 'difícil';
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  notes?: string;
  allergens: string[];
  photos: string[];
  isDraft?: boolean;
  isFavorite?: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  recipeId?: string;
  customText?: string;
  note?: string;
}

export interface MenuSubcategory {
  name: string;
  type: 'fixo' | 'rotativo';
  items: MenuItem[];
}

export interface MenuCategory {
  name: string;
  subcategories: MenuSubcategory[];
}

export interface MenuDay {
  date: string;
  categories: MenuCategory[];
}

export interface Menu {
  id: string;
  title: string;
  weekRef: string;
  unit?: string;
  days: MenuDay[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: string;
  color?: string;
}

export interface ShoppingListItem {
  ingredientName: string;
  totalQuantity: number;
  unit: string;
  recipes: string[];
  category?: string;
}

export interface AppSettings {
  printFontScale: number;
  spacing: 'compact' | 'normal' | 'large';
  showAllergens: boolean;
  mealNames: string[];
  defaultServings: number;
  kitchenMode: {
    fontSize: 'normal' | 'large' | 'xlarge';
    autoAdvance: boolean;
    timerSound: boolean;
  };
}