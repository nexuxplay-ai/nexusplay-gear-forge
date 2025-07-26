import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, Send, MessageCircle, X, Minimize2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface NexusAIProps {
  context: 'optimizer' | 'store';
  className?: string;
}

const NexusAI: React.FC<NexusAIProps> = ({ context, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getContextualGreeting = () => {
    if (context === 'optimizer') {
      return "Hi! I'm NexusAI, your optimization assistant. I can help you choose the best settings for your gaming setup, suggest optimizations based on your hardware, and answer any questions about improving your performance. What game do you primarily play?";
    } else {
      return "Hi! I'm NexusAI, your gear recommendation assistant. I can help you find the perfect gaming equipment based on your game genre, budget, and preferences. Tell me what type of games you play and I'll suggest the best gear for you!";
    }
  };

  const getContextualSuggestions = () => {
    if (context === 'optimizer') {
      return [
        "Best settings for FPS games",
        "Optimize for low-end hardware",
        "Battery optimization tips",
        "Network optimization guide"
      ];
    } else {
      return [
        "Best mouse for FPS games",
        "Gaming headsets under $100",
        "4K monitors for RPGs",
        "Mechanical keyboards for MMOs"
      ];
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (context === 'optimizer') {
      if (message.includes('fps') || message.includes('shooter')) {
        return "For FPS games, I recommend enabling: GPU Performance Mode, High Priority CPU, Memory Optimization, and Network Acceleration. Disable Windows Game Mode and enable Game Boost for maximum frame rates. Would you like specific settings for a particular FPS game?";
      } else if (message.includes('moba') || message.includes('league') || message.includes('dota')) {
        return "For MOBA games like League of Legends, focus on: Memory Optimization, Network Acceleration, and Low Latency Mode. These games benefit from stable performance over maximum FPS. Enable Background App Killer to prevent interference during matches.";
      } else if (message.includes('rpg') || message.includes('story')) {
        return "For RPG games, I suggest: GPU Performance Mode, Memory Optimization, and Visual Enhancement Mode if you have a powerful system. RPGs benefit from stable performance and enhanced visuals for immersion.";
      } else if (message.includes('battery') || message.includes('laptop')) {
        return "For battery optimization: Enable Power Saving Mode, disable GPU Performance Mode, enable CPU Efficiency, and use Network Power Saving. This can extend gaming time by 20-30% on laptops.";
      }
      return "I can help optimize your system for better gaming performance. What type of games do you play most? (FPS, MOBA, RPG, etc.) This will help me recommend the best optimization settings for you.";
    } else {
      if (message.includes('fps') || message.includes('shooter')) {
        return "For FPS games, I recommend: Gaming mice with high DPI (Logitech G Pro X, Razer DeathAdder), mechanical keyboards with tactile switches, and monitors with 144Hz+ refresh rates. Low input lag is crucial for competitive advantage!";
      } else if (message.includes('moba')) {
        return "MOBA players benefit from: Precision mice (SteelSeries Rival series), mechanical keyboards with macro keys, and monitors with good color accuracy. Consider gaming headsets with clear communication for team coordination.";
      } else if (message.includes('rpg') || message.includes('story')) {
        return "For immersive RPGs: High-quality gaming headsets for audio immersion, comfortable ergonomic mice for long sessions, and larger monitors (27\"+) for detailed visuals. Mechanical keyboards with quiet switches for late-night gaming.";
      } else if (message.includes('budget') || message.includes('cheap') || message.includes('affordable')) {
        return "Great budget options: Corsair K55 keyboard, Logitech G203 mouse, HyperX Cloud Stinger headset, and ASUS monitors. These provide excellent performance without breaking the bank!";
      } else if (message.includes('monitor') || message.includes('display')) {
        return "Monitor recommendations depend on your needs: 1080p 144Hz for competitive gaming, 1440p 75Hz for balanced experience, or 4K 60Hz for stunning visuals. What's your primary use case and budget?";
      }
      return "I can recommend the perfect gaming gear for you! What type of games do you play, and what's your budget range? I'll suggest mice, keyboards, headsets, and monitors that match your gaming style.";
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: Date.now().toString(),
        text: getContextualGreeting(),
        isUser: false,
        timestamp: new Date()
      };
      setMessages([greeting]);
    }
  }, [isOpen, context]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/25"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Card className={`w-80 h-96 border-primary/20 shadow-xl transition-all duration-300 ${isMinimized ? 'h-12' : ''}`}>
        <CardHeader className="p-3 bg-gradient-primary">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-white" />
              <CardTitle className="text-sm text-white">NexusAI</CardTitle>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-6 h-6 p-0 text-white hover:bg-white/20"
              >
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 p-0 text-white hover:bg-white/20"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-full">
            <ScrollArea className="flex-1 p-3">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-2 rounded-lg text-sm ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-2 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                {messages.length === 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Quick suggestions:</p>
                    {getContextualSuggestions().map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-xs h-7 justify-start"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-9 h-9 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default NexusAI;