import { z } from "@hono/zod-openapi";

export class AuthDto {
  static authStateSchema = z.object({
    isValid: z.boolean(),
  });

  static entityToDto(entity: {
    isValid: boolean;
  }): z.infer<typeof this.authStateSchema> {
    return { isValid: entity.isValid };
  }
}
