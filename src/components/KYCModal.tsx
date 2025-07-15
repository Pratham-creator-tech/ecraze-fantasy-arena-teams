import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { CheckCircle, Upload, User, FileText, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface KYCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKYCComplete: () => void;
}

const KYCModal = ({ isOpen, onClose, onKYCComplete }: KYCModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [kycData, setKycData] = useState({
    fullName: '',
    dateOfBirth: '',
    address: '',
    phoneNumber: '',
    idNumber: '',
    idDocument: null as File | null,
    addressProof: null as File | null
  });
  const { toast } = useToast();

  const handleFileUpload = (field: 'idDocument' | 'addressProof', file: File) => {
    setKycData({ ...kycData, [field]: file });
  };

  const handleSubmitKYC = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Update profile with KYC verification
      const { error } = await supabase
        .from('profiles')
        .update({ 
          kyc_verified: true,
          // In a real app, you'd also store KYC data
        })
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "KYC Update Failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      onKYCComplete();
      onClose();
      toast({
        title: "KYC Verification Complete",
        description: "Your identity has been verified. You can now deposit money and participate in contests.",
      });
    } catch (error: any) {
      toast({
        title: "KYC Verification Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1: return kycData.fullName && kycData.dateOfBirth && kycData.phoneNumber;
      case 2: return kycData.address && kycData.idNumber;
      case 3: return kycData.idDocument && kycData.addressProof;
      default: return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="game-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Complete KYC Verification
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step ? 'bg-accent text-black' : 'bg-gray-600 text-gray-300'
              }`}>
                {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-0.5 ${
                  currentStep > step ? 'bg-accent' : 'bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <Card className="p-6 game-card">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 mr-2 text-accent" />
                <h3 className="text-lg font-semibold text-white">Personal Information</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={kycData.fullName}
                    onChange={(e) => setKycData({...kycData, fullName: e.target.value})}
                    placeholder="Enter your full name as per ID"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={kycData.dateOfBirth}
                    onChange={(e) => setKycData({...kycData, dateOfBirth: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={kycData.phoneNumber}
                    onChange={(e) => setKycData({...kycData, phoneNumber: e.target.value})}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="p-6 game-card">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 mr-2 text-accent" />
                <h3 className="text-lg font-semibold text-white">Address & ID Information</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <Input
                    id="address"
                    value={kycData.address}
                    onChange={(e) => setKycData({...kycData, address: e.target.value})}
                    placeholder="Enter your complete address"
                  />
                </div>
                
                <div>
                  <Label htmlFor="idNumber">Government ID Number</Label>
                  <Input
                    id="idNumber"
                    value={kycData.idNumber}
                    onChange={(e) => setKycData({...kycData, idNumber: e.target.value})}
                    placeholder="Enter Aadhaar/PAN/Passport number"
                  />
                </div>
              </div>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="p-6 game-card">
              <div className="flex items-center mb-4">
                <Upload className="w-5 h-5 mr-2 text-accent" />
                <h3 className="text-lg font-semibold text-white">Document Upload</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label>ID Document (Front & Back)</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-400 mb-2">Upload your government ID</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('idDocument', e.target.files[0])}
                      className="hidden"
                      id="idUpload"
                    />
                    <Button 
                      onClick={() => document.getElementById('idUpload')?.click()}
                      variant="outline"
                      className="border-accent/50"
                    >
                      Choose File
                    </Button>
                    {kycData.idDocument && (
                      <p className="text-green-400 text-sm mt-2">✓ {kycData.idDocument.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Address Proof</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-400 mb-2">Upload utility bill or bank statement</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('addressProof', e.target.files[0])}
                      className="hidden"
                      id="addressUpload"
                    />
                    <Button 
                      onClick={() => document.getElementById('addressUpload')?.click()}
                      variant="outline"
                      className="border-accent/50"
                    >
                      Choose File
                    </Button>
                    {kycData.addressProof && (
                      <p className="text-green-400 text-sm mt-2">✓ {kycData.addressProof.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="border-gray-500"
          >
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!isStepComplete(currentStep)}
              className="gaming-gradient"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleSubmitKYC}
              disabled={!isStepComplete(currentStep)}
              className="gaming-gradient neon-glow"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Complete KYC
            </Button>
          )}
        </div>

        <div className="text-center text-sm text-gray-400 pt-4">
          <p>🔒 Your information is securely encrypted and protected</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KYCModal;