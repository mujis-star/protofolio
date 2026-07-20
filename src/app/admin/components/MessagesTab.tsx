"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Trash2, CheckCircle, Mail, Clock } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
  read: boolean;
}

export function MessagesTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching messages:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteDoc(doc(db, "messages", id));
    }
  };

  const handleMarkRead = async (id: string, currentStatus: boolean) => {
    await updateDoc(doc(db, "messages", id), {
      read: !currentStatus
    });
  };

  if (isLoading) {
    return <div className="text-neutral-400">Loading messages...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-cyan-400">Inbox</h2>
        <span className="text-xs bg-white/10 px-3 py-1 rounded-full">{messages.length} Total Messages</span>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 border border-white/10 rounded-2xl bg-white/5 text-center text-neutral-400">
          <Mail className="w-8 h-8 mx-auto mb-4 opacity-50" />
          <p>Your inbox is empty.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-6 rounded-2xl border transition-all ${msg.read ? 'bg-white/5 border-white/10 opacity-70' : 'bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    {msg.name}
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                  </h3>
                  <a href={`mailto:${msg.email}`} className="text-sm text-cyan-400 hover:underline">{msg.email}</a>
                </div>
                
                <div className="flex items-center gap-4 text-neutral-400 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {msg.createdAt?.toDate ? new Date(msg.createdAt.toDate()).toLocaleString() : 'Just now'}
                  </span>
                  
                  <div className="flex gap-2">
                    <button onClick={() => handleMarkRead(msg.id, msg.read)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white" title={msg.read ? "Mark unread" : "Mark read"}>
                      <CheckCircle className={`w-4 h-4 ${msg.read ? 'text-emerald-400' : 'text-neutral-400'}`} />
                    </button>
                    <button onClick={() => handleDelete(msg.id)} className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-neutral-300 whitespace-pre-wrap bg-black/30 p-4 rounded-xl border border-white/5">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
