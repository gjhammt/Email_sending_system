import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';


const AdminDashboard = ({ token, admin, onLogout}) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('http://localhost:5000/api/admin/leads', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setLeads(data);
          if (data.length > 0) setSelectedEmail(data[0].email); // default select first user
        } else {
          console.error(data.message || 'Failed to fetch leads');
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, [token]);

  // Group leads by email
  const groupedLeads = leads.reduce((acc, lead) => {
    if (!acc[lead.email]) acc[lead.email] = [];
    acc[lead.email].push(lead);
    return acc;
  }, {});

  const getInitials = (name) =>
    name
      ? name
          .split(' ')
          .map((n) => n[0].toUpperCase())
          .join('')
      : '?';

  const users = Object.entries(groupedLeads);
  const filteredEmails = Object.entries(groupedLeads).filter(
    ([email, messages]) =>
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      messages[0].name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLeads = selectedEmail ? groupedLeads[selectedEmail] : [];

  const monthlyLeadCounts = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    count: leads.filter(
      (lead) => new Date(lead.date).getMonth() === i
    ).length,
  }));

  const latestLeads = leads.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    // <div className="flex h-screen">
    //   {/* Header */}
    //   <div className="fixed top-0 left-0 w-full z-50">
    //     <div
    //       className="relative bg-cover bg-center h-32 shadow-md"
    //       style={{ backgroundImage: 'url("https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg")' }}
    //     >
    //       <div className="absolute inset-0  bg-opacity-10 flex items-center justify-between px-6 py-4 text-white">
    //         <div>
    //           <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
    //           <p className="text-sm">Logged in as {admin.name} ({admin.email})</p>
    //         </div>
    //         <Button variant="destructive" onClick={onLogout}>
    //           Logout
    //         </Button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Sidebar */}
    //   <ScrollArea className="w-1/4 mt-32 border-r bg-white p-4">
    //     <h2 className="text-lg font-semibold mb-4">Leads</h2>
    //     <Input
    //       type="text"
    //       placeholder="Search by name or email"
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //       className="mb-4"
    //     />
    //     {filteredEmails.map(([email, messages]) => (
    //       <motion.div
    //         whileHover={{ scale: 1.02 }}
    //         whileTap={{ scale: 0.98 }}
    //         key={email}
    //         onClick={() => setSelectedEmail(email)}
    //         className={`cursor-pointer p-3 rounded-md mb-2 shadow-sm transition duration-200 border ${
    //           selectedEmail === email ? 'bg-indigo-100 border-indigo-400' : 'bg-white hover:bg-gray-100'
    //         }`}
    //       >
    //         <div className="flex items-center gap-2">
    //           <Avatar className="h-8 w-8">
    //             <AvatarFallback>{messages[0].name.charAt(0)}</AvatarFallback>
    //           </Avatar>
    //           <div>
    //             <p className="font-medium text-sm">{messages[0].name}</p>
    //             <p className="text-xs text-gray-600">{email}</p>
    //           </div>
    //         </div>
    //       </motion.div>
    //     ))}
    //   </ScrollArea>


    //   {/* Chat Area */}
    //   <div className="w-3/4 mt-32 p-6 overflow-y-auto">
    //     <h2 className="text-xl font-semibold mb-4">Messages</h2>
    //     {selectedLeads.map((lead, idx) => (
    //       <motion.div
    //         key={idx}
    //         initial={{ opacity: 0, y: 10 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ delay: idx * 0.05 }}
    //         className="mb-4"
    //       >
    //         <Card className="p-4">
    //           <div className="text-sm text-gray-500 mb-1">
    //             {new Date(lead.date).toLocaleString()}
    //           </div>
    //           <div className="text-md font-medium">{lead.message}</div>
    //         </Card>
    //       </motion.div>
    //     ))}

    //     {selectedLeads.length === 0 && (
    //       <p className="text-gray-500 italic">Select a lead to view messages</p>
    //     )}
    //   </div>
    // </div>
    <div className=" bg-gray-50">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div
          className="relative bg-cover bg-center h-40 shadow-md"
          style={{ backgroundImage: 'url("https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg")' }}
        >
          <div className="absolute inset-0 bg-opacity-60 flex items-center justify-between px-6 py-4 text-white">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-sm">Logged in as {admin.name} ({admin.email})</p>
            </div>
            <Button variant="destructive" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-40 px-6 pb-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Stats & Chart */}
        <div className="col-span-1 md:col-span-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Leads Per Month</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyLeadCounts}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Latest Leads */}
        <div className="col-span-1 md:col-span-4 bg-white p-6 rounded-lg shadow overflow-y-auto max-h-[400px]">
          <h2 className="text-lg font-semibold mb-4">Latest Leads</h2>
          {latestLeads.map((lead, idx) => (
            <div key={idx} className="mb-3 flex items-start gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{lead.name}</p>
                <p className="text-xs text-gray-500">{lead.email}</p>
                <p className="text-xs text-gray-400">{new Date(lead.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lead List */}
        <div className="col-span-12 md:col-span-4 bg-white p-4 rounded-lg shadow h-[calc(100vh-420px)] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Leads</h2>
          <Input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          {filteredEmails.map(([email, messages]) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={email}
              onClick={() => setSelectedEmail(email)}
              className={`cursor-pointer p-3 rounded-md mb-2 shadow-sm transition duration-200 border ${
                selectedEmail === email ? 'bg-indigo-100 border-indigo-400' : 'bg-white hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{messages[0].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{messages[0].name}</p>
                  <p className="text-xs text-gray-600">{email}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="col-span-12 md:col-span-8 bg-white p-6 rounded-lg shadow h-[calc(100vh-420px)] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Messages</h2>
          {selectedLeads.map((lead, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="mb-4"
            >
              <Card className="p-4">
                <div className="text-sm text-gray-500 mb-1">
                  {new Date(lead.date).toLocaleString()}
                </div>
                <div className="text-md font-medium">{lead.message}</div>
              </Card>
            </motion.div>
          ))}

          {selectedLeads.length === 0 && (
            <p className="text-gray-500 italic">Select a lead to view messages</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
