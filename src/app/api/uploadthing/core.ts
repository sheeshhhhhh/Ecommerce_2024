import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { authoptions } from "../auth/[...nextauth]/route";

import { UTApi } from "uploadthing/server";

export const utapi = new UTApi()

const f = createUploadthing();
 
export const ourFileRouter = {
  
    
    imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
        // this is for user authentication
      const user = await getServerSession(authoptions)
      if (!user) throw new UploadThingError("Unauthorized");
 
      return { userId: user.user.id };

    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
 
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;