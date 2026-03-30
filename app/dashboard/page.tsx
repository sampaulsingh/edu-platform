'use client';

import Link from 'next/link';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  if (!user) {
    return (
      <div className="card">
        <h1>Dashboard</h1>
        <p>Please log in to view your courses and progress.</p>
        <Link href="/login" className="primary">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <div className="badge">Student</div>
        <h1>Welcome, {user.displayName || user.email}</h1>
        <p>Use this dashboard to continue learning, review your scores, and download certificates.</p>
      </section>

      <section className="grid grid-3">
        <div className="card">
          <h3>My courses</h3>
          <p>Continue where you left off.</p>
          <Link href="/courses" className="primary">Open courses</Link>
        </div>
        <div className="card">
          <h3>My certificates</h3>
          <p>Certificates become available after passing each course quiz.</p>
        </div>
        <div className="card">
          <h3>My progress</h3>
          <p>Track lessons completed and quiz performance.</p>
        </div>
      </section>
    </div>
  );
}
