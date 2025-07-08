import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, Plus, CreditCard, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WalletModal = () => {
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load wallet balance from localStorage
    const savedBalance = localStorage.getItem('walletBalance');
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
  }, []);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount && amount > 0) {
      const newBalance = balance + amount;
      setBalance(newBalance);
      localStorage.setItem('walletBalance', newBalance.toString());
      setDepositAmount('');
      setIsOpen(false);
      toast({
        title: "Deposit Successful",
        description: `$${amount.toFixed(2)} has been added to your wallet.`,
      });
    }
  };

  const handleSpend = (amount: number) => {
    if (balance >= amount) {
      const newBalance = balance - amount;
      setBalance(newBalance);
      localStorage.setItem('walletBalance', newBalance.toString());
      return true;
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
                Add
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
    </Dialog>
  );
};

export default WalletModal;