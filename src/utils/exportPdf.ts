import jsPDF from 'jspdf';
import type { UserProfile } from '../types';
import { STRENGTHS_MAP } from '../data/strengths';

export const generatePDF = (profile: UserProfile) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  const setFont = (size: number, weight: 'normal' | 'bold' = 'normal') => {
    doc.setFont('helvetica', weight);
    doc.setFontSize(size);
  };

  const addText = (text: string, x = 20, size = 12, weight: 'normal' | 'bold' = 'normal') => {
    setFont(size, weight);
    doc.text(text, x, yPosition);
    yPosition += size * 0.6;
  };

  const checkPageBreak = (lines: number) => {
    if (yPosition + lines * 7 > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
    }
  };

  // Header
  setFont(24, 'bold');
  doc.setTextColor(46, 82, 102); // Dark blue
  doc.text('ForceVie', 20, yPosition);
  yPosition += 12;

  doc.setTextColor(80, 80, 80);
  setFont(11);
  doc.text('Votre Portrait de Forces de Caractère', 20, yPosition);
  yPosition += 15;

  // Profile info
  setFont(11, 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text(`Nom: ${profile.firstName}`, 20, yPosition);
  yPosition += 8;

  doc.text(`Email: ${profile.email}`, 20, yPosition);
  yPosition += 8;

  doc.text(
    `Date: ${new Date(profile.createdAt).toLocaleDateString('fr-FR')}`,
    20,
    yPosition
  );
  yPosition += 15;

  // Top strengths section
  setFont(14, 'bold');
  doc.setTextColor(46, 82, 102);
  doc.text('Vos 5 Forces Principales', 20, yPosition);
  yPosition += 12;

  doc.setTextColor(0, 0, 0);
  profile.scores.slice(0, 5).forEach((score, index) => {
    checkPageBreak(6);

    const strength = STRENGTHS_MAP.get(score.strength.id);
    if (!strength) return;

    // Rank and name
    setFont(11, 'bold');
    doc.setTextColor(46, 82, 102);
    doc.text(`${index + 1}. ${strength.name}`, 20, yPosition);
    yPosition += 7;

    // Score and percentile
    doc.setTextColor(100, 100, 100);
    setFont(10);
    doc.text(
      `Score: ${score.score.toFixed(2)} | Percentile: ${score.percentile}ème`,
      20,
      yPosition
    );
    yPosition += 7;

    // Virtue
    doc.setTextColor(80, 80, 80);
    doc.text(`Vertu: ${strength.virtue}`, 20, yPosition);
    yPosition += 10;
  });

  // All strengths section
  yPosition += 5;
  setFont(14, 'bold');
  doc.setTextColor(46, 82, 102);
  doc.text('Toutes Vos Forces', 20, yPosition);
  yPosition += 12;

  // Create a table-like view of all scores
  doc.setTextColor(0, 0, 0);
  setFont(10);

  const scoresByVirtue: { [key: string]: typeof profile.scores } = {};
  profile.scores.forEach((score) => {
    const strength = STRENGTHS_MAP.get(score.strength.id);
    if (strength) {
      if (!scoresByVirtue[strength.virtue]) {
        scoresByVirtue[strength.virtue] = [];
      }
      scoresByVirtue[strength.virtue].push(score);
    }
  });

  Object.entries(scoresByVirtue).forEach(([virtue, scores]) => {
    checkPageBreak(4);

    setFont(11, 'bold');
    doc.setTextColor(46, 82, 102);
    doc.text(`${virtue}`, 20, yPosition);
    yPosition += 8;

    doc.setTextColor(0, 0, 0);
    setFont(9);

    scores.forEach((score) => {
      const strength = STRENGTHS_MAP.get(score.strength.id);
      if (strength) {
        const line = `• ${strength.name} - ${score.score.toFixed(2)} (${score.percentile}e percentile)`;
        doc.text(line, 25, yPosition);
        yPosition += 6;
      }
    });

    yPosition += 3;
  });

  // Footer
  yPosition = pageHeight - 20;
  setFont(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 20, yPosition);
  doc.text('ForceVie - Découvrez Vos Forces de Caractère', pageWidth - 80, yPosition);

  // Generate filename
  const filename = `ForceVie_${profile.firstName}_${new Date().toISOString().split('T')[0]}.pdf`;

  // Download
  doc.save(filename);
};

export const downloadAsJSON = (profile: UserProfile) => {
  const dataStr = JSON.stringify(profile, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ForceVie_${profile.firstName}_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
