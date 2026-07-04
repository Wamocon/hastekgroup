import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif" }}>
        <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 600 }}>404</h1>
          <Link href="/tr" style={{ color: "#b9975b" }}>
            HAS Teknoloji
          </Link>
        </div>
      </body>
    </html>
  );
}
