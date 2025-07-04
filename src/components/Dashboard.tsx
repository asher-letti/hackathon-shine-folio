import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Plus, Heart, Calendar, Code, Users, Star, Settings, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
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
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Hackathon
                </Button>
              </Link>
              
              <div className="flex items-center space-x-2">
                <img 
                  src={(user as any).avatar} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-gray-700">{(user as any).name}</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {(user as any).name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your hackathon journey overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0">
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

          <Card className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
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

          <Card className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-0">
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

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
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
          <Card className="mb-8 bg-white/70 backdrop-blur-sm border-purple-100">
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
                    className={`px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600`}
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
            <h2 className="text-2xl font-bold text-gray-900">Your Hackathons</h2>
            {hackathons.length === 0 && (
              <Link to="/add-hackathon">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Hackathon
                </Button>
              </Link>
            )}
          </div>

          {hackathons.length === 0 ? (
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
              <CardContent className="p-12 text-center">
                <Trophy className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No hackathons yet</h3>
                <p className="text-gray-600 mb-6">
                  Start building your portfolio by adding your first hackathon experience!
                </p>
                <Link to="/add-hackathon">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Hackathon
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {hackathons.map((hackathon: any) => (
                <Card
                  key={hackathon.id}
                  className="bg-white/70 backdrop-blur-sm border-purple-100 hover:border-purple-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                          {hackathon.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {hackathon.eventName}
                        </CardDescription>
                      </div>
                      <button
                        onClick={() => handleLike(hackathon.id)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-300 ${
                          hackathon.likedByUser
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            hackathon.likedByUser ? 'fill-current' : ''
                          }`}
                        />
                        <span className="text-sm font-medium">{hackathon.likes || 0}</span>
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {hackathon.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>Team of {hackathon.teamSize}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {hackathon.technologies?.slice(0, 3).map((tech: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {hackathon.technologies?.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{hackathon.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link to={`/hackathon/${hackathon.id}`}>
                        <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                          View Details
                        </Button>
                      </Link>
                      <Link to={`/edit-hackathon/${hackathon.id}`}>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
