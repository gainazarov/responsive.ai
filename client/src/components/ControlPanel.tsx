import { motion, useDragControls } from "framer-motion";
import { Monitor, Smartphone, Tablet, Zap, BarChart3, Layout, XCircle, CheckCircle2, GripHorizontal, ChevronRight, ChevronLeft, Laptop } from "lucide-react";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export function ControlPanel() {
  const { 
    mode, setMode, 
    device, setDevice, 
    simulateUser, toggleSimulateUser,
    showAnalytics, toggleAnalytics,
    era, setEra
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [expandDirection, setExpandDirection] = useState<'left' | 'right'>('right');
  const [isDraggable, setIsDraggable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Update expansion direction based on screen position
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      if (rect.left + rect.width / 2 > screenWidth / 2) {
        setExpandDirection('left');
      } else {
        setExpandDirection('right');
      }
    }
  }, [isOpen]);

  const handleDoubleClick = () => {
    setIsDraggable(!isDraggable);
  };

  return (
    <>
      {/* Desktop Recommendation for Mobile Users */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] md:hidden">
        <div className="bg-amber-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg border border-white/20">
          <Laptop className="w-3 h-3" />
          <span>Open on Desktop for full experience</span>
        </div>
      </div>

      <motion.div 
        ref={containerRef}
        drag={isDraggable}
        dragMomentum={false}
        dragControls={dragControls}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "fixed bottom-8 left-8 z-50 glass-panel rounded-2xl flex items-center transition-all duration-300",
          !isOpen ? "p-2" : "p-4",
          isDraggable && "ring-2 ring-primary/50 cursor-move"
        )}
        onDoubleClick={handleDoubleClick}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "p-2 rounded-xl transition-all hover:bg-white/10 flex items-center gap-2",
            isOpen && (expandDirection === 'right' ? "mr-4" : "order-last ml-4")
          )}
        >
          {isOpen ? (
            expandDirection === 'right' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Layout className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-medium pr-2">Controls</span>
            </>
          )}
        </button>

        {/* Content */}
        {isOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            className={cn(
              "flex flex-col md:flex-row gap-6 items-center",
              expandDirection === 'left' && "order-first"
            )}
          >
            {/* Era Selection */}
            <div className="flex items-center gap-2">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider hidden md:block">Era</div>
              <div className="flex bg-black/20 p-1 rounded-lg">
                <EraButton active={era === '2010'} onClick={() => setEra('2010')} label="2010" />
                <EraButton active={era === '2020'} onClick={() => setEra('2020')} label="2020" />
                <EraButton active={era === '2026'} onClick={() => setEra('2026')} label="2026" />
              </div>
            </div>

            <div className="w-px h-8 bg-white/10 hidden md:block" />

            {/* Device Selection */}
            <div className="flex items-center gap-2">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider hidden md:block">Device</div>
              <div className="flex bg-black/20 p-1 rounded-lg">
                <DeviceButton active={device === 'mobile'} onClick={() => setDevice('mobile')} icon={Smartphone} label="Mobile" />
                <DeviceButton active={device === 'tablet'} onClick={() => setDevice('tablet')} icon={Tablet} label="Tablet" />
                <DeviceButton active={device === 'desktop'} onClick={() => setDevice('desktop')} icon={Monitor} label="Desktop" />
              </div>
            </div>

            <div className="w-px h-8 bg-white/10 hidden md:block" />

            {/* Mode Selection */}
            <div className="flex items-center gap-2">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider hidden md:block">Resp.</div>
              <div className="flex bg-black/20 p-1 rounded-lg">
                <ModeButton active={mode === 'no-responsive'} onClick={() => setMode('no-responsive')} icon={XCircle} label="None" color="text-red-500" />
                <ModeButton active={mode === 'bad-responsive'} onClick={() => setMode('bad-responsive')} icon={Layout} label="Bad" color="text-orange-500" />
                <ModeButton active={mode === 'perfect-responsive'} onClick={() => setMode('perfect-responsive')} icon={CheckCircle2} label="Perfect" color="text-emerald-500" />
              </div>
            </div>

            <div className="w-px h-8 bg-white/10 hidden md:block" />

            {/* Toggles */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSimulateUser}
                className={cn(
                  "rounded-full transition-all duration-300 hover:bg-white/10",
                  simulateUser && "bg-primary/20 text-primary shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                )}
                title="Simulate Real User"
              >
                <Zap className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleAnalytics}
                className={cn(
                  "rounded-full transition-all duration-300 hover:bg-white/10",
                  showAnalytics && "bg-accent/20 text-accent shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                )}
                title="Toggle Analytics"
              >
                <BarChart3 className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

function EraButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
        active ? "bg-white/10 text-white shadow-lg" : "text-muted-foreground hover:text-white"
      )}
    >
      {label}
    </button>
  );
}

function DeviceButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-md transition-all duration-200 relative",
        active ? "text-white bg-white/10" : "text-muted-foreground hover:text-white"
      )}
      title={label}
    >
      <Icon className="w-4 h-4 md:w-5 md:h-5" />
    </button>
  );
}

function ModeButton({ active, onClick, icon: Icon, label, color }: { active: boolean, onClick: () => void, icon: any, label: string, color: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-md transition-all duration-200 flex items-center gap-2 text-xs font-medium relative",
        active ? "text-white bg-white/10" : "text-muted-foreground hover:text-white"
      )}
    >
      <Icon className={cn("w-3.5 h-3.5 md:w-4 md:h-4", active && color)} />
      <span className="hidden lg:block">{label}</span>
    </button>
  );
}
