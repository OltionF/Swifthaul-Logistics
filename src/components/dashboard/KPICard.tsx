import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  variant?: 'default' | 'accent' | 'warning' | 'success';
}

export default function KPICard({ title, value, change, icon, variant = 'default' }: KPICardProps) {
  const borderColors = {
    default: 'before:bg-primary',
    accent: 'before:bg-accent',
    warning: 'before:bg-warning',
    success: 'before:bg-success',
  };

  return (
    <div className={cn("kpi-card", borderColors[variant])}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          {typeof change !== 'undefined' && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              change >= 0 ? "text-success" : "text-destructive"
            )}>
              {change >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}% vs last week</span>
            </div>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          variant === 'default' && "bg-primary/10 text-primary",
          variant === 'accent' && "bg-accent/10 text-accent",
          variant === 'warning' && "bg-warning/10 text-warning",
          variant === 'success' && "bg-success/10 text-success",
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
}
