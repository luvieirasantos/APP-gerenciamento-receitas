import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Recipe, Menu, Category, AppSettings, Ingredient } from './types';

interface AppStore {
  // Recipes
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
  
  // Menus
  menus: Menu[];
  addMenu: (menu: Menu) => void;
  updateMenu: (id: string, menu: Partial<Menu>) => void;
  deleteMenu: (id: string) => void;
  
  // Categories
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  
  // Ingredients
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  
  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  
  // Kitchen Mode
  kitchenMode: {
    recipeId?: string;
    currentStep: number;
    servings: number;
    checkedSteps: boolean[];
  };
  setKitchenMode: (mode: Partial<AppStore['kitchenMode']>) => void;
  
  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // Initial state
      recipes: [],
      menus: [],
      categories: [],
      ingredients: [],
      settings: {
        printFontScale: 1,
        spacing: 'normal',
        showAllergens: true,
        mealNames: ['Café da Manhã', 'Almoço', 'Jantar'],
        defaultServings: 4,
        kitchenMode: {
          fontSize: 'large',
          autoAdvance: false,
          timerSound: true,
        },
      },
      kitchenMode: {
        currentStep: 0,
        servings: 4,
        checkedSteps: [],
      },
      sidebarOpen: false,

      // Actions
      addRecipe: (recipe) => set((state) => ({
        recipes: [...state.recipes, recipe]
      })),
      
      updateRecipe: (id, updates) => set((state) => ({
        recipes: state.recipes.map((recipe) =>
          recipe.id === id ? { ...recipe, ...updates, updatedAt: new Date().toISOString() } : recipe
        )
      })),
      
      deleteRecipe: (id) => set((state) => ({
        recipes: state.recipes.filter((recipe) => recipe.id !== id)
      })),
      
      addMenu: (menu) => set((state) => ({
        menus: [...state.menus, menu]
      })),
      
      updateMenu: (id, updates) => set((state) => ({
        menus: state.menus.map((menu) =>
          menu.id === id ? { ...menu, ...updates, updatedAt: new Date().toISOString() } : menu
        )
      })),
      
      deleteMenu: (id) => set((state) => ({
        menus: state.menus.filter((menu) => menu.id !== id)
      })),
      
      addCategory: (category) => set((state) => ({
        categories: [...state.categories, category]
      })),
      
      updateCategory: (id, updates) => set((state) => ({
        categories: state.categories.map((category) =>
          category.id === id ? { ...category, ...updates } : category
        )
      })),
      
      addIngredient: (ingredient) => set((state) => ({
        ingredients: [...state.ingredients, ingredient]
      })),
      
      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),
      
      setKitchenMode: (mode) => set((state) => ({
        kitchenMode: { ...state.kitchenMode, ...mode }
      })),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'restaurant-app-storage',
      partialize: (state) => ({
        recipes: state.recipes,
        menus: state.menus,
        categories: state.categories,
        ingredients: state.ingredients,
        settings: state.settings,
      }),
    }
  )
);