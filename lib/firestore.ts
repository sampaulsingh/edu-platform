import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Course = {
  id: string;
  title: string;
  description: string;
  lessons: {
    id: string;
    title: string;
    durationMinutes: number;
    videoUrl: string;
  }[];
  quiz: {
    passMark: number;
    questions: {
      id: string;
      question: string;
      options: string[];
      correctIndex: number;
    }[];
  };
};

export async function getCourses(): Promise<Course[]> {
  const snapshot = await getDocs(collection(db, 'courses'));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Course));
}

export async function getCourse(courseId: string): Promise<Course | null> {
  const snapshot = await getDoc(doc(db, 'courses', courseId));
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as Course) : null;
}

export async function upsertUserProfile(uid: string, data: { email: string | null; name: string | null }) {
  await setDoc(
    doc(db, 'users', uid),
    {
      email: data.email,
      name: data.name,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function markLessonComplete(uid: string, courseId: string, lessonId: string) {
  const ref = doc(db, 'progress', `${uid}_${courseId}`);
  const existing = await getDoc(ref);
  const completedLessons = existing.exists() ? existing.data().completedLessons ?? [] : [];

  if (!completedLessons.includes(lessonId)) {
    await setDoc(
      ref,
      {
        uid,
        courseId,
        completedLessons: [...completedLessons, lessonId],
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }
}

export async function saveQuizResult(uid: string, courseId: string, score: number, passed: boolean) {
  await setDoc(
    doc(db, 'quizResults', `${uid}_${courseId}`),
    {
      uid,
      courseId,
      score,
      passed,
      completedAt: serverTimestamp(),
    },
    { merge: true }
  );

  if (passed) {
    await setDoc(
      doc(db, 'certificates', `${uid}_${courseId}`),
      {
        uid,
        courseId,
        issuedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }
}

export async function getUserProgress(uid: string, courseId: string) {
  const snapshot = await getDoc(doc(db, 'progress', `${uid}_${courseId}`));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function getQuizResult(uid: string, courseId: string) {
  const snapshot = await getDoc(doc(db, 'quizResults', `${uid}_${courseId}`));
  return snapshot.exists() ? snapshot.data() : null;
}

export async function setCertificateDownload(uid: string, courseId: string) {
  await updateDoc(doc(db, 'certificates', `${uid}_${courseId}`), {
    downloadedAt: serverTimestamp(),
  });
}
