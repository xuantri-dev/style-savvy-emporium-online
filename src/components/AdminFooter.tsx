import React from 'react';
import { Link } from 'react-router-dom';

const AdminFooter = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            © 2024 LUXE Admin Panel. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              to="/admin/help" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Help
            </Link>
            <Link 
              to="/admin/support" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Support
            </Link>
            <Link 
              to="/admin/privacy" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;