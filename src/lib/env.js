const { z } = require("zod");

const envSchema = z.object({
  PORT: z.coerce
    .number()
    .min(3000, "Must be at least 3000")
    .max(65535, "Must be at most 65535")
    .default(3333)
});

const env = envSchema.parse(process.env);

module.exports = { env }