import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, ArrowLeft, Plus, X, Trash2, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EditHackathon = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    eventName: '',
    description: '',
    startDate: '',
    endDate: '',
    teamSize: '1',
    role: '',
    technologies: [] as string[],
    githubLink: '',
    demoLink: '',
    certificateLink: '',
    achievements: '',
  });
  const [currentTech, setCurrentTech] = useState('');
  const [loading, setLoading] = useState(false);
  const [hackathonFound, setHackathonFound] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const hackathons = JSON.parse(localStorage.getItem('hackfolio_hackathons') || '[]');
    const hackathon = hackathons.find((h: any) => h.id === id);
    
    if (hackathon) {
      setFormData({
        name: hackathon.name || '',
        eventName: hackathon.eventName || '',
        description: hackathon.description || '',
        startDate: hackathon.startDate || '',
        endDate: hackathon.endDate || '',
        teamSize: hackathon.teamSize || '1',
        role: hackathon.role || '',
        technologies: hackathon.technologies || [],
        githubLink: hackathon.githubLink || '',
        demoLink: hackathon.demoLink || '',
        certificateLink: hackathon.certificateLink || '',
        achievements: hackathon.achievements || '',
      });
    } else {
      setHackathonFound(false);
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addTechnology = () => {
    if (currentTech.trim() && !formData.technologies.includes(currentTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, currentTech.trim()],
      });
      setCurrentTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.eventName || !formData.description || !formData.startDate || !formData.endDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const hackathons = JSON.parse(localStorage.getItem('hackfolio_hackathons') || '[]');
      const updatedHackathons = hackathons.map((h: any) => 
        h.id === id ? { ...h, ...formData, updatedAt: new Date().toISOString() } : h
      );
      localStorage.setItem('hackfolio_hackathons', JSON.stringify(updatedHackathons));

      toast({
        title: "Success!",
        description: "Hackathon updated successfully",
      });

      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this hackathon? This action cannot be undone.')) {
      const hackathons = JSON.parse(localStorage.getItem('hackfolio_hackathons') || '[]');
      const updatedHackathons = hackathons.filter((h: any) => h.id !== id);
      localStorage.setItem('hackfolio_hackathons', JSON.stringify(updatedHackathons));

      toast({
        title: "Deleted",
        description: "Hackathon removed from your portfolio",
      });

      navigate('/dashboard');
    }
  };

  if (!hackathonFound) {
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
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={handleDelete}
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Link to="/dashboard">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Hackathon</h1>
          <p className="text-gray-600">
            Update your hackathon details and keep your portfolio current
          </p>
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border-purple-100 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              <span>Hackathon Details</span>
            </CardTitle>
            <CardDescription>
              Update the details about your hackathon participation
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="My Awesome Project"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventName">Hackathon Event *</Label>
                  <Input
                    id="eventName"
                    name="eventName"
                    placeholder="HackMIT 2024"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your project, what problem it solves, and what makes it special..."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 min-h-[120px]"
                />
              </div>

              {/* Dates and Team */}
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    name="teamSize"
                    type="number"
                    min="1"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <Input
                  id="role"
                  name="role"
                  placeholder="Full-stack Developer, Team Lead, Designer..."
                  value={formData.role}
                  onChange={handleInputChange}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add technology (e.g., React, Python, MongoDB)"
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' ? (e.preventDefault(), addTechnology()) : null}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                  <Button
                    type="button"
                    onClick={addTechnology}
                    variant="outline"
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        className="bg-purple-100 text-purple-800 hover:bg-purple-200"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="ml-2 hover:text-purple-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <LinkIcon className="w-5 h-5 text-purple-600" />
                  <span>Project Links</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubLink">GitHub Repository</Label>
                    <Input
                      id="githubLink"
                      name="githubLink"
                      placeholder="https://github.com/username/project"
                      value={formData.githubLink}
                      onChange={handleInputChange}
                      className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demoLink">Live Demo</Label>
                    <Input
                      id="demoLink"
                      name="demoLink"
                      placeholder="https://myproject.demo.com"
                      value={formData.demoLink}
                      onChange={handleInputChange}
                      className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateLink">Certificate/Award Link</Label>
                  <Input
                    id="certificateLink"
                    name="certificateLink"
                    placeholder="Link to certificate or award announcement"
                    value={formData.certificateLink}
                    onChange={handleInputChange}
                    className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">Achievements & Awards</Label>
                <Textarea
                  id="achievements"
                  name="achievements"
                  placeholder="Any awards, prizes, or special recognition received..."
                  value={formData.achievements}
                  onChange={handleInputChange}
                  className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              <div className="flex space-x-4 pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Updating...</span>
                    </div>
                  ) : (
                    <>
                      <Trophy className="w-4 h-4 mr-2" />
                      Update Hackathon
                    </>
                  )}
                </Button>
                <Link to="/dashboard">
                  <Button type="button" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    Cancel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditHackathon;
