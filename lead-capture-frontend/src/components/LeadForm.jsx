import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const LeadForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccessMessage('Thank you! Your message has been received.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setErrorMessage(result.error || 'Something went wrong.');
      }
    } catch (error) {
      setErrorMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 min-h-[500px] border rounded-2xl shadow-xl bg-white flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="py-4" htmlFor="name">Name</Label>
          <Input
            className="py-6"
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label className="py-4" htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label className="py-4" htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Type your message..."
            value={formData.message}
            onChange={handleChange}
            required
            className="py-3"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LeadForm;
