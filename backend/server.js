require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();
const PORT = 4000;

app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

const PDF_MAP = {
  thesis: "thesis.pdf",
  grad: "graduation.pdf",
  army: "military.pdf",
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "SYSTEM_LOCKED",
    details:
      "보안 경고: 너무 많은 시도가 감지되었습니다. 15분 후 다시 시도하세요.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post("/api/verify-password", limiter, async (req, res) => {
  const { password } = req.body;
  const serverPasswordHash = process.env.SERVER_PASSWORD;

  const time = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  console.log(`\n[${time}] 관리자 인증 요청 - IP: ${req.ip}`);

  if (!serverPasswordHash) {
    console.error("오류: .env 파일에 SERVER_PASSWORD가 없습니다.");
    return res
      .status(500)
      .json({ success: false, message: "Server Config Error" });
  }

  try {
    const isMatch = await bcrypt.compare(password, serverPasswordHash);

    if (isMatch) {
      console.log("인증 성공");
      return res.json({ success: true });
    } else {
      console.log("인증 실패 (비밀번호 불일치)");
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("비교 중 에러 발생:", error);
    return res.status(500).json({ success: false });
  }
});

app.post("/api/view-pdf", limiter, async (req, res) => {
  const { password, docId } = req.body;
  const pdfPasswordHash = process.env.PDF_ACCESS_PASSWORD;

  if (!pdfPasswordHash) return res.status(500).json({ success: false });
  const isMatch = await bcrypt.compare(password, pdfPasswordHash);

  if (isMatch) {
    const filename = PDF_MAP[docId];

    if (!filename) {
      console.error(`요청된 문서 ID(${docId})에 해당하는 파일이 없습니다.`);
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    const PDF_FOLDER = "/var/www/secure-uploads";

    const filePath = path.join(PDF_FOLDER, filename);

    console.log(`✅ PDF 요청: ID=${docId} -> File=${filename}`);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("전송 실패:", err);
        if (!res.headersSent) res.status(404).send("File not found");
      }
    });
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect Password" });
  }
});

// 127.0.0.1(루프백)에만 바인딩 → nginx가 같은 서버에서 프록시하므로 외부 노출 불필요(심층 방어)
app.listen(PORT, "127.0.0.1", () => {
  console.log(`보안 백엔드 서버 가동 (Port: ${PORT})`);
  console.log(`적용된 보안: Rate Limit, Bcrypt Hash, Hidden File`);
});
