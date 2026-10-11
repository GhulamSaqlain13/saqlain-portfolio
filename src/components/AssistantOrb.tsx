// A lightweight CSS sculpture: no canvas, video, model downloads or animation loop.
export default function AssistantOrb({ active = false }: { active?: boolean }) {
  return (
    <span className={`assistant-orb${active ? " assistant-orb--active" : ""}`} aria-hidden="true">
      <span className="assistant-orb__glass">
        <span className="assistant-orb__wave">
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
      </span>
    </span>
  );
}
