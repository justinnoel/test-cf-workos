import { WorkOS } from "@workos-inc/node";
import { Hono } from "hono";

type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key];
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
  console.log(`c.env.WORKOS_API_KEY = ${c.env.WORKOS_API_KEY}`);
  console.log(`c.env.WORKOS_CLIENT_ID = ${c.env.WORKOS_CLIENT_ID}`);
  console.log(`c.env.WORKOS_CALLBACK = ${c.env.WORKOS_CALLBACK}`);

  const workos = new WorkOS(c.env.WORKOS_API_KEY);

  const magicAuth = await workos.userManagement.createMagicAuth({
    email,
  });

  console.log(`magicAuth = ${magicAuth}`);

  return c.text("Hello Hono!");
});

export default app;
