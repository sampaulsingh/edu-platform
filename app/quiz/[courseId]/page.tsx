'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getCourse, saveQuizResult, type Course } from '@/lib/firestore';

export default function QuizPage({ params }: { params: Promise<{ courseId: string }> }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [courseId, setCourseId] = useState('');
  const [uid, setUid] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null);

  useEffect(() => {
    params.then(({ courseId }) => setCourseId(courseId));
  }, [params]);

  useEffect(() => {
    if (!courseId) return;
    getCourse(courseId).then(setCourse);
    return onAuthStateChanged(auth, (user) => setUid(user?.uid ?? null));
  }, [courseId]);

  const maxScore = useMemo(() => course?.quiz.questions.length ?? 0, [course]);

  if (!course) return <div className="card">Loading quiz...</div>;

  const submitQuiz = async () => {
    const score = course.quiz.questions.reduce((acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0), 0);
    const passed = score >= course.quiz.passMark;
    setResult({ score, passed });
    if (uid) {
      await saveQuizResult(uid, course.id, score, passed);
    }
  };

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card">
        <h1>{course.title} Quiz</h1>
        <p>Pass mark: {course.quiz.passMark}/{maxScore}</p>
      </section>

      {course.quiz.questions.map((q, index) => (
        <section className="card" key={q.id}>
          <h3>{index + 1}. {q.question}</h3>
          <div className="grid">
            {q.options.map((option, i) => (
              <label key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === i}
                  onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </section>
      ))}

      <button className="primary" onClick={submitQuiz}>Submit Quiz</button>

      {result && (
        <section className="card">
          <h2>{result.passed ? 'You passed' : 'Please try again'}</h2>
          <p>Your score: {result.score}/{maxScore}</p>
          {result.passed && <Link href={`/certificate/${course.id}`} className="primary">Open Certificate</Link>}
        </section>
      )}
    </div>
  );
}
