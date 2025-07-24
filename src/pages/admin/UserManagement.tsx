import React, { useState } from 'react';
import { Edit, Trash2, Plus, Search, UserCheck, UserX, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AdminLayout from '@/components/AdminLayout';
import { extendedMockUsers } from '@/data/mockData';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState(extendedMockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modalState, setModalState] = useState({ 
    type: '', 
    isOpen: false, 
    userId: null as string | null 
  });

  const selectedUser = modalState.userId ? users.find(u => u.id === modalState.userId) : null;

  const openModal = (type: string, userId?: string) => {
    setModalState({ type, isOpen: true, userId: userId || null });
  };

  const closeModal = () => {
    setModalState({ type: '', isOpen: false, userId: null });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'suspended': return 'destructive';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light tracking-wide">User Management</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {user.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.address ? (
                        <div className="text-sm">
                          <p>{user.address.city}, {user.address.country}</p>
                          <p className="text-muted-foreground">{user.address.zipCode}</p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No address</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(user.status)} className="flex items-center gap-1 w-fit">
                        {user.status === 'active' && <UserCheck className="h-3 w-3" />}
                        {user.status === 'suspended' && <UserX className="h-3 w-3" />}
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openModal('view', user.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openModal('edit', user.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openModal('delete', user.id)}>
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

        {/* User Modals */}
        <Dialog open={modalState.isOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {modalState.type === 'view' && 'User Details'}
                {modalState.type === 'edit' && 'Edit User'}
                {modalState.type === 'delete' && 'Delete User'}
              </DialogTitle>
              <DialogDescription>
                {modalState.type === 'view' && 'View user information and details.'}
                {modalState.type === 'edit' && 'Update user information and settings.'}
                {modalState.type === 'delete' && 'This action cannot be undone. This will permanently delete the user account.'}
              </DialogDescription>
            </DialogHeader>

            {modalState.type === 'delete' && selectedUser ? (
              <div className="py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Are you sure you want to delete "{selectedUser.name}"?
                </p>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                </div>
              </div>
            ) : modalState.type === 'view' && selectedUser ? (
              <div className="py-4 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">User Name</Label>
                    <p className="text-sm text-muted-foreground">{selectedUser.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Role</Label>
                    <p className="text-sm text-muted-foreground capitalize">{selectedUser.role}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <p className="text-sm text-muted-foreground capitalize">{selectedUser.status}</p>
                  </div>
                </div>
                {selectedUser.address && (
                  <div>
                    <Label className="text-sm font-medium">Address</Label>
                    <div className="text-sm text-muted-foreground mt-1">
                      <p>{selectedUser.address.street}</p>
                      <p>{selectedUser.address.city}, {selectedUser.address.country}</p>
                      <p>{selectedUser.address.zipCode}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : modalState.type === 'edit' && selectedUser ? (
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="userName">User Name</Label>
                    <Input id="userName" defaultValue={selectedUser.name} />
                  </div>
                  <div>
                    <Label htmlFor="userEmail">Email</Label>
                    <Input id="userEmail" defaultValue={selectedUser.email} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="userRole">Role</Label>
                    <Select defaultValue={selectedUser.role}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="userStatus">Status</Label>
                    <Select defaultValue={selectedUser.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ) : null}

            <DialogFooter>
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              {modalState.type === 'delete' ? (
                <Button variant="destructive">Delete User</Button>
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

export default UserManagement;