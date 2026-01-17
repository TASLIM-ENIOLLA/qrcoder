import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { useFormContext } from "react-hook-form";

export const formFields = [
  {
    name: "url",
    title: "website URL",
    Component({ ...field }: React.ComponentProps<typeof Input>) {
      return (
        <Input {...field}
          type="url"
          placeholder="https://example.com"
          className="h-12 w-full shadow-none"
        />
      );
    }
  },
  {
    name: "fastScan",
    Component() {
      const form = useFormContext();

      return (
        <Label className="text-base font-normal">
          <Checkbox
            checked={form.getValues("fastScan") === "true"}
            onCheckedChange={(value) => {
              form.setValue("fastScan", value.toString());
            }}
          />
          <span className="text-muted-foreground">
            Shorten URL for faster scanning
          </span>
        </Label>
      );
    }
  },
];