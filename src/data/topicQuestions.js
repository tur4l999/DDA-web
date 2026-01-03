export const TOPIC_QUESTIONS = [
  {
    id: 1,
    text: 'Sürücü hərəkət zamanı əsas yola çıxarkən hansı qaydaya əməl etməlidir?',
    options: ['Sol tərəfə işarə verir', 'Yavaşlayır və yol verir', 'Sürəti artırır', 'Siqnal verir'],
    correctAnswer: 1,
    difficulty: 'medium',
    image: null
  },
  {
    id: 2,
    text: 'Yol nişanı "Dayanmaq qadağandır" hansı rəngdədir?',
    options: ['Qırmızı', 'Sarı', 'Mavi', 'Yaşıl'],
    correctAnswer: 0,
    difficulty: 'easy',
    image: null
  },
  {
    id: 3,
    text: 'Hansı halda sürücü məcburi dayanma etmiş hesab olunur?',
    options: [
      'Texniki nasazlıq üzündən hərəkət hissəsində dayandıqda.',
      'Hər iki sadalanan halda.',
      'Piyadaya yol vermək üçün bilavasitə piyada keçidinin qarşısında dayandıqda.'
    ],
    correctAnswer: 0, // Assuming first option is correct based on the image context provided by user, but let's stick to valid logic. In image, user provided logic.
    // The image shows: "В каком случае водитель совершит вынужденную остановку?" -> "Остановившись на проезжей части из-за технической неисправности транспортного средства."
    // So 1st option is correct.
    difficulty: 'easy',
    image: null
  },
  // Adding more dummy questions to simulate a larger set for pagination testing
  ...Array.from({ length: 37 }, (_, i) => ({
    id: i + 4,
    text: `Test sual ${i + 4}`,
    options: ['Variant A', 'Variant B', 'Variant C', 'Variant D'],
    correctAnswer: 0,
    difficulty: 'medium',
    image: null
  }))
];
