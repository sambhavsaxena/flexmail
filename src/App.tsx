import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Mail, Copy, Inbox, RefreshCcw, Moon, Sun } from 'lucide-react';
import { createEmail, getMessages } from './api';
import { EmailAccount, EmailMessage } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [account, setAccount] = useState<EmailAccount | null>(null);
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    generateEmail();
  }, []);

  const generateEmail = async () => {
    try {
      setLoading(true);
      const newAccount = await createEmail();
      setAccount(newAccount);
      setMessages([]);
      setSelectedMessage(null);
    } catch (error) {
      toast.error('Failed to generate email account');
    } finally {
      setLoading(false);
    }
  };

  const refreshMessages = async () => {
    if (!account?.email) return;
    try {
      setRefreshing(true);
      const newMessages = await getMessages(account.email);
      setMessages(newMessages);
    } catch (error) {
      toast.error('Failed to fetch messages');
      setMessages([]);
    } finally {
      setRefreshing(false);
    }
  };

  const handleCopyEmail = () => {
    if (account?.email) {
      navigator.clipboard.writeText(account.email);
      toast.success('Email copied to clipboard!');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className={`p-4 border-b ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-neon-blue" />
            <h1 className="text-xl font-bold">Flexmail</h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full hover:bg-opacity-20 ${
              darkMode ? 'hover:bg-white' : 'hover:bg-black'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className={`mb-8 p-6 rounded-lg shadow-lg border-2 ${
          darkMode 
            ? 'bg-gray-800 border-neon-blue' 
            : 'bg-white border-neon-blue'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1 w-full">
              <h2 className="text-sm font-medium mb-2">Your temporary email:</h2>
              <div className={`p-4 rounded-lg flex items-center justify-between gap-2 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <span className="font-mono">{loading ? 'Generating...' : account?.email}</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg hover:bg-neon-blue hover:text-white transition-colors"
                    disabled={loading}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={generateEmail}
                    className="p-2 rounded-lg hover:bg-neon-blue hover:text-white transition-colors"
                    disabled={loading}
                  >
                    <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
          <div className={`md:col-span-1 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-lg p-4 shadow-lg border ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold flex items-center gap-2">
                <Inbox className="w-4 h-4" />
                Inbox
              </h2>
              <button
                onClick={refreshMessages}
                className="p-2 rounded-lg hover:bg-neon-blue hover:text-white transition-colors"
                disabled={refreshing || !account}
              >
                <RefreshCcw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="space-y-2">
              {messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                  } ${
                    selectedMessage?.id === message.id
                      ? darkMode 
                        ? 'bg-gray-700 border-l-4 border-neon-blue' 
                        : 'bg-gray-100 border-l-4 border-neon-blue'
                      : ''
                  }`}
                >
                  <div className="font-medium truncate">{message.subject}</div>
                  <div className="text-sm opacity-70 truncate">{message.from}</div>
                  <div className="text-xs opacity-50">
                    {new Date(message.created_at).toLocaleString()}
                  </div>
                </button>
              ))}
              {messages.length === 0 && !loading && (
                <div className="text-center py-8 opacity-50">
                  No messages yet
                </div>
              )}
            </div>
          </div>

          <div className={`md:col-span-2 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-lg p-4 shadow-lg border ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            {selectedMessage ? (
              <div>
                <h3 className="text-xl font-bold mb-2">{selectedMessage.subject}</h3>
                <div className="text-sm opacity-70 mb-4">
                  From: {selectedMessage.from}
                  <br />
                  To: {selectedMessage.to}
                  {selectedMessage.cc && (
                    <>
                      <br />
                      CC: {selectedMessage.cc}
                    </>
                  )}
                  <br />
                  Date: {new Date(selectedMessage.created_at).toLocaleString()}
                </div>
                <div 
                  className="prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: selectedMessage.body_html }}
                />
                {selectedMessage.attachments.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-bold mb-2">Attachments:</h4>
                    <ul className="space-y-2">
                      {selectedMessage.attachments.map((attachment, index) => (
                        <li key={index}>
                          {attachment.fileName} ({Math.round(attachment.size / 1024)}KB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 opacity-50">
                Select a message to view its content
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
