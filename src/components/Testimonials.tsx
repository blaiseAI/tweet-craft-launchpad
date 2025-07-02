import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahbuilds",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    content: "LaunchTweet GPT helped me generate viral tweets for my SaaS launch. Got 50K+ impressions and 200 new signups in just 2 days! 🚀",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    handle: "@marcustheindie",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "As someone who struggles with writing, this tool is a lifesaver. The tweets sound natural and get way more engagement than my old posts.",
    rating: 5
  },
  {
    name: "Emily Thompson",
    handle: "@emilyshipscode",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Used LaunchTweet GPT for my latest app launch. The generated tweets followed the perfect formula and helped me reach 10K developers!",
    rating: 5
  },
  {
    name: "David Park",
    handle: "@davidbuilds",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Been using this for all my project announcements. The AI understands the indie maker tone perfectly. Highly recommend! 💯",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by indie makers & SaaS builders
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who've transformed their launches with viral tweets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <span className="text-sm text-muted-foreground">{testimonial.handle}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-sm leading-relaxed">{testimonial.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-muted-foreground">Tweets generated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">2.5M+</div>
            <div className="text-muted-foreground">Total impressions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">Success rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}