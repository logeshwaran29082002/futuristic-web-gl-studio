import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code",
  },
  {
    icon: Palette,
    title: "Creative Design",
    description: "Crafting beautiful interfaces with attention to detail",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Building lightning-fast applications optimized for scale",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working effectively in teams and with stakeholders",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Senior Full Stack Developer",
    company: "Tech Innovators Inc.",
    description: "Leading development of enterprise-scale applications",
  },
  {
    year: "2022",
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    description: "Built multiple successful SaaS products from ground up",
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "Creative Agency Co.",
    description: "Developed interactive web experiences for top brands",
  },
  {
    year: "2018",
    title: "Started Coding Journey",
    company: "Self-taught",
    description: "Fell in love with programming and never looked back",
  },
];

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-32 section-gradient overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <motion.div
        style={{ y }}
        className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
      />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primary font-medium mb-4 block">About Me</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Passionate About <span className="text-gradient">Creating</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            With over 6 years of experience in web development, I specialize in
            building modern, performant applications that users love.
          </p>
        </motion.div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass p-8 glow-border group cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-display font-semibold text-center mb-12">
            My Journey
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-start gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary pulse-glow" />

                {/* Content */}
                <div className="flex-1 ml-20 md:ml-0">
                  <div className="glass p-6 hover:border-primary/30 transition-colors">
                    <span className="text-primary font-mono font-bold">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-display font-semibold mt-2">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground mt-1">{item.company}</p>
                    <p className="text-sm text-muted-foreground/70 mt-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
