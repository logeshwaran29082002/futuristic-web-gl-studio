import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border/50">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold text-gradient">LM</span>
          </div>

          <p className="flex items-center gap-2 text-muted-foreground text-sm">
            © {currentYear} Logeshwaran M. Crafted with
            <Heart className="w-4 h-4 text-destructive fill-destructive animate-pulse" />
            using React & Framer Motion
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
