'use client';

import { Check, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ShoppingListItem } from '@/lib/types';
import { useState } from 'react';

interface ShoppingListCardProps {
  item: ShoppingListItem;
}

export function ShoppingListCard({ item }: ShoppingListCardProps) {
  const [checked, setChecked] = useState(false);

  return (
    <Card className={cn(
      "transition-all",
      checked ? "bg-muted opacity-60" : "bg-background"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={checked}
            onCheckedChange={setChecked}
            className="mt-1"
          />
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className={cn(
                "font-medium",
                checked && "line-through text-muted-foreground"
              )}>
                {item.ingredientName}
              </h3>
              <Badge variant="secondary">
                {item.totalQuantity} {item.unit}
              </Badge>
            </div>
            
            {item.category && (
              <div className="flex items-center gap-1">
                <Package className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{item.category}</span>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground">
              Usado em: {item.recipes.join(', ')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}