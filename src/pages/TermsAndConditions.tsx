import React from 'react';
import Layout from '@/components/Layout';

const TermsAndConditions = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="section-heading mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-gray max-w-none space-y-8">
          <div className="text-sm text-muted-foreground mb-8">
            Last updated: January 1, 2024
          </div>

          <section>
            <h2 className="text-xl font-medium mb-4">Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using the LUXE website and services, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Use License</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Permission is granted to temporarily download one copy of the materials on LUXE's website for personal, 
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Product Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We strive to ensure that product information is accurate. However:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Colors may appear differently on different devices</li>
                <li>Product availability is subject to change</li>
                <li>We reserve the right to correct errors, inaccuracies, or omissions</li>
                <li>We may update product information without prior notice</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Pricing and Payment</h2>
            <div className="space-y-4 text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are in USD and subject to change without notice</li>
                <li>Prices do not include applicable taxes, which will be added at checkout</li>
                <li>Payment is due at the time of purchase</li>
                <li>We accept major credit cards, PayPal, and other approved payment methods</li>
                <li>We reserve the right to refuse or cancel orders for any reason</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Shipping and Delivery</h2>
            <div className="space-y-4 text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Risk of loss passes to you upon delivery to the shipping carrier</li>
                <li>We are not responsible for shipping delays beyond our control</li>
                <li>International customers are responsible for customs duties and taxes</li>
                <li>Shipping costs are calculated at checkout</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Returns and Exchanges</h2>
            <div className="space-y-4 text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Items may be returned within 30 days of delivery</li>
                <li>Items must be in original condition with tags attached</li>
                <li>Custom or personalized items cannot be returned</li>
                <li>Return shipping costs are the customer's responsibility unless the item is defective</li>
                <li>Refunds will be processed within 5-10 business days of receiving the returned item</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Account Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>When you create an account with us, you must provide accurate and complete information. You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Maintaining the security of your account password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your account information remains current</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Prohibited Uses</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You may not use our service:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations or laws</li>
                <li>To transmit or procure the sending of any advertising or promotional material without our prior consent</li>
                <li>To impersonate or attempt to impersonate the company, an employee, another user, or any other person</li>
                <li>In any way that infringes upon the rights of others</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall LUXE or its suppliers be liable for any damages (including, without limitation, damages 
              for loss of data or profit, or due to business interruption) arising out of the use or inability to use 
              the materials on LUXE's website, even if LUXE or a LUXE authorized representative has been notified orally 
              or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of New York and you 
              irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              LUXE reserves the right to revise these terms of service at any time without notice. By using this website, 
              you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="mt-4 space-y-1 text-muted-foreground">
              <p>Email: legal@luxe.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Fashion Avenue, New York, NY 10001</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;