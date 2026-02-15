import { AlertTriangle, Phone } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';

interface EmergencyBannerProps {
  message: string;
  show911?: boolean;
}

export function EmergencyBanner({ message, show911 = true }: EmergencyBannerProps) {
  return (
    <Alert className="bg-red-50 border-red-200 mb-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <AlertDescription className="text-red-900 font-medium">
            {message}
          </AlertDescription>
        </div>
        {show911 && (
          <Button
            size="sm"
            className="bg-red-600 hover:bg-red-700 flex-shrink-0"
            onClick={() => window.location.href = 'tel:911'}
          >
            <Phone className="w-4 h-4 mr-2" />
            911
          </Button>
        )}
      </div>
    </Alert>
  );
}
