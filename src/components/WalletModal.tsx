import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, Plus, CreditCard, DollarSign, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import KYCModal from './KYCModal';

interface WalletModalProps {
  user: User;
}

const WalletModal = ({ user }: WalletModalProps) => {
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);
  const [isKYCCompleted, setIsKYCCompleted] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        return;
      }

      setProfile(profileData);
      setBalance(profileData?.wallet_balance || 0);
      setIsKYCCompleted(profileData?.kyc_verified || false);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleDeposit = async () => {
    if (!isKYCCompleted) {
      setIsKYCModalOpen(true);
      return;
    }

    const amount = parseFloat(depositAmount);
    if (amount && amount > 0) {
      try {
        const { data, error } = await supabase.functions.invoke('deposit-funds', {
          body: { amount }
        });

        if (error) {
          toast({
            title: "Deposit failed",
            description: error.message,
            variant: "destructive"
          });
          return;
        }

        // Reload profile to get updated balance
        await loadUserProfile();
        setDepositAmount('');
        setIsOpen(false);
        
        toast({
          title: "Deposit Successful",
          description: `$${amount.toFixed(2)} has been added to your wallet.`,
        });
      } catch (error: any) {
        toast({
          title: "Deposit failed",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const handleKYCComplete = async () => {
    // Update profile in database
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ kyc_verified: true })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating KYC status:', error);
        return;
      }

      setIsKYCCompleted(true);
      setIsKYCModalOpen(false);
      await loadUserProfile();
    } catch (error) {
      console.error('Error updating KYC status:', error);
    }
  };

  const handleSpend = async (amount: number) => {
    if (balance >= amount) {
      try {
        // This would typically be handled by the contest joining logic
        const { error } = await supabase
          .from('profiles')
          .update({ 
            wallet_balance: balance - amount 
          })
          .eq('user_id', user.id);

        if (error) {
          console.error('Error updating wallet balance:', error);
          return false;
        }

        const newBalance = balance - amount;
        setBalance(newBalance);
        return true;
      } catch (error) {
        console.error('Error spending from wallet:', error);
        return false;
      }
    }
    return false;
  };

  // Make handleSpend available globally for other components
  (window as any).spendFromWallet = handleSpend;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-accent/50 text-accent hover:bg-accent/10 neon-glow-cyan"
        >
          <Wallet className="w-4 h-4 mr-2" />
          <span className="wallet-balance font-bold">${balance.toFixed(2)}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="game-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Gaming Wallet
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center p-6 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-3xl font-bold wallet-balance">${balance.toFixed(2)}</p>
          </div>

          {!isKYCCompleted && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                <div>
                  <p className="text-yellow-400 font-semibold">KYC Verification Required</p>
                  <p className="text-gray-400 text-sm">Complete KYC to deposit money and participate in contests</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Label htmlFor="deposit" className="text-sm font-medium">
              Deposit Amount
            </Label>
            <div className="flex space-x-2">
              <Input
                id="deposit"
                type="number"
                placeholder="Enter amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleDeposit}
                className="gaming-gradient-gold neon-glow"
                disabled={!depositAmount || parseFloat(depositAmount) <= 0}
              >
                <Plus className="w-4 h-4 mr-1" />
                {isKYCCompleted ? 'Add' : 'Verify KYC'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[10, 25, 50].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => setDepositAmount(amount.toString())}
                className="border-primary/30 hover:bg-primary/10"
              >
                ${amount}
              </Button>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <CreditCard className="w-4 h-4" />
            <span>Secure payment processing</span>
          </div>
        </div>
      </DialogContent>

      <KYCModal 
        isOpen={isKYCModalOpen}
        onClose={() => setIsKYCModalOpen(false)}
        onKYCComplete={handleKYCComplete}
      />
    </Dialog>
  );
};

export default WalletModal;