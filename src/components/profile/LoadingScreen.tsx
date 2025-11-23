export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex content-stretch items-center justify-center gap-[10px] bg-[rgba(0,0,0,0.5)]">
      <div className="gap-g4 relative flex w-[69px] shrink-0 flex-col content-stretch items-center justify-center">
        <div className="relative h-[64px] w-full shrink-0 overflow-clip shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)]">
          <style jsx>{`
            @keyframes rotate {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .loading-spinner {
              animation: rotate 1s linear infinite;
            }
          `}</style>
          <div className="loading-spinner absolute inset-0">
            <div className="absolute top-0 right-1/2 bottom-1/2 left-0 bg-white opacity-20" />
            <div className="absolute top-0 right-0 bottom-1/2 left-1/2 bg-white opacity-20" />
            <div className="absolute top-1/2 right-0 bottom-0 left-1/2 bg-white opacity-20" />
            <div className="absolute top-1/2 right-1/2 bottom-0 left-0 bg-white opacity-20" />
            <div className="absolute top-0 right-1/2 bottom-1/2 left-0 bg-white" />
          </div>
        </div>
        <div className="text-l1 relative flex w-full shrink-0 flex-col justify-center text-center leading-[0] font-medium text-white [text-shadow:rgba(0,0,0,0.1)_0px_4px_10px]">
          <p className="leading-[20px]">Loading...</p>
        </div>
      </div>
    </div>
  );
}
