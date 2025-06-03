"use client";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import DoctorForm from "./doctor-form";

export default function AddDoctorButton() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          <Plus className="h-4 w-4" />
          Adicionar Médico
        </Button>
      </DialogTrigger>
      <DoctorForm onSuccess={() => setOpen(false)} />
    </Dialog>
  );
}
