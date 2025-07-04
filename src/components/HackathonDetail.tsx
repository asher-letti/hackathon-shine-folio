
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, ArrowLeft, Heart, Calendar, Users, Code, ExternalLink, Github, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HackathonDetail = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const hackathons = JSON.parse(localStorage.getItem('hackfolio_hackathons') || '[]');
    const foundHackathon = hackathons.find((h: any) => h.id === id);
    
    setHackathon(foundHackathon || null);
    setLoading(false);
  }, [id]);

  const handleLike = () => {
    if (!hackathon) return;

    const hackathons = JSON.parse(localStorage.getItem('hackfolio_hackathons') || '[]');
    const updatedHackathons = hackathons.map((h: any) => {
      if (h.id === id) {
        const isLiked = h.likedByUser;
        return {
          ...h,
          likes: isLiked ? (h.likes || 1) - 1 : (h.likes || 0) + 1,
          likedByUser: !isLiked
        };
      }
      return h;
    });
    
    localStorage.setItem('hackfolio_hackathons', JSON.stringify(updatedHackathons));
    
    const updatedHackathon = updatedHackathons.find((h: any) => h.id === id);
    setHackathon(updatedHackathon);
    
    toast({
      title: "Success!",
      description: updatedHackathon.likedByUser ? "Added to favorites!" : "Removed from favorites",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/70 backdrop-blur-sm border-purple-100">
          <CardContent className="p-8 text-center">
            <Trophy className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Hackathon Not Found</h2>
            <p className="text-gray-600 mb-6">The hackathon you're looking for doesn't exist.</p>
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-sm border-b border-purple-100">
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
            
            <Link to="/dashboard">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{hackathon.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{hackathon.eventName}</p>
            </div>
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                hackathon.likedByUser
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-purple-50 text-purple-600 hover:bg-purple-100 hover:scale-105'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  hackathon.likedByUser ? 'fill-current animate-pulse' : ''
                }`}
              />
              <span className="font-medium">{hackathon.likes || 0}</span>
            </button>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span>Team of {hackathon.teamSize}</span>
            </div>
            {hackathon.role && (
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-purple-600" />
                <span>{hackathon.role}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  <span>Project Description</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {hackathon.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            {hackathon.achievements && (
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span>Achievements & Awards</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {hackathon.achievements}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Technologies */}
            {hackathon.technologies && hackathon.technologies.length > 0 && (
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="w-5 h-5 text-purple-600" />
                    <span>Technologies Used</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {hackathon.technologies.map((tech: string, index: number) => (
                      <Badge
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 hover:from-purple-200 hover:to-indigo-200 transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to={`/edit-hackathon/${hackathon.id}`} className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                    Edit Details
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => {
                    // Copy link functionality could be added here
                    toast({
                      title: "Link Copied!",
                      description: "Portfolio link copied to clipboard",
                    });
                  }}
                >
                  Share Portfolio
                </Button>
              </CardContent>
            </Card>

            {/* Links */}
            {(hackathon.githubLink || hackathon.demoLink || hackathon.certificateLink) && (
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ExternalLink className="w-5 h-5 text-purple-600" />
                    <span>Project Links</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {hackathon.githubLink && (
                    <a
                      href={hackathon.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <Github className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-900">GitHub Repository</div>
                        <div className="text-sm text-gray-500">View source code</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                    </a>
                  )}
                  
                  {hackathon.demoLink && (
                    <a
                      href={hackathon.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">Live Demo</div>
                        <div className="text-sm text-gray-500">Try the application</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                    </a>
                  )}
                  
                  {hackathon.certificateLink && (
                    <a
                      href={hackathon.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                    >
                      <Award className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-medium text-gray-900">Certificate</div>
                        <div className="text-sm text-gray-500">View achievement</div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                    </a>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <Card className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0">
              <CardContent className="p-6">
                <div className="text-center">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-purple-200" />
                  <div className="text-2xl font-bold mb-1">{hackathon.likes || 0}</div>
                  <div className="text-purple-100 text-sm">Total Likes</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetail;
