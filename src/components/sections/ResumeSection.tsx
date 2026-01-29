import { motion } from "framer-motion";
import { Download, FileText, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const ResumeSection = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate download delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // In a real app, this would trigger an actual download
    window.open("/resume.pdf", "_blank");
    
    setIsDownloading(false);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-strong p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Resume Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
            >
              <FileText className="w-16 h-16 text-primary" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
                Download My Resume
              </h3>
              <p className="text-muted-foreground mb-6">
                Get a comprehensive overview of my skills, experience, and
                achievements in a downloadable PDF format.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold px-8 py-6 text-lg shadow-button hover:shadow-glow transition-all duration-300"
                >
                  {isDownloading ? (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0 bg-white/20"
                    />
                  ) : null}
                  <span className="relative flex items-center gap-2">
                    <Download
                      className={`w-5 h-5 ${
                        isDownloading ? "animate-bounce" : ""
                      }`}
                    />
                    {isDownloading ? "Downloading..." : "Download PDF"}
                  </span>
                </Button>

                <Button
                  variant="outline"
                   onClick={() => window.open("/resume.pdf", "_blank")}
                  className="glass border-primary/30 hover:border-primary/60 font-semibold px-8 py-6 text-lg"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Preview Online
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
