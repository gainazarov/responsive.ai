import { useMutation } from "@tanstack/react-query";
import { insertLeadSchema } from "@/lib/leadSchema";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

type InsertLead = z.infer<typeof insertLeadSchema>;

export function useCreateLead() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertLead) => {
      insertLeadSchema.parse(data);
      await new Promise((resolve) => setTimeout(resolve, 400));
      return { ok: true };
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been added to our VIP list.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
