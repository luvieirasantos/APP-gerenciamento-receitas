'use client';

import { Calendar, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MenuDay } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface MenuDayCardProps {
  day: MenuDay;
  onAddMeal?: () => void;
}

export function MenuDayCard({ day, onAddMeal }: MenuDayCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5 text-primary" />
          {formatDate(day.date)}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {day.meals.map((meal, mealIndex) => (
          <div key={mealIndex} className="space-y-2">
            <h4 className="font-medium text-primary">{meal.mealName}</h4>
            <div className="space-y-2 pl-2">
              {meal.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between rounded-md bg-muted p-2">
                  <div>
                    <span className="text-sm font-medium">
                      {item.customText || 'Receita'}
                    </span>
                    {item.note && (
                      <p className="text-xs text-muted-foreground">{item.note}</p>
                    )}
                  </div>
                  {item.recipeId && (
                    <Badge variant="outline">Receita</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {onAddMeal && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAddMeal}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Prato
          </Button>
        )}
      </CardContent>
    </Card>
  );
}