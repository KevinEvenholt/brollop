import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { email, guests, attending, allergies, message } = data;

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
      <h2 style="text-align:center;color:#a7794a;">💍 Ny OSA-anmälan</h2>
      <p><b>E-post:</b> ${email}</p>
      <p><b>Antal gäster:</b> ${guests.length}</p>
      <ul style="padding-left:20px;">
        ${guests
          .map((g: string, i: number) => `<li>${i + 1}. ${g}</li>`)
          .join("")}
      </ul>
      <p><b>Kommer:</b> ${attending ? "Ja 🎉" : "Nej 😢"}</p>
      <p><b>Allergier:</b> ${allergies || "Inga"}</p>
      <p><b>Meddelande:</b><br>${message || "—"}</p>
      <hr style="margin:20px 0;border:none;border-top:1px solid #eadfcf;">
      <p style="text-align:center;font-size:13px;color:#8a7662;">Denna OSA skickades via er bröllopssida 🤍</p>
    </div>
  </div>`;

  try {
    await transporter.sendMail({
      from: `"OSA Bröllop" <${process.env.EMAIL_USER}>`,
      to: "carro_avila@hotmail.com",
      subject: "Ny OSA-anmälan 💌",
      html: mailHTML,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err });
  }
}
