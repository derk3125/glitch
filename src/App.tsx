/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Search, 
  TrendingUp, 
  Clock, 
  ExternalLink,
  ChevronLeft, 
  Maximize2,
  Share2,
  MoreVertical,
  Play,
  Info,
  Home,
  LayoutGrid
} from 'lucide-react';
import { Game, GAMES, CATEGORIES } from './data/games';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'games'>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [committedSearchQuery, setCommittedSearchQuery] = useState('');

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => activeCategory === 'All' || game.category === activeCategory);
  }, [activeCategory]);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setCurrentView('games'); 
  };

  return (
    <div id="glitch-root" className="min-h-screen bg-game-bg font-sans flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-game-accent rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-game-accent rounded-full blur-[128px] animate-pulse delay-1000"></div>
      </div>

      {/* Main Content Areas */}
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.main 
            key="home"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-10 text-center space-y-8 px-6 pl-20"
          >
            <div className="relative inline-block">
              <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter text-white uppercase glitch-text leading-none">
                Glitch
              </h1>
              <div className="scanline absolute inset-0 opacity-50"></div>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-zinc-500 font-mono text-sm md:text-base uppercase italic tracking-[0.5em] animate-pulse"
            >
              System Online // Connection Pending
            </motion.p>
            
            <div className="mt-8 relative w-full max-w-sm mx-auto group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-game-accent transition-colors" size={18} />
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-game-accent/50 focus:ring-1 focus:ring-game-accent/50 transition-all text-sm text-white font-mono uppercase italic group-hover:border-zinc-700"
              />
            </div>
          </motion.main>
        ) : (
          <motion.main 
            key="games"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-7xl mx-auto px-6 pl-28 py-20 min-h-screen"
          >
            <div className="flex flex-col gap-12">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-12">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase">Game Library</h2>
                    <p className="text-zinc-500 font-mono text-xs uppercase italic tracking-widest">{">> "} Viewing Available Terminals</p>
                  </div>
                </div>
              </div>

              {selectedGame ? (
                /* Player View */
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedGame(null)}
                      className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                      <ChevronLeft size={16} /> Exit App
                    </button>
                    <div className="flex gap-4">
                      <button className="p-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-500 hover:text-game-accent transition-colors"><Maximize2 size={18} /></button>
                      <button className="p-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-500 hover:text-game-accent transition-colors"><Share2 size={18} /></button>
                    </div>
                  </div>
                  
                  <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl group">
                    <iframe 
                      src={selectedGame.embedUrl} 
                      className="w-full h-full border-none"
                      title={selectedGame.title}
                      allow="accelerometer; gyroscope; autoplay; payment; fullscreen; microphone; clipboard-read; clipboard-write"
                      sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts allow-same-origin allow-downloads allow-popups-to-escape-sandbox"
                    />
                    <div className="scanline pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h3 className="text-4xl font-black italic tracking-tighter text-white uppercase">{selectedGame.title}</h3>
                      <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold text-game-accent uppercase tracking-widest">
                        {selectedGame.category}
                      </span>
                    </div>
                    <p className="text-zinc-400 font-mono text-xs uppercase italic leading-relaxed max-w-4xl">
                      {">> "} {selectedGame.description}
                    </p>
                  </div>
                </div>
              ) : (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                  {filteredGames.map((game, i) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => handleGameSelect(game)}
                      className="group cursor-pointer bg-zinc-900/50 border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-game-accent/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] relative"
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(game.embedUrl, '_blank');
                        }}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/60 backdrop-blur-md rounded-xl text-zinc-400 opacity-0 group-hover:opacity-100 transition-all hover:text-white hover:bg-game-accent hover:text-black"
                        title="Open in new tab"
                      >
                        <ExternalLink size={14} />
                      </button>
                      
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                           <div className="flex items-center justify-between">
                              <h4 className="text-xl font-bold text-white uppercase italic tracking-tighter group-hover:text-game-accent transition-colors">
                                {game.title}
                              </h4>
                              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play size={16} fill="currentColor" stroke="none" className="text-game-accent" />
                              </div>
                           </div>
                        </div>
                      </div>
                      <div className="p-6 space-y-3">
                        <p className="text-zinc-500 font-mono text-[10px] uppercase italic line-clamp-2">
                          {">> "} {game.description}
                        </p>
                        <div className="flex items-center gap-4 text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] pt-2">
                          <span className="flex items-center gap-1"><Clock size={10} /> Fast Load</span>
                          <span className="flex items-center gap-1"><Info size={10} /> Verified</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 border-r border-zinc-900 bg-zinc-950/20 backdrop-blur-md flex flex-col items-center py-10 z-50">
        <div className="flex flex-col gap-8">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setCurrentView('home');
              setSelectedGame(null);
            }}
            className="group cursor-pointer relative"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
              currentView === 'home' ? 'bg-white text-black' : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
            }`}>
              <Home size={24} />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setCurrentView('games');
              setSelectedGame(null);
            }}
            className="group cursor-pointer relative"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
              currentView === 'games' ? 'bg-game-accent text-black' : 'bg-zinc-900 border border-zinc-800 text-zinc-500'
            }`}>
              <LayoutGrid size={24} />
            </div>
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-game-accent text-black text-[10px] font-black uppercase italic rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest whitespace-nowrap">
              Apps
            </div>
          </motion.div>
        </div>
      </aside>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full p-8 bg-gradient-to-t from-game-bg via-game-bg/80 to-transparent text-center z-10 pointer-events-none">
        <div className="max-w-xl mx-auto opacity-40">
          <div className="pt-4 border-t border-zinc-900 text-[9px] text-zinc-700 font-mono uppercase italic tracking-[0.3em]">
            © 2026 Glitch Terminal System // v2.4.0
          </div>
        </div>
      </footer>
    </div>
  );
}
