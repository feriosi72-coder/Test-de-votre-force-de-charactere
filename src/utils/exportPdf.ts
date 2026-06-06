import { jsPDF } from 'jspdf';
import type { UserProfile } from '../types';
import { STRENGTHS_MAP } from '../data/strengths';

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

export const generatePDF = (profile: UserProfile) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 25;

  const setFont = (size: number, weight: 'normal' | 'bold' | 'italic' = 'normal') => {
    doc.setFont('helvetica', weight);
    doc.setFontSize(size);
  };

  const checkPageBreak = (neededHeight: number) => {
    if (yPosition + neededHeight > pageHeight - margin) {
      doc.addPage();
      yPosition = 25;
      return true;
    }
    return false;
  };

  // --- Header ---
  const brandColor = { r: 46, g: 82, b: 102 }; // Navy
  doc.setTextColor(brandColor.r, brandColor.g, brandColor.b);
  setFont(26, 'bold');
  doc.text('ForceVie', margin, yPosition);
  
  setFont(10, 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text('VOTRE PORTRAIT DE FORCES DE CARACTÈRE', pageWidth - margin, yPosition, { align: 'right' });
  
  yPosition += 4;
  doc.setDrawColor(brandColor.r, brandColor.g, brandColor.b);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 15;

  // --- Intro & Profile ---
  setFont(11, 'normal');
  doc.setTextColor(60, 60, 60);
  const intro = `Bonjour ${profile.firstName}, ce rapport présente les résultats de votre évaluation des forces de caractère. Vos forces signatures sont les capacités qui vous sont les plus naturelles et qui vous procurent le plus d'énergie lorsqu'elles sont exprimées.`;
  const splitIntro = doc.splitTextToSize(intro, pageWidth - (margin * 2));
  doc.text(splitIntro, margin, yPosition);
  yPosition += (splitIntro.length * 6) + 10;

  doc.setDrawColor(230, 230, 230);
  doc.setFillColor(248, 248, 246);
  doc.roundedRect(margin, yPosition, pageWidth - (margin * 2), 22, 2, 2, 'FD');
  
  yPosition += 8;
  setFont(10, 'bold');
  doc.setTextColor(46, 82, 102);
  doc.text(`Candidat : ${profile.firstName}`, margin + 8, yPosition);
  doc.text(`Date : ${new Date(profile.createdAt).toLocaleDateString('fr-FR')}`, pageWidth - margin - 8, yPosition, { align: 'right' });
  
  yPosition += 6;
  setFont(10, 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(`Email : ${profile.email}`, margin + 8, yPosition);
  yPosition += 18;

  // --- Top 5 Strengths ---
  setFont(16, 'bold');
  doc.setTextColor(46, 82, 102);
  doc.text('Vos 5 Forces Signatures', margin, yPosition);
  yPosition += 12;

  profile.scores.slice(0, 5).forEach((score, index) => {
    const strength = STRENGTHS_MAP.get(score.strength.id);
    if (!strength) return;

    const { r, g, b } = hexToRgb(strength.color);
    
    // Estimate height needed for this strength block
    const descLines = doc.splitTextToSize(strength.description, pageWidth - (margin * 2) - 10);
    const actionWorkLines = doc.splitTextToSize(strength.actionWork, pageWidth - (margin * 2) - 30);
    const actionLifeLines = doc.splitTextToSize(strength.actionLife, pageWidth - (margin * 2) - 30);
    const blockHeight = 45 + (descLines.length * 5) + (actionWorkLines.length * 5) + (actionLifeLines.length * 5);

    checkPageBreak(blockHeight);

    // Rank Circle/Badge
    doc.setFillColor(r, g, b);
    doc.roundedRect(margin, yPosition, 10, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    setFont(10, 'bold');
    doc.text(`${index + 1}`, margin + 5, yPosition + 7, { align: 'center' });

    // Strength Name
    doc.setTextColor(r, g, b);
    setFont(14, 'bold');
    doc.text(strength.name.toUpperCase(), margin + 15, yPosition + 7);
    
    // Virtue Badge
    const virtueWidth = doc.getTextWidth(strength.virtue) + 6;
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(pageWidth - margin - virtueWidth, yPosition + 1, virtueWidth, 7, 1, 1, 'F');
    doc.setTextColor(100, 100, 100);
    setFont(8, 'bold');
    doc.text(strength.virtue, pageWidth - margin - (virtueWidth / 2), yPosition + 5.5, { align: 'center' });

    yPosition += 13;

    // Tagline
    setFont(10, 'italic');
    doc.setTextColor(80, 80, 80);
    doc.text(`"${strength.tagline}"`, margin, yPosition);
    yPosition += 7;

    // Description
    setFont(10, 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(descLines, margin, yPosition);
    yPosition += (descLines.length * 5) + 6;

    // Actions
    doc.setDrawColor(r, g, b);
    doc.setLineWidth(0.2);
    doc.line(margin, yPosition, margin + 20, yPosition);
    yPosition += 6;

    setFont(9, 'bold');
    doc.setTextColor(r, g, b);
    doc.text('AU TRAVAIL :', margin, yPosition);
    doc.setTextColor(60, 60, 60);
    setFont(9, 'normal');
    doc.text(actionWorkLines, margin + 25, yPosition);
    yPosition += (actionWorkLines.length * 5) + 3;

    setFont(9, 'bold');
    doc.setTextColor(r, g, b);
    doc.text('DANS LA VIE :', margin, yPosition);
    doc.setTextColor(60, 60, 60);
    setFont(9, 'normal');
    doc.text(actionLifeLines, margin + 25, yPosition);
    yPosition += (actionLifeLines.length * 5) + 12;
  });

  // --- Summary Table ---
  checkPageBreak(80);
  yPosition += 5;
  setFont(16, 'bold');
  doc.setTextColor(46, 82, 102);
  doc.text('Répartition par Vertus', margin, yPosition);
  yPosition += 12;

  const scoresByVirtue: { [key: string]: typeof profile.scores } = {};
  profile.scores.forEach((score) => {
    const strength = STRENGTHS_MAP.get(score.strength.id);
    if (strength) {
      if (!scoresByVirtue[strength.virtue]) scoresByVirtue[strength.virtue] = [];
      scoresByVirtue[strength.virtue].push(score);
    }
  });

  Object.entries(scoresByVirtue).forEach(([virtue, scores]) => {
    const needed = 15 + (scores.length * 6);
    checkPageBreak(needed);

    setFont(11, 'bold');
    doc.setTextColor(46, 82, 102);
    doc.text(virtue, margin, yPosition);
    yPosition += 7;

    scores.forEach((score) => {
      const strength = STRENGTHS_MAP.get(score.strength.id);
      if (strength) {
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(margin, yPosition - 4, pageWidth - (margin * 2), 5, 0.5, 0.5, 'F');
        
        doc.setTextColor(80, 80, 80);
        setFont(9, 'normal');
        doc.text(strength.name, margin + 5, yPosition);
        
        // Progress bar for score
        const barWidth = 40;
        const fillWidth = (score.score / 5) * barWidth;
        doc.setFillColor(220, 220, 220);
        doc.rect(pageWidth - margin - barWidth - 15, yPosition - 3, barWidth, 2, 'F');
        const { r, g, b } = hexToRgb(strength.color);
        doc.setFillColor(r, g, b);
        doc.rect(pageWidth - margin - barWidth - 15, yPosition - 3, fillWidth, 2, 'F');

        doc.setTextColor(120, 120, 120);
        doc.text(`${score.score.toFixed(1)}/5`, pageWidth - margin, yPosition, { align: 'right' });
        
        yPosition += 6;
      }
    });
    yPosition += 6;
  });

  // --- Footer ---
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    yPosition = pageHeight - 15;
    setFont(8, 'normal');
    doc.setTextColor(180, 180, 180);
    doc.text(`© ForceVie - Portrait de Forces de Caractère | Page ${i} sur ${pageCount}`, pageWidth / 2, yPosition, { align: 'center' });
  }

  const filename = `Rapport_ForceVie_${profile.firstName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
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
