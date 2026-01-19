import { AlertTriangle, Clock, FileSignature, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'signature' | 'delay' | 'urgent';
  message: string;
  time: string;
  bookingRef?: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'signature',
    message: 'Awaiting signature for delivery to Global Logistics Ltd',
    time: '2 hours ago',
    bookingRef: 'TRN-2024-0891',
  },
  {
    id: '2',
    type: 'delay',
    message: 'Route delay reported: Manchester to Birmingham',
    time: '45 min ago',
    bookingRef: 'TRN-2024-0892',
  },
  {
    id: '3',
    type: 'urgent',
    message: 'Priority booking request from Northern Manufacturing',
    time: '10 min ago',
  },
];

const alertIcons = {
  signature: FileSignature,
  delay: Clock,
  urgent: AlertTriangle,
};

const alertColors = {
  signature: 'bg-warning/10 text-warning border-warning/30',
  delay: 'bg-accent/10 text-accent border-accent/30',
  urgent: 'bg-destructive/10 text-destructive border-destructive/30',
};

export default function AlertPanel() {
  const [alerts, setAlerts] = useState(mockAlerts);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
          <AlertTriangle className="w-6 h-6 text-success" />
        </div>
        <h3 className="font-medium mb-1">All Clear</h3>
        <p className="text-sm text-muted-foreground">No pending alerts</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Alerts</h3>
          <span className="alert-badge">{alerts.length} pending</span>
        </div>
      </div>
      <div className="divide-y divide-border">
        {alerts.map((alert) => {
          const Icon = alertIcons[alert.type];
          return (
            <div 
              key={alert.id} 
              className="p-4 flex items-start gap-3 animate-fade-in hover:bg-secondary/50 transition-colors"
            >
              <div className={cn(
                "p-2 rounded-lg border flex-shrink-0",
                alertColors[alert.type]
              )}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{alert.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  {alert.bookingRef && (
                    <span className="text-xs font-medium text-accent">{alert.bookingRef}</span>
                  )}
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="flex-shrink-0 w-8 h-8"
                onClick={() => dismissAlert(alert.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
