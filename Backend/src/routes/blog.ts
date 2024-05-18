import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from 'hono/jwt'
import { createblogInput, updateblogInput } from "@abhikannan/medium-common";
export const blogRouter = new Hono<{
  // Used to mention the secrests in TypeScript
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    // done for the Middleware get and set
    userId: string;
  }
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader  = c.req.header("authorization") || "";
  const user = await verify(authHeader , c.env.JWT_SECRET)
  if(user){
    c.set("userId",user.id);
    await next();
  }
  else{
    c.status(401);
    return c.json({message:"You Are Not logged in"});
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  
  const {success} = createblogInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({err:"Invalid Input"});
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: parseInt(userId)
    },
  });

  return c.json({ id: blog.id });
});


blogRouter.put("/", async (c) => {
  const body = await c.req.json();

  const {success}  = updateblogInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({err:"Invalid Input"});
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  })


  return c.json({id:blog.id});
});


// TODO : pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
      select :{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true,
          }
        }
      }
  });
 
  return c.json({ blogs });
});


blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param('id');
  console.log(id);

  const blogwithId = await prisma.blog.findFirst({
    where: {
      id : Number(id)
    },
    select :{
      id:true,
      title:true,
      content:true,
      author:{
        select:{
          name:true,
        }
      }
    }
  });
  return c.json({ blogwithId });
});

