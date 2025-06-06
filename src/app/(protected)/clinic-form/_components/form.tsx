"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createClinic } from "@/actions/clinic/craete-clinic.action";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const clinicSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "O nome da clínica é obrigatória" }),
});

export default function RegisterClinicForm() {
  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof clinicSchema>) {
    try {
      await createClinic(data.name);
      toast.success("Clínica cadastrada com sucesso");
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar clinica");
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Criar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
