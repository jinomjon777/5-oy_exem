const nodemailer = require("nodemailer")
const CustomErrorhandler = require("../error/custom-error.handler")

async function sendMessage(code, email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ijumanazarov631@gmail.com",
        pass: process.env.GOOGLE_PASS
      }
    })

    await transporter.sendMail({
      subject: "Lesson",
      from: "ijumanazarov631@gmail.com",
      to: email,
      html: `
<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kitob Platformasi</title>
</head>
<body style="margin:0;padding:0;background-color:#0f172a;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:linear-gradient(180deg,#020617,#0b1220);border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.10);">
          
          <tr>
            <td style="padding:22px 24px;text-align:left;">
              <div style="font-size:13px;color:#94a3b8;">
                <span style="display:inline-block;padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);">
                  📚 Kitoblar Olami
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:0 24px 8px 24px;">
              <div style="font-size:22px;font-weight:700;color:#ffffff;line-height:30px;">
                Hisobingiz ochilishiga bir qadam qoldi
              </div>
              <div style="margin-top:10px;font-size:14px;color:#cbd5e1;line-height:22px;">
                Quyidagi tasdiqlash kodini kiriting va kutubxonangizni oching.
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1220;border-radius:16px;border:1px solid rgba(255,255,255,.12);">
                <tr>
                  <td style="padding:18px;text-align:center;">
                    <div style="font-size:12px;letter-spacing:.10em;text-transform:uppercase;color:#94a3b8;">
                      Tasdiqlash kodi
                    </div>

                    <div style="margin-top:12px;display:inline-block;background:#ffffff;color:#111827;border-radius:14px;padding:12px 16px;font-size:28px;font-weight:800;letter-spacing:.30em;">
                      ${code}
                    </div>

                    <div style="margin-top:12px;font-size:12px;line-height:18px;color:#94a3b8;">
                      Kod 2 daqiqa ichida amal qiladi.
                      <br/>
                      Agar bu siz bo'lmasangiz, xabarni e’tiborsiz qoldiring.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 24px 22px 24px;">
              <div style="font-size:12px;line-height:18px;color:#94a3b8;">
                Hurmat bilan, Kitoblar Olami jamoasi
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
    })
  } catch (error) {
    throw CustomErrorhandler.InternalServerError(error.message)
  }
}

module.exports = sendMessage