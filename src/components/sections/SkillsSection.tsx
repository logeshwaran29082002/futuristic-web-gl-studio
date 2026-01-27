import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Text3D, Center } from "@react-three/drei";
import { Suspense } from "react";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95, color: "#61DAFB" },
      { name: "TypeScript", level: 90, color: "#3178C6" },
      { name: "Next.js", level: 88, color: "#FFFFFF" },
      { name: "Tailwind CSS", level: 95, color: "#38B2AC" },
      { name: "Three.js", level: 75, color: "#00D4FF" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 88, color: "#339933" },
      { name: "Python", level: 82, color: "#3776AB" },
      { name: "PostgreSQL", level: 85, color: "#336791" },
      { name: "GraphQL", level: 80, color: "#E535AB" },
      { name: "Redis", level: 75, color: "#DC382D" },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git", level: 92, color: "#F05032" },
      { name: "Docker", level: 85, color: "#2496ED" },
      { name: "AWS", level: 78, color: "#FF9900" },
      { name: "CI/CD", level: 82, color: "#00D4FF" },
      { name: "Linux", level: 80, color: "#FCC624" },
    ],
  },
  {
    title: "Other",
    skills: [
      { name: "Figma", level: 85, color: "#F24E1E" },
      { name: "Agile", level: 90, color: "#00D4FF" },
      { name: "Testing", level: 85, color: "#A855F7" },
      { name: "SEO", level: 75, color: "#34A853" },
      { name: "Performance", level: 88, color: "#00D4FF" },
    ],
  },
];

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass p-5 cursor-default group"
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: skill.color }}
          />
          <span className="font-medium">{skill.name}</span>
        </div>
        <span className="text-primary font-mono text-sm">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: "easeOut" }}
          viewport={{ once: true }}
          className="skill-bar-fill"
          style={{
            boxShadow: isHovered
              ? `0 0 20px ${skill.color}40`
              : "none",
          }}
        />
      </div>
    </motion.div>
  );
};

const Floating3DText = ({ text }: { text: string }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} className="h-24">
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
          <Center>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.5}
              height={0.1}
              curveSegments={12}
            >
              {text}
              <meshStandardMaterial
                color="#00d4ff"
                emissive="#00d4ff"
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </Text3D>
          </Center>
        </Float>
      </Suspense>
    </Canvas>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="relative min-h-screen py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Skills</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            My <span className="text-gradient">Technical Stack</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass-strong p-8"
            >
              <h3 className="text-2xl font-display font-semibold mb-6 text-gradient">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
