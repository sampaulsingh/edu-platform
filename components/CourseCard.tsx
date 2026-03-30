import Link from 'next/link';

type Props = {
  id: string;
  title: string;
  description: string;
};

export default function CourseCard({ id, title, description }: Props) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
      <Link href={`/courses/${id}`} style={styles.link}>
        View Course
      </Link>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    padding: '20px',
    background: '#fff',
    boxShadow: '0 8px 30px rgba(17,24,39,0.06)',
  },
  title: {
    marginTop: 0,
    marginBottom: '8px',
  },
  description: {
    color: '#4b5563',
    minHeight: '48px',
  },
  link: {
    display: 'inline-block',
    marginTop: '12px',
    padding: '10px 14px',
    borderRadius: '12px',
    background: '#111827',
    color: '#fff',
    textDecoration: 'none',
  },
};
