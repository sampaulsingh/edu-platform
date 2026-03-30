'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { logout } from '@/lib/auth';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <header style={styles.header}>
      <div style={styles.brand}>EduPro</div>
      <nav style={styles.nav}>
        <Link href="/">Home</Link>
        <Link href="/courses">Courses</Link>
        {user ? <Link href="/dashboard">Dashboard</Link> : <Link href="/login">Login</Link>}
        <a href="https://youtube.com/@yourchannel" target="_blank" rel="noreferrer">
          YouTube
        </a>
        {user && (
          <button onClick={() => logout()} style={styles.button}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 28px',
    borderBottom: '1px solid #e5e7eb',
    background: '#ffffff',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  brand: {
    fontSize: '1.25rem',
    fontWeight: 800,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  button: {
    border: '1px solid #111827',
    background: '#111827',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '10px',
    cursor: 'pointer',
  },
};
