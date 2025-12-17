import { ChatProvider } from "./contexts/ChatContext";
import { MusicProvider } from "./contexts/MusicContext";
import { useMediaQuery } from "./hooks/useMediaQuery";
import NameCard from "./components/NameCard";
import ChatContainer from "./components/ChatContainer";
import CRTOverlay from "./components/UI/CRTOverlay";

function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <ChatProvider>
      <MusicProvider>
        <div className="flex flex-col md:flex-row h-screen bg-terminal-bg text-terminal-text overflow-hidden">
          {/* CRT Effect Overlay */}
          <CRTOverlay />

          {/* Desktop: Name Card Sidebar (hidden on mobile) */}
          {!isMobile && (
            <div className="w-full md:w-[390px] md:flex-shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto">
              <NameCard />
            </div>
          )}

          {/* Chat Container */}
          <div className="flex-1 w-full">
            <ChatContainer />
          </div>
        </div>
      </MusicProvider>
    </ChatProvider>
  );
}

export default App;
