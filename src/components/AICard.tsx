import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { AIData } from '../types';

interface AICardProps {
  ai: AIData;
}

export const AICard: React.FC<AICardProps> = ({ ai }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={ai.image} 
        alt={ai.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{ai.name}</h3>
          <span className="flex items-center text-sm text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1">{ai.rating}</span>
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{ai.description}</p>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {ai.category}
          </span>
          <div className="flex items-center space-x-2">
            {ai.free && (
              <span className="text-xs text-green-600 font-medium">Gratuit</span>
            )}
            <a
              href={ai.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Visiter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};