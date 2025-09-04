'use client';

import { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Badge } from '@/components/ui/badge';

type ImportStep = 'upload' | 'mapping' | 'preview' | 'complete';

export default function ImportPage() {
  const [currentStep, setCurrentStep] = useState<ImportStep>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);

  const steps = [
    { id: 'upload', title: 'Upload', description: 'Envie sua planilha' },
    { id: 'mapping', title: 'Mapeamento', description: 'Configure as colunas' },
    { id: 'preview', title: 'Revisão', description: 'Confirme os dados' },
    { id: 'complete', title: 'Concluído', description: 'Importação finalizada' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulated parsing - in a real app, you'd parse CSV/Excel here
      setPreviewData([
        { data: '06/01/2025', refeicao: 'Almoço', prato: 'Babaganuche', observacao: 'Servir com pão' },
        { data: '06/01/2025', refeicao: 'Jantar', prato: 'Salada Grega', observacao: 'Usar tomates frescos' },
        { data: '07/01/2025', refeicao: 'Almoço', prato: 'Homus', observacao: 'Decorar com grão de bico' },
      ]);
      setCurrentStep('mapping');
    }
  };

  const handleImport = () => {
    // Simulated import process
    setTimeout(() => {
      setCurrentStep('complete');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Header title="Importar Planilha" />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Progress Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    currentStep === step.id ? "bg-primary text-primary-foreground" :
                    steps.findIndex(s => s.id === currentStep) > index ? "bg-green-500 text-white" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {steps.findIndex(s => s.id === currentStep) > index ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="mx-4 h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {currentStep === 'upload' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Enviar Planilha
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12">
                  <FileSpreadsheet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Envie sua planilha</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Suporte para arquivos CSV, XLS e XLSX
                  </p>
                  <Input
                    type="file"
                    accept=".csv,.xls,.xlsx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button asChild>
                      <span>Escolher Arquivo</span>
                    </Button>
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Formato Recomendado</h4>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <Badge variant="outline">Data</Badge>
                  <Badge variant="outline">Refeição</Badge>
                  <Badge variant="outline">Prato</Badge>
                  <Badge variant="outline">Observação</Badge>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• Data: DD/MM/AAAA (ex: 06/01/2025)</p>
                  <p>• Refeição: Café da Manhã, Almoço, Jantar</p>
                  <p>• Prato: Nome da receita ou texto livre</p>
                  <p>• Observação: Notas para a cozinha (opcional)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'mapping' && uploadedFile && (
          <Card>
            <CardHeader>
              <CardTitle>Mapear Colunas</CardTitle>
              <p className="text-sm text-muted-foreground">
                Arquivo: {uploadedFile.name} ({Math.round(uploadedFile.size / 1024)}KB)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Coluna da Data</Label>
                  <Select defaultValue="data">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="data">data</SelectItem>
                      <SelectItem value="dia">dia</SelectItem>
                      <SelectItem value="date">date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Coluna da Refeição</Label>
                  <Select defaultValue="refeicao">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="refeicao">refeicao</SelectItem>
                      <SelectItem value="meal">meal</SelectItem>
                      <SelectItem value="turno">turno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Coluna do Prato</Label>
                  <Select defaultValue="prato">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prato">prato</SelectItem>
                      <SelectItem value="dish">dish</SelectItem>
                      <SelectItem value="receita">receita</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Coluna de Observações</Label>
                  <Select defaultValue="observacao">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="observacao">observacao</SelectItem>
                      <SelectItem value="obs">obs</SelectItem>
                      <SelectItem value="notes">notes</SelectItem>
                      <SelectItem value="none">Nenhuma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={() => setCurrentStep('preview')} className="w-full">
                <ArrowRight className="h-4 w-4 mr-2" />
                Continuar para Revisão
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === 'preview' && (
          <Card>
            <CardHeader>
              <CardTitle>Revisar Dados</CardTitle>
              <p className="text-sm text-muted-foreground">
                Verifique se os dados estão corretos antes de importar
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="p-3 text-left">Data</th>
                      <th className="p-3 text-left">Refeição</th>
                      <th className="p-3 text-left">Prato</th>
                      <th className="p-3 text-left">Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3">{row.data}</td>
                        <td className="p-3">{row.refeicao}</td>
                        <td className="p-3">{row.prato}</td>
                        <td className="p-3 text-muted-foreground">{row.observacao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep('mapping')}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <Button onClick={handleImport} className="flex-1">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Importar {previewData.length} registros
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'complete' && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-8 text-center space-y-4">
              <div className="rounded-full bg-green-100 p-4 w-fit mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-green-800">
                Importação Concluída!
              </h2>
              <p className="text-green-700">
                {previewData.length} registros foram importados com sucesso.
              </p>
              <Button asChild className="w-full">
                <a href="/cardapios">Ver Cardápios Importados</a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty State for No Menus */}
        {menus.length === 0 && currentStep === 'upload' && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <p className="text-blue-800 font-medium mb-2">💡 Dica</p>
              <p className="text-blue-700 text-sm">
                Você ainda não tem cardápios salvos. Após importar, você poderá visualizar
                e editar os dados importados na seção de cardápios.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
}