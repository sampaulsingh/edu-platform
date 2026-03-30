import CourseCard from '@/components/CourseCard';
import { getCourses } from '@/lib/firestore';

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="grid" style={{ gap: 24 }}>
      <section>
        <h1>Courses</h1>
        <p>Publish one or many courses, each with lessons, progress tracking, and a final quiz.</p>
      </section>
      <section className="grid grid-3">
        {courses.length ? (
          courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
            />
          ))
        ) : (
          <div className="card">
            <h3>No courses yet</h3>
            <p>Add sample documents to the <code>courses</code> collection in Firestore.</p>
          </div>
        )}
      </section>
    </div>
  );
}
