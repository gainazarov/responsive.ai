import { useEffect } from "react";
import { useStore } from "@/hooks/use-store";
import { ControlPanel } from "@/components/ControlPanel";
import { DeviceFrame } from "@/components/DeviceFrame";
import { AnalyticsPanel } from "@/components/AnalyticsPanel";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateLead } from "@/hooks/use-leads";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { insertLeadSchema } from "@/lib/leadSchema";

export default function Home() {
  const { mode, cinematicMode } = useStore();

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative flex flex-col">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full mix-blend-screen" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Header */}
      <header className="relative z-50 p-6 flex justify-between items-center glass-panel border-b border-white/5 bg-transparent backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="font-display font-bold text-xl text-white">R</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-xl leading-none tracking-tight">Responsiv<span className="text-primary">.ai</span></h1>
            <p className="text-xs text-muted-foreground font-mono">Interactive Demo Environment</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className={`w-2 h-2 rounded-full ${mode === 'perfect-responsive' ? 'bg-emerald-500 animate-pulse' : 'bg-orange-500'}`} />
            <span className="text-xs font-mono uppercase text-muted-foreground">
              {mode.replace('-', ' ')}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {cinematicMode ? (
            <motion.div 
              key="cinema"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-50 bg-black flex items-center justify-center"
            >
              {/* Cinematic View Placeholder */}
              <h1 className="text-6xl font-display font-bold text-white neon-text text-center">
                THE FUTURE IS <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">FLUID</span>
              </h1>
            </motion.div>
          ) : (
            <DeviceFrame />
          )}
        </AnimatePresence>
      </main>

      <AnalyticsPanel />
      <ControlPanel />
    </div>
  );
}

function ContactDialog() {
  const form = useForm<z.infer<typeof insertLeadSchema>>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: { email: "" }
  });

  const mutation = useCreateLead();

  function onSubmit(data: z.infer<typeof insertLeadSchema>) {
    mutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden md:flex border-white/10 hover:bg-white/10">
          Get Audit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass-panel border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Get Your Free Audit</DialogTitle>
          <DialogDescription className="text-slate-400">
            Enter your email to receive a detailed breakdown of your site's responsive performance.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="you@company.com" 
                      {...field} 
                      className="bg-black/20 border-white/10 focus:border-primary h-12" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/80 font-bold"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Send Request"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
