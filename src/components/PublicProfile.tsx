
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Trophy, Heart, Code, Calendar, MapPin, Globe } from 'lucide-react';
import HackathonCard from './HackathonCard';

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock profile data - in a real app, this would fetch from an API
    const mockProfile = {
      username: username,
      name: 'Alex Developer',
      bio: 'Full-stack developer passionate about building innovative solutions at hackathons',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      location: 'San Francisco, CA',
      website: 'https://alexdev.com',
      joinedAt: '2024-01-15',
      stats: {
        totalHackathons: 0,
        totalLikes: 0,
        technologies: []
      }
    };

    // Get hackathons from localStorage (mock data)
    const hackathonData = localStorage.getItem('hackfolio_hackathons');
    let userHackathons = [];
    
    if (hackathonData) {
      const allHackathons = JSON.parse(hackathonData);
      userHackathons = allHackathons; // In real app, filter by user
      
      const totalLikes = userHackathons.reduce((sum: number, h: any) => sum + (h.likes || 0), 0);
      const allTech = userHackathons.flatMap((h: any) => h.technologies || []);
      const uniqueTech = [...new Set(allTech)];
      
      mockProfile.stats = {
        totalHackathons: userHackathons.length,
        totalLikes,
        technologies: uniqueTech
      };
    }

    setProfile(mockProfile);
    setHackathons(userHackathons);
    setLoading(false);
  }, [username]);

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
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border-purple-200/50">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 p-1">
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="w-full h-full rounded-full bg-white"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
                  <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                    @{profile.username}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground mb-4 text-lg">{profile.bio}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <a href={profile.website} className="hover:text-foreground transition-colors">
                      {profile.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(profile.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-100" />
              <p className="text-3xl font-bold">{profile.stats.totalHackathons}</p>
              <p className="text-purple-100 text-sm">Hackathons</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-pink-100" />
              <p className="text-3xl font-bold">{profile.stats.totalLikes}</p>
              <p className="text-pink-100 text-sm">Total Likes</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-0">
            <CardContent className="p-6 text-center">
              <Code className="w-8 h-8 mx-auto mb-2 text-indigo-100" />
              <p className="text-3xl font-bold">{profile.stats.technologies.length}</p>
              <p className="text-indigo-100 text-sm">Technologies</p>
            </CardContent>
          </Card>
        </div>

        {/* Hackathon Portfolio */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-purple-600" />
            Hackathon Portfolio
          </h2>
          
          {hackathons.length === 0 ? (
            <Card className="bg-muted/20 border-dashed border-2 border-muted-foreground/20">
              <CardContent className="p-12 text-center">
                <Trophy className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No hackathons yet</h3>
                <p className="text-muted-foreground">This developer hasn't shared any hackathon experiences yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
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

export default PublicProfile;
