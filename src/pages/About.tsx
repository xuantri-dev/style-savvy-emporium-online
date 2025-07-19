import React from 'react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="section-heading mb-8 text-center">About LUXE</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Founded with a vision to redefine modern fashion, LUXE curates sophisticated pieces 
            that blend timeless elegance with contemporary style. Our commitment to quality, 
            sustainability, and exceptional craftsmanship sets us apart in the fashion industry.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-xl font-medium mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide discerning customers with premium fashion pieces that embody 
                sophistication, quality, and sustainable practices. We believe fashion 
                should be both beautiful and responsible.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-medium mb-4">Our Values</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Quality craftsmanship in every piece</li>
                <li>• Sustainable and ethical production</li>
                <li>• Timeless designs over fleeting trends</li>
                <li>• Exceptional customer experience</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-medium mb-4">Join Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover fashion that transcends seasons and trends. Experience the LUXE 
              difference and become part of our community of style enthusiasts who 
              appreciate the finer things in life.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;