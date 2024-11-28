'use client';
import {useState} from 'react';
import {Bell, Menu, Paperclip, Send, Smile, User, Bot} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Avatar} from '@/components/ui/avatar';

export default function ChatComponent() {
  const [language, setLanguage] = useState('en'); // Default to English
  const [messages, setMessages] = useState([
    {role: 'bot', text: 'Hi! How can I help you ?'},
  ]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('default-session'); // Example session ID

  // API Base URL
  const apiBaseUrl = 'https://shakti-rag.onrender.com';

  // Language-specific API endpoints
  const apiEndpoints = {
    en: `${apiBaseUrl}/chat`,
    od: `${apiBaseUrl}/chat/odia`,
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const messageToSend = {
      question: input,
      session_id: sessionId,
      model: 'gpt-4o-mini', // Ensure this model is correct for your API
    };

    // Add user message locally
    setMessages(prev => [...prev, {role: 'user', text: input}]);
    setInput('');

    try {
      const response = await fetch(apiEndpoints[language], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageToSend),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (response.ok) {
        setMessages(prev => [...prev, {role: 'bot', text: data.answer}]);
      } else {
        console.error('Server Error:', data);
        setMessages(prev => [
          ...prev,
          {role: 'bot', text: `Error: ${data.detail || 'An error occurred.'}`},
        ]);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessages(prev => [
        ...prev,
        {role: 'bot', text: 'Error: Unable to connect to the server.'},
      ]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#FDF6E9]">
      {/* Sidebar */}
      <div className="w-full lg:w-24 bg-[#C4632D] flex lg:flex-col justify-between p-4"></div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between p-4 border-b space-y-2 sm:space-y-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-[#006838]">
              Shakti Saathi
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="en">English</option>
              <option value="od">Odia</option>
            </select>
            <div className="relative">
              <Bell className="h-6 w-6 text-orange-500" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                !
              </span>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'bot' && (
                <Avatar className="h-8 w-8">
                  <Bot className="h-8 w-8 text-gray-500" />
                </Avatar>
              )}
              <div
                className={`${
                  message.role === 'user'
                    ? 'bg-[#006838] text-white'
                    : 'bg-white text-gray-800'
                } rounded-lg p-3 max-w-[80%] sm:max-w-[70%] md:max-w-[60%] shadow-sm`}
              >
                <p>{message.text}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <User className="h-8 w-8 text-gray-500" />
                </Avatar>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4">
          <div className="flex items-center gap-2 bg-white rounded-lg p-2 border">
            <Input
              type="text"
              placeholder="Type a new message here"
              className="border-0 focus-visible:ring-0 flex-1"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <Button
              size="icon"
              className="bg-[#006838] hover:bg-[#005028]"
              onClick={sendMessage}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
