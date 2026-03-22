import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    const { name, email, timeframe, details } = data;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailHTML = `
    <div style="background:#f9f6f1;padding:20px;font-family:'Georgia',serif;color:#5a3d2e;">
        <div style="max-width:600px;margin:auto;background:white;padding:20px;border-radius:12px;">
            <h2 style="text-align:center;color:#a7794a;">💍 Ny talanmälan</h2>
            <p><b>Namn:</b> ${name}</p>
            <p><b>E-post:</b> ${email}</p>
            <p><b>Tidsram:</b> ${timeframe}</p>
            <p><b>Relevant information:</b> ${details}</p>
        </div>
    </div>`;

    try {
        await transporter.sendMail({
          from: `"Tal Bröllop" <${process.env.EMAIL_USER}>`,
          to: "g.pontenius@gmail.com",
          subject: "Ny talanmälan 💌",
          html: mailHTML,
        });
        return NextResponse.json({ success: true });
      } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: err });
      }
}