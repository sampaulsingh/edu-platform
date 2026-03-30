type Props = {
  percent: number;
};

export default function ProgressBar({ percent }: Props) {
  return (
    <div style={styles.track} aria-label="progress bar">
      <div style={{ ...styles.fill, width: `${percent}%` }} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  track: {
    width: '100%',
    height: '12px',
    borderRadius: '999px',
    background: '#e5e7eb',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
  },
};
