import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";

interface ProjectFormProps {
  onSubmit: (data: ProjectData) => void;
  isLoading: boolean;
}

export interface ProjectData {
  projectName: string;
  description: string;
  features: string;
  targetAudience: string;
  uniqueValue: string;
}

export function ProjectForm({ onSubmit, isLoading }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectData>({
    projectName: "",
    description: "",
    features: "",
    targetAudience: "",
    uniqueValue: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof ProjectData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Tell us about your project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              placeholder="My Awesome SaaS Tool"
              value={formData.projectName}
              onChange={(e) => handleChange("projectName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe what your project does..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Key Features</Label>
            <Textarea
              id="features"
              placeholder="List the main features that make your project special..."
              value={formData.features}
              onChange={(e) => handleChange("features", e.target.value)}
              required
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Input
              id="targetAudience"
              placeholder="Developers, SaaS builders, entrepreneurs..."
              value={formData.targetAudience}
              onChange={(e) => handleChange("targetAudience", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="uniqueValue">What makes it unique?</Label>
            <Textarea
              id="uniqueValue"
              placeholder="What sets your project apart from existing solutions?"
              value={formData.uniqueValue}
              onChange={(e) => handleChange("uniqueValue", e.target.value)}
              required
              className="min-h-[80px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
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