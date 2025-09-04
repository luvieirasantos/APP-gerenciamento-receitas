import { Recipe, Category, Ingredient, Menu } from './types';
import { useStore } from './store';

export const seedCategories: Category[] = [
  { id: '1', name: 'Entradas e Pastas', type: 'entradas', color: '#3B82F6' },
  { id: '2', name: 'Saladas', type: 'saladas', color: '#10B981' },
  { id: '3', name: 'Pratos & Acompanhamentos', type: 'pratos', color: '#F59E0B' },
  { id: '4', name: 'Molhos', type: 'molhos', color: '#EF4444' },
];

export const seedIngredients: Ingredient[] = [
  { id: '1', name: 'Berinjela', defaultUnit: 'kg' },
  { id: '2', name: 'Grão de bico', defaultUnit: 'g' },
  { id: '3', name: 'Tahine', defaultUnit: 'ml' },
  { id: '4', name: 'Limão', defaultUnit: 'unidade' },
  { id: '5', name: 'Alho', defaultUnit: 'dente' },
  { id: '6', name: 'Azeite', defaultUnit: 'ml' },
  { id: '7', name: 'Sal', defaultUnit: 'g' },
  { id: '8', name: 'Pimenta do reino', defaultUnit: 'g' },
  { id: '9', name: 'Tomate', defaultUnit: 'kg' },
  { id: '10', name: 'Pepino', defaultUnit: 'unidade' },
  { id: '11', name: 'Cebola roxa', defaultUnit: 'unidade' },
  { id: '12', name: 'Azeitona', defaultUnit: 'g' },
  { id: '13', name: 'Queijo feta', defaultUnit: 'g' },
  { id: '14', name: 'Orégano', defaultUnit: 'g' },
  { id: '15', name: 'Trigo para quibe', defaultUnit: 'g' },
  { id: '16', name: 'Carne moída', defaultUnit: 'kg' },
  { id: '17', name: 'Hortelã', defaultUnit: 'maço' },
  { id: '18', name: 'Salsa', defaultUnit: 'maço' },
  { id: '19', name: 'Arroz', defaultUnit: 'g' },
  { id: '20', name: 'Lentilha', defaultUnit: 'g' },
];

