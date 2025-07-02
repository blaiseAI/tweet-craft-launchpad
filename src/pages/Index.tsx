import { useState } from "react";
import { ProjectForm } from "@/components/ProjectForm";
import { TweetDrafts } from "@/components/TweetDrafts";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { toast } from "sonner";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [tweets, setTweets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateTweets = async (projectDescription: string) => {
    if (!apiKey) {
      toast.error("Please set your OpenAI API key first");
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `Generate 4 engaging Twitter/X posts based on this project description:

"${projectDescription}"

Create tweets that:
1. Are engaging and hook readers immediately
2. Highlight the key benefits and unique value
3. Include relevant emojis
4. Use appropriate hashtags
5. Are under 280 characters
6. Sound authentic and exciting

Format: Return only the 4 tweets, separated by "---" between each tweet.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a social media expert specializing in creating viral tweets for SaaS products and indie projects.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.8,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate tweets');
      }

      const data = await response.json();
      const generatedTweets = data.choices[0].message.content
        .split('---')
        .map((tweet: string) => tweet.trim())
        .filter((tweet: string) => tweet.length > 0);
      
      setTweets(generatedTweets);
      toast.success("Tweet drafts generated successfully!");
    } catch (error) {
      console.error('Error generating tweets:', error);
      toast.error("Failed to generate tweets. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
    localStorage.setItem('openai-api-key', key);
    toast.success("API key set successfully!");
  };

  // Load API key from localStorage on component mount
  useState(() => {
    const savedApiKey = localStorage.getItem('openai-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            LaunchTweet GPT
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your SaaS projects into viral tweets. Perfect for builders showcasing their latest tools and experiments.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {!apiKey ? (
            <ApiKeyInput onApiKeySet={handleApiKeySet} />
          ) : (
            <>
              <ProjectForm onSubmit={generateTweets} isLoading={isLoading} />
              <TweetDrafts 
                tweets={tweets} 
                onRegenerate={() => {
                  // You could implement regeneration with the same form data
                  toast.info("Please fill the form again to regenerate tweets");
                }} 
                isLoading={isLoading}
              />
            </>
          )}
        </div>

        {apiKey && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                setApiKey("");
                localStorage.removeItem('openai-api-key');
                setTweets([]);
                toast.info("API key cleared");
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Change API Key
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
