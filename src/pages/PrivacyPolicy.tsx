import React from 'react';
import Layout from '@/components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="section-heading mb-8">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none space-y-8">
          <div className="text-sm text-muted-foreground mb-8">
            Last updated: January 1, 2024
          </div>

          <section>
            <h2 className="text-xl font-medium mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              At LUXE, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
              or make a purchase from us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Information We Collect</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-2">Personal Information</h3>
                <p>When you create an account or make a purchase, we collect:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely by our payment processors)</li>
                  <li>Email address and phone number</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground mb-2">Usage Information</h3>
                <p>We automatically collect information about your interaction with our website:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website or source</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Process and fulfill your orders</li>
              <li>Provide customer service and support</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Improve our website and services</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Service providers who assist with order fulfillment and payment processing</li>
              <li>Shipping companies for delivery purposes</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners for joint marketing efforts (with your explicit consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. This includes SSL encryption for data transmission, secure servers, 
              and regular security audits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies to enhance your browsing experience, analyze website traffic, and personalize content. 
              You can control cookie settings through your browser preferences. Some features may not function properly 
              if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access and review your personal information</li>
              <li>Update or correct your information</li>
              <li>Delete your account and personal data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected information from a child under 13, 
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new policy on our website and updating the "Last updated" date. We encourage you to review this policy 
              periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-4 space-y-1 text-muted-foreground">
              <p>Email: privacy@luxe.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Fashion Avenue, New York, NY 10001</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;