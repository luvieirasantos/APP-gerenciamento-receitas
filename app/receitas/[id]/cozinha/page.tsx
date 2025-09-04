'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Users, 
  AlertTriangle,
  RotateCcw,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { KitchenTimer } from '@/components/recipe/KitchenTimer';
import { useStore } from '@/lib/store';
import { scaleIngredients } from '@/lib/utils';
import Link from 'next/link';

export default function KitchenModePage() {
  const params = useParams();
  const { recipes, settings, kitchenMode, setKitchenMode } = useStore();
  
  const recipe = recipes.find(r => r.id === params.id);
  const [servings, setServings] = useState(recipe?.servings || 4);
  const [currentStep, setCurrentStep] = useState(0);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">Receita não encontrada</h2>
          <Button asChild>
            <Link href="/receitas">Voltar às Receitas</Link>
          </Button>
        </div>
      </div>
    );
  }

  const scaledIngredients = scaleIngredients(recipe.ingredients, recipe.servings, servings);
  const currentStepData = recipe.steps[currentStep];
  const isLastStep = currentStep === recipe.steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleStepComplete = () => {
    const newCheckedSteps = [...checkedSteps];
    newCheckedSteps[currentStep] = true;
    setCheckedSteps(newCheckedSteps);
    
    if (settings.kitchenMode.autoAdvance && !isLastStep) {
      setTimeout(() => setCurrentStep(currentStep + 1), 1000);
    }
  };

  const handleNext = () => {
    if (!isLastStep) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (!isFirstStep) setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCheckedSteps([]);
  };

  const fontSize = settings.kitchenMode.fontSize === 'xlarge' ? 'text-2xl' : 
                  settings.kitchenMode.fontSize === 'large' ? 'text-xl' : 'text-lg';

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Kitchen Mode Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href={`/receitas/${recipe.id}`}>
                <ArrowLeft className="h-5 w-5 mr-2" />
                Sair do Modo Cozinha
              </Link>
            </Button>
            
            <div className="text-center">
              <h1 className="font-bold text-lg">{recipe.title}</h1>
              <p className="text-sm text-muted-foreground">
                Passo {currentStep + 1} de {recipe.steps.length}
              </p>
            </div>
            
            <Button variant="ghost" onClick={handleReset}>
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Servings Adjuster */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium">Ajustar Porções:</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setServings(Math.max(1, servings - 1))}
                >
                  -
                </Button>
                <div className="text-2xl font-bold min-w-[60px] text-center">
                  {servings}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setServings(servings + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            {servings !== recipe.servings && (
              <p className="text-sm text-blue-600 mt-2">
                Ingredientes ajustados automaticamente para {servings} porções
              </p>
            )}
          </CardContent>
        </Card>

        {/* Allergens Warning */}
        {recipe.allergens.length > 0 && (
          <Card className="bg-yellow-50 border-yellow-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800">Atenção - Alergênicos:</p>
                  <p className="text-yellow-700">{recipe.allergens.join(', ')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Step */}
        <Card className="border-2 border-primary">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                  {currentStepData.order}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">Passo {currentStepData.order}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox
                      checked={checkedSteps[currentStep]}
                      onCheckedChange={(checked) => {
                        const newCheckedSteps = [...checkedSteps];
                        newCheckedSteps[currentStep] = !!checked;
                        setCheckedSteps(newCheckedSteps);
                      }}
                    />
                    <span>Marcar como concluído</span>
                  </div>
                </div>
              </div>
              
              <div className={cn("leading-relaxed", fontSize)}>
                {currentStepData.text}
              </div>
              
              {currentStepData.timerSeconds && (
                <KitchenTimer
                  initialSeconds={currentStepData.timerSeconds}
                  onComplete={handleStepComplete}
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="flex-1 h-14"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Passo Anterior
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={isLastStep}
            className="flex-1 h-14"
          >
            Próximo Passo
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Ingredients Reference */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Ingredientes ({servings} porções)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {scaledIngredients.map((ingredient, index) => (
              <div key={index} className="flex items-center justify-between py-2 text-lg">
                <span className="font-medium">{ingredient.ingredientName}</span>
                <span className="font-bold text-primary">
                  {ingredient.quantity} {ingredient.unit}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notes */}
        {recipe.notes && (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Dicas e Observações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-green-700">{recipe.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Progress */}
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-2">
            {recipe.steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-3 w-3 rounded-full",
                  index === currentStep 
                    ? "bg-primary" 
                    : checkedSteps[index] 
                    ? "bg-green-500" 
                    : "bg-muted"
                )}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {checkedSteps.filter(Boolean).length} de {recipe.steps.length} passos concluídos
          </p>
        </div>
      </main>
    </div>
  );
}