import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/shadcn/ui/button";
import { Sidebar } from "@/components/shadcn/ui/sidebar";
import { SidebarFooter } from "@/components/shadcn/ui/sidebar";
import { SidebarHeader } from "@/components/shadcn/ui/sidebar";
import { SidebarContent } from "@/components/shadcn/ui/sidebar";

export function RightBar() {
  const form = useFormContext();
  const formValues = form.getValues();

  const svgRef = useRef<SVGSVGElement | null>(null);

  function downloadQRCode() {
    const svg = svgRef.current;

    if(svg) {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svg);

      const canvas = document.createElement("canvas");
      
      canvas.width = 200;
      canvas.height = 200;

      const img = new Image();
      const context = canvas.getContext("2d");

      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        context?.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        const link = document.createElement("a");
        const pngUrl = canvas.toDataURL("image/png");

        link.href = pngUrl;
        link.download = "qr-code.png";
        link.click();
      };

      img.src = url;
    }

    return;
  }

  return (
    <Sidebar
      side="right"
      variant="floating"
      className="[&>div[data-slot='sidebar-inner']]:shadow-none"
      cssVars={{
        "--sidebar-width": "var(--container-sm)"
      } as React.CSSProperties}
    >
      <SidebarHeader className="gap-0 text-center">
        <h4 className="text-lg font-semibold">
          <span className="uppercase">
            live preview
          </span>
        </h4>
        <p className="text-base first-letter:capitalize">
          <span className="font-normal text-muted-foreground">
            changes are saved automatically
          </span>
        </p>
      </SidebarHeader>
      <SidebarContent>
        {formValues.url && (
          <QRCodeSVG
            className="mx-auto border rounded-lg"
            
            size={200}
            marginSize={1}
            ref={svgRef}
            value={formValues.url}
            fgColor={formValues.foreColor}
            bgColor={formValues.backColor}
            imageSettings={(() => {
              if (formValues.logo) {
                return {
                  width: 40,
                  height: 40,
                  excavate: true,
                  src: URL.createObjectURL(formValues.logo),
                }
              }

              return;
            })()}
          />
        )}
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={downloadQRCode}
          disabled={!formValues.url}

          size="lg"
          variant="default"
          className="h-12 text-base font-semibold"
        >
          <span className="capitalize">
            download QR code
          </span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}