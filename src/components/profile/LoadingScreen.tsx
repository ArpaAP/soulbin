export default function LoadingScreen() {
  return (
    <div className="bg-[rgba(0,0,0,0.5)] fixed inset-0 z-50 flex content-stretch gap-[10px] items-center justify-center">
      <div className="content-stretch flex flex-col gap-g4 items-center justify-center relative shrink-0 w-[69px]">
        <div className="h-[64px] overflow-clip relative shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] shrink-0 w-full">
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
            <div className="absolute bg-white bottom-1/2 left-0 opacity-20 right-1/2 top-0" />
            <div className="absolute bg-white bottom-1/2 left-1/2 opacity-20 right-0 top-0" />
            <div className="absolute bg-white bottom-0 left-1/2 opacity-20 right-0 top-1/2" />
            <div className="absolute bg-white bottom-0 left-0 opacity-20 right-1/2 top-1/2" />
            <div className="absolute bg-white bottom-1/2 left-0 right-1/2 top-0" />
          </div>
        </div>
        <div className="[text-shadow:rgba(0,0,0,0.1)_0px_4px_10px] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-l1 text-center text-white w-full">
          <p className="leading-[20px]">Loading...</p>
        </div>
      </div>
    </div>
  );
}
