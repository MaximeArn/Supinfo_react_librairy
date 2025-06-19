import { type ReactNode } from "react";

interface BookDetailsSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function BookDetailsSection({
  icon,
  title,
  children,
  className = "",
}: BookDetailsSectionProps) {
  return (
    <section
      className={`bg-base-200 border border-base-300 shadow-md rounded-lg ${className}`}
    >
      <div className="p-6 sm:p-8 space-y-4">
        <h3 className="text-xl font-semibold text-base-content flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <div className="text-base-content text-base">{children}</div>
      </div>
    </section>
  );
}
