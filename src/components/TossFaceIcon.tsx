export default function TossFaceIcon({ emoji, size = 32 }: { emoji: string; size?: number }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size, fontSize: size * 0.876 }}
    >
      <span className="tossface">{emoji}</span>
    </div>
  );
}
