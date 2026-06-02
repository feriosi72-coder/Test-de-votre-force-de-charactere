import type { Question } from '../types';

export const QUESTIONS: Question[] = [
  // Curiosité
  { id: 1, text: 'J\'explore régulièrement de nouveaux sujets ou domaines par simple plaisir de découvrir.', strengthId: 'curiosity', reversed: false },
  { id: 2, text: 'Je m\'ennuie rapidement si je ne découvre rien de nouveau dans ma journée.', strengthId: 'curiosity', reversed: false },
  { id: 3, text: 'Je préfère les routines établies aux situations nouvelles et imprévisibles.', strengthId: 'curiosity', reversed: true },

  // Créativité
  { id: 4, text: 'Je trouve souvent des façons originales de résoudre des problèmes que d\'autres trouvent sans issue.', strengthId: 'creativity', reversed: false },
  { id: 5, text: 'J\'aime inventer, imaginer et créer des choses nouvelles.', strengthId: 'creativity', reversed: false },
  { id: 6, text: 'Je manque d\'imagination et préfère suivre des méthodes qui ont déjà fait leurs preuves.', strengthId: 'creativity', reversed: true },

  // Discernement
  { id: 7, text: 'Avant de me faire un avis, j\'examine soigneusement les différentes perspectives sur un sujet.', strengthId: 'judgment', reversed: false },
  { id: 8, text: 'Je remets régulièrement en question mes propres croyances pour m\'assurer qu\'elles sont fondées.', strengthId: 'judgment', reversed: false },
  { id: 9, text: 'Je tends à prendre des décisions rapidement sans trop analyser les pour et les contre.', strengthId: 'judgment', reversed: true },

  // Amour d'apprendre
  { id: 10, text: 'Apprendre quelque chose de nouveau me procure une grande satisfaction, indépendamment de son utilité pratique.', strengthId: 'love_of_learning', reversed: false },
  { id: 11, text: 'Je cherche activement à approfondir mes connaissances dans des domaines qui m\'intéressent.', strengthId: 'love_of_learning', reversed: false },
  { id: 12, text: 'Je ne lis pas ou n\'étudie presque jamais en dehors de ce qui m\'est imposé.', strengthId: 'love_of_learning', reversed: true },

  // Perspective
  { id: 13, text: 'Les gens viennent souvent me demander conseil lorsqu\'ils font face à des choix difficiles.', strengthId: 'perspective', reversed: false },
  { id: 14, text: 'Je suis capable de voir comment les petits détails s\'inscrivent dans un tableau plus grand.', strengthId: 'perspective', reversed: false },
  { id: 15, text: 'J\'ai du mal à donner des conseils pertinents car je reste souvent focalisé sur ma propre situation.', strengthId: 'perspective', reversed: true },

  // Bravoure
  { id: 16, text: 'Je défends mes convictions même lorsque cela m\'expose à des critiques ou à l\'opposition.', strengthId: 'bravery', reversed: false },
  { id: 17, text: 'Je n\'hésite pas à prendre des risques calculés lorsque je crois que c\'est la bonne chose à faire.', strengthId: 'bravery', reversed: false },
  { id: 18, text: 'J\'évite les confrontations et les situations inconfortables dès que je le peux.', strengthId: 'bravery', reversed: true },

  // Persévérance
  { id: 19, text: 'Je termine ce que je commence, même quand les obstacles s\'accumulent.', strengthId: 'perseverance', reversed: false },
  { id: 20, text: 'Les revers me motivent à redoubler d\'efforts plutôt qu\'à baisser les bras.', strengthId: 'perseverance', reversed: false },
  { id: 21, text: 'J\'abandonne souvent mes projets à mi-chemin lorsque les difficultés se présentent.', strengthId: 'perseverance', reversed: true },

  // Honnêteté
  { id: 22, text: 'Je dis toujours la vérité, même lorsque ce n\'est pas ce que les autres veulent entendre.', strengthId: 'honesty', reversed: false },
  { id: 23, text: 'Mon comportement est parfaitement aligné avec mes valeurs, sans double discours.', strengthId: 'honesty', reversed: false },
  { id: 24, text: 'Il m\'arrive d\'adapter mes opinions selon ce que mon interlocuteur souhaitait entendre.', strengthId: 'honesty', reversed: true },

  // Enthousiasme
  { id: 25, text: 'Je me sens plein d\'énergie et de vitalité la plupart du temps.', strengthId: 'zest', reversed: false },
  { id: 26, text: 'J\'aborde les activités de ma journée avec enthousiasme et engagement.', strengthId: 'zest', reversed: false },
  { id: 27, text: 'Je me sens souvent épuisé ou sans motivation pour les activités de ma vie quotidienne.', strengthId: 'zest', reversed: true },

  // Amour
  { id: 28, text: 'Les relations profondes et intimes ont une grande importance dans ma vie.', strengthId: 'love', reversed: false },
  { id: 29, text: 'Je me soucie sincèrement du bien-être des personnes qui me sont chères.', strengthId: 'love', reversed: false },
  { id: 30, text: 'J\'ai du mal à créer des liens affectifs forts avec les autres.', strengthId: 'love', reversed: true },

  // Bienveillance
  { id: 31, text: 'J\'aime rendre service aux autres, même si je n\'en tire aucun bénéfice personnel.', strengthId: 'kindness', reversed: false },
  { id: 32, text: 'Je remarque facilement quand quelqu\'un a besoin d\'aide et je propose spontanément mon aide.', strengthId: 'kindness', reversed: false },
  { id: 33, text: 'Je tends à me concentrer sur mes propres besoins plutôt que sur ceux des personnes autour de moi.', strengthId: 'kindness', reversed: true },

  // Intelligence sociale
  { id: 34, text: 'Je perçois aisément les émotions des autres, même quand ils ne les expriment pas clairement.', strengthId: 'social_intelligence', reversed: false },
  { id: 35, text: 'Je sais adapter mon comportement selon les attentes sociales de chaque situation.', strengthId: 'social_intelligence', reversed: false },
  { id: 36, text: 'Je suis souvent maladroit dans mes interactions sociales et ne comprends pas toujours les sous-entendus.', strengthId: 'social_intelligence', reversed: true },

  // Travail d'équipe
  { id: 37, text: 'Je contribue loyalement aux objectifs du groupe, même quand ils ne coïncident pas avec mes préférences.', strengthId: 'teamwork', reversed: false },
  { id: 38, text: 'Collaborer avec d\'autres me donne plus d\'énergie que de travailler seul.', strengthId: 'teamwork', reversed: false },
  { id: 39, text: 'Je préfère travailler seul car les projets collectifs m\'épuisent et m\'irritent souvent.', strengthId: 'teamwork', reversed: true },

  // Équité
  { id: 40, text: 'Je traite tout le monde avec la même équité, indépendamment de mes sympathies personnelles.', strengthId: 'fairness', reversed: false },
  { id: 41, text: 'Je prends position contre l\'injustice, même quand cela me coûte quelque chose personnellement.', strengthId: 'fairness', reversed: false },
  { id: 42, text: 'J\'ai tendance à favoriser les personnes que j\'apprécie dans mes décisions et jugements.', strengthId: 'fairness', reversed: true },

  // Leadership
  { id: 43, text: 'Je prends naturellement les rênes pour organiser des activités ou des projets de groupe.', strengthId: 'leadership', reversed: false },
  { id: 44, text: 'Je motive les autres et les aide à donner le meilleur d\'eux-mêmes.', strengthId: 'leadership', reversed: false },
  { id: 45, text: 'Je préfère suivre que diriger et évite les rôles de responsabilité.', strengthId: 'leadership', reversed: true },

  // Pardon
  { id: 46, text: 'Je pardonne facilement ceux qui m\'ont blessé, sans rancœur persistante.', strengthId: 'forgiveness', reversed: false },
  { id: 47, text: 'Je crois que les gens peuvent changer et méritent une seconde chance.', strengthId: 'forgiveness', reversed: false },
  { id: 48, text: 'J\'ai du mal à oublier quand quelqu\'un m\'a trahi ou blessé.', strengthId: 'forgiveness', reversed: true },

  // Humilité
  { id: 49, text: 'Je n\'ai pas besoin de reconnaissance externe pour me sentir valorisé dans mon travail.', strengthId: 'humility', reversed: false },
  { id: 50, text: 'Je reconnais mes erreurs et mes limites sans difficulté.', strengthId: 'humility', reversed: false },
  { id: 51, text: 'J\'aime que mes réussites soient reconnues et valorisées publiquement.', strengthId: 'humility', reversed: true },

  // Prudence
  { id: 52, text: 'Je réfléchis soigneusement aux conséquences à long terme avant de prendre une décision importante.', strengthId: 'prudence', reversed: false },
  { id: 53, text: 'J\'évite de dire ou de faire des choses que je pourrais regretter plus tard.', strengthId: 'prudence', reversed: false },
  { id: 54, text: 'J\'agis souvent sur l\'impulsion du moment sans trop réfléchir aux conséquences.', strengthId: 'prudence', reversed: true },

  // Maîtrise de soi
  { id: 55, text: 'Je contrôle mes émotions efficacement, même dans les situations de stress ou de conflit.', strengthId: 'self_regulation', reversed: false },
  { id: 56, text: 'Je maintiens mes bonnes habitudes avec régularité, même quand la motivation fluctue.', strengthId: 'self_regulation', reversed: false },
  { id: 57, text: 'Je cède facilement à la tentation ou aux distractions qui m\'éloignent de mes objectifs.', strengthId: 'self_regulation', reversed: true },

  // Sens du beau
  { id: 58, text: 'La beauté dans l\'art, la nature ou les idées me touche profondément et régulièrement.', strengthId: 'appreciation', reversed: false },
  { id: 59, text: 'Je remarque et apprécie l\'excellence et le soin dans le travail des autres.', strengthId: 'appreciation', reversed: false },
  { id: 60, text: 'Je suis rarement sensible à l\'esthétique ou à la beauté des choses qui m\'entourent.', strengthId: 'appreciation', reversed: true },

  // Gratitude
  { id: 61, text: 'Je prends régulièrement le temps de remarquer et d\'apprécier les bonnes choses dans ma vie.', strengthId: 'gratitude', reversed: false },
  { id: 62, text: 'J\'exprime souvent ma reconnaissance aux personnes qui m\'ont aidé ou soutenu.', strengthId: 'gratitude', reversed: false },
  { id: 63, text: 'Je me concentre davantage sur ce qui me manque que sur ce que j\'ai déjà.', strengthId: 'gratitude', reversed: true },

  // Espoir
  { id: 64, text: 'Je crois sincèrement que l\'avenir sera meilleur et que les choses s\'arrangeront.', strengthId: 'hope', reversed: false },
  { id: 65, text: 'Je travaille activement à réaliser mes rêves et mes objectifs à long terme.', strengthId: 'hope', reversed: false },
  { id: 66, text: 'J\'ai souvent du mal à croire que les choses pourront s\'améliorer dans ma vie.', strengthId: 'hope', reversed: true },

  // Humour
  { id: 67, text: 'Je fais rire les gens facilement et j\'utilise l\'humour pour créer des liens.', strengthId: 'humor', reversed: false },
  { id: 68, text: 'Je trouve le côté léger et amusant de la plupart des situations, même difficiles.', strengthId: 'humor', reversed: false },
  { id: 69, text: 'Je me prends très au sérieux et l\'humour ne me vient pas naturellement.', strengthId: 'humor', reversed: true },

  // Sens de la vie
  { id: 70, text: 'J\'ai une vision claire de ce qui donne sens et direction à ma vie.', strengthId: 'spirituality', reversed: false },
  { id: 71, text: 'Je me sens connecté à quelque chose de plus grand que moi-même — une communauté, des valeurs, ou un idéal.', strengthId: 'spirituality', reversed: false },
  { id: 72, text: 'Mes actions quotidiennes me semblent souvent déconnectées de valeurs ou d\'un sens plus profond.', strengthId: 'spirituality', reversed: true },
];
