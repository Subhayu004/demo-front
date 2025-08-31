import { useQuery } from "@tanstack/react-query";
import CommunityFeed from "@/components/community-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type CommunityPost, type CommunityMember } from "@shared/schema";
import { Users, HandHeart, Award, Sprout } from "lucide-react";

export default function Community() {
  const { data: posts, isLoading: postsLoading } = useQuery<CommunityPost[]>({
    queryKey: ["/api/community/posts"],
  });

  const { data: members, isLoading: membersLoading } = useQuery<CommunityMember[]>({
    queryKey: ["/api/community/members"],
  });

  if (postsLoading || membersLoading) {
    return (
      <div className="space-y-6 fade-in">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const totalMembers = members?.length || 0;
  const totalProjects = members?.reduce((sum, member) => sum + (member.projectsCount || 0), 0) || 0;

  return (
    <div className="space-y-6 fade-in" data-testid="community-page">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Community Participation</h3>
          <p className="text-muted-foreground">Engage with local communities in blue carbon restoration</p>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground" data-testid="active-members-count">
                {totalMembers.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <HandHeart className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground" data-testid="community-projects-count">
                {totalProjects}
              </p>
              <p className="text-sm text-muted-foreground">Community Projects</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground" data-testid="recognition-awards-count">
                89
              </p>
              <p className="text-sm text-muted-foreground">Recognition Awards</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground" data-testid="trees-planted-count">
                2.3M
              </p>
              <p className="text-sm text-muted-foreground">Trees Planted</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CommunityFeed posts={posts || []} />
        </div>

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Community Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3" data-testid="community-leaderboard">
                {members?.slice(0, 3).map((member, index) => (
                  <div key={member.id} className="flex items-center justify-between" data-testid={`leaderboard-${index + 1}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium" data-testid={`member-name-${member.id}`}>
                        {member.name}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground" data-testid={`member-points-${member.id}`}>
                      {member.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4" data-testid="upcoming-events">
                <div className="border-l-4 border-primary pl-3">
                  <p className="font-medium text-sm" data-testid="event-1-name">Mangrove Planting Drive</p>
                  <p className="text-xs text-muted-foreground" data-testid="event-1-details">March 15, 2024 • Sundarbans</p>
                </div>
                <div className="border-l-4 border-secondary pl-3">
                  <p className="font-medium text-sm" data-testid="event-2-name">Community Training Workshop</p>
                  <p className="text-xs text-muted-foreground" data-testid="event-2-details">March 22, 2024 • Online</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-3">
                  <p className="font-medium text-sm" data-testid="event-3-name">Coastal Cleanup Campaign</p>
                  <p className="text-xs text-muted-foreground" data-testid="event-3-details">March 30, 2024 • Multiple Locations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
