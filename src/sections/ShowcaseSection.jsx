import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger only once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    try {
      // Animation for the main section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      );

      // Animations for each app showcase
      const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

      cards.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              delay: 0.3 * (index + 1),
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
              },
            }
          );
        }
      });
    } catch (error) {
      console.warn("Showcase animation failed:", error);
    }
  }, { scope: sectionRef });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Kill all ScrollTriggers for this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current || 
            trigger.vars.trigger === rydeRef.current ||
            trigger.vars.trigger === libraryRef.current ||
            trigger.vars.trigger === ycDirectoryRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper overflow-hidden rounded-lg">
              <img 
                src="/images/Aps.png" 
                alt="Ryde App Interface" 
                className="w-full h-auto transition-transform duration-500 ease-out hover:scale-110"
              />
            </div>
            <div className="text-content">
              <h2>
                Revolutionize the parking experience through intelligent automation, 
real-time detection, and seamless integration, User-Friendly App
                called APS
              </h2>
              <p className="text-white-50 md:text-xl">
                An app built with React Native, Expo, & TailwindCSS for a fast,
                user-friendly experience.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-[#FFEFDB] overflow-hidden rounded-lg">
                <img
                  src="/images/project2.png"
                  alt="Library Management Platform"
                  className="w-full h-auto transition-transform duration-500 ease-out hover:scale-110"
                />
              </div>
              <h2>The Library Management Platform</h2>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper bg-[#FFE7EB] overflow-hidden rounded-lg">
                <img 
                  src="/images/project3.png" 
                  alt="YC Directory App" 
                  className="w-full h-auto transition-transform duration-500 ease-out hover:scale-110"
                />
              </div>
              <h2>YC Directory - A Startup Showcase App</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
