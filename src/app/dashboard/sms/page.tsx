'use client';

import { useState } from 'react';

const mockMessages = [
  { id: 1, recipient: 'All P.1 Parents', message: 'Dear parent, this is a reminder that Term 1 fees are due by May 15th. Please ensure timely payment.', sentBy: 'Admin', status: 'sent', sentAt: '2026-05-03 10:30' },
  { id: 2, recipient: 'Mugisha Peter', message: 'Dear parent, Mugisha John was absent today. Please ensure regular attendance.', sentBy: 'Admin', status: 'sent', sentAt: '2026-05-03 09:15' },
  { id: 3, recipient: 'All Parents', message: 'School will be closed on May 20th for a public holiday. Classes resume May 21st.', sentBy: 'Admin', status: 'sent', sentAt: '2026-05-02 14:00' },
  { id: 4, recipient: 'Nakato Mary', message: 'Dear parent, Nakato Sarah has outstanding fees of UGX 75,000. Please contact the bursar.', sentBy: 'Bursar', status: 'pending', sentAt: '-' },
  { id: 5, recipient: 'All Teachers', message: 'Staff meeting scheduled for Friday at 3:00 PM in the main hall.', sentBy: 'Admin', status: 'failed', sentAt: '2026-05-01 11:00' },
];

export default function SMSPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ recipient: '', message: '', template: '' });

  const templates = [
    { name: 'Fee Reminder', text: 'Dear parent, this is a reminder that {term} fees are due by {date}. Please ensure timely payment. Thank you.' },
    { name: 'Absence Alert', text: 'Dear parent, {student} was absent today. Please ensure regular attendance for academic success.' },
    { name: 'Holiday Notice', text: 'School will be closed on {date} for {reason}. Classes resume {resumeDate}.' },
    { name: 'Exam Results', text: 'Dear parent, {term} exam results are now available. {student} scored {score} and ranked {position}.' },
    { name: 'Meeting Notice', text: 'Dear {role}, {meeting} scheduled for {date} at {time} in {location}.' },
  ];

  const totalSent = messages.filter(m => m.status === 'sent').length;
  const totalPending = messages.filter(m => m.status === 'pending').length;
  const totalFailed = messages.filter(m => m.status === 'failed').length;

  const applyTemplate = (template: any) => {
    setFormData({ ...formData, message: template.text, template: template.name });
  };

  const handleSend = () => {
    if (!formData.recipient || !formData.message) return;
    const newMessage = {
      id: messages.length + 1,
      recipient: formData.recipient,
      message: formData.message,
      sentBy: 'Admin',
      status: 'sent',
      sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setMessages([newMessage, ...messages]);
    setShowModal(false);
    setFormData({ recipient: '', message: '', template: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">SMS Notifications</h1>
          <p className="text-neutral-400 mt-1">Send bulk SMS to parents and staff</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          New Message
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Sent</p>
          <p className="text-2xl font-bold text-green-400">{totalSent}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">{totalPending}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Failed</p>
          <p className="text-2xl font-bold text-red-400">{totalFailed}</p>
        </div>
      </div>

      <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Templates</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {templates.map((t, i) => (
            <button key={i} onClick={() => applyTemplate(t)} className="p-3 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-neutral-300 hover:border-primary-500 hover:text-white transition text-center">
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-700">
          <h3 className="text-lg font-semibold text-white">Message History</h3>
        </div>
        <div className="divide-y divide-neutral-700">
          {messages.map(msg => (
            <div key={msg.id} className="p-6 hover:bg-neutral-700/30 transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-white">{msg.recipient}</p>
                  <p className="text-xs text-neutral-400">By {msg.sentBy} · {msg.sentAt}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  msg.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                  msg.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {msg.status}
                </span>
              </div>
              <p className="text-sm text-neutral-300 mt-2">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Send SMS</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Recipient</label>
                <input type="text" value={formData.recipient} onChange={(e) => setFormData({...formData, recipient: e.target.value})} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. All P.1 Parents or phone number" />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Use Template (Optional)</label>
                <div className="grid grid-cols-3 gap-2">
                  {templates.map((t, i) => (
                    <button key={i} onClick={() => applyTemplate(t)} className="px-2 py-1 bg-neutral-900 border border-neutral-700 rounded text-xs text-neutral-300 hover:border-primary-500 transition">{t.name}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Message</label>
                <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Type your message..." />
                <p className="text-xs text-neutral-500 mt-1">{formData.message.length} characters ({Math.ceil(formData.message.length / 160)} SMS)</p>
              </div>
            </div>
            <div className="p-6 border-t border-neutral-700 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition">Cancel</button>
              <button onClick={handleSend} className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition">Send SMS</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
