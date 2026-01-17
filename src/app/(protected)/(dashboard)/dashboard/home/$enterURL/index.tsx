import { Fragment } from "react";
import { useFormContext } from "react-hook-form";

import { Separator } from "@/components/shadcn/ui/separator";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { CardHeader, CardTitle } from "@/components/shadcn/ui/card";
import { FormControl, FormMessage } from "@/components/shadcn/ui/form";
import { FormField, FormItem, FormLabel } from "@/components/shadcn/ui/form";

import { formFields } from "./props";

export function EnterURL() {
  const form = useFormContext();

  return (
    <Card className="py-5 gap-5 shadow-none">
      <CardHeader className="gap-0">
        <CardTitle className="text-xl font-semibold">
          <span className="capitalize">enter URL</span>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="max-w-xl">
        <div className="space-y-5">
          {formFields.map(({ name, title, Component }, index) => (
            <Fragment key={index}>
              <FormField
                name={name}
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      {title && (
                        <FormLabel className="text-base font-medium">
                          <span className="capitalize text-muted-foreground">
                            {title}
                          </span>
                        </FormLabel>
                      )}
                      <FormControl>
                        <Component {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}