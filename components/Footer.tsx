export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div>© 2026 EduPro. All rights reserved.</div>
      <div>Built for courses, quizzes, and certificates.</div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    marginTop: '60px',
    padding: '32px 24px',
    borderTop: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    flexWrap: 'wrap',
    color: '#4b5563',
  },
};
