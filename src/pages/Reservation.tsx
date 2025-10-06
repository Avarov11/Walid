import { useState } from 'react';
import { Calendar, MapPin, DollarSign, Home, Mail, Phone, User, MessageSquare, CheckCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured, type ConsultationRequest } from '../lib/supabase';

export default function Reservation() {
  const [formData, setFormData] = useState<ConsultationRequest>({
    client_name: '',
    email: '',
    phone: '',
    project_type: '',
    location: '',
    budget_range: '',
    preferred_date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const projectTypes = [
    'Villa Interior Design',
    'Apartment Interior Design',
    'Penthouse Design',
    'House Renovation',
    'Commercial Space',
    'Other'
  ];

  const budgetRanges = [
    'Under $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    '$500,000+',
    'To be discussed'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    if (!isSupabaseConfigured || !supabase) {
      setErrorMsg('Submission disabled: Supabase is not configured.');
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ...formData,
      // Convert empty preferred_date to null to satisfy date column type
      preferred_date: formData.preferred_date ? formData.preferred_date : null
    } as ConsultationRequest & { preferred_date: string | null };

    const { error } = await supabase
      .from('consultation_requests')
      .insert([payload]);

    if (!error) {
      setIsSuccess(true);
      setFormData({
        client_name: '',
        email: '',
        phone: '',
        project_type: '',
        location: '',
        budget_range: '',
        preferred_date: '',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      setErrorMsg(error.message || 'Failed to submit. Please try again.');
    }

    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-stone-50 pt-32 pb-24 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <CheckCircle className="w-20 h-20 text-amber-400 mx-auto mb-6" />
          <h2 className="text-4xl font-light text-black mb-4">Thank You!</h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Your consultation request has been received. Our team will contact you within 24 hours to schedule your appointment.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="mt-8 bg-amber-400 hover:bg-amber-500 text-black px-8 py-3 rounded-none font-light tracking-wider transition-all duration-300"
          >
            SUBMIT ANOTHER REQUEST
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-black mb-4">
            Book Your Consultation
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Take the first step towards your dream space. Share your vision with us, and let's create something extraordinary together.
          </p>
          <div className="w-24 h-px bg-amber-400 mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-light text-black mb-8">Get in Touch</h2>
            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-amber-400 mt-1" />
                <div>
                  <h3 className="text-lg font-light text-black mb-1">Email</h3>
                  <p className="text-gray-600 font-light">info@luxeinteriors.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-amber-400 mt-1" />
                <div>
                  <h3 className="text-lg font-light text-black mb-1">Phone</h3>
                  <p className="text-gray-600 font-light">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-amber-400 mt-1" />
                <div>
                  <h3 className="text-lg font-light text-black mb-1">Location</h3>
                  <p className="text-gray-600 font-light">Dubai Design District, UAE</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-light text-black mb-4">What to Expect</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 mt-2"></div>
                  <p className="text-gray-600 font-light">
                    Initial consultation to discuss your vision, requirements, and budget
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 mt-2"></div>
                  <p className="text-gray-600 font-light">
                    Site visit and detailed space assessment
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 mt-2"></div>
                  <p className="text-gray-600 font-light">
                    Preliminary design concepts and mood boards
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-400 mt-2"></div>
                  <p className="text-gray-600 font-light">
                    Detailed proposal with timeline and cost breakdown
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-12 shadow-lg">
              {errorMsg && (
                <div className="mb-6 p-4 border border-red-200 bg-red-50 text-red-700 text-sm">
                  {errorMsg}
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-light tracking-wider text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-amber-400" />
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-light tracking-wider text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-amber-400" />
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-light tracking-wider text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2 text-amber-400" />
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-light tracking-wider text-gray-700 mb-2">
                    <Home className="w-4 h-4 mr-2 text-amber-400" />
                    PROJECT TYPE *
                  </label>
                  <select
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-light tracking-wider text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-amber-400" />
                    PROJECT LOCATION *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                    placeholder="Dubai Marina, UAE"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-light tracking-wider text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 mr-2 text-amber-400" />
                    BUDGET RANGE *
                  </label>
                  <select
                    name="budget_range"
                    value={formData.budget_range}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-light tracking-wider text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-amber-400" />
                    PREFERRED CONSULTATION DATE
                  </label>
                  <input
                    type="date"
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-amber-400 focus:outline-none transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-light tracking-wider text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 mr-2 text-amber-400" />
                    ADDITIONAL DETAILS
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-amber-400 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us about your vision, style preferences, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-black py-4 rounded-none font-light tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REQUEST'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
