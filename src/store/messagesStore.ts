import { create } from 'zustand';

export interface Message {
  id: string;
  content: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

interface MessagesState {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
  deleteMessage: (id: string) => void;
  getRecentMessages: (limit?: number) => Message[];
}

export const useMessagesStore = create<MessagesState>((set, get) => ({
  messages: [
    {
      id: '1',
      content: 'Reunión de coordinación programada para mañana a las 10:00 AM en la sede central.',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      priority: 'high',
      category: 'Reuniones'
    },
    {
      id: '2',
      content: 'Actualización de estrategia territorial para el distrito 7 completada.',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      priority: 'medium',
      category: 'Estrategia'
    },
    {
      id: '3',
      content: 'Nuevo material promocional disponible para distribución en puntos estratégicos.',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      priority: 'low',
      category: 'Material'
    }
  ],

  addMessage: (messageData) => set((state) => ({
    messages: [
      {
        ...messageData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      },
      ...state.messages
    ]
  })),

  deleteMessage: (id) => set((state) => ({
    messages: state.messages.filter(message => message.id !== id)
  })),

  getRecentMessages: (limit = 5) => {
    const { messages } = get();
    return messages
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}));