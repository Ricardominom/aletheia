import React, { useState } from 'react';
import { Plus, MessageSquare, Clock, AlertCircle, Trash2 } from 'lucide-react';
import { useMessagesStore, Message } from '../../store/messagesStore';
import MessageForm from './MessageForm';

export default function CochabambaPage() {
  const { messages, deleteMessage } = useMessagesStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-accent-pink';
      case 'medium': return 'text-primary';
      case 'low': return 'text-accent-teal';
      default: return 'text-gray-400';
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-accent-pink';
      case 'medium': return 'bg-primary';
      case 'low': return 'bg-accent-teal';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'medium': return <MessageSquare className="w-4 h-4" />;
      case 'low': return <Clock className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  // Sort messages by date (newest first)
  const sortedMessages = messages.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleDeleteMessage = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      deleteMessage(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white text-neon">Avisos Cochabamba</h1>
          <p className="text-gray-400 mt-2">Gestiona los mensajes y avisos importantes</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-all duration-300 group"
        >
          <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
          <span className="text-lg font-medium">Nuevo Mensaje</span>
        </button>
      </div>

      {/* Messages List */}
      <div className="glassmorphic-container p-6">
        {sortedMessages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">No hay mensajes</h3>
            <p className="text-gray-500">
              {messages.length === 0 
                ? 'Crea tu primer mensaje para comenzar'
                : 'No hay mensajes disponibles'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {sortedMessages.map((message, index) => {
              const { date, time } = formatDateTime(message.createdAt);
              return (
                <div
                  key={message.id}
                  className="target-card p-5 animate-slide-up group hover:border-primary/40 transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Background effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md rounded-lg -z-10"></div>
                  
                  {/* Priority indicator */}
                  <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-lg ${getPriorityBg(message.priority)}`}></div>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`${getPriorityColor(message.priority)}`}>
                        {getPriorityIcon(message.priority)}
                      </div>
                      <div>
                        <span className="text-sm text-gray-400 uppercase font-medium tracking-wide">
                          {message.category}
                        </span>
                        <div className={`text-xs font-medium mt-1 ${getPriorityColor(message.priority)}`}>
                          {message.priority === 'high' ? 'Alta Prioridad' :
                           message.priority === 'medium' ? 'Media Prioridad' : 'Baja Prioridad'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm text-gray-300 font-medium">{date}</div>
                        <div className="text-xs text-gray-500">{time}</div>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="p-2 hover:bg-accent-pink/10 rounded-lg transition-colors duration-300 group/delete"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 group-hover/delete:text-accent-pink" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {message.content}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Message Form Modal */}
      <MessageForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}