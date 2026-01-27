import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  url: string;
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Building Scalable React Applications with Modern Patterns",
    excerpt:
      "Explore advanced patterns for building maintainable and scalable React applications that grow with your team.",
    date: "Jan 15, 2024",
    readTime: "8 min read",
    category: "React",
    url: "#",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "The Future of Web Development: What's Coming in 2024",
    excerpt:
      "A deep dive into emerging technologies and trends that will shape the web development landscape.",
    date: "Jan 10, 2024",
    readTime: "6 min read",
    category: "Web Dev",
    url: "#",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Mastering Three.js: Creating Immersive 3D Experiences",
    excerpt:
      "Learn how to create stunning 3D web experiences using Three.js and React Three Fiber.",
    date: "Jan 5, 2024",
    readTime: "12 min read",
    category: "3D Graphics",
    url: "#",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Optimizing Performance in Large-Scale Applications",
    excerpt:
      "Practical techniques for improving performance and user experience in complex web applications.",
    date: "Dec 28, 2023",
    readTime: "10 min read",
    category: "Performance",
    url: "#",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
];

const ArticleCard = ({ article, index }: { article: Article; index: number }) => {
  const isLarge = index === 0;

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={`glass overflow-hidden group block ${
        isLarge ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className={`relative ${isLarge ? "h-64 md:h-80" : "h-48"} overflow-hidden`}>
        <motion.img
          src={article.image}
          alt={article.title}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
          {article.category}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </span>
        </div>

        <h3
          className={`font-display font-semibold mb-3 group-hover:text-primary transition-colors ${
            isLarge ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          {article.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
          Read article
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </motion.a>
  );
};

const ArticlesSection = () => {
  return (
    <section id="articles" className="relative min-h-screen py-32 overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Articles</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            Featured <span className="text-gradient">Writings</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts, insights, and tutorials from my journey as a developer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
