import { useEffect, useState } from "react";

/**
 * Generate random character stream for data flow effect
 */
function generateRandomText(length = 80) {
  // Add your custom messages here - just append to this string
  const chars = `"▒▓█⟦FATAL⟧▣ 0xDEAD_BEEF :: segv⚠︎ / kernel.panic() / Δt=-0.0003s⟪ログ⟫ 予期しない例外が発生しました → 例外:Σ(Null)≠Ø / 访问被拒绝 / 권한 없음 / acceso denegado / accès refusé╔═╡ERR_STREAM::CORRUPT╞═╗→ ⌁ stacktrace: 𝘮𝘢𝘪𝘯() → init⚙︎ → parse(«用户») → decode(π) → 💥→ msg: «メモリが足りません» / “out of memory” / 內存溢出 / حافظه کافی نیست / 메모리 부족→ hint: [RETRY] [ABORT] [????????]╚══════════════════════╝⟦ΔWARN⟧ checksum mismatch: 7f:3a:ø:ß:𝟡:✖︎:??⟦I/O⟧ /dev/tty░░░ : 連接中… 连接失败… 연결 김… conexión perdida… اتصال قطع شد…NET⟧ DNS: NXDOMAIN / 𝚝𝚒𝚖𝚎𝚘𝚞𝚝 / 再试一次 / 다시 시도 / حاول مرة أخرى⚙︎ 𝐑𝐄𝐆𝐈𝐒𝐓𝐄𝐑 𝐃𝐔𝐌𝐏R0=𝟘x0000_0000R1=𝟘xFFFF_FFFF R2=𝟘x1NVA_L1DPC=⟂⟂⟂⟂ SP=∞FLAGS=Z⇧ C⇩ O? μcode=⟦§¶¤※⟪错误⟫ 签名无效 ⟪エラー⟫ 署名が無効です ⟪오류⟫ 서명 무효⟪ERREUR⟫ signature invalide ⟪ERROR⟫ invalid signature▓▒░ GLITCH_PAYLOAD ░▒{ "ok": false, "code": "E/∎/ꙮ/∞", "理由": "不可解", "原因": "??", "시각": "NaN", "وقت": "٠٠:٠٠:٠٠", "Zeit": "00:00:00", "time": "-1" }⟦Σ⟧ ⟦λ⟧ ⟦Ω⟧ ⟦Ж⟧ ⟦☠⟧ ⟦꧁꧂⟧ ⟦〄⟧ ⟦₪⟧ ⟦✧⟧ ⟦⟁⟧ ⟦␀⟧ ⟦␡⟧⟪PANIC⟫ ініціалізація зірвана / 초기화 실패 / 初始化失败 / initialisation échouée / inicialización fallida⟪RECOVER?⟫ y/n/？？/はい/네/да/نعم/sí → ░░░░░░░░░░░░░░░░░░░░█▌▌█▌█▌█▌▌█▌█▌█▌▌█▌█ ⟦NO CARRIER⟧ ⚠︎ ⟦SIGNAL LOST⟧ ✖︎ ⟦DATA ROT⟧… … … … …⟪END⟫ ▣▣▣ ⟦EJECT⟧ ⟦REBOOT⟧ ⟦???⟦⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟲⟧"`;
  return Array(length)
    .fill(0)
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
}

/**
 * Data Flow Overlay - Matrix-style streaming text effect
 */
export default function DataFlowOverlay() {
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    // Generate multiple streams per line for overlap effect
    const rows = 50; // Vertical positions
    const streamsPerRow = 3; // Multiple streams on same line
    const streamData = [];

    // Simple 3 style setups
    const styles = [
      { text: "#33ff33", bg: "transparent", glow: "#33ff3355" }, // Green text, no background
      { text: "#ffffff", bg: "#e30000", glow: "#ff000033" }, // White text, dark red background
      { text: "#ffffff", bg: "#000000", glow: "#00ff0033" }, // White text, dark green background
    ];

    for (let row = 0; row < rows; row++) {
      for (let stream = 0; stream < streamsPerRow; stream++) {
        const style = styles[Math.floor(Math.random() * styles.length)];

        streamData.push({
          id: `${row}-${stream}`,
          text: generateRandomText(100),
          delay: row * 0.02 + stream * 0.3,
          duration: 1.2 + Math.random() * 0.6, // Random speed 1.2-1.8s
          top: (row * 100) / rows,
          color: style.text,
          background: style.bg,
          glow: style.glow,
        });
      }
    }

    setStreams(streamData);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="data-stream absolute whitespace-nowrap font-mono text-xs leading-none"
          style={{
            top: `${stream.top}%`,
            animationDelay: `${stream.delay}s`,
            animationDuration: `${stream.duration}s`,
            color: stream.color,
            backgroundColor: stream.background,
            textShadow: `0 0 8px ${stream.glow}`,
            padding: stream.background !== "transparent" ? "2px 4px" : "0",
          }}
        >
          {stream.text}
        </div>
      ))}
    </div>
  );
}
