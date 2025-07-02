import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  cloneElement,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

type ResuableDialogProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactElement<{ onClose: () => void }>;
  footer?: ReactNode;
};
export function ResuableDialog({
  trigger,
  title,
  description,
  children,
  footer,
}: ResuableDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {cloneElement(children, { onClose: () => setOpen(false) })}
        {footer && <>{footer}</>}
      </DialogContent>
    </Dialog>
  );
}
