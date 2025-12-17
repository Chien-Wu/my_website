/**
 * Back Side of Name Card
 * Shows portrait and links
 */
export default function BackSide({ shouldFade }) {
  return (
    <div className={`p-8 ${shouldFade ? "content-fade-in" : ""}`}>
      {/* ASCII Art Portrait */}
      <pre className="text-[0.6rem] text-terminal-text text-glow mb-4 text-center font-mono leading-tight">
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

      <div className="text-center mb-8 mx-8">
        <h2 className="text-xl font-bold font-terminal text-glow mb-2">
          CONNECT
        </h2>
        <div className="text-xs text-terminal-dim">
          Hi! this is Chien, site creator... you found the back of my name card!
          i thought no one's gonna found it...
        </div>
      </div>

      <div className="border-t-2 border-terminal-border my-6"></div>

      {/* Links */}
      <div className="space-y-4 text-sm">
        <a
          href="https://github.com/Chien-Wu"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-glow transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-terminal-dim">$</span> GitHub →
        </a>
        <a
          href="mailto:chien572.website@gmail.com"
          className="block hover:text-glow transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-terminal-dim">$</span> Email →
        </a>
        <a
          href="https://www.linkedin.com/in/chien-wu-711829356/"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-glow transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-terminal-dim">$</span> LinkedIn →
        </a>
        <a
          href="https://instagram.com/572_chien"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-glow transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-terminal-dim">$</span> Instagram →
        </a>
      </div>

      <div className="border-t-2 border-terminal-border my-6"></div>

      <div className="text-xs text-terminal-dim text-center">
        Click anywhere to return
      </div>
    </div>
  );
}
