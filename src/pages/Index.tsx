import { useState } from "react";
import { ProjectForm, ProjectFormData } from "@/components/ProjectForm";
import { TweetDrafts } from "@/components/TweetDrafts";
import { ApiKeyInput } from "@/components/ApiKeyInput";
import { Testimonials } from "@/components/Testimonials";
import { toast } from "sonner";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [tweets, setTweets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateTweets = async (formData: ProjectFormData) => {
    if (!apiKey) {
      toast.error("Please set your OpenAI API key first");
      return;
    }

    setIsLoading(true);
    try {
      // Build additional context for links
      let additionalContext = "";
      const links = [];
      
      if (formData.includeDemo && formData.demoLink) {
        additionalContext += "\nInclude demo link in appropriate tweets.";
        links.push(`Demo: ${formData.demoLink}`);
      }
      
      if (formData.includeGitHub && formData.githubLink) {
        additionalContext += "\nInclude GitHub link in appropriate tweets.";
        links.push(`GitHub: ${formData.githubLink}`);
      }
      
      if (formData.includeLiveLink && formData.liveLink) {
        additionalContext += "\nInclude live website link in appropriate tweets.";
        links.push(`Live: ${formData.liveLink}`);
      }

      const prompt = `Generate 4 engaging Twitter/X posts based on this project description using the SaaS Builder Tweet Formula:

"${formData.description}"

${additionalContext ? `Additional context: ${additionalContext}` : ""}

${links.length > 0 ? `Available links to include when appropriate:\n${links.join('\n')}` : ""}

Follow this EXACT readable format (like Yasser's tweet example):

Line 1: Time-based or effort-based hook
Line 2: [Empty line for spacing]
Line 3: "You can now [main benefit in plain English]"
Line 4: [Empty line for spacing] 
Line 5: "You can then [specific result or use case]"
Line 6: [Empty line for spacing]
Line 7: @mentions of relevant tools/communities (on separate lines)
${links.length > 0 ? 'Line 8: [Empty line for spacing]\nLine 9: Include 1-2 relevant links naturally' : ''}

Example format:
I spent the last 48 hours building [project] using [tech].

You can now [main benefit/what it does].

You can then [specific use case or result].

@RelevantTool
@RelevantCommunity
@RelevantPlatform
${links.length > 0 ? '\n[Include relevant link here when it makes sense]' : ''}

Make it:
- Readable and well-formatted with proper line breaks
- Under 280 characters total
- Authentic and exciting
- Include relevant @mentions
${links.length > 0 ? '- Include provided links naturally in 1-2 of the tweets where it makes sense' : ''}

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
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              ✨ AI-Powered Tweet Generation
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            LaunchTweet GPT
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your SaaS projects into <span className="text-primary font-semibold">viral tweets</span>. 
            Perfect for builders showcasing their latest tools and experiments.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {!apiKey ? (
            <div className="w-full max-w-md">
              <ApiKeyInput onApiKeySet={handleApiKeySet} />
            </div>
          ) : (
            <>
              <div className="w-full max-w-2xl">
                <ProjectForm onSubmit={generateTweets} isLoading={isLoading} />
              </div>
              <TweetDrafts 
                tweets={tweets} 
                onRegenerate={() => {
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
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Change API Key
            </button>
          </div>
        )}
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Built with ❤️ for the indie maker community</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
