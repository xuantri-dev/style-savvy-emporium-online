import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/Layout';

const FAQ = () => {
  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all items in their original condition with tags attached. Items must be unworn and in original packaging. Return shipping is free for exchanges and store credit.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-7 business days within the US. Express shipping (1-3 business days) is available for an additional fee. International shipping times vary by location (7-14 business days).',
    },
    {
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free standard shipping on orders over $100 within the United States. International shipping rates vary by destination.',
    },
    {
      question: 'What sizes do you carry?',
      answer: 'We carry sizes XS through XL for most items. Some pieces may have extended sizing available. Please check the size guide on each product page for specific measurements.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.',
    },
    {
      question: 'Can I change or cancel my order?',
      answer: 'Orders can be modified or cancelled within 1 hour of placement. After that, orders are processed for shipping. Please contact customer service immediately if you need to make changes.',
    },
    {
      question: 'Do you have a size guide?',
      answer: 'Yes, we provide detailed size guides for each product category. You can find the size guide link on every product page. We also offer virtual fitting consultations for a perfect fit.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.',
    },
    {
      question: 'Are your products ethically made?',
      answer: 'Yes, we are committed to ethical manufacturing. We work with certified suppliers who maintain fair labor practices and environmental standards. Learn more on our sustainability page.',
    },
    {
      question: 'How do I care for my garments?',
      answer: 'Care instructions are provided on each product page and on the garment labels. Generally, we recommend gentle washing in cold water and air drying to maintain quality and longevity.',
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes, we offer a 10% student discount. Verify your student status through our verification partner to receive your discount code.',
    },
    {
      question: 'How can I contact customer service?',
      answer: 'You can reach our customer service team via email at hello@luxe.com, phone at +1 (555) 123-4567, or through our contact form. We\'re available Monday-Friday 9AM-8PM EST.',
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="section-heading mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to the most common questions about our products, shipping, and policies.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center bg-muted rounded-lg p-8">
          <h2 className="text-xl font-medium mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our customer service team is here to help. Get in touch and we'll respond as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@luxe.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Email Us
            </a>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-sm font-medium rounded-md text-foreground bg-background hover:bg-muted transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;