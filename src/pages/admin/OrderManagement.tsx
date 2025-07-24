import React, { useState } from 'react';
import { Eye, Edit, Truck, Package, CheckCircle, XCircle, Search, Filter, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/components/AdminLayout';
import { mockOrders, extendedMockUsers, getProductById } from '@/data/mockData';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders] = useState(mockOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modalState, setModalState] = useState({ 
    type: '', 
    isOpen: false, 
    orderId: null as string | null 
  });

  const selectedOrder = modalState.orderId ? orders.find(o => o.id === modalState.orderId) : null;

  const openModal = (type: string, orderId?: string) => {
    setModalState({ type, isOpen: true, orderId: orderId || null });
  };

  const closeModal = () => {
    setModalState({ type: '', isOpen: false, orderId: null });
  };

  const getUserById = (userId: string) => extendedMockUsers.find(user => user.id === userId);

  const filteredOrders = orders.filter(order => {
    const user = getUserById(order.userId);
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user?.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'shipped': return 'secondary';
      case 'processing': return 'outline';
      case 'pending': return 'destructive';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light tracking-wide">Order Management</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cancellation</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.map((order) => {
                  const user = getUserById(order.userId);
                  return (
                    <TableRow key={order.id}>
                      <TableCell>
                        <p className="font-medium">{order.id}</p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, index) => {
                            const product = getProductById(item.productId);
                            return (
                              <div key={index} className="text-sm">
                                <span>{product?.name || 'Unknown Product'} × {item.quantity}</span>
                              </div>
                            );
                          })}
                          {order.items.length > 2 && (
                            <p className="text-xs text-muted-foreground">
                              +{order.items.length - 2} more items
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${order.total}</span>
                      </TableCell>
                      <TableCell>
                      <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.cancellationReason ? (
                        <div className="text-sm">
                          <span className="text-red-600 font-medium">Cancelled</span>
                          <p className="text-muted-foreground text-xs mt-1">{order.cancellationReason}</p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                          <p className="text-muted-foreground">
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openModal('view', order.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {order.status !== 'cancelled' && order.status !== 'delivered' && (
                          <Button variant="ghost" size="sm" onClick={() => openModal('edit', order.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => openModal('delete', order.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === i + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(i + 1);
                          }}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Modals */}
        <Dialog open={modalState.isOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {modalState.type === 'view' && 'Order Details'}
                {modalState.type === 'edit' && 'Edit Order'}
                {modalState.type === 'delete' && 'Delete Order'}
              </DialogTitle>
              <DialogDescription>
                {modalState.type === 'view' && 'View complete order information and details.'}
                {modalState.type === 'edit' && 'Update order status and information.'}
                {modalState.type === 'delete' && 'This action cannot be undone. This will permanently delete the order.'}
              </DialogDescription>
            </DialogHeader>

            {modalState.type === 'delete' && selectedOrder ? (
              <div className="py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Are you sure you want to delete order "{selectedOrder.id}"?
                </p>
                <div className="p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Order ID:</span>
                    <span className="text-sm text-muted-foreground">{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="text-sm text-muted-foreground">${selectedOrder.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    <Badge variant={getStatusColor(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ) : modalState.type === 'view' && selectedOrder ? (
              <div className="py-4 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Order ID</Label>
                      <p className="text-sm text-muted-foreground">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Customer</Label>
                      <p className="text-sm text-muted-foreground">{getUserById(selectedOrder.userId)?.name}</p>
                      <p className="text-xs text-muted-foreground">{getUserById(selectedOrder.userId)?.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Order Date</Label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedOrder.createdAt).toLocaleDateString()} at {new Date(selectedOrder.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge variant={getStatusColor(selectedOrder.status)} className="flex items-center gap-1 w-fit">
                        {getStatusIcon(selectedOrder.status)}
                        {selectedOrder.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Total Amount</Label>
                      <p className="text-lg font-semibold">${selectedOrder.total}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Items Count</Label>
                      <p className="text-sm text-muted-foreground">{selectedOrder.items.length} items</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Shipping Address</Label>
                      <div className="text-sm text-muted-foreground">
                        <p>{selectedOrder.shippingAddress.street}</p>
                        <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.zipCode}</p>
                        <p>{selectedOrder.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Order Items</Label>
                  <div className="mt-2 space-y-2">
                    {selectedOrder.items.map((item, index) => {
                      const product = getProductById(item.productId);
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                          {product && (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-md"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{product?.name || 'Unknown Product'}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity} × ${item.price} = ${item.quantity * item.price}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : modalState.type === 'edit' && selectedOrder ? (
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orderStatus">Order Status</Label>
                    <Select defaultValue={selectedOrder.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="totalAmount">Total Amount</Label>
                    <Input id="totalAmount" type="number" defaultValue={selectedOrder.total} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="trackingNumber">Tracking Number</Label>
                  <Input id="trackingNumber" placeholder="Enter tracking number" />
                </div>
              </div>
            ) : null}

            <DialogFooter>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              {modalState.type === 'delete' ? (
                <Button variant="destructive">Delete Order</Button>
              ) : modalState.type === 'edit' ? (
                <Button>Save Changes</Button>
              ) : null}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default OrderManagement;