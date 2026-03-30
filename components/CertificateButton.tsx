'use client';

import { jsPDF } from 'jspdf';
import { setCertificateDownload } from '@/lib/firestore';

type Props = {
  studentName: string;
  courseTitle: string;
  uid: string;
  courseId: string;
};

export default function CertificateButton({ studentName, courseTitle, uid, courseId }: Props) {
  const downloadCertificate = async () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(28);
    doc.text('Certificate of Completion', 148, 40, { align: 'center' });
    doc.setFontSize(16);
    doc.text('This certifies that', 148, 70, { align: 'center' });
    doc.setFontSize(24);
    doc.text(studentName || 'Student', 148, 90, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`has successfully completed ${courseTitle}`, 148, 110, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 148, 130, { align: 'center' });
    doc.save(`${courseId}-certificate.pdf`);
    await setCertificateDownload(uid, courseId);
  };

  return (
    <button onClick={downloadCertificate} style={styles.button}>
      Download Certificate
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  button: {
    border: 'none',
    background: '#059669',
    color: '#fff',
    padding: '12px 18px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 700,
  },
};
