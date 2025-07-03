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

  // Technology to Twitter handle mapping
  const techTwitterMap: Record<string, string> = {
    'react': '@reactjs',
    'nextjs': '@nextjs',
    'next.js': '@nextjs',
    'vue': '@vuejs',
    'angular': '@angular',
    'tailwind': '@tailwindcss',
    'typescript': '@typescript',
    'javascript': '@javascript',
    'node': '@nodejs',
    'nodejs': '@nodejs',
    'express': '@expressjs',
    'mongodb': '@MongoDB',
    'firebase': '@firebase',
    'supabase': '@supabase',
    'vercel': '@vercel',
    'netlify': '@netlify',
    'stripe': '@stripe',
    'openai': '@OpenAI',
    'anthropic': '@AnthropicAI',
    'claude': '@AnthropicAI',
    'chatgpt': '@OpenAI',
    'aws': '@awscloud',
    'docker': '@Docker',
    'kubernetes': '@kubernetesio',
    'python': '@ThePSF',
    'django': '@djangoproject',
    'flask': '@pallets_project',
    'rails': '@rails',
    'laravel': '@laravelphp',
    'php': '@official_php',
    'wordpress': '@WordPress',
    'shopify': '@Shopify',
    'figma': '@figma',
    'adobe': '@Adobe',
    'github': '@github',
    'gitlab': '@gitlab',
    'vscode': '@code',
    'vim': '@vim_editor',
    'linux': '@linux',
    'ubuntu': '@ubuntu',
    'redis': '@redisinc',
    'postgresql': '@postgresql',
    'mysql': '@MySQL',
    'sqlite': '@sqlite',
    'graphql': '@graphql',
    'apollo': '@apollographql',
    'prisma': '@prisma',
    'turborepo': '@turborepo',
    'vite': '@vite_js',
    'webpack': '@webpack',
    'babel': '@babeljs',
    'eslint': '@geteslint',
    'prettier': '@prettier',
    'jest': '@fbjest',
    'cypress': '@Cypress_io',
    'playwright': '@playwright',
    'storybook': '@storybookjs',
    'framer': '@framer',
    'motion': '@framer',
    'gsap': '@greensock',
    'three': '@threejs',
    'webgl': '@khronosgroup',
    'blockchain': '@ethereum',
    'web3': '@ethereum',
    'solidity': '@solidity_lang',
    'rust': '@rustlang',
    'go': '@golang',
    'flutter': '@FlutterDev',
    'kotlin': '@kotlin',
    'swift': '@swiftlang',
    'unity': '@unity3d',
    'unreal': '@unrealengine',
    'blender': '@blender_org',
    'sass': '@SassCSS',
    'postcss': '@postcss',
    'bootstrap': '@getbootstrap',
    'material': '@materialdesign',
    'chakra': '@chakra_ui',
    'mantine': '@mantinedev',
    'antd': '@antdv',
    'discord': '@discord',
    'slack': '@SlackAPI',
    'notion': '@NotionAPI',
    'airtable': '@airtable',
    'contentful': '@contentful',
    'sanity': '@sanity_io',
    'strapi': '@strapijs',
    'keystatic': '@keystatic',
    'tina': '@tinacms',
    'algolia': '@algolia',
    'elasticsearch': '@elastic',
    'mapbox': '@mapbox',
    'google': '@googledevs',
    'microsoft': '@microsoftdev',
    'apple': '@AppleSupport',
    'meta': '@Meta',
    'twitter': '@TwitterDev',
    'youtube': '@YouTubeDev',
    'twitch': '@TwitchDev',
    'spotify': '@SpotifyPlatform',
    'steam': '@steam_games',
    'epic': '@EpicGames',
    'ubisoft': '@Ubisoft',
    'nvidia': '@nvidia',
    'amd': '@AMD',
    'intel': '@intel',
    'arm': '@ArmSoftwareDev',
    'qualcomm': '@Qualcomm',
    'tensorflow': '@tensorflow',
    'pytorch': '@pytorch',
    'keras': '@keras_team',
    'opencv': '@opencvlibrary',
    'jupyter': '@ProjectJupyter',
    'pandas': '@pandas_dev',
    'numpy': '@numpy_team',
    'scipy': '@scipy',
    'matplotlib': '@matplotlib',
    'plotly': '@plotlygraphs',
    'd3': '@d3js_org',
    'observable': '@observablehq',
    'tableau': '@tableau',
    'powerbi': '@mspowerbi',
    'looker': '@LookerData',
    'databricks': '@databricks',
    'snowflake': '@SnowflakeDB',
    'dbt': '@getdbt',
    'airflow': '@ApacheAirflow',
    'kafka': '@apachekafka',
    'spark': '@ApacheSpark',
    'hadoop': '@hadoop',
    'elastic': '@elastic',
    'kibana': '@elastic',
    'grafana': '@grafana',
    'prometheus': '@PrometheusIO',
    'datadog': '@datadoghq',
    'newrelic': '@newrelic',
    'sentry': '@getsentry',
    'bugsnag': '@bugsnag',
    'rollbar': '@rollbar',
    'honeybadger': '@honeybadgerapp',
    'mixpanel': '@mixpanel',
    'amplitude': '@amplitude',
    'segment': '@segment',
    'hotjar': '@hotjar',
    'fullstory': '@fullstory',
    'logrocket': '@LogRocketJS',
    'posthog': '@posthog',
    'plausible': '@plausiblehq',
    'fathom': '@usefathom',
    'umami': '@umami_software',
    'simple': '@SimpleAnalytic',
    'google analytics': '@googleanalytics',
    'gtm': '@tagmanager',
    'facebook': '@Meta',
    'instagram': '@instagram',
    'linkedin': '@LinkedIn',
    'pinterest': '@Pinterest',
    'snapchat': '@snapchat',
    'tiktok': '@tiktok_us',
    'reddit': '@reddit',
    'hackernews': '@newsyc',
    'producthunt': '@ProductHunt',
    'indiehackers': '@IndieHackers',
    'ycombinator': '@ycombinator',
    'techcrunch': '@TechCrunch',
    'venturebeat': '@VentureBeat',
    'techradar': '@techradar',
    'theverge': '@verge',
    'wired': '@WIRED',
    'ars': '@arstechnica',
    'hacker': '@newsyc',
    'dev': '@ThePracticalDev',
    'stackoverflow': '@stackoverflow',
    'codepen': '@CodePen',
    'jsfiddle': '@jsfiddle',
    'replit': '@replit',
    'glitch': '@glitch',
    'codesandbox': '@codesandbox',
    'stackblitz': '@stackblitz',
    'gitpod': '@gitpod',
    'codespaces': '@github',
    'cloud9': '@awscloud',
    'atom': '@atomeditor',
    'sublime': '@sublimehq',
    'brackets': '@brackets',
    'notepad': '@notepadplus',
    'emacs': '@emacs',
    'spacemacs': '@spacemacs',
    'doom': '@doomemacs',
    'neovim': '@neovim',
    'kakoune': '@kakoune',
    'helix': '@helix_editor',
    'zed': '@zeddotdev',
    'nova': '@panic',
    'coda': '@panic',
    'espresso': '@MacRabbit',
    'textmate': '@macromates',
    'bbedit': '@bbedit',
    'ultraedit': '@ultraedit',
    'notepad++': '@notepadplus',
    'gedit': '@gnome',
    'kate': '@kdecommunity',
    'geany': '@geany',
    'leafpad': '@lxde',
    'mousepad': '@xfce',
    'pluma': '@ubuntu_mate',
    'xed': '@linuxmint',
    'nano': '@gnu',
    'micro': '@microeditor',
    'joe': '@joe_editor',
    'jed': '@jed_editor',
    'mg': '@mg_editor',
    'ne': '@ne_editor',
    'elvis': '@elvis_editor',
    'vile': '@vile_editor',
    'yi': '@yi_editor',
    'sam': '@plan9port',
    'acme': '@plan9port',
    'ed': '@gnu',
    'ex': '@vim_editor',
    'sed': '@gnu',
    'awk': '@gnu',
    'grep': '@gnu',
    'find': '@gnu',
    'sort': '@gnu',
    'cut': '@gnu',
    'tr': '@gnu',
    'uniq': '@gnu',
    'head': '@gnu',
    'tail': '@gnu',
    'wc': '@gnu',
    'cat': '@gnu',
    'less': '@gnu',
    'more': '@gnu',
    'tee': '@gnu',
    'xargs': '@gnu',
    'parallel': '@gnu',
    'make': '@gnu',
    'cmake': '@cmake',
    'ninja': '@ninja_build',
    'bazel': '@bazelbuild',
    'buck': '@buckbuild',
    'pants': '@pantsbuild',
    'scons': '@scons',
    'waf': '@waf_build',
    'ant': '@apacheant',
    'maven': '@apachemaven',
    'gradle': '@gradle',
    'sbt': '@scala_sbt',
    'leiningen': '@leiningenorg',
    'boot': '@boot_clj',
    'deps': '@clojure',
    'shadow': '@thheller',
    'figwheel': '@bhauman',
    're-frame': '@day8au',
    'reagent': '@reagentproject',
    'om': '@swannodette',
    'rum': '@tonsky',
    'fulcro': '@fulcrologic',
    'hoplon': '@hoplon',
    'coast': '@coastonclojure',
    'pedestal': '@pedestal_team',
    'luminus': '@luminus',
    'duct': '@duct_framework',
    'mount': '@tolitius',
    'component': '@stuartsierra',
    'integrant': '@weavejester',
    'system': '@danielsz',
    'clip': '@juxt_pro',
    'yada': '@juxt_pro',
    'bidi': '@juxt_pro',
    'buddy': '@buddy_project',
    'liberator': '@liberator_clj',
    'compojure': '@compojure',
    'ring': '@ring_clojure',
    'hiccup': '@weavejester',
    'enlive': '@cgrand',
    'selmer': '@selmer_clj',
    'garden': '@noprompt',
    'prismatic': '@prismaticinc',
    'core.async': '@clojure',
    'core.logic': '@clojure',
    'core.match': '@clojure',
    'core.typed': '@ambrose_bs',
    'spec': '@clojure',
    'test.check': '@clojure',
    'midje': '@marick',
    'speclj': '@speclj',
    'expectations': '@jaycfields',
    'kaocha': '@kaocha_',
    'eftest': '@weavejester',
    'criterium': '@hugoduncan',
    'perforate': '@davidsantiago',
    'thalia': '@thalia_bench',
    'jmh': '@openjdk',
    'gatling': '@gatling_corp',
    'locust': '@locustio',
    'artillery': '@artilleryio',
    'k6': '@k6_io',
    'wrk': '@wg',
    'ab': '@apache',
    'siege': '@joesiegel',
    'bombardier': '@bombardier_go',
    'hey': '@rakyll',
    'vegeta': '@vegeataio',
    'drill': '@fcsonline',
    'autocannon': '@mcollina',
    'loadtest': '@alexfernandez',
    'httperf': '@httperf',
    'jmeter': '@apache',
    'neoload': '@neotys',
    'loadrunner': '@MicroFocus',
    'loadui': '@smartbear',
    'webload': '@webload',
    'loadstorm': '@loadstorm',
    'loader': '@loader_io',
    'blitz': '@blitz_io',
    'flood': '@flood_io',
    'loadimpact': '@k6_io',
    'blazemeter': '@blazemeter',
    'redline13': '@redline13',
    'loadninja': '@smartbear',
    'loadview': '@dotcom_monitor'
  };

  // Community accounts for different project types
  const communityAccounts = {
    saas: ['@IndieHackers', '@ProductHunt', '@buildinpublic', '@MicroConf'],
    ai: ['@OpenAI', '@AnthropicAI', '@huggingface', '@LangChainAI'],
    web3: ['@ethereum', '@solana', '@polygon', '@avalancheavax'],
    mobile: ['@reactnative', '@FlutterDev', '@ionicframework', '@expo'],
    design: ['@figma', '@dribbble', '@behance', '@awwwards'],
    developer: ['@github', '@stackoverflow', '@ThePracticalDev', '@freecodecamp'],
    startup: ['@ycombinator', '@500startups', '@TechStars', '@AngelList'],
    maker: ['@makerpad', '@glideapps', '@bubble', '@webflow']
  };

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

      // Find relevant Twitter accounts based on project description
      const description = formData.description.toLowerCase();
      const relevantAccounts = new Set<string>();
      
      // Match technologies mentioned in description
      Object.entries(techTwitterMap).forEach(([tech, handle]) => {
        if (description.includes(tech)) {
          relevantAccounts.add(handle);
        }
      });

      // Add community accounts based on project context
      if (description.includes('saas') || description.includes('subscription') || description.includes('revenue')) {
        communityAccounts.saas.forEach(handle => relevantAccounts.add(handle));
      }
      if (description.includes('ai') || description.includes('gpt') || description.includes('machine learning')) {
        communityAccounts.ai.forEach(handle => relevantAccounts.add(handle));
      }
      if (description.includes('web3') || description.includes('crypto') || description.includes('blockchain')) {
        communityAccounts.web3.forEach(handle => relevantAccounts.add(handle));
      }
      if (description.includes('mobile') || description.includes('app store') || description.includes('ios') || description.includes('android')) {
        communityAccounts.mobile.forEach(handle => relevantAccounts.add(handle));
      }
      if (description.includes('design') || description.includes('ui') || description.includes('ux')) {
        communityAccounts.design.forEach(handle => relevantAccounts.add(handle));
      }
      if (description.includes('developer') || description.includes('coding') || description.includes('programming')) {
        communityAccounts.developer.forEach(handle => relevantAccounts.add(handle));
      }
      if (description.includes('startup') || description.includes('founder') || description.includes('entrepreneur')) {
        communityAccounts.startup.forEach(handle => relevantAccounts.add(handle));
      }
      if (description.includes('no-code') || description.includes('low-code') || description.includes('maker')) {
        communityAccounts.maker.forEach(handle => relevantAccounts.add(handle));
      }

      // Always include key community accounts for indie makers
      relevantAccounts.add('@IndieHackers');
      relevantAccounts.add('@buildinpublic');

      const accountsArray = Array.from(relevantAccounts).slice(0, 6); // Limit to 6 accounts

      const prompt = `Generate 4 engaging Twitter/X posts based on this project description using the SaaS Builder Tweet Formula:

"${formData.description}"

${additionalContext ? `Additional context: ${additionalContext}` : ""}

${links.length > 0 ? `Available links to include when appropriate:\n${links.join('\n')}` : ""}

${accountsArray.length > 0 ? `Relevant Twitter accounts to mention (choose 2-3 most relevant per tweet):\n${accountsArray.join(', ')}` : ""}

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
- Include 2-3 relevant @mentions from the provided list in each tweet
${links.length > 0 ? '- Include provided links naturally in 1-2 of the tweets where it makes sense' : ''}
- Choose the most contextually relevant @mentions for each tweet

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
