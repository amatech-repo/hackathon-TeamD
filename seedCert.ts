import { pki } from "node-forge";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// 保存先のディレクトリ
const outputDir = join(__dirname, "certificates");

// ディレクトリが存在しない場合は作成
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// 鍵ペアを生成
const keys = pki.rsa.generateKeyPair(2048);

// 自己署名証明書を生成
const cert = pki.createCertificate();
cert.publicKey = keys.publicKey;
cert.serialNumber = "01";
cert.validity.notBefore = new Date();
cert.validity.notAfter = new Date();
cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1); // 1年間有効

const attrs = [
  { name: "commonName", value: "localhost" },
  { name: "countryName", value: "JP" },
  { shortName: "ST", value: "Tokyo" },
  { name: "localityName", value: "Tokyo" },
  { name: "organizationName", value: "Example" },
];
cert.setSubject(attrs);
cert.setIssuer(attrs);

// 証明書に署名
cert.sign(keys.privateKey);

// PEM形式でエクスポート
const privateKeyPem = pki.privateKeyToPem(keys.privateKey);
const certPem = pki.certificateToPem(cert);

// ファイルに保存
writeFileSync(join(outputDir, "privatekey.pem"), privateKeyPem);
writeFileSync(join(outputDir, "cert.pem"), certPem);

console.log("自己署名証明書を生成しました。");
