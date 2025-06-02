import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import RegisterClinicForm from "./_components/form";

export default function ClinicForm() {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clinica</DialogTitle>
          <DialogDescription>
            Adicione uma clinica para continuar
          </DialogDescription>
        </DialogHeader>
        <RegisterClinicForm />
      </DialogContent>
    </Dialog>
  );
}
