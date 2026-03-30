import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="grid" style={{ gap: 28 }}>
      <section className="hero">
        <div className="kicker">Production-ready education platform</div>
        <h1 style={{ fontSize: '3rem', margin: '0 0 12px' }}>Teach, track, test, and certify.</h1>
        <p style={{ maxWidth: 720, lineHeight: 1.7, color: 'rgba(255,255,255,.88)' }}>
          A professional starter for your educational website with sign-in, student dashboard,
          progress tracking, quizzes, certificates, and your YouTube channel built into the
          content flow.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
          <Link href="/courses" className="secondary">
            Explore Courses
          </Link>
          <Link href="/login" className="primary">
            Student Login
          </Link>
        </div>
      </section>

      <section className="grid grid-3">
        <div className="card">
          <div className="badge">Login</div>
          <h3>Email and Google sign-in</h3>
          <p>Use Firebase Authentication for secure student onboarding and access control.</p>
        </div>
        <div className="card">
          <div className="badge">Dashboard</div>
          <h3>Track learning progress</h3>
          <p>Store completed lessons, quiz scores, and certificate eligibility per student.</p>
        </div>
        <div className="card">
          <div className="badge">Certificates</div>
          <h3>Issue downloadable certificates</h3>
          <p>Generate branded PDF certificates after a passing quiz result.</p>
        </div>
      </section>

      <section className="card">
        <h2>Featured teaching video</h2>
        <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 18, overflow: 'hidden' }}>
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Featured lesson"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
      </section>
    </div>
  );
}
