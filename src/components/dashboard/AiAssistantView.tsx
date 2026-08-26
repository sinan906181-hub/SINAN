import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Trash2, 
  Copy, 
  Check, 
  Cpu, 
  Zap, 
  Code2, 
  ShieldCheck, 
  Terminal, 
  Loader2,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import { useToast } from '../../context/ToastContext';
import { ChatMessage } from '../../types';

export const AiAssistantView: React.FC = () => {
  const { userProfile } = useAuth();
  const { chatMessages, sendChatMessage, clearChatHistory } = useProjects();
  const { showSuccess, showInfo } = useToast();

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState<'gemini-flash' | 'gemini-pro' | 'claude-sonnet'>('gemini-flash');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const quickPrompts = [
    { label: 'Optimize Vector Query', prompt: 'Analyze our vector database schema and suggest indexing optimizations for sub-20ms search latency.' },
    { label: 'Audit IAM Rules', prompt: 'Audit our Firestore security rules and generate role-based validation assertions for admin elevation.' },
    { label: 'Generate SDK Client', prompt: 'Write a typed TypeScript client SDK for our Nexora Cloud microservices with automatic token refresh.' },
    { label: 'Kubernetes Edge Spec', prompt: 'Draft a lightweight Dockerfile and Kubernetes deployment manifest with horizontal pod autoscaling for edge clusters.' },
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const text = customPrompt || inputPrompt;
    if (!text.trim()) return;

    setInputPrompt('');
    setIsTyping(true);

    try {
      await sendChatMessage(text, selectedModel);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showSuccess('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col justify-between">
      {/* Top Controller Bar */}
      <div className="p-4 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#0a0e17] rounded-[9px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="font-display font-black text-base text-white dark:text-white light:text-slate-900 flex items-center gap-2">
              <span>NEXORA Copilot Intelligence</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono-code bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                v3.0 Edge
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 font-mono-code">
              Autonomous context indexing • Zero-data retention mode
            </p>
          </div>
        </div>

        {/* Model Selector & Clear Chat */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-[#090d15] border border-white/10 text-xs font-mono-code text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="gemini-flash">⚡ Gemini 2.5 Flash (Ultra Fast)</option>
            <option value="gemini-pro">🧠 Gemini 2.5 Pro (Deep Architecture)</option>
            <option value="claude-sonnet">✨ Claude 3.7 Sonnet (Hybrid Code)</option>
          </select>

          <button
            onClick={() => {
              clearChatHistory();
              showInfo('Chat history reset');
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Stream Container */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-2">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="font-display font-black text-xl text-white">
                How can Nexora Copilot assist your sprint?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ask architectural questions, refactor complex async code, generate database indexes, or simulate load testing telemetry.
              </p>
            </div>

            {/* Quick Prompt Starters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl text-left">
              {quickPrompts.map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(qp.prompt)}
                  className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-cyan-400/40 text-xs text-slate-200 transition-all cursor-pointer group"
                >
                  <span className="font-bold text-cyan-400 block mb-1 font-mono-code text-[11px] group-hover:underline">
                    ⚡ {qp.label}
                  </span>
                  <span className="text-slate-400 text-[11px] line-clamp-2 leading-relaxed">
                    "{qp.prompt}"
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-slate-950 font-bold shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-slate-950" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg relative group ${
                    isUser
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-slate-950 font-medium'
                      : 'bg-[#0d121c] border border-white/10 text-slate-200 font-normal'
                  }`}
                >
                  {/* Model tag if AI */}
                  {!isUser && msg.model && (
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[10px] font-mono-code text-cyan-400">
                      <span>// MODEL: {msg.model.toUpperCase()}</span>
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="text-slate-400 hover:text-white transition-colors"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}

                  {/* Render content */}
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.content}
                  </div>

                  <span className="text-[9px] font-mono-code opacity-50 block mt-2 text-right">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            );
          })
        )}

        {isTyping && (
          <div className="flex gap-3 items-center text-cyan-400 text-xs font-mono-code">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Nexora Copilot is synthesizing architectural response...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Composer */}
      <div className="p-3 rounded-2xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-200 shadow-xl shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask Nexora AI to refactor code, audit permissions, or draft microservices..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isTyping}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
