// Road Signs Data for DDA
// Organized by groups (1-7)

export const roadSignsData = {
  // 1. Xəbərdarlıq nişanları (Warning signs)
  1: [
    {
      code: '1.1',
      name: 'Təhlükəli döngə',
      meaning: 'Qarşıda təhlükəli döngə var. Sürətinizi azaldın və ehtiyatlı olun.',
      application: 'Döngənin başlanğıcından 50-100 metr əvvəl qoyulur.',
      specialNote: 'Döngənin istiqaməti əlavə işarə ilə göstərilə bilər.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '1.2',
      name: 'Bir-birini ardıcıl izləyən döngələr',
      meaning: 'Qarşıda bir neçə döngə ardıcıl olaraq gəlir.',
      application: 'İlk döngədən əvvəl qoyulur.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '1.3',
      name: 'Enişli yol',
      meaning: 'Qarşıda enişli yol hissəsi başlayır. Əyləc sisteminizə diqqət yetirin.',
      application: 'Enişin başlanğıcından qabaq qoyulur.',
      specialNote: 'Faiz göstəricisi aşağıya doğru mailliyi bildirir.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '1.4',
      name: 'Yoxuşlu yol',
      meaning: 'Qarşıda yoxuşlu yol hissəsi başlayır.',
      application: 'Yoxuşun başlanğıcından qabaq qoyulur.',
      specialNote: 'Faiz göstəricisi yuxarıya doğru mailliyi bildirir.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.5',
      name: 'Dar yol',
      meaning: 'Qarşıda yol darlaşır. Hərəkət zolaqlari azalır.',
      application: 'Daralan yol hissəsindən əvvəl qoyulur.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '1.6',
      name: 'Körpü',
      meaning: 'Qarşıda körpü və ya estakada var.',
      application: 'Körpüdən 50-100 metr əvvəl qoyulur.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.7',
      name: 'Dəmiryol keçidi',
      meaning: 'Qarşıda dəmiryol keçidi var. Son dərəcə ehtiyatlı olun!',
      application: 'Dəmiryol keçidindən əvvəl qoyulur.',
      specialNote: 'Şlaqbaumlı və ya şlaqbaumsuz ola bilər.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '1.8',
      name: 'Svetoforla tənzimlənən keçid',
      meaning: 'Qarşıda işıqlı siqnal ilə tənzimlənən yol keçidi var.',
      application: 'Təhlükəli sahələrdə qoyulur.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.9',
      name: 'Piyada keçidi',
      meaning: 'Qarşıda piyada keçidi var. Piyadaları buraxmağa hazır olun.',
      application: 'Keçiddən 50-100 metr əvvəl qoyulur.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '1.10',
      name: 'Uşaqlar',
      meaning: 'Qarşıda məktəb, uşaq bağçası və ya oyun meydançası var.',
      application: 'Uşaqların tez-tez keçdiyi yerlərdə qoyulur.',
      specialNote: 'Maksimum ehtiyat tələb olunur!',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '1.11',
      name: 'Velosiped yolu',
      meaning: 'Qarşıda velosiped yolu və ya velosipedçilər tez-tez keçir.',
      application: 'Velosiped zolaqlarının olduğu yerlərdə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.12',
      name: 'Yol işləri',
      meaning: 'Qarşıda təmir işləri aparılır. Sürəti azaldın.',
      application: 'Yol təmiri sahələrində qoyulur.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '1.13',
      name: 'Heyvanlar keçə bilər',
      meaning: 'Qarşıda yabanı və ya ev heyvanları yola çıxa bilər.',
      application: 'Kənd və meşə yollarında qoyulur.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.14',
      name: 'Sürüşkən yol',
      meaning: 'Yol örtüyü sürüşkəndir (buz, yağış, yağ və s.).',
      application: 'Təhlükəli yol sahələrində qoyulur.',
      specialNote: 'Sürəti xüsusilə azaltmaq lazımdır.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '1.15',
      name: 'Qar yağır',
      meaning: 'Qarşıda qar yağışı və ya qarlı yol şəraiti var.',
      application: 'Qışda dağ və ya açıq ərazilərdə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.16',
      name: 'Aşağı uçan təyyarələr',
      meaning: 'Aeroport yaxınlığı, səs-küy və diqqət yayınması ola bilər.',
      application: 'Aeroport ətrafında qoyulur.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '1.17',
      name: 'Yan külək',
      meaning: 'Güclü yan küləklər avtomobilin idarəolunmasını çətinləşdirə bilər.',
      application: 'Açıq sahələrdə və körpülərdə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.18',
      name: 'İki tərəfli hərəkət',
      meaning: 'Qarşıda birtərəfli yoldan ikitərəfli yola keçid var.',
      application: 'Yol rejiminin dəyişdiyi yerlərdə.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '1.19',
      name: 'Tıxac ehtimalı',
      meaning: 'Qarşıda nəqliyyat tıxacı və ya sıxlıq ola bilər.',
      application: 'Yoğun hərəkət sahələrində.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.20',
      name: 'Daşlar düşə bilər',
      meaning: 'Dağ yamacından daşlar düşmə ehtimalı var.',
      application: 'Dağ yollarında qoyulur.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.21',
      name: 'Tunel',
      meaning: 'Qarşıda tunel var. İşıqları yandırın.',
      application: 'Tunel girişindən əvvəl qoyulur.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.22',
      name: 'Çağırış işarəsi',
      meaning: 'Qarşıda görünməyən yol hissəsi və ya təhlükə var.',
      application: 'Görünüş məhdud olan yerlərdə.',
      specialNote: 'Siqnal verməyə hazır olun.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '1.23',
      name: 'Kəsişmə (T şəkilli)',
      meaning: 'Qarşıda əsas yola T şəkilli kəsişmə var.',
      application: 'Yan yolun qovşağından əvvəl.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '1.24',
      name: 'Döngələrəsi (roundabout)',
      meaning: 'Qarşıda dairəvi hərəkət qovşağı var.',
      application: 'Döngələrəsindən əvvəl qoyulur.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '1.25',
      name: 'Qeyri-bərabər yol',
      meaning: 'Yol örtüyündə çuxurlar və qeyri-bərabərlik var.',
      application: 'Zədələnmiş yol sahələrində.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.26',
      name: 'Qarşıdan gələn hərəkət',
      meaning: 'Qarşıdan avtomobillər gəlir, ehtiyatlı olun.',
      application: 'Dar yollarda və döngələrdə.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '1.27',
      name: 'Enişin sonu',
      meaning: 'Eniş bitir, düz və ya yoxuşlu yola keçid.',
      application: 'Enişin sonunda qoyulur.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '1.28',
      name: 'Çəkilən nəqliyyat',
      meaning: 'Qarşıda traktor və ya yük maşınları ilə qapalı yol.',
      application: 'Kənd təsərrüfatı sahələrində.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '1.29',
      name: 'Yolun kənarı',
      meaning: 'Yolun kənarında dərin xəndək və ya uçurum var.',
      application: 'Təhlükəli yol kənarlarında.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.30',
      name: 'Sabit svetofor',
      meaning: 'Yolda daimi işıqlı nəzarət sistemi var.',
      application: 'Monitorinq olunan yollarda.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '1.31',
      name: 'Digər təhlükələr',
      meaning: 'Yuxarıda göstərilməyən digər təhlükələr.',
      application: 'Gözlənilməz vəziyyətlərdə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.32',
      name: 'Kəsişmə yaxınlığı',
      meaning: 'Qarşıda bərabər hüquqlu kəsişmə var.',
      application: 'Kəsişmədən 50-100m əvvəl.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '1.33',
      name: 'Qapalı keçid',
      meaning: 'Qarşıda keçid məhdudiyyəti var.',
      application: 'Məhdudlaşdırılmış zonalarda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '1.34',
      name: 'İşıq siqnalı',
      meaning: 'Qarşıda daimi yanıb-sönən xəbərdarlıq işıqları var.',
      application: 'Xüsusi diqqət tələb olunan yerlərdə.',
      examImportance: 'low',
      commonMistakes: false
    }
  ],

  // 2. Üstünlük nişanları (Priority signs)
  2: [
    {
      code: '2.1',
      name: 'Əsas yol',
      meaning: 'Siz əsas yoldasınız, kəsişmədə üstünlüyünüz var.',
      application: 'Əsas yolların başlanğıcında qoyulur.',
      specialNote: 'Yan yoldan çıxan nəqliyyat sizi buraxmalıdır.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '2.2',
      name: 'Əsas yolun sonu',
      meaning: 'Əsas yol bitir, üstünlük hüququnuz dəyişir.',
      application: 'Əsas yolun sonunda qoyulur.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '2.3',
      name: 'Yol ver',
      meaning: 'Qarşıdan gələn nəqliyyata yol verməlisiniz.',
      application: 'İkinci dərəcəli yollarda qoyulur.',
      specialNote: 'Dayanmaq vacib deyil, amma yol vermək məcburidir.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '2.4',
      name: 'Hərəkət qadağandır',
      meaning: 'Dayanmadan keçmək qadağandır! Tam dayanın.',
      application: 'Görünüşü məhdud və təhlükəli kəsişmələrdə.',
      specialNote: 'Mütləq tam dayanmalısınız (hətta yol boş olsa belə).',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '2.5',
      name: 'Qarşıdan gələnə üstünlük ver',
      meaning: 'Dar yolda qarşıdan gələnlərə yol verməlisiniz.',
      application: 'Dar körpü və yollarda qoyulur.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '2.6',
      name: 'Qarşıdan gələnə nəzərən üstünlük',
      meaning: 'Qarşıdan gələnlər sizə yol verməlidir.',
      application: 'Dar körpü və yollarda, əks tərəfdəki sürücülərə.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '2.7',
      name: 'Yan yollarla kəsişmə',
      meaning: 'Əsas yolun yan yollarla kəsişməsi.',
      application: 'Əsas yolda yan qovşaqlar olduqda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '2.8',
      name: 'İstiqamət üzrə üstünlük',
      meaning: 'Əsas yolun istiqaməti dəyişir.',
      application: 'Əsas yolun dönməsi zamanı.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '2.9',
      name: 'Birləşmə nöqtəsi',
      meaning: 'Sağdan və ya soldan yol birləşir.',
      application: 'Yolların birləşdiyi yerlərdə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '2.10',
      name: 'Üstünlük təyinatı',
      meaning: 'Kəsişmədə hansı istiqamətdə üstünlük var?',
      application: 'Mürəkkəb qovşaqlarda.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '2.11',
      name: 'Növbəlilik',
      meaning: 'Növbə ilə hərəkət etməlisiniz.',
      application: 'Dar yollarda ikitərəfli hərəkətdə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '2.12',
      name: 'Piyadalara üstünlük',
      meaning: 'Piyadalar keçərkən onlara üstünlük verməlisiniz.',
      application: 'Piyada keçidlərində.',
      examImportance: 'high',
      commonMistakes: true
    }
  ],

  // 3. Qadağan nişanları (Prohibition signs)
  3: [
    {
      code: '3.1',
      name: 'Hərəkət qadağandır',
      meaning: 'Bu yoldan heç bir nəqliyyat vasitəsinin hərəkəti qadağandır.',
      application: 'Qapalı yollarda və ya təmirlər zamanı.',
      specialNote: 'Ümumi qadağa - heç kim keçə bilməz (xidməti nəqliyyat istisna).',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '3.2',
      name: 'Giriş qadağandır',
      meaning: 'Bu istiqamətdən girişə qadağa var.',
      application: 'Birtərəfli yollarda əks istiqamətdən.',
      specialNote: '"Kirpiç" adlanır, çox ciddi qadağadır!',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '3.3',
      name: 'Mexaniki nəqliyyat vasitələri',
      meaning: 'Mexaniki nəqliyyat (avtomobil, motosikl) qadağandır.',
      application: 'Piyada zonalarda və parklarda.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '3.4',
      name: 'Yük avtomobillərinə qadağa',
      meaning: 'Yük avtomobilləri üçün hərəkət qadağandır.',
      application: 'Yaşayış məntəqələrində və ya zəif yollarda.',
      specialNote: 'Tonaj həddləri nişanda göstərilir.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '3.5',
      name: 'Motosikl qadağası',
      meaning: 'Motosikl və mopedlərin hərəkəti qadağandır.',
      application: 'Yaşayış məntəqələrində və xüsusi zonalarda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '3.6',
      name: 'Traktorlara qadağa',
      meaning: 'Traktor və kənd təsərrüfatı texnikasına qadağa.',
      application: 'Şəhər daxili yollarda.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '3.7',
      name: 'Velosipedə qadağa',
      meaning: 'Velosipedlərin hərəkəti qadağandır.',
      application: 'Sürətli yollarda və magistrallarda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '3.8',
      name: 'Piyadaların keçidi qadağandır',
      meaning: 'Piyadaların bu hissədən keçməsi qadağandır.',
      application: 'Magistral və avtomobil yollarında.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '3.9',
      name: 'At arabası qadağası',
      meaning: 'At arabası və heyvan sürülərinin keçidi qadağandır.',
      application: 'Sürətli yollarda.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '3.10',
      name: 'Maksimum sürət məhdudiyyəti',
      meaning: 'Göstərilən sürətdən artıq getmək qadağandır.',
      application: 'Təhlükəli yol hissələrində və yaşayış məntəqələrində.',
      specialNote: 'Sürət həddi nişanda göstərilir (məs: 40, 60, 80 km/s).',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '3.11',
      name: 'Ötmə qadağandır',
      meaning: 'Digər nəqliyyatı ötmək qadağandır.',
      application: 'Döngələrdə, körpülərdə, görünməyən yerlərdə.',
      specialNote: 'Yalnız uzunmüddətli ötməyə qadağa, yavaş araba ötülə bilər.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '3.12',
      name: 'Yük avtomobillərinə ötmə qadağası',
      meaning: 'Yük avtomobilləri üçün ötmə qadağandır.',
      application: 'Dar yollarda və döngələrdə.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '3.13',
      name: 'Siqnal vermək qadağandır',
      meaning: 'Səs siqnalı vermək qadağandır.',
      application: 'Yaşayış məntəqələrində və xəstəxanaların yaxınlığında.',
      specialNote: 'Təhlükə zamanı siqnal vermək icazəlidir.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '3.14',
      name: 'Dayanma qadağandır',
      meaning: 'Nəqliyyatın dayanması qadağandır.',
      application: 'Döngələrdə, körpülərdə, dayanacaq yerlərində.',
      specialNote: 'Yük düşürmək və sərnişin endirmək üçün 1 dəq dayanmaq olar.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '3.15',
      name: 'Durma qadağandır',
      meaning: 'Dayanma və durma hər ikisi qadağandır.',
      application: 'Sürətli yollarda və dar hissələrdə.',
      specialNote: 'Heç bir səbəbdən dayana bilməzsiniz.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '3.16',
      name: 'Sağa dönmək qadağandır',
      meaning: 'Sağa dönüş etmək qadağandır.',
      application: 'Birtərəfli yollarda və xüsusi kəsişmələrdə.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '3.17',
      name: 'Sola dönmək qadağandır',
      meaning: 'Sola dönüş etmək qadağandır.',
      application: 'Sürətli yollarda və təhlükəli qovşaqlarda.',
      specialNote: 'Geriyə dönmək də qadağandır.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '3.18',
      name: 'Geriyə dönmə qadağası',
      meaning: 'Geriyə dönüş (U-turn) etmək qadağandır.',
      application: 'Magistral yollarda və körpülərdə.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '3.19',
      name: 'Ötmə qadağasının sonu',
      meaning: 'Ötmə qadağası bitdi, indi ötə bilərsiniz.',
      application: 'Ötmə qadağalı zonadan sonra.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '3.20',
      name: 'Sürət məhdudiyyətinin sonu',
      meaning: 'Sürət məhdudiyyəti bitdi.',
      application: 'Sürət məhdud zonadan çıxdıqda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '3.21',
      name: 'Maksimum çəki məhdudiyyəti',
      meaning: 'Göstərilən çəkidən ağır nəqliyyat keçə bilməz.',
      application: 'Zəif körpü və yollarda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '3.22',
      name: 'Maksimum hündürlük məhdudiyyəti',
      meaning: 'Göstərilən hündürlükdən yüksək nəqliyyat keçə bilməz.',
      application: 'Tunellərdə və aşağı körpülərdə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '3.23',
      name: 'Maksimum en məhdudiyyəti',
      meaning: 'Göstərilən endən geniş nəqliyyat keçə bilməz.',
      application: 'Dar keçidlərdə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '3.24',
      name: 'Minimal məsafə',
      meaning: 'Nəqliyyat vasitələri arası minimal məsafə.',
      application: 'Tunellərdə və sürətli yollarda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '3.25',
      name: 'Gömrük',
      meaning: 'Gömrük-sərhəd keçid məntəqəsi, dayanmaq məcburidir.',
      application: 'Sərhəd keçid məntəqələrində.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '3.26',
      name: 'Bütün qadağaların sonu',
      meaning: 'Əvvəlki bütün qadağalar aradan qalxır.',
      application: 'Qadağalı zonadan çıxışda.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '3.27',
      name: 'Təkərlərdə zəncir məcburidir',
      meaning: 'Qarlı yollarda təkərlərdə zəncir olmadan keçmək qadağandır.',
      application: 'Qışda dağ yollarında.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '3.28',
      name: 'Təhlükəli yük qadağası',
      meaning: 'Təhlükəli yük daşıyan nəqliyyatın keçməsi qadağandır.',
      application: 'Yaşayış məntəqələrində və tunellərdə.',
      examImportance: 'low',
      commonMistakes: false
    }
  ],

  // 4. Məcburi nişanlar (Mandatory signs)
  4: [
    {
      code: '4.1',
      name: 'Düz getmək məcburidir',
      meaning: 'Yalnız düz istiqamətdə hərəkət etməlisiniz.',
      application: 'Kəsişmələrdə və qovşaqlarda.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '4.2',
      name: 'Sağa dönmək məcburidir',
      meaning: 'Yalnız sağa dönüş etməlisiniz.',
      application: 'Birtərəfli yollarda və xüsusi qovşaqlarda.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '4.3',
      name: 'Sola dönmək məcburidir',
      meaning: 'Yalnız sola dönüş etməlisiniz.',
      application: 'Xüsusi kəsişmələrdə.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '4.4',
      name: 'Sağa və ya düz',
      meaning: 'Sağa və ya düz gedə bilərsiniz, sola yox.',
      application: 'Alternativ istiqamətlərdə.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '4.5',
      name: 'Sola və ya düz',
      meaning: 'Sola və ya düz gedə bilərsiniz, sağa yox.',
      application: 'Alternativ istiqamətlərdə.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '4.6',
      name: 'Sağa və ya sola',
      meaning: 'Sağa və ya sola dönə bilərsiniz, düz getmək qadağandır.',
      application: 'T şəkilli kəsişmələrdə.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '4.7',
      name: 'Maneədən sağdan keçmək',
      meaning: 'Maneəni (ada, konstruksiya) sağ tərəfdən dolanmalısınız.',
      application: 'Yol konstruksiyaları və adaların önündə.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '4.8',
      name: 'Maneədən soldan keçmək',
      meaning: 'Maneəni sol tərəfdən dolanmalısınız.',
      application: 'Yol konstruksiyaları və adaların önündə.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '4.9',
      name: 'Maneədən hər iki tərəfdən keçmək',
      meaning: 'Maneəni istənilən tərəfdən dolana bilərsiniz.',
      application: 'Böyük konstruksiyaların önündə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '4.10',
      name: 'Dairəvi hərəkət',
      meaning: 'Dairəvi hərəkət istiqamətində getməlisiniz (saat əqrəbinin əksinə).',
      application: 'Döngələrəsi qovşaqlarında.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '4.11',
      name: 'Velosipedlər üçün yol',
      meaning: 'Bu yol yalnız velosipedlər üçündür.',
      application: 'Velosiped zolaqlarında.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '4.12',
      name: 'Piyada yolu',
      meaning: 'Bu yol yalnız piyadalara məxsusdur.',
      application: 'Piyada keçidləri və parklarda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '4.13',
      name: 'Piyada və velosiped yolu',
      meaning: 'Həm piyadalara, həm də velosipedlərə məxsus yol.',
      application: 'Qarışıq istifadə zonalarında.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '4.14',
      name: 'Minimum sürət',
      meaning: 'Göstərilən sürətdən aşağı getmək qadağandır.',
      application: 'Magistral yollarda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '4.15',
      name: 'Zəncir istifadəsi məcburidir',
      meaning: 'Qarlı yollarda zəncir olmadan getmək qadağandır.',
      application: 'Qış mövsümündə dağ yollarında.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '4.16',
      name: 'Minimum sürətin sonu',
      meaning: 'Minimum sürət məhdudiyyəti bitdi.',
      application: 'Minimum sürət zonasının sonunda.',
      examImportance: 'low',
      commonMistakes: false
    }
  ],

  // 5. İnformasiya nişanları (Information signs)
  5: [
    {
      code: '5.1',
      name: 'Magistral yol',
      meaning: 'Magistral yolun başlanğıcı.',
      application: 'Şəhərlərarası sürətli yollarda.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '5.2',
      name: 'Magistral yolun sonu',
      meaning: 'Magistral yoldan çıxış.',
      application: 'Magistral yolun bitməsində.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '5.3',
      name: 'Avtomobil yolu',
      meaning: 'Avtomobil yolunun başlanğıcı.',
      application: 'Şəhərlərarası yollarda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '5.4',
      name: 'Avtomobil yolunun sonu',
      meaning: 'Avtomobil yolundan çıxış.',
      application: 'Avtomobil yolunun bitməsində.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '5.5',
      name: 'Birtərəfli hərəkət',
      meaning: 'Yol yalnız bir istiqamətdə hərəkət edir.',
      application: 'Şəhər daxili birtərəfli küçələrdə.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '5.6',
      name: 'Birtərəfli hərəkətin sonu',
      meaning: 'Birtərəfli yol bitir.',
      application: 'Birtərəfli yolun sonunda.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '5.7',
      name: 'Yaşayış zonası',
      meaning: 'Yaşayış məntəqəsi - xüsusi qaydalar tətbiq olunur.',
      application: 'Yaşayış komplekslərinin girişində.',
      specialNote: 'Maksimum sürət 20 km/s, piyadalara üstünlük.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '5.8',
      name: 'Yaşayış zonasının sonu',
      meaning: 'Yaşayış zonasından çıxış.',
      application: 'Yaşayış kompleksinin çıxışında.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '5.9',
      name: 'Piyada keçidi',
      meaning: 'Piyada keçidinin olduğu yer.',
      application: 'Qeydə alınmış piyada keçidlərində.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '5.10',
      name: 'Yeraltı piyada keçidi',
      meaning: 'Yeraltı piyada keçidi mövcuddur.',
      application: 'Yeraltı keçidlərin girişində.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '5.11',
      name: 'Yerüstü piyada keçidi',
      meaning: 'Yol üzərində piyada körpüsü var.',
      application: 'Piyada körpülərinin yanında.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '5.12',
      name: 'Avtobus dayanacağı',
      meaning: 'İctimai nəqliyyat dayanacağı.',
      application: 'Avtobus dayanacaqlarında.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '5.13',
      name: 'Tramvay dayanacağı',
      meaning: 'Tramvay dayanacaq yeri.',
      application: 'Tramvay xəttinin dayanacaqlarında.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '5.14',
      name: 'Taksi dayanacağı',
      meaning: 'Taksi dayanacaq yeri.',
      application: 'Taksi dayanacaqlarında.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '5.15',
      name: 'Dayanacaq yeri',
      meaning: 'Nəqliyyat vasitələri üçün dayanacaq.',
      application: 'Parklanma sahələrində.',
      specialNote: 'Əlavə lövhələrlə müddət göstərilə bilər.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '5.16',
      name: 'Xəstəxana',
      meaning: 'Yaxınlıqda xəstəxana və ya tibb müəssisəsi var.',
      application: 'Xəstəxanaların yaxınlığında.',
      specialNote: 'Siqnal çalmaq qadağandır.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '5.17',
      name: 'Polis',
      meaning: 'Polis bölməsi və ya post.',
      application: 'Polis stansiyalarının yaxınlığında.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '5.18',
      name: 'Telefon',
      meaning: 'İctimai telefon mövcuddur.',
      application: 'Telefon köşklərinin olduğu yerlərdə.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '5.19',
      name: 'Yanacaqdoldurma məntəqəsi',
      meaning: 'YDM - yanacaq doldurma stansiyası.',
      application: 'Yanacaq stansiyalarının girişində.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '5.20',
      name: 'Texniki xidmət',
      meaning: 'Avtomobil servisi və təmir xidməti.',
      application: 'Servis mərkəzlərinin girişində.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '5.21',
      name: 'Yol məsafəsi',
      meaning: 'Şəhər və ya obyektə olan məsafə.',
      application: 'Magistral yollarda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '5.22',
      name: 'İstiqamət göstəricisi',
      meaning: 'Şəhər və ya obyektin hansı istiqamətdə olduğunu göstərir.',
      application: 'Qovşaqlarda və yol ayrıclarında.',
      examImportance: 'high',
      commonMistakes: false
    }
  ],

  // 6. Xidmət nişanları (Service signs)
  6: [
    {
      code: '6.1',
      name: 'Tibb punktu',
      meaning: 'İlk tibbi yardım məntəqəsi.',
      application: 'Tibb məntəqələrinin yaxınlığında.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.2',
      name: 'Xəstəxana',
      meaning: 'Xəstəxana və ya klinika.',
      application: 'Tibb müəssisələrinin girişində.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '6.3',
      name: 'Texniki yardım',
      meaning: 'Texniki xidmət və təmir.',
      application: 'Avtoservis mərkəzlərində.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.4',
      name: 'Yuyucu məntəqə',
      meaning: 'Avtomobil yuma xidməti.',
      application: 'Avto yuma mərkəzlərinin girişində.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.5',
      name: 'Telefon',
      meaning: 'İctimai telefon mövcuddur.',
      application: 'Telefon kabinələri olan yerlərdə.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.6',
      name: 'Restoran və ya kafe',
      meaning: 'Qida xidməti obyekti.',
      application: 'Yol kənarı restoranların girişində.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.7',
      name: 'Çay evi',
      meaning: 'Çay və yüngül qida xidməti.',
      application: 'Çay evlərinin girişində.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.8',
      name: 'İçməli su',
      meaning: 'İçməli su mənbəyi.',
      application: 'İçməli su olan yerlərdə.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.9',
      name: 'Otel və ya motel',
      meaning: 'Qonaq evi və ya otel.',
      application: 'Otellərin girişində.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.10',
      name: 'Kemping',
      meaning: 'Düşərgə və ya açıq hava istirahət sahəsi.',
      application: 'Kempinq zonalarında.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.11',
      name: 'Karavan yeri',
      meaning: 'Karavan və treylerlər üçün yer.',
      application: 'Karavan parklanma sahələrində.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.12',
      name: 'İstirahət yeri',
      meaning: 'İstirahət və piknik sahəsi.',
      application: 'Yol kənarı istirahət zonalarında.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.13',
      name: 'Polis',
      meaning: 'Polis bölməsi və ya post.',
      application: 'Polis stansiyalarının yaxınlığında.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.14',
      name: 'Post-telefon-teleqraf',
      meaning: 'Poçt və rabitə xidməti.',
      application: 'Poçt şöbələrinin girişində.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.15',
      name: 'Radioqəbuletmə məntəqəsi',
      meaning: 'Radio dalğası məlumatı.',
      application: 'Radio məlumat zonalarında.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.16',
      name: 'Tualet',
      meaning: 'İctimai tualet.',
      application: 'İctimai tualet olan yerlərdə.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.17',
      name: 'Təhlükəsiz keçid',
      meaning: 'Təhlükəsiz yol keçidi.',
      application: 'Təhlükəli yollar üçün alternativ keçid.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '6.18',
      name: 'Yanacaqdoldurma məntəqəsi',
      meaning: 'Yanacaq doldurma stansiyası.',
      application: 'YDM-lərin girişində.',
      examImportance: 'medium',
      commonMistakes: false
    }
  ],

  // 7. Əlavə nişanlar (Additional signs)
  7: [
    {
      code: '7.1',
      name: 'Məsafə',
      meaning: 'Nişan göstərən obyektə olan məsafə.',
      application: 'Digər nişanlarla birlikdə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '7.2',
      name: 'Təsir zonası',
      meaning: 'Nişanın təsir etdiyi məsafə.',
      application: 'Məhdudlaşdırıcı nişanlarla birlikdə.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '7.3',
      name: 'İstiqamət',
      meaning: 'Nişanın hansı istiqamətdə təsir etdiyi.',
      application: 'Qovşaqlarda istiqamət göstərmək üçün.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '7.4',
      name: 'Nəqliyyat növü',
      meaning: 'Hansı nəqliyyat növünə aid olduğunu göstərir.',
      application: 'Seçici qadağalar üçün.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '7.5',
      name: 'İş günləri',
      meaning: 'Yalnız iş günlərində tətbiq olunur.',
      application: 'Məhdudlaşdırıcı nişanlarla birlikdə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '7.6',
      name: 'İstirahət günləri',
      meaning: 'Yalnız həftə sonu və bayram günlərində tətbiq olunur.',
      application: 'Parklanma və dayanacaq qadağaları ilə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '7.7',
      name: 'Vaxt intervalı',
      meaning: 'Nişan yalnız göstərilən saat aralığında təsir edir.',
      application: 'Sürət məhdudiyyəti və dayanacaq qadağaları ilə.',
      examImportance: 'high',
      commonMistakes: true
    },
    {
      code: '7.8',
      name: 'Ödənişli xidmət',
      meaning: 'Ödəniş tələb olunan zona və ya xidmət.',
      application: 'Pullu dayanacaq və yollarda.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '7.9',
      name: 'Yağışlı hava',
      meaning: 'Nişan yalnız yağışlı havada tətbiq olunur.',
      application: 'Sürət məhdudiyyətləri ilə.',
      examImportance: 'medium',
      commonMistakes: false
    },
    {
      code: '7.10',
      name: 'Qarlı hava',
      meaning: 'Nişan yalnız qarlı havada tətbiq olunur.',
      application: 'Qış şəraiti qadağaları ilə.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '7.11',
      name: 'Əlillər üçün',
      meaning: 'Əlillik vəsiqəsi olan sürücülərə məxsusdur.',
      application: 'Xüsusi parklanma yerlərində.',
      examImportance: 'high',
      commonMistakes: false
    },
    {
      code: '7.12',
      name: 'Qadınlar üçün',
      meaning: 'Qadın sürücülər üçün ayrılmış zona.',
      application: 'Xüsusi parklanma yerlərində.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '7.13',
      name: 'Elektromobillər üçün',
      meaning: 'Elektrikli avtomobillər üçün xüsusi zona.',
      application: 'Elektromobil şarj stansiyalarında.',
      examImportance: 'low',
      commonMistakes: false
    },
    {
      code: '7.14',
      name: 'Təkrarlanan nişan',
      meaning: 'Əvvəlki nişan təkrar xatırladılır.',
      application: 'Uzun yol hissələrində.',
      examImportance: 'medium',
      commonMistakes: false
    }
  ]
}
