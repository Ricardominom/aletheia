import React, { useState } from 'react';
import { Plus, X, MessageSquare } from 'lucide-react';
import { useMessagesStore } from '../../store/messagesStore';

interface MessageFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MessageForm({ isOpen, onClose }: MessageFormProps) {
  const { addMessage } = useMessagesStore();
  const [formData, setFormData] = useState({
    content: '',
    category: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.content.trim()) {
      addMessage({ ...formData, priority: 'medium', category: 'General' });
      setFormData({ content: '', priority: 'medium', category: '' });
      setFormData({ content: '', category: '' });
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-card border border-primary/20 rounded-xl w-full max-w-2xl mx-4 shadow-2xl animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-30 rounded-xl"></div>
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-primary/20">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-white text-neon">Nuevo Mensaje</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="relative p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Mensaje
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full bg-background/90 border border-primary/20 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary/40 transition-colors resize-none"
              rows={4}
              placeholder="Escribe tu mensaje aquí..."
              required
            />
          </div>

          {/* Preview */}
          {formData.content && (
            <div className="bg-background/30 p-4 rounded-lg border border-primary/20">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Vista previa:</h4>
              <div className="target-card p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 uppercase font-medium">
                    General
                  </span>
                  <span className="text-xs font-medium text-primary">
                    Media
                  </span>
                </div>
                <p className="text-sm text-gray-300">{formData.content}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-background/50 border border-primary/20 rounded-lg text-gray-400 hover:text-gray-200 hover:border-primary/40 transition-all duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!formData.content.trim()}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 ${
                formData.content.trim()
                  ? 'bg-primary/10 border border-primary/50 text-primary hover:bg-primary/20 text-neon'
                  : 'bg-gray-800 border border-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Crear Mensaje</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}