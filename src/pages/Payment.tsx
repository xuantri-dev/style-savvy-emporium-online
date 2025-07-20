import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const handleProcessPayment = () => {
    toast({
      title: 'Payment processed successfully!',
      description: 'Redirecting to order confirmation...',
    });
    // Redirect to orders page after successful payment
    setTimeout(() => navigate('/orders'), 1500);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate('/checkout')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-light tracking-wide">Payment</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentInfo.cvv}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input
                id="nameOnCard"
                value={paymentInfo.nameOnCard}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="savePayment" />
              <Label htmlFor="savePayment" className="text-sm">
                Save payment information for future purchases
              </Label>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="text-muted-foreground">Your payment information is secure and encrypted</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => navigate('/checkout')} className="flex-1">
                Back to Checkout
              </Button>
              <Button onClick={handleProcessPayment} className="flex-1">
                Process Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Payment;