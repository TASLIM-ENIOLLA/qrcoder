import z from "zod";

export const formSchema = z.object({
  url: z.url(),
  fastScan: z.enum(["", "true", "false"]),
  foreColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  backColor: z.string().regex(/^#[0-9A-F]{6}$/i),
  // shape: z.enum(["", "dot", "square", "rounded"]),
  logo: z.instanceof(File)
    .refine(
      (file) => {
        return file.size <= 2 * 1024 * 1024;
      },
      "File size must be less than 5MB"
    )
    .refine(
      (file) => {
        return ["image/png", "image/jpeg", "image/webp"].includes(file.type);
      },
      "Only PNG, JPEG, and WebP images are allowed"
    )
    .optional(),
});