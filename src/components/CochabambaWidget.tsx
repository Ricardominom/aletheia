import React from 'react';
import { MessageSquare, Clock, AlertCircle } from 'lucide-react';
import { useMessagesStore } from '../store/messagesStore';

export default function CochabambaWidget() {
  const { getRecentMessages } = useMessagesStore();
  const recentMessages = getRecentMessages(3);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const messageDate = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-accent-pink';
      case 'medium': return 'text-primary';
      case 'low': return 'text-accent-teal';
      default: return 'text-gray-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-3 h-3" />;
      case 'medium': return <MessageSquare className="w-3 h-3" />;
      case 'low': return <Clock className="w-3 h-3" />;
      default: return <MessageSquare className="w-3 h-3" />;
    }
  };

  return (
    <div className="glassmorphic-container p-5 h-[480px] animate-scale-in">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-pink/5 rounded-xl -z-10"></div>
      <div className="absolute inset-0 backdrop-blur-md rounded-xl -z-10"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/10 rounded-full blur-3xl"></div>
      
      <h2 className="text-lg font-semibold text-white mb-6 text-neon relative">
        AVISOS COCHABAMBA
        <div className="absolute left-0 -bottom-2 h-0.5 w-16 bg-gradient-to-r from-accent-teal via-primary to-accent-pink rounded-full"></div>
      </h2>
      
      <div className="space-y-4 overflow-y-auto max-h-[380px] pr-2">
        {recentMessages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay mensajes recientes</p>
          </div>
        ) : (
          recentMessages.map((message, index) => (
            <div
              key={message.id}
              className="target-card p-4 animate-slide-up group hover:border-primary/40 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`${getPriorityColor(message.priority)}`}>
                    {getPriorityIcon(message.priority)}
                  </div>
                  <span className="text-xs text-gray-400 uppercase font-medium">
                    {message.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(message.createdAt)}</span>
                </div>
              </div>
              
              {/* Content */}
              <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                {message.content}
              </p>
              
              {/* Priority indicator */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg ${
                message.priority === 'high' ? 'bg-accent-pink' :
                message.priority === 'medium' ? 'bg-primary' :
                'bg-accent-teal'
              }`}></div>
            </div>
          ))
        )}
      </div>
      
      {recentMessages.length > 0 && (
        <div className="mt-4 text-center">
          <div className="text-xs text-gray-400">
            Mostrando {recentMessages.length} mensajes recientes
          </div>
        </div>
      )}
    </div>
  );
}