import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerFormModal = ({ isOpen, onClose }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Your Google Apps Script Web App URL
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFVcXKbAJ6zjJHOX-jfYjbQDv3qxrGSXoX56EHi9Ezx4mjMbJATv6cutW_El6MDqAt/exec';

      // CHANGE: Use URLSearchParams to send data as 'application/x-www-form-urlencoded'
      // This is the standard format Google Apps Script expects for 'e.parameter'
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('company', formData.company);
      params.append('message', formData.message);
      
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: params,
        mode: 'no-cors', // Required to bypass CORS restrictions
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      setIsSuccess(true);
      
      // Clear form and close modal after delay
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 3000);

    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white shadow-2xl z-[101] p-8 overflow-hidden rounded-none"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 transition-colors rounded-none"
            >
              <X size={20} className="text-gray-500" />
            </button>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-100 flex items-center justify-center mb-6 rounded-none">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-serif font-medium mb-2">Request Sent!</h3>
                <p className="text-gray-500">We'll contact you regarding the partnership.</p>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-serif font-medium mb-2">Become a Partner</h2>
                <p className="text-gray-500 mb-8">Join our ecosystem. Tell us about your organization.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-black transition-colors rounded-none"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</label>
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-black transition-colors rounded-none"
                        placeholder="jane@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Company</label>
                      <input 
                        required
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-black transition-colors rounded-none"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Partnership Interest</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none rounded-none"
                      placeholder="How would you like to collaborate?"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white font-medium py-4 mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer rounded-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};