export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-3 text-ink/50">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-paddy/20 border-t-paddy" />
      <span className="font-mono text-xs uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}
