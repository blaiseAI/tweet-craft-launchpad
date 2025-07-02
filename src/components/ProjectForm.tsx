import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";

interface ProjectFormProps {
  onSubmit: (data: string) => void;
  isLoading: boolean;
}

export function ProjectForm({ onSubmit, isLoading }: ProjectFormProps) {
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(projectDescription);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Describe your project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Textarea
              placeholder="Tell me about your project... What does it do? Who is it for? What makes it special? Include any key features or achievements you want to highlight."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
              className="min-h-[150px] text-base"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !projectDescription.trim()}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Tweets...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Generate Tweet Drafts
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}