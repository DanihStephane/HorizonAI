import React, { useState, useEffect } from 'react';
import { Search, Brain, Star, ExternalLink, Filter } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { AICard } from './components/AICard';
import { CategoryFilter } from './components/CategoryFilter';
import { SearchBar } from './components/SearchBar';
import { AIData } from './types';

const allAIs: AIData[] = [
  {
    id: 1,
    name: "ChatGPT",
    description: "Assistant IA conversationnel développé par OpenAI",
    category: "Conversation",
    url: "https://chat.openai.com",
    image: "https://images.unsplash.com/photo-1693314295100-bb5b134a9e42?auto=format&fit=crop&q=80&w=500",
    rating: 4.8,
    free: true
  },
  {
    id: 2,
    name: "Midjourney",
    description: "Générateur d'images par IA avec des résultats artistiques",
    category: "Image",
    url: "https://www.midjourney.com",
    image: "https://images.unsplash.com/photo-1686191128892-3c8f0795d07d?auto=format&fit=crop&q=80&w=500",
    rating: 4.7,
    free: false
  },
  {
    id: 3,
    name: "Claude",
    description: "Assistant IA avancé par Anthropic",
    category: "Conversation",
    url: "https://claude.ai",
    image: "https://images.unsplash.com/photo-1684782458100-c6c2a721cace?auto=format&fit=crop&q=80&w=500",
    rating: 4.6,
    free: true
  },
  {
    id: 4,
    name: "DALL-E",
    description: "Générateur d'images IA par OpenAI",
    category: "Image",
    url: "https://openai.com/dall-e-3",
    image: "https://images.unsplash.com/photo-1678382155100-a2b576972d57?auto=format&fit=crop&q=80&w=500",
    rating: 4.7,
    free: false
  },
  {
    id: 5,
    name: "GitHub Copilot",
    description: "Assistant de programmation IA",
    category: "Code",
    url: "https://github.com/features/copilot",
    image: "https://images.unsplash.com/photo-1686787190010-fef08136c42a?auto=format&fit=crop&q=80&w=500",
    rating: 4.8,
    free: false
  },
  {
    id: 6,
    name: "Stable Diffusion",
    description: "Générateur d'images IA open source",
    category: "Image",
    url: "https://stability.ai",
    image: "https://images.unsplash.com/photo-1697490154371-c22f59bde56f?auto=format&fit=crop&q=80&w=500",
    rating: 4.5,
    free: true
  },
  {
    id: 7,
    name: "Whisper",
    description: "Système de reconnaissance vocale par OpenAI",
    category: "Audio",
    url: "https://openai.com/research/whisper",
    image: "https://images.unsplash.com/photo-1655720406100-3f1eda0a4519?auto=format&fit=crop&q=80&w=500",
    rating: 4.6,
    free: true
  },
  {
    id: 8,
    name: "RunwayML",
    description: "Suite d'outils IA pour la création vidéo",
    category: "Vidéo",
    url: "https://runway.ml",
    image: "https://images.unsplash.com/photo-1682687220742-aba19b11a105?auto=format&fit=crop&q=80&w=500",
    rating: 4.7,
    free: false
  },
  {
    id: 9,
    name: "Elevenlabs",
    description: "Synthèse vocale IA de haute qualité",
    category: "Audio",
    url: "https://elevenlabs.io",
    image: "https://images.unsplash.com/photo-1685634412894-f17c2801e9a3?auto=format&fit=crop&q=80&w=500",
    rating: 4.6,
    free: false
  },
  {
    id: 10,
    name: "Bard",
    description: "Assistant IA conversationnel par Google",
    category: "Conversation",
    url: "https://bard.google.com",
    image: "https://images.unsplash.com/photo-1694474116108-be9bf2b92891?auto=format&fit=crop&q=80&w=500",
    rating: 4.5,
    free: true
  },
  {
    id: 11,
    name: "Anthropic Claude 2",
    description: "Assistant IA avancé avec capacités étendues",
    category: "Conversation",
    url: "https://www.anthropic.com/claude-2",
    image: "https://images.unsplash.com/photo-1684163761883-ff70baa20b51?auto=format&fit=crop&q=80&w=500",
    rating: 4.8,
    free: false
  },
  {
    id: 12,
    name: "Synthesia",
    description: "Création de vidéos avec présentateurs IA",
    category: "Vidéo",
    url: "https://www.synthesia.io",
    image: "https://images.unsplash.com/photo-1682687220742-aba19b11a105?auto=format&fit=crop&q=80&w=500",
    rating: 4.5,
    free: false
  },
  {
    id: 13,
    name: "Tabnine",
    description: "Assistant de code IA",
    category: "Code",
    url: "https://www.tabnine.com",
    image: "https://images.unsplash.com/photo-1695828014614-8888df197791?auto=format&fit=crop&q=80&w=500",
    rating: 4.4,
    free: true
  },
  {
    id: 14,
    name: "Murf",
    description: "Studio de voix IA en ligne",
    category: "Audio",
    url: "https://murf.ai",
    image: "https://images.unsplash.com/photo-1685094488371-d5f25613bba1?auto=format&fit=crop&q=80&w=500",
    rating: 4.5,
    free: false
  },
  {
    id: 15,
    name: "Leonardo.ai",
    description: "Plateforme de génération d'images IA",
    category: "Image",
    url: "https://leonardo.ai",
    image: "https://images.unsplash.com/photo-1696943444991-a1c60a25cc11?auto=format&fit=crop&q=80&w=500",
    rating: 4.6,
    free: true
  }
];

const categories = ["Tous", "Conversation", "Image", "Audio", "Vidéo", "Code"];
const ITEMS_PER_PAGE = 6;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);
  
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false
  });

  const filteredAIs = allAIs.filter(ai => {
    const matchesSearch = ai.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ai.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || ai.category === selectedCategory;
    const matchesFree = !showFreeOnly || ai.free;
    return matchesSearch && matchesCategory && matchesFree;
  });

  const displayedAIs = filteredAIs.slice(0, displayedItems);

  useEffect(() => {
    if (inView && displayedItems < filteredAIs.length) {
      setDisplayedItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredAIs.length));
    }
  }, [inView, filteredAIs.length]);

  useEffect(() => {
    setDisplayedItems(ITEMS_PER_PAGE);
  }, [searchTerm, selectedCategory, showFreeOnly]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Directory</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4 sticky top-20 bg-gradient-to-br from-gray-50 to-gray-100 pt-4 pb-6 z-10">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <div className="flex flex-wrap items-center gap-4">
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            
            <label className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={showFreeOnly}
                onChange={(e) => setShowFreeOnly(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Afficher uniquement les IA gratuites</span>
            </label>
          </div>
        </div>

        {/* AI Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedAIs.map(ai => (
            <AICard key={ai.id} ai={ai} />
          ))}
        </div>

        {/* Loading Trigger */}
        {displayedItems < filteredAIs.length && (
          <div ref={ref} className="h-10 mt-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* No Results Message */}
        {filteredAIs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun résultat trouvé</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;