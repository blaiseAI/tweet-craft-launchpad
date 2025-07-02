import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahbuilds",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    content: "LaunchTweet GPT helped me generate viral tweets for my SaaS launch. Got 50K+ impressions and 200 new signups in just 2 days! 🚀",
    rating: 5,
    highlight: "50K+ impressions",
    color: "from-pink-500 to-rose-500"
  },
  {
    name: "Marcus Rodriguez",
    handle: "@marcustheindie",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "As someone who struggles with writing, this tool is a lifesaver. The tweets sound natural and get way more engagement than my old posts.",
    rating: 5,
    highlight: "natural tweets",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Emily Thompson",
    handle: "@emilyshipscode",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Used LaunchTweet GPT for my latest app launch. The generated tweets followed the perfect formula and helped me reach 10K developers!",
    rating: 5,
    highlight: "10K developers",
    color: "from-purple-500 to-indigo-500"
  },
  {
    name: "David Park",
    handle: "@davidbuilds",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Been using this for all my project announcements. The AI understands the indie maker tone perfectly. Highly recommend! 💯",
    rating: 5,
    highlight: "indie maker tone",
    color: "from-emerald-500 to-teal-500"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-subtle relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        <Sparkles className="absolute top-20 left-1/4 w-6 h-6 text-primary/30 animate-pulse" />
        <Sparkles className="absolute bottom-32 right-1/3 w-4 h-4 text-purple-500/40 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 animate-glow-pulse">
            <Sparkles className="w-4 h-4" />
            Real Success Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Loved by indie makers & SaaS builders
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who've transformed their launches with viral tweets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`
                border-0 bg-card/60 backdrop-blur-sm relative overflow-hidden group
                hover:scale-105 transition-all duration-500 hover:shadow-2xl
                ${index % 2 === 0 ? 'animate-fade-in-delay-1' : 'animate-fade-in-delay-2'}
                ${index > 1 ? (index % 2 === 0 ? 'animate-fade-in-delay-3' : 'animate-fade-in-delay-4') : ''}
              `}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
              <div className="absolute inset-[1px] bg-card rounded-lg"></div>
              
              <CardContent className="p-8 relative z-10">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/40 mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="w-14 h-14 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {/* Floating Badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <span className="text-sm text-primary font-medium">{testimonial.handle}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4 fill-yellow-400 text-yellow-400 transform hover:scale-125 transition-transform duration-200" 
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                    
                    <p className="text-base leading-relaxed mb-4 group-hover:text-foreground transition-colors duration-300">
                      {testimonial.content.split(testimonial.highlight).map((part, i) => 
                        i === 0 ? part : (
                          <span key={i}>
                            <span className={`font-bold bg-gradient-to-r ${testimonial.color} bg-clip-text text-transparent`}>
                              {testimonial.highlight}
                            </span>
                            {part}
                          </span>
                        )
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Animated Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          {[
            { number: "5,000+", label: "Tweets generated", delay: "0.5s" },
            { number: "2.5M+", label: "Total impressions", delay: "0.7s" },
            { number: "95%", label: "Success rate", delay: "0.9s" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-card/40 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:scale-105 animate-slide-up group"
              style={{ animationDelay: stat.delay }}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}