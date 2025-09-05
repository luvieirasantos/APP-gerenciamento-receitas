'use client';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4 p-6">
        <div className="rounded-full bg-muted p-6 mx-auto w-fit">
          <div className="h-12 w-12 text-muted-foreground">📡</div>
        </div>
        <h1 className="text-2xl font-bold">Modo Offline</h1>
        <p className="text-muted-foreground max-w-sm">
          Você está offline. Algumas funcionalidades podem estar limitadas.
          Suas receitas e cardápios salvos ainda estão disponíveis.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Tentar Reconectar
        </button>
      </div>
    </div>
  );
}