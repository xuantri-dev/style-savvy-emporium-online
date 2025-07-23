import React, { useState } from 'react';
import { Edit, Trash2, Plus, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminLayout from '@/components/AdminLayout';
import { mockProducts } from '@/data/mockData';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState(mockProducts);
  const [modalState, setModalState] = useState({ 
    type: '', 
    isOpen: false, 
    productId: null as string | null 
  });

  const selectedProduct = modalState.productId ? products.find(p => p.id === modalState.productId) : null;

  const openModal = (type: string, productId?: string) => {
    setModalState({ type, isOpen: true, productId: productId || null });
  };

  const closeModal = () => {
    setModalState({ type: '', isOpen: false, productId: null });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light tracking-wide">Product Management</h1>
          <Button className="flex items-center gap-2" onClick={() => openModal('add')}>
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.inStock ? 'default' : 'destructive'}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {product.featured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                        {product.onSale && (
                          <Badge variant="outline">On Sale</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{product.rating}</span>
                        <span className="text-muted-foreground">({product.reviews})</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openModal('view', product.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openModal('edit', product.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openModal('delete', product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Product Modals */}
        <Dialog open={modalState.isOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {modalState.type === 'add' && 'Add New Product'}
                {modalState.type === 'view' && 'Product Details'}
                {modalState.type === 'edit' && 'Edit Product'}
                {modalState.type === 'delete' && 'Delete Product'}
              </DialogTitle>
              <DialogDescription>
                {modalState.type === 'add' && 'Create a new product listing.'}
                {modalState.type === 'view' && 'View product information and details.'}
                {modalState.type === 'edit' && 'Update product information and settings.'}
                {modalState.type === 'delete' && 'This action cannot be undone. This will permanently delete the product.'}
              </DialogDescription>
            </DialogHeader>

            {modalState.type === 'delete' && selectedProduct ? (
              <div className="py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Are you sure you want to delete "{selectedProduct.name}"?
                </p>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{selectedProduct.name}</p>
                    <p className="text-sm text-muted-foreground">${selectedProduct.price}</p>
                  </div>
                </div>
              </div>
            ) : modalState.type === 'view' && selectedProduct ? (
              <div className="py-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Product Name</Label>
                      <p className="text-sm text-muted-foreground">{selectedProduct.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <p className="text-sm text-muted-foreground capitalize">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Price</Label>
                      <p className="text-sm text-muted-foreground">${selectedProduct.price}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Rating</Label>
                      <p className="text-sm text-muted-foreground">{selectedProduct.rating} ({selectedProduct.reviews} reviews)</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedProduct.description}</p>
                </div>
              </div>
            ) : (modalState.type === 'add' || modalState.type === 'edit') ? (
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" defaultValue={selectedProduct?.name || ''} />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select defaultValue={selectedProduct?.category || ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dresses">Dresses</SelectItem>
                        <SelectItem value="tops">Tops</SelectItem>
                        <SelectItem value="bottoms">Bottoms</SelectItem>
                        <SelectItem value="outerwear">Outerwear</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" defaultValue={selectedProduct?.price || ''} />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price</Label>
                    <Input id="originalPrice" type="number" defaultValue={selectedProduct?.originalPrice || ''} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" defaultValue={selectedProduct?.description || ''} />
                </div>
                <div>
                  <Label htmlFor="images">Image URLs</Label>
                  <Input id="images" placeholder="Enter image URLs separated by commas" />
                </div>
              </div>
            ) : null}

            <DialogFooter>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              {modalState.type === 'delete' ? (
                <Button variant="destructive">Delete Product</Button>
              ) : modalState.type !== 'view' ? (
                <Button>
                  {modalState.type === 'add' ? 'Create Product' : 'Save Changes'}
                </Button>
              ) : null}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ProductManagement;