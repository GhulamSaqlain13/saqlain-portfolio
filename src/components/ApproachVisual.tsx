export default function ApproachVisual({ variant }: { variant: number }) {
  return (
    <div className="approach-visual" aria-hidden="true">
      {variant === 0 ? (
        <div className="approach-window">
          <div className="approach-window__bar">
            <span />
            <span />
            <span />
            <i />
          </div>
          <div className="approach-window__body">
            <div className="approach-sidebar">
              <b />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="approach-interface">
              <div className="approach-interface__heading">
                <span />
                <i />
              </div>
              <div className="approach-interface__tiles">
                <span />
                <span />
                <span />
              </div>
              <div className="approach-interface__rows">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      ) : variant === 1 ? (
        <div className="approach-flow">
          <svg viewBox="0 0 300 160" fill="none">
            <path
              d="M61 80H115M150 80H184Q198 80 198 65V40H243M198 80V120H243"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="198" cy="80" r="4" fill="currentColor" />
          </svg>
          <div className="approach-flow__node approach-flow__node--input">
            <span />
            Idea
          </div>
          <div className="approach-flow__node approach-flow__node--core">
            <span />
            Build
          </div>
          <div className="approach-flow__node approach-flow__node--top">
            <span />
            Launch
          </div>
          <div className="approach-flow__node approach-flow__node--bottom">
            <span />
            Refine
          </div>
        </div>
      ) : (
        <div className="approach-chart">
          <div className="approach-chart__heading">
            <span>Performance overview</span>
            <i />
          </div>
          <div className="approach-chart__plot">
            <div className="approach-chart__grid">
              <span />
              <span />
              <span />
            </div>
            <div className="approach-chart__bars">
              {[32, 47, 39, 62, 55, 74, 67, 91].map((height, index) => (
                <span key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
          <div className="approach-chart__legend">
            <span />
            Measure
            <span />
            Improve
          </div>
        </div>
      )}
    </div>
  );
}
