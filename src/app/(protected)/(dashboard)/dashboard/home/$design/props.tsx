import bytes from "bytes";
import Image from "next/image";

import { Fragment } from "react/jsx-runtime";
import { useFormContext } from "react-hook-form";
import { Circle, Squircle, Trash2 } from "lucide-react";
import { Pipette, Square, ImageIcon } from "lucide-react";

import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { ToggleGroup } from "@/components/shadcn/ui/toggle-group";
import { ToggleGroupItem } from "@/components/shadcn/ui/toggle-group";

export const formFields = [
  {
    name: "colors",
    title: "colors",
    Component() {
      const form = useFormContext();

      return (
        <div className="@container/grid">
          <div className="grid gap-3 grid-cols-2">
            <div className="col-span-1">
              <Button asChild size={null} variant="outline" className="w-full shadow-none whitespace-normal hover:bg-transparent dark:hover:bg-transparent">
                <div className="p-3">
                  <Square fill={form.getValues("foreColor")} className="size-12 stroke-1 stroke-muted" />
                  <div className="flex-1">
                    <p className="text-sm font-normal">
                      <span className="uppercase text-muted-foreground">
                        foreground
                      </span>
                    </p>
                    <h5 className="text-base font-bold">
                      <span className="uppercase">
                        {form.getValues("foreColor")}
                      </span>
                    </h5>
                  </div>
                  <Button asChild size={null} variant="secondary" className="rounded-full">
                    <Label tabIndex={0} className="size-12">
                      <Pipette className="size-5 text-muted-foreground" />
                      <Input
                        hidden
                        type="color"

                        {...form.register("foreColor")}
                      />
                    </Label>
                  </Button>
                </div>
              </Button>
            </div>
            <div className="col-span-1">
              <Button asChild size={null} variant="outline" className="w-full shadow-none whitespace-normal hover:bg-transparent dark:hover:bg-transparent">
                <div className="p-3">
                  <Square fill={form.getValues("backColor")} className="size-12 stroke-1 stroke-muted" />
                  <div className="flex-1">
                    <p className="text-sm font-normal">
                      <span className="uppercase text-muted-foreground">
                        background
                      </span>
                    </p>
                    <h5 className="text-base font-bold">
                      <span className="uppercase">
                        {form.getValues("backColor")}
                      </span>
                    </h5>
                  </div>
                  <Button asChild size={null} variant="secondary" className="rounded-full">
                    <Label tabIndex={0} className="size-12">
                      <Pipette className="size-5 text-muted-foreground" />
                      <Input
                        hidden
                        type="color"

                        {...form.register("backColor")}
                      />
                    </Label>
                  </Button>
                </div>
              </Button>
            </div>
          </div>
        </div>
      );
    }
  },
  // {
  //   name: "shapes",
  //   title: "shapes & styles",
  //   Component() {
  //     const form = useFormContext();

  //     const options = [
  //       { name: "square", Icon: Square },
  //       { name: "dot", Icon: Circle },
  //       { name: "rounded", Icon: Squircle },
  //     ];

  //     return (
  //       <ToggleGroup
  //         type="single"
  //         className="w-full h-auto"
          
  //         spacing={5}
  //         value={form.getValues("shape")}
  //         onValueChange={(value) => {
  //           form.setValue("shape", value);
  //         }}
  //       >
  //         {options.map(({ name, Icon }, index) => (
  //           <Fragment key={index}>
  //             <ToggleGroupItem
  //               value={name}
  //               variant="outline"
  //               className="p-3 flex flex-1 h-auto flex-col items-center shadow-none justify-center data-[state=on]:border-2 data-[state=on]:bg-primary/5 data-[state=on]:border-primary/70"
  //             >
  //               <Icon className="size-16 stroke-none fill-foreground" />
  //               <p className="text-base font-medium">
  //                 <span className="capitalize">
  //                   {name}
  //                 </span>
  //               </p>
  //             </ToggleGroupItem>
  //           </Fragment>
  //         ))}
  //       </ToggleGroup>
  //     );
  //   }
  // },
  {
    name: "logo",
    title: "add logo",
    Component() {
      const form = useFormContext();
      const logo = form.getValues("logo");

      if (logo) {
        const imageURL = URL.createObjectURL(logo);

        return (
          <Button
            asChild
            size={null}
            type="button"
            variant="outline"
            className="h-auto shadow-none whitespace-normal hover:bg-primary/2"
          >
            <div className="p-5 gap-5 text-left">
              <Image
                width="60"
                height="60"
                alt="favicon"
                className="border aspect-square rounded-full"
                src={imageURL}
                style={{
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
              <div className="flex-1">
                <h5 title={logo.name} className="text-lg font-bold">
                  <span className="one-line">
                    {logo.name}
                  </span>
                </h5>
                <p className="text-base font-normal">
                  <span className="one-line uppercase text-muted-foreground">
                    {bytes(logo.size)}
                  </span>
                </p>
              </div>
              <Button
                type="button"
                size="icon-lg"
                variant="destructive"
                className="border rounded-full"

                onClick={() => form.setValue("logo", undefined)}
              >
                <Trash2 className="size-5" />
              </Button>
            </div>
          </Button>
        );
      }

      return (
        <Card className="text-center items-center justify-center shadow-none rounded-md">
          <CardContent>
            <Button size="icon-lg" variant="default" className="size-18 rounded-full">
              <ImageIcon className="size-9 stroke-1.5 text-background" />
            </Button>
          </CardContent>
          <CardContent>
            <h5 className="text-lg first-letter:capitalize">
              <span className="font-semibold">
                drop your logo or click&nbsp;
                <label className="text-lg underline cursor-pointer underline-offset-4">
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];

                      if (file) {
                        form.setValue("logo", file);
                      }
                    }}
                  />
                  <span className="lowercase">
                    here&nbsp;
                  </span>
                </label>
                to select image
              </span>
            </h5>
            <p className="text-base first-letter:capitalize">
              <span className="font-normal text-muted-foreground">
                PNG, JPG or SVG (Max. 2MB)
              </span>
            </p>
          </CardContent>
        </Card>
      );
    }
  },
];