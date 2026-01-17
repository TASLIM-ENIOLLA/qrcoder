"use client";

import z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/shadcn/ui/form";
import { SidebarInset } from "@/components/shadcn/ui/sidebar";

import { Design } from "./$design";
import { EnterURL } from "./$enterURL";
import { RightBar } from "./$rightBar";

import { formSchema } from "./props";

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      // shape: "",
      fastScan: "",
      logo: undefined,
      foreColor: "#0a0a0a",
      backColor: "#ffffff",
    }
  });

  form.watch();

  return (
    <Form {...form}>
      <SidebarInset className="py-5">
        <div className="container">
          <form className="space-y-5">
            <EnterURL />
            <Design />
          </form>
        </div>
      </SidebarInset>
      <RightBar />
    </Form>
  );
}