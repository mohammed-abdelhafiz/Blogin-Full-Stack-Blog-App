type PageHeaderProps = {
  title: string;
  description: string;
};

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="text-center mb-12 space-y-2">
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  );
};
