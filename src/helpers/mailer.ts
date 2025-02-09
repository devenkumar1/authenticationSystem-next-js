import { ObjectId } from "mongodb"; // Import ObjectId to use it correctly
import bcrypt from 'bcryptjs';
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendEmail = async ({
  userId,
  email,
  emailType,
}: any) => {
  try {
    // Generating hashed value
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Correcting the user lookup: Ensure `userId` is passed as ObjectId.
    const userIdObj = new ObjectId(userId); // Convert userId to ObjectId if it's a string.

    if (emailType === "VERIFY") {
      const user = await User.findByIdAndUpdate(
        userIdObj, // Pass the ObjectId directly
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      );
    } else if (emailType === "RESET") {
      const user = await User.findByIdAndUpdate(
        userIdObj, // Pass the ObjectId directly
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      );
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b51da9c0f9d538",
        pass: "b749081932f335",
      },
    });

    const mailOptions = {
      from: "devenkumar540@gmail.com",
      to: email,
      subject: `${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }`,
      html: `<p>Click <a href="${process.env.NEXT_PUBLIC_URL}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste this: ${process.env.NEXT_PUBLIC_URL}/verifyemail?token=${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.log(error);
  }
};
