import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { useStore } from "@/hooks/use-store";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

export function AnalyticsPanel() {
  const { mode, showAnalytics } = useStore();
  const [data, setData] = useState<any[]>([]);

  // Simulate changing data based on mode
  useEffect(() => {
    const generateData = () => {
      const base = mode === 'perfect-responsive' ? 80 : mode === 'bad-responsive' ? 40 : 15;
      const volatility = mode === 'perfect-responsive' ? 10 : 20;
      
      return Array.from({ length: 20 }).map((_, i) => ({
        name: i,
        value: Math.max(0, base + Math.random() * volatility - (Math.random() * volatility / 2))
      }));
    };
    
    setData(generateData());
    
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const lastValue = prev[prev.length - 1].value;
        const trend = mode === 'perfect-responsive' ? 1 : mode === 'no-responsive' ? -1 : 0;
        const randomChange = (Math.random() - 0.5) * 10;
        
        newData.push({
          name: prev[prev.length - 1].name + 1,
          value: Math.max(0, Math.min(100, lastValue + trend + randomChange))
        });
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode]);

  return (
    <AnimatePresence>
      {showAnalytics && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed top-8 right-8 w-80 glass-panel rounded-2xl p-6 z-40 hidden lg:block"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Live Metrics
            </h3>
            <div className={`w-2 h-2 rounded-full animate-pulse ${mode === 'perfect-responsive' ? 'bg-emerald-500' : 'bg-red-500'}`} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <MetricCard 
              label="Conversion" 
              value={mode === 'perfect-responsive' ? '4.8%' : mode === 'bad-responsive' ? '1.2%' : '0.4%'}
              trend={mode === 'perfect-responsive' ? 'up' : 'down'}
            />
            <MetricCard 
              label="Bounce Rate" 
              value={mode === 'perfect-responsive' ? '24%' : mode === 'bad-responsive' ? '65%' : '88%'}
              trend={mode === 'perfect-responsive' ? 'down' : 'up'}
              inverse
            />
          </div>

          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={mode === 'perfect-responsive' ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={mode === 'perfect-responsive' ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip content={() => null} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={mode === 'perfect-responsive' ? "#10b981" : "#ef4444"} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Est. Monthly Revenue</span>
              <span className={`font-mono font-bold ${mode === 'perfect-responsive' ? 'text-emerald-400' : 'text-red-400'}`}>
                ${mode === 'perfect-responsive' ? '48,290' : mode === 'bad-responsive' ? '12,400' : '2,100'}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MetricCard({ label, value, trend, inverse }: { label: string, value: string, trend: 'up' | 'down', inverse?: boolean }) {
  const isPositive = (trend === 'up' && !inverse) || (trend === 'down' && inverse);
  
  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/5">
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold font-mono text-white">{value}</div>
        {trend === 'up' ? (
          <ArrowUpRight className={`w-4 h-4 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`} />
        ) : (
          <ArrowDownRight className={`w-4 h-4 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`} />
        )}
      </div>
    </div>
  );
}
