import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Youtube, Twitter } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com",
    color: "#0A66C2",
    description: "Connect professionally",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com",
    color: "#FFFFFF",
    description: "Check out my code",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com",
    color: "#E4405F",
    description: "Life behind the code",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com",
    color: "#FF0000",
    description: "Tutorials & vlogs",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    color: "#1DA1F2",
    description: "Tech thoughts",
  },
];

const SocialLinksSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      
      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Let's Be <span className="text-gradient">Social</span>
          </h3>
          <p className="text-muted-foreground">
            Follow me on social media for updates and insights
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                rotateY: 15,
              }}
              className="glass p-6 w-32 text-center group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                whileHover={{ rotateY: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${social.color}20`,
                  transformStyle: "preserve-3d",
                }}
              >
                <social.icon 
                  className="w-6 h-6 transition-colors" 
                  style={{ color: social.color }}
                />
              </motion.div>
              <p className="font-medium text-sm group-hover:text-primary transition-colors">
                {social.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {social.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialLinksSection;
