'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import ProgressBar from '@/components/ProgressBar';
import { auth } from '@/lib/firebase';
import { getCourse, getUserProgress, markLessonComplete, type Course } from '@/lib/firestore';

export default function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [courseId, setCourseId] = useState('');

  useEffect(() => {
    params.then(({ courseId }) => setCourseId(courseId));
  }, [params]);

  useEffect(() => {
    if (!courseId) return;
    getCourse(courseId).then(setCourse);
    return onAuthStateChanged(auth, async (user) => {
      setUid(user?.uid ?? null);
      if (user) {
        const progress = await getUserProgress(user.uid, courseId);
        setCompleted(progress?.completedLessons ?? []);
      }
    });
  }, [courseId]);

  const percent = useMemo(() => {
    if (!course?.lessons?.length) return 0;
    return Math.round((completed.length / course.lessons.length) * 100);
  }, [completed, course]);

  if (!course) {
    return <div className="card">Loading course...</div>;
  }

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <ProgressBar percent={percent} />
        <p style={{ color: '#4b5563' }}>{percent}% complete</p>
      </section>

      <section className="grid">
        {course.lessons.map((lesson) => {
          const done = completed.includes(lesson.id);
          return (
            <div className="card" key={lesson.id}>
              <div className="badge">{lesson.durationMinutes} min</div>
              <h3>{lesson.title}</h3>
              <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 16, overflow: 'hidden' }}>
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                />
              </div>
              {uid && (
                <button
                  className={done ? 'secondary' : 'primary'}
                  style={{ marginTop: 16 }}
                  onClick={async () => {
                    await markLessonComplete(uid, course.id, lesson.id);
                    setCompleted((prev) => (prev.includes(lesson.id) ? prev : [...prev, lesson.id]));
                  }}
                >
                  {done ? 'Completed' : 'Mark complete'}
                </button>
              )}
            </div>
          );
        })}
      </section>

      <section className="card">
        <h2>Final quiz</h2>
        <p>Pass the quiz to unlock your certificate.</p>
        <Link href={`/quiz/${course.id}`} className="primary">
          Start Quiz
        </Link>
      </section>
    </div>
  );
}
