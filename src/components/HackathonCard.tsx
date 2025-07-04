
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, ExternalLink, Heart, Trophy } from 'lucide-react';

interface HackathonCardProps {
  hackathon: {
    id: string;
    name: string;
    eventName: string;
    description: string;
    startDate: string;
    endDate: string;
    teamSize: number;
    technologies: string[];
    proofLink?: string;
    likes: number;
    likedByUser: boolean;
    placement?: string;
  };
  onLike: (id: string) => void;
}

const HackathonCard: React.FC<HackathonCardProps> = ({ hackathon, onLike }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getBadgeIcon = (placement?: string) => {
    if (!placement) return '🏅';
    if (placement.includes('1st') || placement.includes('winner')) return '🥇';
    if (placement.includes('2nd')) return '🥈';
    if (placement.includes('3rd')) return '🥉';
    return '🏆';
  };

  return (
    <Card className="group bg-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-border/50 hover:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg font-semibold text-foreground truncate">
                {hackathon.name}
              </CardTitle>
              {hackathon.placement && (
                <span className="text-lg" title={`Placement: ${hackathon.placement}`}>
                  {getBadgeIcon(hackathon.placement)}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {hackathon.eventName}
            </p>
          </div>
          <button
            onClick={() => onLike(hackathon.id)}
            className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-200 ${
              hackathon.likedByUser
                ? 'bg-pink-500 text-white shadow-sm'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Heart
              className={`w-3 h-3 ${hackathon.likedByUser ? 'fill-current' : ''}`}
            />
            <span className="text-xs font-medium">{hackathon.likes}</span>
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {hackathon.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(hackathon.startDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Team of {hackathon.teamSize}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {hackathon.technologies?.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
              {tech}
            </Badge>
          ))}
          {hackathon.technologies?.length > 3 && (
            <Badge variant="secondary" className="text-xs px-2 py-0.5">
              +{hackathon.technologies.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to={`/hackathon/${hackathon.id}`}>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                View Details
              </Button>
            </Link>
            {hackathon.proofLink && (
              <a
                href={hackathon.proofLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Demo
              </a>
            )}
          </div>
          <Link to={`/edit-hackathon/${hackathon.id}`}>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">
              Edit
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default HackathonCard;
