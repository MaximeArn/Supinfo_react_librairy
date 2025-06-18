interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="space-y-1">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-base-content">
        {title}
      </h1>
      {description && (
        <p className="text-sm sm:text-base text-base-content/70">
          {description}
        </p>
      )}
    </header>
  );
}
