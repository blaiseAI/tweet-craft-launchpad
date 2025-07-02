import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Twitter, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface TweetDraftsProps {
  tweets: string[];
  onRegenerate: () => void;
  isLoading: boolean;
}

export function TweetDrafts({ tweets, onRegenerate, isLoading }: TweetDraftsProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Tweet copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy tweet");
    }
  };

  const tweetOnTwitter = (text: string) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  if (tweets.length === 0) return null;

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Generated Tweet Drafts</h2>
        <Button
          onClick={onRegenerate}
          disabled={isLoading}
          variant="outline"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Regenerate
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {tweets.map((tweet, index) => (
          <Card key={index} className="relative shadow-elegant border-0 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Draft {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {tweet}
              </p>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(tweet)}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  onClick={() => tweetOnTwitter(tweet)}
                  className="flex-1"
                >
                  <Twitter className="w-4 h-4 mr-1" />
                  Tweet
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}