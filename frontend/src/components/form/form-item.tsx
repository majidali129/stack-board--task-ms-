import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormItemProps = {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
};

export const FormItem = ({
  name,
  type = "text",
  placeholder,
  label,
  onChange,
  value,
}: FormItemProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        required
        onChange={(e) => onChange(e.target.value)}
        value={value}
        autoComplete="off"
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
