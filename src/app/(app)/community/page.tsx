import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, Share2 } from "lucide-react";

const communityPosts = [
  {
    id: 1,
    author: "Alice",
    avatar: "https://picsum.photos/seed/user1/40/40",
    fallback: "A",
    time: "2 hours ago",
    content: "Just installed my new soil moisture sensors in the north field. Seeing some interesting data already! Anyone else using the new model?",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    author: "Bob",
    avatar: "https://picsum.photos/seed/user2/40/40",
    fallback: "B",
    time: "5 hours ago",
    content: "The AI prediction tool alerted me to a potential pest issue, and sure enough, I found early signs of aphids. Caught it early, thanks to AgriSense!",
    likes: 45,
    comments: 10,
  },
  {
    id: 3,
    author: "Charlie",
    avatar: "https://picsum.photos/seed/user3/40/40",
    fallback: "C",
    time: "1 day ago",
    content: "What are your go-to strategies for dealing with unexpected frost? Looking for advice for my citrus orchard.",
    likes: 23,
    comments: 15,
  },
];

export default function CommunityPage() {
  return (
    <div>
      <PageHeader
        title="Community Feed"
        description="Connect and share with other AgriSense users."
      />
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          {communityPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.author} data-ai-hint="user avatar" />
                    <AvatarFallback>{post.fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-sm text-muted-foreground">{post.time}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.content}</p>
                <div className="flex justify-between items-center text-muted-foreground">
                  <div className="flex gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes} Likes</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments} Comments</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
