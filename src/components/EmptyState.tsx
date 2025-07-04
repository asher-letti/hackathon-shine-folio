
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Plus, Sparkles } from 'lucide-react';

const EmptyState = () => {
  return (
    <Card className="bg-gradient-to-br from-card to-muted/30 border-dashed border-2 border-muted-foreground/20">
      <CardContent className="p-12 text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Ready to showcase your hackathons? 🚀
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Start building your developer portfolio by adding your hackathon experiences. 
          Share your projects, connect with the community, and watch your profile grow!
        </p>
        
        <div className="space-y-3">
          <Link to="/add-hackathon">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Hackathon
            </Button>
          </Link>
          
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>💡</span>
              <span>Share your projects</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🏆</span>
              <span>Earn badges</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🌟</span>
              <span>Get discovered</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
