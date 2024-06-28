// import { Socket, Server as NetServer } from 'net';
// import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from 'next';
import { z } from 'zod';

export const FormSchema = z.object({
  email: z.string().describe('Email').email({ message: 'Invalid Email' }),
  password: z.string().describe('Password').min(1, 'Password is required'),
});

export const SignUpFormSchema = z.object({

  email: z.string().email({
      message: "Invalid email.",
  }),
  password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});
// export const CreateWorkspaceFormSchema = z.object({
//   workspaceName: z
//     .string()
//     .describe('Workspace Name')
//     .min(1, 'Workspace name must be min of 1 character'),
//   logo: z.any(),
// });

// export const UploadBannerFormSchema = z.object({
//   banner: z.string().describe('Banner Image'),
// });

// export type NextApiResponseServerIo = NextApiResponse & {
//   socket: Socket & {
//     server: NetServer & {
//       io: SocketIOServer;
//     };
//   };
// };