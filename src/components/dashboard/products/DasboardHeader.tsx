import type { ReactNode } from "react";

interface DashboardHeaderProps {
  title: string;
  actionButton?: ReactNode; // ejemplo: el botón "Nuevo Producto"
}

export const DashboardHeader = ({ title, actionButton }: DashboardHeaderProps) => {
  return (
    <header className="w-full flex justify-between items-center bg-gray-50 px-4 sm:px-6 py-3 border-b border-gray-200 sticky top-0 z-30">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">
        {title}
      </h1>

      <div className="flex items-center gap-2">{actionButton}</div>
    </header>
  );
};