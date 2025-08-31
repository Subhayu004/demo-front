import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type CommunityPost } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, MessageCircle, Share, User } from "lucide-react";

interface CommunityFeedProps {
  posts: CommunityPost[];
}

export default function CommunityFeed({ posts }: CommunityFeedProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="shadow-sm" data-testid={`community-post-${post.id}`}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold" data-testid={`post-author-${post.id}`}>
                  {post.author}
                </p>
                <p className="text-sm text-muted-foreground" data-testid={`post-time-${post.id}`}>
                  {formatDistanceToNow(new Date(post.createdAt!), { addSuffix: true })}
                </p>
              </div>
            </div>
            {post.imageUrl && (
              <img 
                src={post.imageUrl} 
                alt="Community post" 
                className="w-full h-48 object-cover rounded-lg mb-4"
                data-testid={`post-image-${post.id}`}
              />
            )}
            <p className="text-foreground mb-4" data-testid={`post-content-${post.id}`}>
              {post.content}
            </p>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-1 hover:text-primary"
                data-testid={`button-like-${post.id}`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-1 hover:text-primary"
                data-testid={`button-comment-${post.id}`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-1 hover:text-primary"
                data-testid={`button-share-${post.id}`}
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
