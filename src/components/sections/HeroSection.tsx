import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Scene3D from "../Scene3D";
import { Button } from "../ui/button";
const socialIcons = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/cool_crusher_29?igsh=MWU2aW51ZDNxeGRs",
    color: "#E4405F",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/logeshwaran2982",
    color: "#0A66C2",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/logeshwaran29082002",
    color: "#FFFFFF",
  },
];

const HeroSection = () => {
  const [enableScrollAnim, setEnableScrollAnim] = useState(false);

useEffect(() => {
  if (window.innerWidth >= 1024) {
    setEnableScrollAnim(true);
  }
}, []);

  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Profile image animations based on scroll
  const profileY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const profileRotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const profileScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const profileZ = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Profile image entrance animation
  const profileEntrance = {
    hidden: { 
      y: -150, 
      scale: 0.8, 
      opacity: 0,
      rotateY: -30,
    },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
className="relative hero-gradient overflow-hidden"
    >
     <div className="absolute inset-0 -z-10">
  <Scene3D />
</div>


      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-blob delay-200" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
     className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[100svh]"

      >
        {/* Profile Image with Scroll Animation */}
        <motion.div
          variants={profileEntrance}
          style={{ 
  y: enableScrollAnim ? profileY : 0, 
  rotateX: enableScrollAnim ? profileRotateX : 0,
  scale: enableScrollAnim ? profileScale : 1,
  z: enableScrollAnim ? profileZ : 0,
  transformStyle: "preserve-3d",
  perspective: 1000,
}}

          className="mb-8 flex justify-center"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              boxShadow: "0 25px 80px -20px hsl(var(--primary) / 0.5)",
            }}
            transition={{ duration: 0.4 }}
className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-primary/30 shadow-glow"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Glowing ring animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/40"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-secondary/30"
            />
            
            {/* Profile Image */}
           <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
 <img
  src="/profile.jpeg"
  alt="Profile"
className="w-full h-full object-cover rounded-full border border-white/20 shadow-lg"
/>

</div>

            
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-primary/20" />
          </motion.div>
        </motion.div>

        {/* Main Heading */}
<motion.h1
  variants={itemVariants}
className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 flex flex-col gap-3"
>
<span className="relative inline-block text-gradient text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-snug drop-shadow-lg">
  Logeshwaran M
  <span className="absolute left-1/2 -bottom-2 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full -translate-x-1/2"></span>
</span>



  <span className="text-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold opacity-90">
    MERN Full Stack Developer
  </span>
</motion.h1>




        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Building immersive digital experiences with MongoDB, Express, React & Node.js.
          Crafting the future of web, one component at a time.
        </motion.p>

        {/* 3D Social Icons */}
        <motion.div
          variants={itemVariants}
        className="flex justify-center gap-4 md:gap-6 mb-8"

        >
          {socialIcons.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 0 }}
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeInOut",
              }}
              whileHover={{ 
                scale: 1.3,
                rotateY: 360,
                boxShadow: `0 0 30px ${social.color}60`,
              }}
              className="w-14 h-14 rounded-xl glass flex items-center justify-center group"
              style={{ 
                transformStyle: "preserve-3d",
                perspective: 500,
              }}
            >
              <social.icon 
                className="w-7 h-7 transition-all duration-300 group-hover:drop-shadow-lg"
                style={{ 
                  color: social.color,
                  filter: `drop-shadow(0 0 8px ${social.color}40)`,
                }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold px-8 py-6 text-lg shadow-button hover:shadow-glow transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </Button>

          <Button
            onClick={() => window.open("/resume.pdf", "_blank")}
            variant="outline"
            size="lg"
            className="glass border-primary/30 hover:border-primary/60 font-semibold px-8 py-6 text-lg group"
          >
            <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Download Resume
          </Button>

          <Button
            onClick={scrollToContact}
            variant="ghost"
            size="lg"
            className="hover:bg-primary/10 font-semibold px-8 py-6 text-lg"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Me
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
