import nodemailer from "nodemailer";

function createTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const provider = process.env.EMAIL_PROVIDER || "gmail";

  if (!user || user.includes("seu-email") || user.includes("example")) {
    console.warn("⚠️  [EMAIL] Credenciais não configuradas no .env — e-mails não serão enviados.");
    return null;
  }

  // Outlook/Hotmail
  if (provider === "outlook" || user.includes("hotmail") || user.includes("outlook") || user.includes("live")) {
    return nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: { user, pass },
      tls: { ciphers: "SSLv3" },
    });
  }

  // Gmail (requer senha de app)
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendWelcomeEmail(params: {
  to: string;
  name: string;
  matricula: string;
  password: string;
  companyName: string;
}) {
  const { to, name, matricula, password, companyName } = params;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f7fe; margin: 0; padding: 0; }
        .container { max-width: 520px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(107,33,168,0.08); }
        .header { background: linear-gradient(135deg, #6B21A8, #9333ea); padding: 36px 32px 28px; text-align: center; }
        .header h1 { color: #fff; font-size: 28px; margin: 0 0 6px; letter-spacing: -0.5px; }
        .header p { color: rgba(255,255,255,0.8); font-size: 14px; margin: 0; }
        .body { padding: 32px; }
        .greeting { font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 8px; }
        .text { color: #6b7280; font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
        .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; }
        .card-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
        .card-row:last-child { border-bottom: none; }
        .label { color: #9ca3af; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { color: #111827; font-size: 15px; font-weight: 700; font-family: monospace; }
        .badge { background: #6B21A8; color: white; padding: 4px 12px; border-radius: 20px; font-size: 18px; font-weight: 800; letter-spacing: 2px; }
        .footer { background: #f9fafb; border-top: 1px solid #f3f4f6; padding: 20px 32px; text-align: center; color: #9ca3af; font-size: 12px; }
        .warning { background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #92400e; margin-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>$TOX</h1>
          <p>Sistema de Gestão de Estoque</p>
        </div>
        <div class="body">
          <p class="greeting">Olá, ${name}! 👋</p>
          <p class="text">
            Sua conta foi criada com sucesso na empresa <strong>${companyName}</strong>. 
            Use as credenciais abaixo para acessar o sistema:
          </p>
          <div class="card">
            <div class="card-row">
              <span class="label">Matrícula (Login)</span>
              <span class="badge">${matricula}</span>
            </div>
            <div class="card-row">
              <span class="label">Senha temporária</span>
              <span class="value">${password}</span>
            </div>
          </div>
          <div class="warning">
            🔒 <strong>Por segurança</strong>, recomendamos alterar sua senha após o primeiro acesso.
          </div>
        </div>
        <div class="footer">
          Este e-mail foi enviado automaticamente pelo sistema Stox.<br/>
          © ${new Date().getFullYear()} Stox — Todos os direitos reservados.
        </div>
      </div>
    </body>
    </html>
  `;

  const transporter = createTransporter();
  if (!transporter) {
    console.warn(`⚠️  [EMAIL] E-mail NÃO enviado para ${to} — configure EMAIL_USER e EMAIL_PASS no .env`);
    return;
  }

  await transporter.sendMail({
    from: `"Stox Sistema" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🎉 Bem-vindo ao Stox, ${name}! Sua matrícula chegou`,
    html,
  });
  console.log(`✅ [EMAIL] E-mail de boas-vindas enviado para ${to} (matrícula: ${matricula})`);
}
