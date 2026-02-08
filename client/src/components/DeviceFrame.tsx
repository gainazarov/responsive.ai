import { useStore } from "@/hooks/use-store";
import { motion } from "framer-motion";
import { DemoSite } from "./DemoSite";

export function DeviceFrame() {
  const { device } = useStore();

  const dimensions = {
    mobile: { width: 375, height: 720 },
    tablet: { width: 768, height: 900 },
    desktop: { width: "100%", height: "100%" }
  };

  const isDesktop = device === 'desktop';

  return (
    <div className="w-full h-full flex items-start justify-center p-4 lg:p-12 pb-16 overflow-hidden relative z-10">
      <motion.div
        layout
        initial={false}
        animate={{
          width: isDesktop ? "100%" : dimensions[device].width,
          height: isDesktop ? "100%" : dimensions[device].height,
          borderRadius: isDesktop ? 16 : 40,
          scale: isDesktop ? 1 : (device === 'mobile' ? 0.85 : 0.9)
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20
        }}
        className="bg-background relative shadow-2xl border-4 border-slate-800 overflow-hidden mx-auto flex flex-col -mt-6 lg:-mt-8"
        style={{
          boxShadow: "0 0 0 2px #333, 0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          maxHeight: isDesktop ? "calc(100vh - 8rem)" : undefined
        }}
      >
        {/* Notch/Camera for mobile/tablet */}
        {!isDesktop && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-black rounded-b-xl z-50 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
            <div className="w-10 h-1.5 rounded-full bg-slate-800"></div>
          </div>
        )}

        {/* Browser Header for Desktop */}
        {isDesktop && (
          <div className="h-10 bg-slate-900 border-b border-white/5 flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="flex-1 bg-black/40 h-6 rounded-md ml-4 flex items-center px-3 text-xs text-slate-500 font-mono">
              luxecart.demo/new-collection
            </div>
          </div>
        )}

        {/* Content Wrapper */}
        <div className="w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-950 no-scrollbar">
          <DemoSite />
        </div>
        
        {/* Device Bottom Bar */}
        {!isDesktop && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full z-50" />
        )}
      </motion.div>
    </div>
  );
}
