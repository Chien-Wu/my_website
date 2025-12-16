/**
 * Back Side of Name Card
 * Shows portrait and links
 */
export default function BackSide({ shouldFade }) {
  return (
    <div className={`p-8 ${shouldFade ? "content-fade-in" : ""}`}>
      {/* ASCII Art Portrait */}
      <pre className="text-xs text-terminal-text text-glow mb-4 text-center font-mono leading-tight">
        {`
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMWXOoc:codolldONMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMKl'            ,dXMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMWO,                ;KMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMX:                  cNMMMMMMMMMMMMMM
MMMMMMMMMMMMMMN:                  ,0MMMMMMMMMMMMMM
MMMMMMMMMMMMMMMx.     ......      cNMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMO;..;c:,,.........;KMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMWOlc:okxoc'.'cc,..'xWMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMNkdodkOkdlldOkl:::kMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMWKkoxkOkxxxxdc::oKMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMWOodxkxddol:;;:OWMMMMMMMMMMMMMMMM
MMMMMMMMMMWNKOxdoc:looooool:,,.,d0XWMMMMMMMMMMMMMM
MMMMMMWXOdl;,.....:odolcc::;;'. ..';lx0NMMMMMMMMMM
MMMMMNx;'.........,lddo:,',,,..........;o0WMMMMMMM
MMMW0c'.........''.';ccccc:;'............,dNMMMMMM
MMWk;........'...'.....'''.................lKMMMMM
MNd,''.......'..............................cKMMMM
Wx'.'........................................lNMMM
0;.''....................'....................xWMM
;.............................................:KMM
''............................................'kMM`}
      </pre>

      <div className="text-center mb-8">
        <h2 className="text-xl font-bold font-terminal text-glow mb-2">
          CONNECT
        </h2>
        <div className="text-xs text-terminal-dim">
          Click anywhere to return
        </div>
      </div>

      <div className="border-t-2 border-terminal-border my-6"></div>

      {/* Links */}
      <div className="space-y-4 text-sm">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-glow transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-terminal-dim">$</span> GitHub →
        </a>
        <a
          href="mailto:your.email@example.com"
          className="block hover:text-glow transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-terminal-dim">$</span> Email →
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-glow transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-terminal-dim">$</span> LinkedIn →
        </a>
      </div>

      <div className="border-t-2 border-terminal-border my-6"></div>

      <div className="text-xs text-terminal-dim text-center">
        LINKS ACTIVE
      </div>
    </div>
  );
}
