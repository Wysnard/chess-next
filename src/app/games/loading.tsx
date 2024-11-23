const LoadingGameCard = () => {
  return <div className="aspect-square rounded-xl bg-muted animate-pulse" />;
};

export default function Loading() {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-5">
      {Array.from({ length: 20 }).map((_, i) => (
        <LoadingGameCard key={i} />
      ))}
    </div>
  );
}
