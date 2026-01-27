import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Profile {
  id: number;
  name: string;
  username: string;
  url: string;
  icon: string;
  color: string;
  stats?: string;
  useIcon?: boolean;
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "GitHub",
    username: "@johndoe",
    url: "https://github.com",
    icon: "github",
    color: "#FFFFFF",
    stats: "500+ contributions",
    useIcon: true,
  },
  {
    id: 2,
    name: "LeetCode",
    username: "@johndoe",
    url: "https://leetcode.com",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
    color: "#FFA116",
    stats: "300+ problems solved",
  },
  {
    id: 3,
    name: "HackerRank",
    username: "@johndoe",
    url: "https://hackerrank.com",
    icon: "https://cdn.worldvectorlogo.com/logos/hackerrank.svg",
    color: "#2EC866",
    stats: "5-star in JavaScript",
  },
];

const ProfileCard = ({ profile, index }: { profile: Profile; index: number }) => {
  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -15, 
        scale: 1.03,
        boxShadow: `0 30px 60px -20px ${profile.color}30`,
      }}
      className="glass p-8 group relative overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated Glow Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at center, ${profile.color}20, transparent 60%)`,
        }}
      />

      <div className="flex items-center gap-5">
        {/* 3D Floating Icon */}
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotateY: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            delay: index * 0.3,
          }}
          whileHover={{ rotateY: 360, scale: 1.1 }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
          style={{ 
            backgroundColor: `${profile.color}15`,
            boxShadow: `0 10px 30px -10px ${profile.color}40`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glow ring */}
          <motion.div
            animate={{ 
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl"
            style={{ 
              boxShadow: `0 0 20px ${profile.color}30`,
            }}
          />
          
          {profile.useIcon ? (
            <Github 
              className="w-8 h-8 relative z-10"
              style={{ color: profile.color }}
            />
          ) : (
            <img
              src={profile.icon}
              alt={profile.name}
              className="w-8 h-8 object-contain relative z-10"
              style={{ 
                filter: profile.name === "LeetCode" ? "invert(1)" : "none",
              }}
            />
          )}
        </motion.div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors">
            {profile.name}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">{profile.username}</p>
          {profile.stats && (
            <motion.p 
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              className="text-sm font-medium mt-2"
              style={{ color: profile.color }}
            >
              {profile.stats}
            </motion.p>
          )}
        </div>

        {/* Arrow with animation */}
        <motion.div
          whileHover={{ x: 5, scale: 1.2 }}
          className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors"
        >
          <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.div>
      </div>
    </motion.a>
  );
};

const ProfilesSection = () => {
  return (
    <section id="profiles" className="relative min-h-screen py-32 overflow-hidden flex items-center">
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-blob delay-200" />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-medium mb-4 block"
          >
            Profiles
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Coding <span className="text-gradient">Profiles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find me solving problems and contributing to open source
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {profiles.map((profile, index) => (
            <ProfileCard key={profile.id} profile={profile} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilesSection;
