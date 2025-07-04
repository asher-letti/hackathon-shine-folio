
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Plus, Heart, Calendar, Code, Users, Star, Settings, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import HackathonCard from './HackathonCard';
import EmptyState from './EmptyState';
import ThemeToggle from './ThemeToggle';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [hackathons, setHackathons] = useState([]);
  const [stats, setStats] = useState({
    totalHackathons: 0,
    totalLikes: 0,
    technologies: [],
    achievements: []
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const hackathonData = localStorage.getItem('hackfolio_hackathons');
    
    if (hackathonData) {
      const parsedHackathons = JSON.parse(hackathonData);
      setHackathons(parsedHackathons);
      
      // Calculate stats
      const totalLikes = parsedHackathons.reduce((sum: number, h: any) => sum + (h.likes || 0), 0);
      const allTech = parsedHackathons.flatMap((h: any) => h.technologies || []);
      const uniqueTech = [...new Set(allTech)];
      
      setStats({
        totalHackathons: parsedHackathons.length,
        totalLikes,
        technologies: uniqueTech,
        achievements: getAchievements(parsedHackathons.length, totalLikes)
      });
    }
  }, []);

  const getAchievements = (hackathonCount: number, likeCount: number) => {
    const achievements = [];
    
    if (hackathonCount >= 1) achievements.push({ name: 'First Timer', icon: '🎯', color: 'purple' });
    if (hackathonCount >= 5) achievements.push({ name: 'Regular', icon: '🔥', color: 'orange' });
    if (hackathonCount >= 10) achievements.push({ name: 'Veteran', icon: '⭐', color: 'gold' });
    if (likeCount >= 10) achievements.push({ name: 'Community Favorite', icon: '💜', color: 'purple' });
    if (likeCount >= 50) achievements.push({ name: 'Popular Creator', icon: '🌟', color: 'yellow' });
    
    return achievements;
  };

  const handleLike = (hackathonId: string) => {
    const updatedHackathons = hackathons.map((h: any) => {
      if (h.id === hackathonId) {
        const isLiked = h.likedByUser;
        return {
          ...h,
          likes: isLiked ? (h.likes || 1) - 1 : (h.likes || 0) + 1,
          likedByUser: !isLiked
        };
      }
      return h;
    });
    
    setHackathons(updatedHackathons);
    localStorage.setItem('hackfolio_hackathons', JSON.stringify(updatedHackathons));
    
    toast({
      title: "Success!",
      description: "Like updated successfully",
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Navigation */}
      <nav className="bg-card/70 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Hackfolio
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/add-hackathon">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Hackathon
                </Button>
              </Link>
              
              <ThemeToggle />
              
              <div className="flex items-center space-x-2">
                <Link to={`/u/${(user as any).email?.split('@')[0]}`}>
                  <img 
                    src={(user as any).avatar} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full hover:ring-2 hover:ring-purple-500 transition-all cursor-pointer"
                  />
                </Link>
                <span className="font-medium text-foreground">{(user as any).name}</span>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {(user as any).name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's your hackathon journey overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Hackathons</p>
                  <p className="text-3xl font-bold">{stats.totalHackathons}</p>
                </div>
                <Trophy className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Total Likes</p>
                  <p className="text-3xl font-bold">{stats.totalLikes}</p>
                </div>
                <Heart className="w-8 h-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Technologies</p>
                  <p className="text-3xl font-bold">{stats.technologies.length}</p>
                </div>
                <Code className="w-8 h-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Achievements</p>
                  <p className="text-3xl font-bold">{stats.achievements.length}</p>
                </div>
                <Star className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        {stats.achievements.length > 0 && (
          <Card className="mb-8 bg-card/70 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-600" />
                <span>Your Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {stats.achievements.map((achievement, index) => (
                  <Badge
                    key={index}
                    className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-sm"
                  >
                    <span className="mr-2">{achievement.icon}</span>
                    {achievement.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hackathons List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Your Hackathons</h2>
            {hackathons.length > 0 && (
              <Link to="/add-hackathon">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another
                </Button>
              </Link>
            )}
          </div>

          {hackathons.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hackathons.map((hackathon: any) => (
                <HackathonCard
                  key={hackathon.id}
                  hackathon={hackathon}
                  onLike={handleLike}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
