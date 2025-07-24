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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AdminLayout from '@/components/AdminLayout';
import { mockCategories } from '@/data/mockData';

const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories] = useState(mockCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [modalState, setModalState] = useState({ 
    type: '', 
    isOpen: false, 
    categoryId: null as string | null 
  });

  const selectedCategory = modalState.categoryId ? categories.find(c => c.id === modalState.categoryId) : null;

  const openModal = (type: string, categoryId?: string) => {
    setModalState({ type, isOpen: true, categoryId: categoryId || null });
  };

  const closeModal = () => {
    setModalState({ type: '', isOpen: false, categoryId: null });
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light tracking-wide">Category Management</h1>
          <Button className="flex items-center gap-2" onClick={() => openModal('add')}>
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categories ({filteredCategories.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Product Count</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {category.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{category.description}</p>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{category.productCount} products</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={category.visible ? 'default' : 'secondary'}>
                        {category.visible ? 'Visible' : 'Hidden'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openModal('view', category.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openModal('edit', category.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openModal('delete', category.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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

        {/* Category Modals */}
        <Dialog open={modalState.isOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {modalState.type === 'add' && 'Add New Category'}
                {modalState.type === 'view' && 'Category Details'}
                {modalState.type === 'edit' && 'Edit Category'}
                {modalState.type === 'delete' && 'Delete Category'}
              </DialogTitle>
              <DialogDescription>
                {modalState.type === 'add' && 'Create a new product category.'}
                {modalState.type === 'view' && 'View category information and details.'}
                {modalState.type === 'edit' && 'Update category information and settings.'}
                {modalState.type === 'delete' && 'This action cannot be undone. This will permanently delete the category.'}
              </DialogDescription>
            </DialogHeader>

            {modalState.type === 'delete' && selectedCategory ? (
              <div className="py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Are you sure you want to delete "{selectedCategory.name}"?
                </p>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <img
                    src={selectedCategory.image}
                    alt={selectedCategory.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-medium">{selectedCategory.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedCategory.productCount} products</p>
                  </div>
                </div>
              </div>
            ) : modalState.type === 'view' && selectedCategory ? (
              <div className="py-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <img
                      src={selectedCategory.image}
                      alt={selectedCategory.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Category Name</Label>
                      <p className="text-sm text-muted-foreground">{selectedCategory.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Product Count</Label>
                      <p className="text-sm text-muted-foreground">{selectedCategory.productCount} products</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category ID</Label>
                      <p className="text-sm text-muted-foreground">{selectedCategory.id}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedCategory.description}</p>
                </div>
              </div>
            ) : (modalState.type === 'add' || modalState.type === 'edit') ? (
              <div className="py-4 space-y-4">
                <div>
                  <Label htmlFor="categoryName">Category Name</Label>
                  <Input id="categoryName" defaultValue={selectedCategory?.name || ''} />
                </div>
                <div>
                  <Label htmlFor="categoryDescription">Description</Label>
                  <Textarea id="categoryDescription" defaultValue={selectedCategory?.description || ''} />
                </div>
                <div>
                  <Label htmlFor="categoryImage">Image URL</Label>
                  <Input id="categoryImage" placeholder="Enter category image URL" />
                </div>
              </div>
            ) : null}

            <DialogFooter>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              {modalState.type === 'delete' ? (
                <Button variant="destructive">Delete Category</Button>
              ) : modalState.type !== 'view' ? (
                <Button>
                  {modalState.type === 'add' ? 'Create Category' : 'Save Changes'}
                </Button>
              ) : null}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default CategoryManagement;