export const seedRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Babaganuche',
    categoryId: '1',
    categoryName: 'Entradas e Pastas',
    servings: 6,
    totalTimeMin: 45,
    difficulty: 'fácil',
    ingredients: [
      { ingredientId: '1', ingredientName: 'Berinjela', quantity: 1, unit: 'kg' },
      { ingredientId: '3', ingredientName: 'Tahine', quantity: 60, unit: 'ml' },
      { ingredientId: '4', ingredientName: 'Limão', quantity: 2, unit: 'unidade' },
      { ingredientId: '5', ingredientName: 'Alho', quantity: 3, unit: 'dente' },
      { ingredientId: '6', ingredientName: 'Azeite', quantity: 30, unit: 'ml' },
      { ingredientId: '7', ingredientName: 'Sal', quantity: 5, unit: 'g' },
    ],
    steps: [
      { order: 1, text: 'Asse as berinjelas inteiras no forno a 200°C por 30-40 minutos até ficarem macias.', timerSeconds: 2400 },
      { order: 2, text: 'Retire a polpa das berinjelas e descarte a casca. Deixe escorrer em uma peneira por 10 minutos.', timerSeconds: 600 },
      { order: 3, text: 'Bata no processador a polpa da berinjela, tahine, suco de limão, alho e sal até obter uma pasta cremosa.', timerSeconds: 120 },
      { order: 4, text: 'Finalize com azeite por cima e sirva com pão sírio ou torradas.', timerSeconds: 0 },
    ],
    notes: 'Pode ser conservado na geladeira por até 3 dias.',
    allergens: ['gergelim'],
    photos: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    ],
    tags: ['árabe', 'vegetariano', 'entrada'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Homus Tradicional',
    categoryId: '1',
    categoryName: 'Entradas e Pastas',
    servings: 4,
    totalTimeMin: 15,
    difficulty: 'fácil',
    ingredients: [
      { ingredientId: '2', ingredientName: 'Grão de bico', quantity: 400, unit: 'g', note: 'cozido' },
      { ingredientId: '3', ingredientName: 'Tahine', quantity: 90, unit: 'ml' },
      { ingredientId: '4', ingredientName: 'Limão', quantity: 2, unit: 'unidade' },
      { ingredientId: '5', ingredientName: 'Alho', quantity: 2, unit: 'dente' },
      { ingredientId: '6', ingredientName: 'Azeite', quantity: 45, unit: 'ml' },
      { ingredientId: '7', ingredientName: 'Sal', quantity: 3, unit: 'g' },
    ],
    steps: [
      { order: 1, text: 'Bata no processador o grão de bico cozido até formar uma pasta.', timerSeconds: 60 },
      { order: 2, text: 'Adicione tahine, suco de limão, alho e sal. Bata novamente até ficar cremoso.', timerSeconds: 90 },
      { order: 3, text: 'Ajuste a consistência com água morna se necessário. Finalize com azeite.', timerSeconds: 30 },
    ],
    notes: 'Reserve alguns grãos de bico inteiros para decorar.',
    allergens: ['gergelim'],
    photos: [
      'https://images.pexels.com/photos/6275193/pexels-photo-6275193.jpeg',
    ],
    tags: ['árabe', 'vegetariano', 'proteína'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Salada Grega',
    categoryId: '2',
    categoryName: 'Saladas',
    servings: 4,
    totalTimeMin: 20,
    difficulty: 'fácil',
    ingredients: [
      { ingredientId: '9', ingredientName: 'Tomate', quantity: 0.5, unit: 'kg' },
      { ingredientId: '10', ingredientName: 'Pepino', quantity: 2, unit: 'unidade' },
      { ingredientId: '11', ingredientName: 'Cebola roxa', quantity: 1, unit: 'unidade' },
      { ingredientId: '12', ingredientName: 'Azeitona', quantity: 100, unit: 'g' },
      { ingredientId: '13', ingredientName: 'Queijo feta', quantity: 200, unit: 'g' },
      { ingredientId: '6', ingredientName: 'Azeite', quantity: 60, unit: 'ml' },
      { ingredientId: '14', ingredientName: 'Orégano', quantity: 2, unit: 'g' },
    ],
    steps: [
      { order: 1, text: 'Corte os tomates em cubos médios e deixe escorrer o excesso de água.', timerSeconds: 300 },
      { order: 2, text: 'Corte o pepino em fatias, a cebola em juliana fina e o queijo feta em cubos.', timerSeconds: 480 },
      { order: 3, text: 'Monte a salada intercalando os ingredientes. Finalize com azeite e orégano.', timerSeconds: 120 },
    ],
    notes: 'Sirva imediatamente para manter a crocância.',
    allergens: ['leite'],
    photos: [
      'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg',
    ],
    tags: ['grego', 'vegetariano', 'fresco'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Arroz com Lentilha (Mujadara)',
    categoryId: '3',
    categoryName: 'Pratos & Acompanhamentos',
    servings: 6,
    totalTimeMin: 50,
    difficulty: 'médio',
    ingredients: [
      { ingredientId: '19', ingredientName: 'Arroz', quantity: 400, unit: 'g' },
      { ingredientId: '20', ingredientName: 'Lentilha', quantity: 200, unit: 'g' },
      { ingredientId: '11', ingredientName: 'Cebola roxa', quantity: 3, unit: 'unidade' },
      { ingredientId: '6', ingredientName: 'Azeite', quantity: 90, unit: 'ml' },
      { ingredientId: '7', ingredientName: 'Sal', quantity: 8, unit: 'g' },
    ],
    steps: [
      { order: 1, text: 'Cozinhe a lentilha em água abundante por 20 minutos até ficar macia.', timerSeconds: 1200 },
      { order: 2, text: 'Frite as cebolas em fatias no azeite até dourar bem (cerca de 15 minutos).', timerSeconds: 900 },
      { order: 3, text: 'Adicione o arroz à lentilha cozida, tempere com sal e cozinhe por 18 minutos.', timerSeconds: 1080 },
      { order: 4, text: 'Sirva o arroz coroado com as cebolas douradas.', timerSeconds: 0 },
    ],
    notes: 'Prato tradicional libanês, nutritivo e econômico.',
    allergens: [],
    photos: [
      'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg',
    ],
    tags: ['árabe', 'vegetariano', 'proteína', 'econômico'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const seedMenu: Menu = {
  id: '1',
  title: 'Cardápio Semana 01 - Janeiro',
  weekRef: '2025-01',
  unit: 'Matriz',
  days: [
    {
      date: '2025-01-06',
      categories: [
        {
          name: 'Parte fria',
          subcategories: [
            {
              name: 'Fixo',
              type: 'fixo',
              items: [
                { customText: 'Americana e roxa' },
                { customText: 'Rucula e Agriâo' },
                { customText: 'Bringela grelhada' },
                { customText: 'Abrobrinha grelhada' },
              ],
            },
            {
              name: 'Rotativo',
              type: 'rotativo',
              items: [
                { customText: 'Salada de maionese' },
                { customText: 'Babaganuche' },
                { customText: 'Tabule' },
                { customText: 'Qualhada seca' },
              ],
            },
          ],
        },
        {
          name: 'Parte quente',
          subcategories: [
            {
              name: 'Fixo',
              type: 'fixo',
              items: [
                { customText: 'Feijão' },
                { customText: 'Arroz' },
                { customText: 'farofa' },
              ],
            },
            {
              name: 'Rotativo',
              type: 'rotativo',
              items: [
                { customText: 'Abobora assada' },
                { customText: 'Canelone de queijo' },
                { customText: 'couve flor gratinada' },
                { customText: 'Massa penne' },
              ],
            },
          ],
        },
        {
          name: 'Molhos',
          subcategories: [
            {
              name: 'Molhos',
              type: 'fixo',
              items: [
                { customText: 'Azeite sal e limão' },
                { customText: 'Azeite e manjericão' },
                { customText: 'Molho golf' },
              ],
            },
          ],
        },
        {
          name: 'Adicionais',
          subcategories: [
            {
              name: 'Adicionais',
              type: 'fixo',
              items: [
                { customText: 'Ovo de codorna' },
                { customText: 'Limão a francesa' },
                { customText: 'Azeitonas' },
              ],
            },
          ],
        },
      ],
    },
    {
      date: '2025-01-07',
      categories: [
        {
          name: 'Parte fria',
          subcategories: [
            {
              name: 'Fixo',
              type: 'fixo',
              items: [
                { customText: 'Americana e roxa' },
                { customText: 'Rucula e Agriâo' },
                { customText: 'Bringela grelhada' },
                { customText: 'Abrobrinha grelhada' },
              ],
            },
            {
              name: 'Rotativo',
              type: 'rotativo',
              items: [
                { customText: 'Carpaccio' },
                { customText: 'Caponata' },
                { customText: 'Lentinha c/ cebola' },
                { customText: 'Guacamole' },
              ],
            },
          ],
        },
        {
          name: 'Parte quente',
          subcategories: [
            {
              name: 'Fixo',
              type: 'fixo',
              items: [
                { customText: 'Feijão' },
                { customText: 'Arroz' },
                { customText: 'farofa' },
              ],
            },
            {
              name: 'Rotativo',
              type: 'rotativo',
              items: [
                { customText: 'batata rustica' },
                { customText: 'Lasanha de queijo' },
                { customText: 'polenta frita' },
                { customText: 'Macarrão caprese' },
              ],
            },
          ],
        },
        {
          name: 'Molhos',
          subcategories: [
            {
              name: 'Molhos',
              type: 'fixo',
              items: [
                { customText: 'Azeite sal e limão' },
                { customText: 'Azeite e manjericão' },
                { customText: 'Molho golf' },
              ],
            },
          ],
        },
        {
          name: 'Adicionais',
          subcategories: [
            {
              name: 'Adicionais',
              type: 'fixo',
              items: [
                { customText: 'Ovo de codorna' },
                { customText: 'Limão a francesa' },
                { customText: 'Azeitonas' },
              ],
            },
          ],
        },
      ],
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function initializeSeedData() {
  const store = useStore.getState();
  
  if (store.categories.length === 0) {
    seedCategories.forEach(category => store.addCategory(category));
  }
  
  if (store.ingredients.length === 0) {
    seedIngredients.forEach(ingredient => store.addIngredient(ingredient));
  }
  
  if (store.recipes.length === 0) {
    seedRecipes.forEach(recipe => store.addRecipe(recipe));
  }
  
  if (store.menus.length === 0) {
    store.addMenu(seedMenu);
  }
}