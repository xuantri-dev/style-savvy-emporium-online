import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, Calendar, User, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';
import { mockOrders, mockProducts, extendedMockUsers } from '@/data/mockData';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const order = mockOrders.find(o => o.id === id);
  const user = extendedMockUsers.find(u => u.id === order?.userId);

  if (!order) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-light mb-4">Order not found</h1>
            <p className="text-muted-foreground mb-8">
              The order you're looking for doesn't exist or may have been removed.
            </p>
            <Button asChild>
              <Link to="/orders">Back to Orders</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      default:
        return <Package className="h-5 w-5 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusProgress = (status: string) => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: Package },
      { key: 'processing', label: 'Processing', icon: Package },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: CheckCircle },
    ];

    const currentIndex = steps.findIndex(step => step.key === status);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex,
    }));
  };

  const statusSteps = getStatusProgress(order.status);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/orders" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-light tracking-wide">Order #{order.id}</h1>
              <p className="text-muted-foreground mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <Badge className={`${getStatusColor(order.status)} text-base px-4 py-2`}>
              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                          step.completed 
                            ? 'bg-primary border-primary text-primary-foreground' 
                            : step.current
                            ? 'border-primary text-primary bg-primary/10'
                            : 'border-muted text-muted-foreground'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {step.label}
                          </p>
                          {step.current && (
                            <p className="text-sm text-muted-foreground">Current status</p>
                          )}
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div className={`w-px h-8 ml-5 ${step.completed ? 'bg-primary' : 'bg-border'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {order.items.map((item, index) => {
                    const product = mockProducts.find(p => p.id === item.productId);
                    if (!product) return null;

                    return (
                      <div key={`${item.productId}-${item.size}-${item.color}`}>
                        <div className="flex gap-4">
                          <div className="w-20 h-24 flex-shrink-0">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-lg">{product.name}</h4>
                            <div className="text-muted-foreground mt-1 space-y-1">
                              <div>Size: {item.size}</div>
                              <div>Color: {item.color}</div>
                              <div>Quantity: {item.quantity}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg">${item.price}</div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-muted-foreground">
                                ${item.price / item.quantity} each
                              </div>
                            )}
                          </div>
                        </div>
                        {index < order.items.length - 1 && <Separator className="mt-6" />}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$0</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${order.total}</span>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  {user && <div className="font-medium">{user.name}</div>}
                  <div>{order.shippingAddress.street}</div>
                  <div>
                    {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                  </div>
                  <div>{order.shippingAddress.country}</div>
                </div>
              </CardContent>
            </Card>

            {/* Order Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  Track Package
                </Button>
                <Button className="w-full" variant="outline">
                  Download Invoice
                </Button>
                {order.status === 'delivered' && (
                  <Button className="w-full" variant="outline">
                    Return Items
                  </Button>
                )}
                <Button className="w-full" variant="outline">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;