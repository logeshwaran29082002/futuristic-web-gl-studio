import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Profile {
  id: number;
  name: string;
  username: string;
  url: string;
  icon: string;
  color: string;
  stats?: string;
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "GitHub",
    username: "@johndoe",
    url: "https://github.com",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "#FFFFFF",
    stats: "500+ contributions",
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
    stats: "5-star in Python",
  },
  {
    id: 4,
    name: "CodePen",
    username: "@johndoe",
    url: "https://codepen.io",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codepen/codepen-original.svg",
    color: "#FFFFFF",
    stats: "50+ pens",
  },
  {
    id: 5,
    name: "Stack Overflow",
    username: "@johndoe",
    url: "https://stackoverflow.com",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/stackoverflow.svg",
    color: "#F48024",
    stats: "5000+ reputation",
  },
  {
    id: 6,
    name: "Dev.to",
    username: "@johndoe",
    url: "https://dev.to",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/devdotto.svg",
    color: "#FFFFFF",
    stats: "1000+ followers",
  },
];

const ProfileCard = ({ profile, index }: { profile: Profile; index: number }) => {
  return (
    <motion.a
      href={profile.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass p-6 group relative overflow-hidden"
    >
      {/* Hover Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at center, ${profile.color}15, transparent 70%)`,
        }}
      />

      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors"
          style={{ filter: profile.color !== "#FFFFFF" ? "none" : "invert(1)" }}
        >
          <img
            src={profile.icon}
            alt={profile.name}
            className="w-8 h-8 object-contain"
            style={{ filter: profile.color !== "#FFFFFF" ? "invert(0)" : "invert(1)" }}
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
            {profile.name}
          </h3>
          <p className="text-muted-foreground text-sm">{profile.username}</p>
          {profile.stats && (
            <p className="text-xs text-primary mt-1">{profile.stats}</p>
          )}
        </div>

        {/* Arrow */}
        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </motion.a>
  );
};

const ProfilesSection = () => {
  return (
    <section id="profiles" className="relative min-h-screen py-32 overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Profiles</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Coding <span className="text-gradient">Profiles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find me on various platforms where I code, learn, and share
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {profiles.map((profile, index) => (
            <ProfileCard key={profile.id} profile={profile} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilesSection;
