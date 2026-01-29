import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Movie Ticket Booking System (User App)",
    description: "Users can browse movies, select seats and book tickets",
    longDescription:
      "A full-stack movie ticket booking application where users can register, login, browse movies, select seats, make online payments using Stripe, and view booking history with QR tickets.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=500&fit=crop",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe", "JWT", "REST API"],
    liveUrl: "https://movie-ticket-booking-lac.vercel.app/",
    githubUrl:
      "https://github.com/logeshwaran29082002/movie-ticket-Booking/tree/main/frontend",
    color: "#22c55e",
  },

  {
    id: 2,
    title: "Movie Ticket Booking System (Admin Panel)",
    description: "Admin dashboard to manage movies, shows and bookings",
    longDescription:
      "Admin panel for managing movies, showtimes, seat pricing and monitoring user bookings. Built as a separate frontend application connected to the same backend.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
    liveUrl: "https://movie-ticket-booking-nqfa.vercel.app/",
    githubUrl:
      "https://github.com/logeshwaran29082002/movie-ticket-Booking/tree/main/admin",
    color: "#3b82f6",
  },

  {
    id: 3,
    title: "Contact Management System",
    description: "CRUD application to manage contacts",
    longDescription:
      "A full-stack contact management system where users can add, update, delete and search contacts. Built with React frontend and Node.js backend with REST APIs.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
    tags: ["React.js", "Node.js", "Express.js", "REST API"],
    liveUrl: "https://contact-management-seven-nu.vercel.app/",
    githubUrl:
      "https://github.com/logeshwaran29082002/Contact-Management",
    color: "#f59e0b",
  },
  {
  id: 4,
  title: "Bean Scene Cafe Website",
  description: "Responsive static cafe website built using HTML & CSS",
  longDescription:
    "A modern and responsive cafe website showcasing menu, services, and contact details. Built using pure HTML and CSS and deployed on Vercel.",
 image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&h=500&fit=crop",

  tags: ["HTML", "CSS"],
  liveUrl: "https://bean-scene-phi.vercel.app/",
  githubUrl: "https://github.com/logeshwaran29082002/bean-scene", // change if repo name different
  color: "#8664e3",
},
{
  id: 5,
  title: "Todo List Full Stack Application",
  description: "Full-stack CRUD todo app with React and Node.js",
  longDescription:
    "A MERN stack todo application where users can add, edit, delete and view tasks. Frontend built with React and deployed on Vercel. Backend built with Node.js, Express and MongoDB Atlas, deployed on Render.",
  image:
    "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop",
  tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
  liveUrl: "https://todo-list-full-stack-three.vercel.app/",
  githubUrl: "https://github.com/logeshwaran29082002/todo_list_full-Stack",
  color: "#ef4444",
},
{
  id: 6,
  title: "Lemon Wares Hosting Website",
  description: "Responsive static website for web hosting services",
  longDescription:
    "A modern responsive static website for a web hosting company showcasing plans, features, testimonials and contact information. Built using HTML, CSS and JavaScript and deployed on Render.",
image: "https://images.pexels.com/photos/7988116/pexels-photo-7988116.jpeg?auto=compress&cs=tinysrgb&w=800",

  tags: ["HTML", "CSS", "JavaScript"],
  liveUrl: "https://lemon-wares.onrender.com/",
  githubUrl: "https://github.com/logeshwaran29082002/lemon-wares",
  color: "#06b6d4",
},
{
  id: 7,
  title: "BuildCon Construction Website",
  description: "Responsive construction company landing page",
  longDescription:
    "A responsive static website for a construction company showcasing services, projects, testimonials and contact information. Built using HTML, CSS and JavaScript and deployed on Render.",
  image:
    "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
  tags: ["HTML", "CSS", "JavaScript"],
  liveUrl: "https://buildcon-si0l.onrender.com/",
  githubUrl: "https://github.com/logeshwaran29082002/BuildCon",
  color: "#f97316",
}




];


const ProjectCard = ({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative glass overflow-hidden cursor-pointer group"
    >
      {/* Glow Effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-1 rounded-2xl blur-xl -z-10"
        style={{ backgroundColor: `${project.color}30` }}
      />

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong max-w-3xl w-full max-h-[90vh] overflow-auto"
      >
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 glass hover:bg-destructive/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-display font-bold mb-4">{project.title}</h2>
          <p className="text-muted-foreground mb-6">{project.longDescription}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl hover:shadow-glow transition-shadow"
            >
              <ExternalLink className="w-5 h-5" />
              View Live
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 glass border-primary/30 hover:border-primary/60 font-semibold rounded-xl transition-colors"
            >
              <Github className="w-5 h-5" />
              Source Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative min-h-screen py-32 overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Projects</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
