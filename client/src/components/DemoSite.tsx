import { useStore } from "@/hooks/use-store";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Star, Menu, ArrowRight, Search, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function DemoSite() {
  const { mode, device, era } = useStore();

  const visualMode =
    mode === 'bad-responsive'
      ? 'perfect-responsive'
      : mode === 'perfect-responsive'
        ? 'bad-responsive'
        : mode;
  
  const isNoResponsive = visualMode === 'no-responsive';
  const isBadResponsive = visualMode === 'bad-responsive';
  const isPerfect = visualMode === 'perfect-responsive';
  const isMobile = device === 'mobile';
  const isDesktop = device === 'desktop';

  // Base styles
  const containerClass = cn(
    "w-full mx-auto transition-all duration-500",
    isNoResponsive ? "w-[1200px] min-w-[1200px]" : "w-full max-w-7xl px-4 md:px-8",
    era === '2010' && "font-serif max-w-[960px]",
    era === '2020' && "font-sans max-w-6xl",
    era === '2026' && "font-sans max-w-7xl"
  );

  return (
    <div className={cn(
      "min-h-full transition-colors duration-700",
      era === '2010' && "bg-[#f0f0f0] text-[#333] font-serif",
      era === '2020' && "bg-white text-slate-900",
      era === '2026' && "bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50"
    )}>
      
      {/* 2010 WORDPRESS STYLE HEADER */}
      {era === '2010' && (
        <div className="bg-[#222] text-[#eee] py-1 px-4 text-xs flex justify-between items-center border-b border-black">
          <div className="flex gap-4 items-center">
            <span className="font-bold flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> My WordPress Site</span>
            <span>12 Comments</span>
            <span>+ New</span>
          </div>
          <div className="flex gap-4">
            <span>Howdy, Admin</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={cn(
        era === '2010' ? "bg-white border-b-4 border-blue-600 shadow-md mb-8" : 
        era === '2020' ? "bg-white border-b border-slate-200 sticky top-0 z-40" : 
        "py-6 px-4"
      )}>
        <div className={cn(
          containerClass,
          "flex items-center justify-between",
          era === '2010' ? "py-8" : "py-4",
          isBadResponsive && isMobile && "flex-col gap-4"
        )}>
          <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center justify-center",
              era === '2010' ? "w-12 h-12 bg-blue-600 rounded-none shadow-lg" : "w-8 h-8 bg-black dark:bg-white rounded-lg"
            )}>
              <span className={cn("font-bold text-white", era === '2010' ? "text-2xl" : "text-lg")}>L</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-bold tracking-tight",
                era === '2010' ? "text-3xl italic text-blue-900" : "text-xl"
              )}>LUXECART</span>
              {era === '2010' && <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-sans">Premium Web Store</span>}
            </div>
          </div>

          <div className={cn(
            "flex items-center gap-8",
            (isBadResponsive && isMobile) ? "flex-col gap-2 w-full" : "hidden md:flex",
            (isPerfect && isMobile) && "hidden",
            era === '2010' && "font-sans uppercase text-xs tracking-widest font-bold"
          )}>
            <NavLink era={era} label="New Arrivals" />
            <NavLink era={era} label="Collections" />
            <NavLink era={era} label="Accessories" />
            <NavLink era={era} label="Sale" highlight />
          </div>

          <div className="flex items-center gap-4">
            {isPerfect && isMobile && era !== '2010' && (
               <Button variant="ghost" size="icon" className="md:hidden">
                 <Menu className="w-5 h-5" />
               </Button>
            )}
            <div className="flex items-center gap-2">
              <Button className={cn(
                "gap-2",
                era === '2010' ? "rounded-none bg-gradient-to-b from-blue-500 to-blue-700 hover:to-blue-800 border-b-4 border-blue-900 px-6 py-6" :
                era === '2020' ? "rounded-md bg-slate-900" : "rounded-full"
              )}>
                <ShoppingBag className="w-4 h-4" />
                <span className={era === '2010' ? "uppercase text-xs" : ""}>Cart (2)</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={cn(
        "relative overflow-hidden",
        era === '2010' ? "py-12 bg-[#eee]" : era === '2020' ? "py-20 bg-slate-50" : "py-32"
      )}>
        <div className={cn(containerClass, "relative z-10")}>
          <div className={cn(
            "grid gap-12 items-center",
            (isNoResponsive || era === '2010') ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2",
            isBadResponsive && isMobile && "flex flex-col-reverse text-center"
          )}>
            <div className="space-y-8">
              {era === '2026' && isPerfect && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  <Star className="w-3 h-3 fill-primary" />
                  Limited Edition
                </motion.div>
              )}
              
              <h1 className={cn(
                "font-bold leading-[1.1] tracking-tighter",
                era === '2010' ? "text-5xl font-serif text-slate-900 border-l-8 border-blue-600 pl-6" : 
                era === '2020' ? "text-6xl text-slate-900" : 
                "text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500",
                isNoResponsive && "text-7xl"
              )}>
                Redefining <br/> Modern Luxury
              </h1>
              
              <p className={cn(
                "max-w-md",
                era === '2010' ? "text-lg italic text-slate-600 leading-relaxed" : 
                era === '2020' ? "text-xl text-slate-600" : 
                "text-lg text-slate-500 dark:text-slate-400",
                isBadResponsive && isMobile && "text-[10px] w-full max-w-none text-justify"
              )}>
                Experience the perfect blend of minimalist design and maximum comfort. 
                Our new collection is designed for the urban visionary.
              </p>
              
              <div className={cn("flex gap-4", isBadResponsive && isMobile && "flex-col px-8")}>
                <Button size="lg" className={cn(
                  "px-8 h-14 text-lg",
                  era === '2010' ? "rounded-none bg-blue-600 hover:bg-blue-700 shadow-[4px_4px_0_rgba(0,0,0,0.2)]" :
                  era === '2020' ? "rounded-md" : "rounded-full bg-slate-950 dark:bg-white text-white dark:text-black"
                )}>
                  Shop Now
                </Button>
                {era !== '2010' && (
                  <Button variant="outline" size="lg" className={cn("px-8 h-14 text-lg", era === '2020' ? "rounded-md" : "rounded-full backdrop-blur-sm bg-white/10")}>
                    Watch Film
                  </Button>
                )}
              </div>
            </div>

            <motion.div 
              layout
              className={cn(
                "relative overflow-hidden group",
                era === '2010' ? "rounded-none border-[12px] border-white shadow-2xl rotate-2" : 
                era === '2020' ? "rounded-2xl shadow-xl" : 
                "rounded-[2.5rem] shadow-2xl",
                isBadResponsive && isMobile && "aspect-square w-1/2 mx-auto"
              )}
            >
              <img 
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80" 
                alt="Fashion"
                className={cn(
                  "w-full h-full object-cover transition-transform duration-1000",
                  era === '2026' && "group-hover:scale-110"
                )}
              />
              {era === '2026' && isPerfect && (
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              )}
            </motion.div>
          </div>
        </div>
        
        {/* 2026 Background Effects */}
        {era === '2026' && isPerfect && (
          <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-purple-500/10 to-transparent blur-3xl rounded-full translate-x-1/2" />
        )}
      </section>

      {/* Product Grid */}
      <section className={cn(
        "py-32",
        era === '2010' ? "bg-white" : era === '2020' ? "bg-white" : "bg-slate-50 dark:bg-slate-900/50"
      )}>
        <div className={containerClass}>
          <div className="flex justify-between items-end mb-16 px-4">
            <div className="space-y-2">
              <h2 className={cn(
                "font-bold",
                era === '2010' ? "text-4xl font-serif text-blue-900 underline decoration-blue-600 decoration-4 underline-offset-8" : "text-4xl"
              )}>New Arrivals</h2>
              <p className="text-slate-500">Hand-picked styles for you.</p>
            </div>
            <Button variant="ghost" className="group gap-2 hover:bg-primary/5">
              View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className={cn(
            "grid gap-8 px-4",
            (isNoResponsive || era === '2010') ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            isBadResponsive && isMobile && "flex flex-col gap-4"
          )}>
            {[1, 2, 3].map((id) => (
              <ProductCard key={id} id={id} era={era} isBad={isBadResponsive && isMobile} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn(
        "py-20",
        era === '2010' ? "bg-[#222] text-white border-t-8 border-blue-600" : "border-t border-slate-100 dark:border-slate-800"
      )}>
        <div className={containerClass}>
          <div className={cn(
            "grid gap-12 px-4",
            isBadResponsive && !isDesktop ? "grid-cols-1 text-center" : "grid-cols-2 md:grid-cols-4"
          )}>
            <div className={cn(
              "space-y-6",
              !(isBadResponsive && !isDesktop) && "col-span-2"
            )}>
              <span className={cn("font-bold text-2xl", era === '2010' && "font-serif italic text-4xl")}>LUXECART</span>
              <p className="opacity-60 max-w-xs leading-relaxed">
                Redefining the digital shopping experience through innovation and design.
              </p>
            </div>
            {['Shop', 'About', 'Support', 'Legal'].map((title) => (
              <div key={title} className={cn("space-y-4", isBadResponsive && !isDesktop && "items-center")}>
                <h4 className={cn("font-bold uppercase tracking-widest text-xs", era === '2010' && "text-blue-500")}>{title}</h4>
                <div className={cn("flex flex-col gap-3 text-sm opacity-60", isBadResponsive && !isDesktop && "items-center")}>
                  <a href="#" className="hover:opacity-100 transition-opacity">Link 1</a>
                  <a href="#" className="hover:opacity-100 transition-opacity">Link 2</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ era, label, highlight }: { era: string, label: string, highlight?: boolean }) {
  return (
    <a 
      href="#" 
      className={cn(
        "text-sm font-medium transition-all",
        era === '2010' ? "text-blue-700 underline decoration-blue-200 hover:decoration-blue-600" : "hover:text-primary",
        highlight && era === '2010' && "bg-yellow-200 px-2 py-1 rounded-sm border border-yellow-400",
        highlight && era !== '2010' && "text-red-500 font-bold"
      )}
    >
      {label}
    </a>
  );
}

function ProductCard({ id, era, isBad }: { id: number, era: string, isBad: boolean }) {
  const images = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80"
  ];

  return (
    <motion.div 
      whileHover={era === '2026' ? { y: -10 } : {}}
      className={cn(
        "group relative overflow-hidden transition-all duration-500",
        era === '2010' ? "rounded-none border border-slate-300 bg-white p-4 shadow-sm" : 
        era === '2020' ? "rounded-xl border border-slate-100 bg-white" : 
        "rounded-[2rem] bg-slate-100 dark:bg-slate-900/50 border border-white/10",
        isBad && "border-4 border-blue-500 rounded-none grayscale"
      )}
    >
      <div className={cn(
        "aspect-square overflow-hidden relative",
        era === '2010' ? "border border-slate-200 mb-4" : era === '2020' ? "mb-6" : "rounded-[1.5rem] m-2"
      )}>
        <img 
          src={images[id - 1]} 
          alt="Product"
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            era === '2026' && "group-hover:scale-110"
          )}
        />
        {era === '2026' && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button size="icon" className="rounded-full w-12 h-12 bg-white text-black hover:bg-white scale-90 group-hover:scale-100 transition-all">
              <ShoppingBag className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      <div className={era === '2026' ? "p-6 pt-2" : era === '2010' ? "" : "p-6"}>
        <div className="flex justify-between items-start mb-2">
          <div className="space-y-1">
            <h3 className={cn(
              "font-bold",
              era === '2010' ? "text-xl font-serif text-blue-900" : "text-lg"
            )}>Urban Runner {id}</h3>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Sneakers</p>
          </div>
          <span className={cn(
            "font-bold font-mono",
            era === '2010' ? "text-lg bg-yellow-100 px-2 rounded-sm" : "text-lg"
          )}>$189</span>
        </div>
        
        {era !== '2026' && (
          <Button variant={era === '2010' ? 'default' : 'secondary'} className={cn(
            "w-full mt-4",
            era === '2010' && "rounded-none bg-blue-600 hover:bg-blue-700 uppercase font-bold text-xs h-12"
          )}>
            Add to Cart
          </Button>
        )}
      </div>
    </motion.div>
  );
}
