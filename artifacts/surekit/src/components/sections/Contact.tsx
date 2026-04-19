import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().optional(),
  message: z.string().min(10, "Please provide a brief message")
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    setIsSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null) as { error?: string } | null;
        throw new Error(errorPayload?.error ?? "We couldn't send your message right now.");
      }

      setIsSuccess(true);
      reset();

      window.setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "We couldn't send your message right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-0 pb-16 sm:pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Get in Touch</h2>
            <h3 className="text-4xl sm:text-5xl font-serif text-foreground mb-6">Begin Your Healing Journey</h3>
            <p className="text-muted-foreground text-lg mb-12">
              Reach out to have a personalised consultation, ask about our bespoke therapy packages, or simply explore how our offerings can support your wellness goals.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                {/* <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-xl mb-1 text-foreground">Sanctuary Address</h4>
                  <p className="text-muted-foreground">123 Tranquil Lane, Suite 2B<br />Wellness District, CA 90210</p>
                </div> */}
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-xl mb-1 text-foreground">Pricing & Enquiries</h4>
                  <p className="text-muted-foreground">Contact us for pricing, availability, and session details.<br />We&apos;ll reply with the next steps.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-xl mb-1 text-foreground">Email</h4>
                  <p className="text-muted-foreground">surekitsattva@gmail.com<br />We typically reply within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-card border border-border shadow-xl shadow-black/5 rounded-[2rem] p-8 sm:p-12"
          >
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-serif text-foreground">Message Sent</h4>
                <p className="text-muted-foreground">Thank you for reaching out. We will connect with you shortly to begin your journey.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Your Name</label>
                    <input 
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-xl bg-input/50 border border-transparent focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                      placeholder="Ankita Tiwari"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <input 
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 rounded-xl bg-input/50 border border-transparent focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                      placeholder="ankita@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Service of Interest</label>
                    <select 
                      {...register("service")}
                      className="w-full px-4 py-3 rounded-xl bg-input/50 border border-transparent focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all outline-none text-foreground"
                    >
                      <option value="">Select a service...</option>
                      <option value="Crystal Therapy">Crystal Therapy</option>
                      <option value="Aroma Therapy">Aroma Therapy</option>
                      <option value="NLP Techniques">NLP Techniques</option>
                      <option value="Energy Alignment">Energy Alignment</option>
                      {/* <option value="Workshop Inquiry">Workshop Inquiry</option> */}
                      <option value="Other / Not Sure">Simply Exploring</option>
                    </select>
                    {errors.service && <p className="text-red-500 text-xs">{errors.service.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Preferred Date (Optional)</label>
                    <input 
                      {...register("date")}
                      type="date"
                      className="w-full px-4 py-3 rounded-xl bg-input/50 border border-transparent focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Your Message</label>
                  <textarea 
                    {...register("message")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-input/50 border border-transparent focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none"
                    placeholder="How can we help you on your journey?"
                  />
                  {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                </div>

                {submitError ? (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </p>
                ) : null}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
