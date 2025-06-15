import React from 'react';

export default function ChatBubble({ text, sender, time }) {
  const isUser = sender === 'user';
  const isTextString = typeof text === 'string';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-1`}>
      <div className={`max-w-xs px-4 py-2 rounded-2xl shadow ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
        {isTextString ? (
          <p className="text-sm">{text}</p>
        ) : (
          <div className="w-full">{text}</div> 
        )}
        <span className="block text-right text-[10px] text-gray-600 mt-1">{time}</span>
      </div>
    </div>
  );
}
