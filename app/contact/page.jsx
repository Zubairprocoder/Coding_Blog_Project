"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactPage() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  function onSubmit(data) {
    toast.success("Message submitted successfully!");
    console.log("Form data:", data);
    form.reset();
  }

  const formFields = [
    {
      name: "name",
      label: "Name",
      placeholder: "Your full name",
      type: "text",
      rules: {
        required: "Name is required",
        minLength: { value: 3, message: "Minimum 3 characters" },
        maxLength: { value: 30, message: "Maximum 30 characters" },
      },
    },
    {
      name: "email",
      label: "Email",
      placeholder: "your@email.com",
      type: "email",
      rules: { required: "Email is required" },
    },
    {
      name: "subject",
      label: "Subject",
      placeholder: "Subject of your message",
      type: "text",
      rules: {
        required: "Subject is required",
        minLength: { value: 3, message: "Minimum 3 characters" },
        maxLength: { value: 50, message: "Maximum 50 characters" },
      },
    },
    {
      name: "message",
      label: "Message",
      placeholder: "Write your message here...",
      type: "textarea",
      rules: {
        required: "Message is required",
        minLength: { value: 10, message: "Minimum 10 characters" },
        maxLength: { value: 500, message: "Maximum 500 characters" },
      },
    },
  ];

 const faqs = [
   {
     question: "How long does it take to get a response?",
     answer: "We usually respond within 24 hours on business days.",
   },
   {
     question: "Can I suggest new topics for the blog?",
     answer: "Absolutely! We love feedback and suggestions from our readers.",
   },
   {
     question: "Do you offer collaborations or partnerships?",
     answer:
       "Yes! Please use the contact form to describe your collaboration idea.",
   },
   {
     question: "Are the tutorials beginner-friendly?",
     answer:
       "Yes! We provide content for both beginners and advanced developers.",
   },
   {
     question: "Can I request a tutorial on a specific technology?",
     answer:
       "Of course! Just reach out via the contact form with your suggestion.",
   },
   {
     question: "Do you provide source code for tutorials?",
     answer:
       "Yes! Most tutorials include fully working code examples on GitHub or CodeSandbox.",
   },
   {
     question: "Is your content free?",
     answer: "Yes, all our tutorials and blog posts are free to read and use.",
   },
   {
     question: "Can I share your tutorials on social media?",
     answer: "Definitely! We encourage sharing as long as you credit the blog.",
   },
   {
     question: "Do you have a newsletter?",
     answer:
       "Yes! Subscribe to our newsletter to get the latest tutorials and tips directly to your inbox.",
   },
   {
     question: "How do I report a bug or issue on the site?",
     answer:
       "Use the contact form to report any bugs or technical issues you encounter.",
   },
 ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="prose lg:prose-xl mx-auto text-center mb-12">
        <h1>Contact Us</h1>
        <p>
          Have a question, feedback, or just want to say hello? We’d love to
          hear from you! Fill out the form below or explore our FAQs.
        </p>
      </div>

      {/* Why Contact Us */}
      <div className="prose lg:prose-xl mx-auto mb-12">
        <h2>Why Reach Out?</h2>
        <p>
          Our mission is to provide high-quality tutorials, tips, and insights
          into web development. Whether you have a question about a blog post,
          want to suggest a topic, or report a technical issue, we’re here to
          listen and help.
        </p>
        <ul>
          <li>💡 Feedback on tutorials and articles</li>
          <li>🛠 Report technical issues or bugs</li>
          <li>📬 Suggestions for new topics</li>
          <li>🤝 Collaboration or partnership inquiries</li>
        </ul>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          {formFields.map((field) => (
            <Controller
              key={field.name}
              name={field.name}
              control={control}
              rules={field.rules}
              render={({ field: controllerField }) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                  {field.type === "textarea" ? (
                    <Textarea
                      {...controllerField}
                      id={field.name}
                      placeholder={field.placeholder}
                      rows={6}
                      className="min-h-24 resize-none"
                    />
                  ) : (
                    <Input
                      {...controllerField}
                      id={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                  )}
                  <FieldDescription>
                    {field.name === "message" &&
                      "Include details so we can assist you better."}
                  </FieldDescription>
                  {errors[field.name] && (
                    <FieldError errors={[errors[field.name]]} />
                  )}
                </Field>
              )}
            />
          ))}
        </FieldGroup>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">Send Message</Button>
        </div>
      </form>

      {/* FAQ Accordion */}
      <div className="prose lg:prose-xl mx-auto mt-16 text-center">
        <h2>Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full mt-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
