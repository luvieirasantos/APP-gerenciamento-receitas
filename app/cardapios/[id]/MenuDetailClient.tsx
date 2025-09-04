'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Save, Plus, Edit, ArrowLeft, Calendar, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { useStore } from '@/lib/store';
import { Menu, MenuItem } from '@/lib/types';
import { generateId } from '@/lib/utils';
import jsPDF from 'jspdf';

interface MenuDetailClientProps {
  menuId: string;
}

export default function MenuDetailClient({ menuId }: MenuDetailClientProps) {
  const router = useRouter();
  const { menus, updateMenu, deleteMenu } = useStore();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const foundMenu = menus.find(m => m.id === menuId);
    if (foundMenu) {
      setMenu(foundMenu);
    }
  }, [menus, menuId]);

  if (!menu) {
    return (
      <div className="min-h-screen bg-background pb-20 lg:pb-0">
        <Header title="Cardápio não encontrado" />
        <main className="container mx-auto px-4 py-6">
          <p>Cardápio não encontrado.</p>
        </main>
      </div>
    );
  }

  const handleSave = () => {
    if (menu) {
      updateMenu(menu.id, menu);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (menu && confirm('Tem certeza que deseja deletar este cardápio?')) {
      deleteMenu(menu.id);
      router.push('/cardapios');
    }
  };

  const addItemToSubcategory = (dayIndex: number, categoryIndex: number, subcategoryIndex: number) => {
    const newMenu = { ...menu };
    const item: MenuItem = {
      customText: '',
    };
    newMenu.days[dayIndex].categories[categoryIndex].subcategories[subcategoryIndex].items.push(item);
    setMenu(newMenu);
  };

  const updateItem = (dayIndex: number, categoryIndex: number, subcategoryIndex: number, itemIndex: number, field: keyof MenuItem, value: string) => {
    const newMenu = { ...menu };
    const item = newMenu.days[dayIndex].categories[categoryIndex].subcategories[subcategoryIndex].items[itemIndex];
    if (field === 'customText') {
      item.customText = value;
    } else if (field === 'note') {
      item.note = value;
    }
    setMenu(newMenu);
  };

  const removeItem = (dayIndex: number, categoryIndex: number, subcategoryIndex: number, itemIndex: number) => {
    const newMenu = { ...menu };
    newMenu.days[dayIndex].categories[categoryIndex].subcategories[subcategoryIndex].items.splice(itemIndex, 1);
    setMenu(newMenu);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text(menu.title, 20, 30);

    // Unit
    if (menu.unit) {
      doc.setFontSize(12);
      doc.text(`Unidade: ${menu.unit}`, 20, 45);
    }

    let yPosition = 65;

    // Days
    menu.days.forEach((day, dayIndex) => {
      if (yPosition > 250) { // New page if needed
        doc.addPage();
        yPosition = 30;
      }

      // Day header
      const dayName = new Date(day.date).toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });

      doc.setFontSize(14);
      doc.text(dayName, 20, yPosition);
      yPosition += 10;

      // Categories
      day.categories.forEach((category) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 30;
        }

        doc.setFontSize(12);
        doc.text(category.name, 30, yPosition);
        yPosition += 8;

        // Subcategories
        category.subcategories.forEach((subcategory) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 30;
          }

          doc.setFontSize(10);
          doc.text(`${subcategory.name} (${subcategory.type === 'fixo' ? 'Fixo' : 'Rotativo'}):`, 40, yPosition);
          yPosition += 6;

          // Items
          subcategory.items.forEach((item) => {
            if (yPosition > 250) {
              doc.addPage();
              yPosition = 30;
            }

            doc.setFontSize(9);
            const itemText = item.customText || '';
            const maxWidth = 120;
            const lines = doc.splitTextToSize(itemText, maxWidth);

            lines.forEach((line: string) => {
              doc.text(`• ${line}`, 50, yPosition);
              yPosition += 5;
            });

            if (item.note) {
              doc.setFontSize(8);
              doc.setTextColor(100, 100, 100);
              const noteLines = doc.splitTextToSize(`Nota: ${item.note}`, maxWidth);
              noteLines.forEach((line: string) => {
                doc.text(line, 55, yPosition);
                yPosition += 4;
              });
              doc.setTextColor(0, 0, 0);
            }

            yPosition += 2;
          });

          yPosition += 5;
        });

        yPosition += 5;
      });

      yPosition += 10;
    });

    // Save the PDF
    doc.save(`${menu.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header
        title={menu.title}
        rightAction={
          <div className="flex gap-2">
            <Button onClick={exportToPDF} size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            {isEditing ? (
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            )}
          </div>
        }
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Menu Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Cardápio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={menu.title}
                onChange={(e) => setMenu({ ...menu, title: e.target.value })}
                disabled={!isEditing}
                className="text-lg py-6"
              />
            </div>
            <div>
              <Label>Unidade</Label>
              <Input
                value={menu.unit || ''}
                onChange={(e) => setMenu({ ...menu, unit: e.target.value })}
                disabled={!isEditing}
                placeholder="Ex: Matriz, Filial Centro"
                className="text-lg py-6"
              />
            </div>
          </CardContent>
        </Card>

        {/* Days */}
        {menu.days.map((day, dayIndex) => (
          <Card key={day.date}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {new Date(day.date).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long'
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {day.categories?.map((category, categoryIndex) => (
                <div key={category.name} className="space-y-4">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  {category.subcategories.map((subcategory, subcategoryIndex) => (
                    <div key={subcategory.name} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">
                          {subcategory.name} ({subcategory.type === 'fixo' ? 'Fixo' : 'Rotativo'})
                        </h4>
                        {isEditing && (
                          <Button
                            size="sm"
                            onClick={() => addItemToSubcategory(dayIndex, categoryIndex, subcategoryIndex)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Adicionar
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {subcategory.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2">
                            <Input
                              value={item.customText || ''}
                              onChange={(e) => updateItem(dayIndex, categoryIndex, subcategoryIndex, itemIndex, 'customText', e.target.value)}
                              placeholder="Digite o item do cardápio"
                              disabled={!isEditing}
                              className="flex-1"
                            />
                            {item.note && (
                              <Input
                                value={item.note}
                                onChange={(e) => updateItem(dayIndex, categoryIndex, subcategoryIndex, itemIndex, 'note', e.target.value)}
                                placeholder="Observação"
                                disabled={!isEditing}
                                className="w-32"
                              />
                            )}
                            {isEditing && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeItem(dayIndex, categoryIndex, subcategoryIndex, itemIndex)}
                              >
                                Remover
                              </Button>
                            )}
                          </div>
                        ))}
                        {subcategory.items.length === 0 && (
                          <p className="text-sm text-muted-foreground italic">
                            Nenhum item adicionado ainda
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button variant="outline" onClick={() => router.back()} className="h-14">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </Button>

          <Button variant="destructive" size="lg" onClick={handleDelete} className="h-14">
            <Trash2 className="h-5 w-5 mr-2" />
            Deletar Cardápio
          </Button>
        </div>
      </main>
    </div>
  );
}