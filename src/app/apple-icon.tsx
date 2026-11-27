import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(145deg, #E07A1A 0%, #9A3F08 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 118,
            fontWeight: 800,
            fontFamily: "Arial, sans-serif",
            lineHeight: 1,
            letterSpacing: -4,
            marginTop: 8,
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size }
  );
}
