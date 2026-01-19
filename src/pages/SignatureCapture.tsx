import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Check, 
  RotateCcw, 
  Upload, 
  Camera,
  FileText,
  Package
} from 'lucide-react';

export default function SignatureCapture() {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [notes, setNotes] = useState('');

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setHasSignature(false);
  };

  const handleSignatureEnd = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      setHasSignature(true);
    }
  };

  const handleSubmit = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const signatureData = sigCanvas.current.toDataURL();
      console.log('Signature captured:', signatureData);
      // Handle submission
    }
  };

  return (
    <MainLayout userRole="sales" title="Record Delivery Signature">
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        {/* Delivery Info */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/10">
              <Package className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">Delivery TRN-2024-0891</h2>
              <p className="text-muted-foreground">Global Logistics Ltd</p>
              <p className="text-sm text-muted-foreground mt-2">
                15 Industrial Estate, Leeds, LS1 4QT
              </p>
            </div>
          </div>
        </div>

        {/* Recipient Name */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-semibold">Recipient Details</h3>
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Name *</Label>
            <Input 
              id="recipient"
              placeholder="Enter recipient's full name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>
        </div>

        {/* Signature Pad */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Signature *</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearSignature}
              className="gap-1"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </Button>
          </div>
          
          <div className="signature-pad rounded-xl overflow-hidden">
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{
                className: 'w-full h-48 bg-white',
                style: { width: '100%', height: '192px' }
              }}
              onEnd={handleSignatureEnd}
              penColor="#1e3a5f"
            />
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            Sign above using your finger or stylus
          </p>
        </div>

        {/* Photo & Notes */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h3 className="font-semibold">Additional Documentation</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Camera className="w-6 h-6" />
              <span className="text-sm">Take Photo</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Upload className="w-6 h-6" />
              <span className="text-sm">Upload File</span>
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Delivery Notes</Label>
            <textarea 
              id="notes"
              className="w-full p-3 rounded-lg bg-background border border-border resize-none focus:outline-none focus:ring-2 focus:ring-accent min-h-[100px]"
              placeholder="Any notes about the delivery condition, location, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            className="flex-1 gap-2 bg-success hover:bg-success/90"
            disabled={!hasSignature || !recipientName}
            onClick={handleSubmit}
          >
            <Check className="w-4 h-4" />
            Confirm Delivery
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
