import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/cool_crusher_29?igsh=MWU2aW51ZDNxeGRs",
    color: "#E4405F",
    description: "Life behind the code",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/logeshwaran2982",
    color: "#0A66C2",
    description: "Connect professionally",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/logeshwaran29082002",
    color: "#FFFFFF",
    description: "Check out my code",
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

        <div className="flex flex-wrap justify-center gap-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30, rotateY: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -15, 
                scale: 1.1,
                rotateY: 15,
                boxShadow: `0 25px 50px -15px ${social.color}40`,
              }}
              className="glass p-8 w-40 text-center group"
              style={{ 
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              {/* Floating animation */}
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotateZ: [0, 2, -2, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <motion.div
                  whileHover={{ rotateY: 360 }}
                  transition={{ duration: 0.8 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center relative"
                  style={{ 
                    backgroundColor: `${social.color}20`,
                    transformStyle: "preserve-3d",
                    boxShadow: `0 10px 30px -10px ${social.color}30`,
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl"
                    style={{ 
                      background: `radial-gradient(circle, ${social.color}30 0%, transparent 70%)`,
                    }}
                  />
                  <social.icon 
                    className="w-8 h-8 transition-all duration-300 relative z-10" 
                    style={{ 
                      color: social.color,
                      filter: `drop-shadow(0 0 10px ${social.color}60)`,
                    }}
                  />
                </motion.div>
              </motion.div>
              
              <p className="font-semibold text-base group-hover:text-primary transition-colors">
                {social.name}
              </p>
              <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
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
