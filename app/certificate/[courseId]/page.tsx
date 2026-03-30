'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import CertificateButton from '@/components/CertificateButton';
import { auth } from '@/lib/firebase';
import { getCourse } from '@/lib/firestore';

export default function CertificatePage({ params }: { params: Promise<{ courseId: string }> }) {
  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('Course');
  const [uid, setUid] = useState<string | null>(null);
  const [name, setName] = useState('Student');

  useEffect(() => {
    params.then(async ({ courseId }) => {
      setCourseId(courseId);
      const course = await getCourse(courseId);
      setCourseTitle(course?.title ?? 'Course');
    });
  }, [params]);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUid(user?.uid ?? null);
      setName(user?.displayName || user?.email || 'Student');
    });
  }, []);

  return (
    <div className="card" style={{ maxWidth: 760, margin: '0 auto' }}>
      <div className="badge">Certificate ready</div>
      <h1>{courseTitle}</h1>
      <p>This page is shown after a successful quiz result. You can brand the PDF with your logo and signature.</p>
      {uid ? (
        <CertificateButton studentName={name} courseTitle={courseTitle} uid={uid} courseId={courseId} />
      ) : (
        <p>Please log in to download your certificate.</p>
      )}
    </div>
  );
}
