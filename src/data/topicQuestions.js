export const TOPIC_QUESTIONS = [
  {
    id: 1,
    text: 'Sürücü hərəkət zamanı əsas yola çıxarkən hansı qaydaya əməl etməlidir?',
    options: [
      'Sol tərəfə işarə verir',
      'Yavaşlayır və yol verir',
      'Sürəti artırır',
      'Siqnal verir'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    image: 'https://placehold.co/600x400/png?text=Sual+1',
    explanation: 'Sürücü ikinci dərəcəli yoldan əsas yola çıxarkən sürəti azaltmalı və əsas yolda hərəkət edən nəqliyyat vasitələrinə yol verməlidir.'
  },
  {
    id: 2,
    text: '3.27 "Dayanmaq qadağandır" nişanı hansı yerlərdə qüvvədə olur?',
    options: [
      'Yalnız nişanın qoyulduğu yerdə',
      'Nişandan sonrakı ilk yolayrıcına qədər',
      'Yaşayış məntəqəsinin sonuna qədər',
      'Bütün yol boyu'
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    image: 'https://placehold.co/600x400/png?text=Sual+2',
    explanation: '3.27 "Dayanmaq qadağandır" nişanı qoyulduğu yerdən sonrakı ilk yolayrıcına qədər, yolayrıcı olmadıqda isə yaşayış məntəqəsinin sonuna qədər qüvvədədir.'
  },
  {
    id: 3,
    text: 'Məcburi dayanma dedikdə nə başa düşülür?',
    options: [
      'Sürücünün istəyi ilə dayanma',
      'Yükün boşaldılması üçün dayanma',
      'Texniki nasazlıq və ya təhlükə səbəbindən dayanma',
      'Sərnişin düşürmək üçün dayanma'
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    image: 'https://placehold.co/600x400/png?text=Sual+3',
    explanation: 'Məcburi dayanma — texniki nasazlıq, aparılan yükün, sürücünün (sərnişinin) vəziyyəti və ya yolda yaranmış maneə ilə əlaqədar hərəkətin dayandırılmasıdır.'
  },
  {
    id: 4,
    text: 'Svetoforun qırmızı işığı yandıqda hərəkəti davam etdirmək olar?',
    options: [
      'Xeyr, qadağandır',
      'Bəli, əgər heç kim yoxdursa',
      'Yalnız sağa dönərkən',
      'Bəli, ehtiyatla'
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    image: 'https://placehold.co/600x400/png?text=Sual+4',
    explanation: 'Svetoforun qırmızı siqnalı hərəkəti qadağan edir. İstisna hal yalnız əlavə sekciya və ya nizamlayıcının icazəsi ola bilər.'
  },
  {
    id: 5,
    text: 'Avtomagistralda geriyə dönmək icazəlidirmi?',
    options: [
      'Bəli, ehtiyatla',
      'Xeyr, qadağandır',
      'Yalnız texniki nasazlıq olduqda',
      'Yalnız sutkanın gündüz vaxtı'
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    image: 'https://placehold.co/600x400/png?text=Sual+5',
    explanation: 'Avtomagistrallarda geriyə dönmək və geriyə hərəkət etmək qadağandır.'
  },
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 6,
    text: `Test sual ${i + 6}`,
    options: ['Variant A', 'Variant B', 'Variant C', 'Variant D'],
    correctAnswer: 0,
    difficulty: 'medium',
    image: null,
    explanation: 'Bu bir test izahıdır.'
  }))
];
