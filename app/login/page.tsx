'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmail, loginWithGoogle, registerWithEmail } from '@/lib/auth';
import { upsertUserProfile } from '@/lib/firestore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const cred =
        mode === 'login'
          ? await loginWithEmail(email, password)
          : await registerWithEmail(email, password);

      await upsertUserProfile(cred.user.uid, {
        email: cred.user.email,
        name: cred.user.displayName,
      });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  const google = async () => {
    setError('');
    try {
      const cred = await loginWithGoogle();
      await upsertUserProfile(cred.user.uid, {
        email: cred.user.email,
        name: cred.user.displayName,
      });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 520, margin: '40px auto' }}>
      <h1>{mode === 'login' ? 'Student login' : 'Create account'}</h1>
      <p>Access your courses, quiz results, and certificates.</p>
      <form onSubmit={submit} className="grid">
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="primary" type="submit">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
        <button className="secondary" type="button" onClick={google}>
          Continue with Google
        </button>
      </form>
      {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
      <button
        className="secondary"
        type="button"
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        style={{ marginTop: 12 }}
      >
        {mode === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
}
