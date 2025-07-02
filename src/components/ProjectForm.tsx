import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Send } from "lucide-react";

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  isLoading: boolean;
}

export interface ProjectFormData {
  description: string;
  includeDemo: boolean;
  demoLink?: string;
  includeGitHub: boolean;
  githubLink?: string;
  includeLiveLink: boolean;
  liveLink?: string;
}

export function ProjectForm({ onSubmit, isLoading }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    description: "",
    includeDemo: false,
    demoLink: "",
    includeGitHub: false,
    githubLink: "",
    includeLiveLink: false,
    liveLink: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof ProjectFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              required
              className="min-h-[150px] text-base"
            />
          </div>

          {/* Optional Extras */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-medium text-muted-foreground">Optional: Include links in tweets</h3>
            
            {/* Demo Link */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeDemo"
                  checked={formData.includeDemo}
                  onCheckedChange={(checked) => updateField("includeDemo", checked as boolean)}
                />
                <Label htmlFor="includeDemo" className="text-sm">Include demo link</Label>
              </div>
              {formData.includeDemo && (
                <Input
                  placeholder="https://your-demo-link.com"
                  value={formData.demoLink}
                  onChange={(e) => updateField("demoLink", e.target.value)}
                  className="ml-6"
                />
              )}
            </div>

            {/* GitHub Link */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeGitHub"
                  checked={formData.includeGitHub}
                  onCheckedChange={(checked) => updateField("includeGitHub", checked as boolean)}
                />
                <Label htmlFor="includeGitHub" className="text-sm">Include GitHub link</Label>
              </div>
              {formData.includeGitHub && (
                <Input
                  placeholder="https://github.com/username/repo"
                  value={formData.githubLink}
                  onChange={(e) => updateField("githubLink", e.target.value)}
                  className="ml-6"
                />
              )}
            </div>

            {/* Live Link */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeLiveLink"
                  checked={formData.includeLiveLink}
                  onCheckedChange={(checked) => updateField("includeLiveLink", checked as boolean)}
                />
                <Label htmlFor="includeLiveLink" className="text-sm">Include live website link</Label>
              </div>
              {formData.includeLiveLink && (
                <Input
                  placeholder="https://your-website.com"
                  value={formData.liveLink}
                  onChange={(e) => updateField("liveLink", e.target.value)}
                  className="ml-6"
                />
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !formData.description.trim()}
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