export default function ArticlesContent() {
  return (
    <div className="max-w-[860px] mx-auto">
      {/* A4-style document container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Document header */}
        <div className="bg-gradient-to-r from-primary-500/5 to-primary-100 border-b border-gray-200 px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Yol Hərəkəti Haqqında Qanun
          </h1>
          <p className="text-sm text-gray-600">Maddə 1. Əsas anlayışlar</p>
        </div>

        {/* Document content - A4 format styling */}
        <div className="px-8 py-8">
          <div className="space-y-6 text-gray-800 leading-relaxed">
            <p className="font-medium text-base text-gray-900 mb-6">
              Bu Qanunda aşağıdakı anlayışlardan istifadə olunur:
            </p>

            {/* Definition 1 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">1) yol hərəkəti</span> – xüsusi nəzərdə tutulmuş yollarda nəqliyyat vasitələrinin köməyi ilə və ya belə kömək olmadan hərəkət etmək, habelə sərnişin və yük daşınması üzrə fiziki və hüquqi şəxslərin tələbatlarını ödəmək prosesində yaranan ictimai münasibətlərin məcmusudur;
              </p>
            </div>

            {/* Definition 2 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">2) yol hərəkətinin təşkili</span> – nəqliyyat vasitələrinin və ya piyadaların təhlükəsizliyini, fasiləsiz və rahat hərəkətini, optimal sürətini təmin etmək məqsədilə küçə-yol şəbəkəsində həyata keçirilən və yol hərəkətinin ayrılmaz hissəsi olan mühəndis və təşkilati tədbirlər sistemidir;
              </p>
            </div>

            {/* Definition 2-1 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">2-1) yol hərəkətinin təşkilinin texniki vasitələri</span> – yollarda hərəkətin təşkili və tənzimlənməsi, o cümlədən nəqliyyat vasitələrinin və piyadaların təhlükəsizliyinin və fasiləsiz hərəkətinin təmin edilməsi, yolların buraxıcılıq qabiliyyətinin artırılması üçün tətbiq edilən qurğular, avadanlıqlar və təsvirlərdir (svetoforlar, yol nişanları, nişanlama xətləri, qoruyucu sədlər, dirəkciklər və s.);
              </p>
            </div>

            {/* Definition 3 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">3) yol hərəkətinin təhlükəsizliyi</span> – yol hərəkəti iştirakçılarının və cəmiyyətin yol-nəqliyyat hadisələrindən və onların nəticələrindən müdafiə olunma dərəcəsini göstərən yol hərəkəti vəziyyətidir;
              </p>
            </div>

            {/* Definition 4 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">4) beynəlxalq yol hərəkəti</span> – bir dövlətin fiziki və ya hüquqi şəxsinə məxsus olan və başqa dövlətin ərazisinə müvəqqəti gətirilərək və orada qeydiyyata alınmayan nəqliyyat vasitəsinin iştirak etdiyi yol hərəkətidir;
              </p>
            </div>

            {/* Definition 5 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">5) avtomobil yolu</span> – yol hərəkəti qaydalarına, dövlət standartlarına və digər normativ-hüquqi aktlara uyğun olan ölçülərə və kütləyə malik avtomobillərin, avtobusların, motosikletlərin müəyyənləşdirilmiş sürətlə təhlükəsiz və rahat hərəkətini təmin etmək üçün nəzərdə tutulan yoldur;
              </p>
            </div>

            {/* Definition 6 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">6) avtomagistral</span> – nəqliyyat vasitələrinin hərəkəti üçün xüsusi çəkilmiş və nəzərdə tutulmuş elə bir yoldur ki:
              </p>
              <ul className="ml-6 space-y-1.5 text-[15px] leading-7">
                <li className="list-disc">həmin yol boyunca yerləşən təsərrüfat, istehsal və ya tikinti təyinatlı obyektlər digər nəqliyyat vasitələri tərəfindən istifadə edilə bilməz;</li>
                <li className="list-disc">ayrı-ayrı yerləri istisna olmaqla və ya müvəqqəti qaydanın müəyyənləşdirildiyi hallarda başqa, əks istiqamətlərdə hərəkət istiqamətləri üçün ayrı-ayrı hərəkət hissələri vardır, həm də bu hissələr arasında hərəkət üçün nəzərdə tutulmayan ayırıcı zolağın və ya müstəsna hallarda başqa vasitələrin köməyi ilə hədd qoyulmuşdur;</li>
                <li className="list-disc">dəmiryol, tramvay yolları və başqa yollarla, habelə piyada zolaqları ilə bir səviyyədə kəsişmələri yoxdur;</li>
                <li className="list-disc">hərəkət hissəsində nəqliyyat vasitələrinin dayanması və ya durması qadağan edilir, hər 50 kilometrdən çox olmayan məsafədə xüsusi istirahət yerləri və dayanacaq meydançaları ilə təchiz edilir.</li>
              </ul>
            </div>

            {/* Definition 7 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">7) yolun hərəkət hissəsi</span> – yolun nəqliyyat vasitələrinin hərəkəti üçün istifadə edilən hissəsidir (yolun ayırıcı zolaq vasitəsilə dürüst müəyyən edilən və ya müxtəlif səviyyələrdə olan bir neçə hərəkət hissəsi ola bilər);
              </p>
            </div>

            {/* Definition 8 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">8) yol çiyini</span> – yolun hərəkət hissəsində hərəkətin kənar zolağı və ya kənar zolaqları, yaxud velosiped zolaqları müəyyən nəqliyyat vasitələrinin hərəkəti üçün nəzərdə tutulduqda, "yol çiyini" digər yol istifadəçiləri üçün yolun qalan hissəsinin kənarıdır;
              </p>
            </div>

            {/* Definition 9 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">9) baş yol</span> – kəsişən (bitişən) yola nisbətən müvafiq nişanlarla işarələnmiş yol və ya torpaq yola nisbətən bərk örtüyü olan (asfalt və ya sement-beton, daş materialları və s.) yol, yaxud bitişik ərazilərdən çıxışlara nisbətən hər hansı yoldur (ikinci dərəcəli yolda yolayrıcı qarşısında örtüklü sahənin olması, onu əhəmiyyətcə kəsişdiyi yola bərabər etmir);
              </p>
            </div>

            {/* Definition 10 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">10) piyada keçidi</span> – yolun hərəkət hissəsində piyadaların yolu keçməsi üçün nəzərdə tutulan sahə, yaxud mühəndis qurğusudur;
              </p>
            </div>

            {/* Definition 11 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">11) yolayrıcı</span> – yolların bir səviyyədə hər hansı kəsişməsi, birləşməsi və ya şaxələnməsi, o cümlədən bunların əmələ gətirdiyi ərazidir;
              </p>
            </div>

            {/* Definition 12 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">12) nizamlanan yolayrıcı</span> – hərəkət növbəliliyi svetoforun və ya nizamlayıcının siqnalları ilə müəyyənləşdirilən yolayrıcıdır;
              </p>
            </div>

            {/* Definition 13 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">13) nizamlanmayan yolayrıcı</span> – nizamlayıcının olmadığı, svetoforun qurulmadığı və ya söndürüldüyü, yaxud yanıb-sönən sarı rəngli işıq siqnalının işlədiyi yolayrıcıdır;
              </p>
            </div>

            {/* Definition 14 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">14) ayırıcı zolaq</span> – yolun ayrılmış elementi olub, yanaşı yerləşən hərəkət hissələrini bir-birindən ayıran, lakin nəqliyyat vasitələrinin hərəkəti və ya dayanması, eləcə də piyadaların hərəkəti üçün nəzərdə tutulmayan hissəsidir;
              </p>
            </div>

            {/* Definition 15 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">15) hərəkət zolağı</span> – yolun hərəkət hissəsinin nişanlama xətti vasitəsilə bölünmüş, eni avtomobillərin bir sırada hərəkəti üçün kifayət edən hər hansı uzununa zolağıdır;
              </p>
            </div>

            {/* Definition 15-1 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">15-1) velosiped zolağı</span> – yolun hərəkət hissəsinin velosiped və kiçik elektrik nəqliyyat vasitələrinin hərəkəti üçün nəzərdə tutulmuş, 1.26 nişanlaması ilə işarələnmiş və uzununa nişanlama xətti ilə ayrılmış hissəsidir;
              </p>
            </div>

            {/* Definition 15-2 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">15-2) velosiped cığırı</span> – velosiped və kiçik elektrik nəqliyyat vasitələrinin hərəkəti üçün nəzərdə tutulmuş və 1.26 nişanlaması ilə işarələnmiş ayrıca yol və ya yol hissəsidir. Velosiped cığırı digər yoldan və ya eyni yolun digər elementlərindən konstruktiv şəkildə ayrılır;
              </p>
            </div>

            {/* Definition 15-3 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">15-3) velosiped yolu</span> – velosiped və kiçik elektrik nəqliyyat vasitələrinin hərəkətini təmin etmək üçün nəzərdə tutulmuş velosiped cığırı və ya zolağıdır;
              </p>
            </div>

            {/* Definition 16 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">16) səki</span> – yolun hərəkət hissəsinə bitişik olan və ya qazon vasitəsilə ondan ayrılmış, piyadaların hərəkəti üçün nəzərdə tutulan hissəsidir;
              </p>
            </div>

            {/* Definition 17 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">17) nəqliyyat vasitəsi</span> – yolda hərəkət üçün konstruksiya imkanları olan və insan tərəfindən idarə edilən qurğu, habelə onun qoşqusudur (nəqliyyat vasitələri mexaniki və insanın, yaxud heyvanın əzələ enerjisi ilə hərəkətə gətirilən nəqliyyat vasitələrinə bölünür);
              </p>
            </div>

            {/* Definition 18 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">18) mexaniki nəqliyyat vasitəsi</span> – asma mühərrikli velosipedlər və relsli nəqliyyat vasitələri istisna olmaqla, hər hansı özügedən nəqliyyat vasitəsidir;
              </p>
            </div>

            {/* Definition 19 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">19) avtomobil</span> – yollarda adamların və ya yüklərin daşınması, yaxud adam və ya yük daşıyan nəqliyyat vasitələrinin yedəyə alınması üçün istifadə edilən mexaniki nəqliyyat vasitəsidir (bu anlayış trolleybusları, yəni elektrik naqili ilə birləşdirilmiş relssiz nəqliyyat vasitələrini də əhatə edir. Lakin yollarda adamların və yüklərin daşınması və ya bu məqsədlə istifadə edilən nəqliyyat vasitələrinin yedəyə alınması üçün istifadə edilən və yalnız yardımçı funksiya daşıyan kənd təsərrüfatı traktorları kimi nəqliyyat vasitələrini əhatə etmir);
              </p>
            </div>

            {/* Definition 20 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">20) operativ nəqliyyat vasitələri</span> – yanğından mühafizə, polis, təcili tibbi yardım, qəza-xilasetmə bölmələrinin, hərbi avtomobil müfəttişliyinin və feldyeger rabitəsi orqanının, funksional tapşırıqlarının yerinə yetirilməsi, pul mədaxilinin inkassasiyası və qiymətli yüklərin daşınması, Azərbaycan Respublikasının ali vəzifəli şəxslərinin mühafizəsi vəzifələrinin icrası üçün nəzərdə tutulan, Milli operatora məxsus olan və poçtun daşınmasında istifadə edilən, üstündə xüsusi qrafikalı rəngli sxemlər, yazılar və tanınma nişanları olan, xüsusi işıq və səs siqnalları ilə təchiz edilmiş avtomobillərdir;
              </p>
            </div>

            {/* Definition 21 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">21) qoşqu</span> – mexaniki nəqliyyat vasitəsi ilə yedəyə alınmaq üçün nəzərdə tutulan hər hansı nəqliyyat vasitəsidir;
              </p>
            </div>

            {/* Definition 22 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">22) yarımqoşqu</span> – avtomobillərə birləşdirilmək üçün nəzərdə tutulan, bir hissəsi avtomobilə söykənərək özünün və yükün kütləsinin xeyli hissəsini onun üstünə salan hər hansı qoşqudur;
              </p>
            </div>

            {/* Definition 23 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">23) uzun ölçülü nəqliyyat vasitəsi</span> – uzunluğu 24 metrdən çox olan nəqliyyat vasitəsidir;
              </p>
            </div>

            {/* Definition 24 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">24) özügedən maşınlar</span> – tırtıllı traktorlar da daxil olmaqla tikintidə, meşə və kənd təsərrüfatında, başqa işlərdə istifadə üçün nəzərdə tutulan nəqliyyat vasitəsidir;
              </p>
            </div>

            {/* Definition 25 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">25) təkərli traktor</span> – yollarda qoşquları yedəyə almaq üçün istifadə edilən və konstruksiyasına görə maksimum sürəti saatda 30 kilometrdən yüksək olmayan nəqliyyat vasitəsidir;
              </p>
            </div>

            {/* Definition 25-1 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">25-1) trisikl</span> – işçi həcmi 50 kub santimetrdən çox olan daxiliyanma mühərriki ilə hərəkətə gətirilən və ya mühərrikinin tipindən asılı olmayaraq, maksimal konstruksiya sürəti saatda 50 kilometrdən yüksək olan və orta uzununa müstəviyə nəzərən simmetrik yerləşən üçtəkərli mexaniki nəqliyyat vasitəsidir;
              </p>
            </div>

            {/* Definition 25-2 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">25-2) yüngül kvadrisikl</span> – yüksüz vəziyyətdə kütləsi 350 kiloqramdan (elektrik mühərrikli nəqliyyat vasitələri üçün akkumulyatorların kütləsi nəzərə alınmır) çox olmayan dördtəkərli aşağıdakı mexaniki nəqliyyat vasitələridir:
              </p>
              <ul className="ml-6 space-y-1.5 text-[15px] leading-7">
                <li className="list-disc">işçi həcmi 50 kub santimetrdən çox olmayan məcburi alışdırmalı daxili yanma mühərriki ilə təchiz edilən nəqliyyat vasitələri;</li>
                <li className="list-disc">maksimal effektiv gücü 4 kVt-dan çox olmayan digər növ daxili yanma mühərriki ilə təchiz edilən nəqliyyat vasitələri;</li>
                <li className="list-disc">uzunmüddətli yüklənmə rejimində mühərrikinin nominal maksimal gücü 4 kVt-dan çox olmayan elektrik mühərriki ilə təchiz edilən nəqliyyat vasitələri;</li>
              </ul>
            </div>

            {/* Definition 25-3 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">25-3) kvadrisikl</span> – bu Qanunun 1-ci maddəsinin 25-2-ci bəndində nəzərdə tutulmuş nəqliyyat vasitələri istisna olmaqla, yüksüz vəziyyətdə kütləsi 400 kiloqramdan (yük daşımaq üçün nəzərdə tutulan nəqliyyat vasitələri üçün 550 kiloqramdan) çox olmayan (elektrik mühərrikli nəqliyyat vasitələri üçün akkumulyatorların kütləsi nəzərə alınmır) və maksimal effektiv gücü 15 kVt-dan çox olmayan mühərrikli dördtəkərli mexaniki nəqliyyat vasitəsidir;
              </p>
            </div>

            {/* Definition 25-4 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">25-4) kiçik elektrik nəqliyyat vasitəsi</span> – gücü 1 kVt-dan çox olmayan elektrik mühərriki ilə təchiz edilən, bir nəfərin daşınması üçün nəzərdə tutulan və aşağıdakı meyarlara cavab verən fərdi mobil nəqliyyat vasitələridir:
              </p>
              <ul className="ml-6 space-y-1.5 text-[15px] leading-7">
                <li className="list-disc">təkər çarxına mexaniki bağlanan və hərəkət istiqamətinə nəzarət etməyə imkan verən sükanı olan və ya sükanı olmayan, ətalət qüvvəsi (həmçinin jest, mimika və ya səsli komanda) ilə hərəkət edən və özünü tarazlaya bilən texnologiyaya malik olan;</li>
                <li className="list-disc">oturacağı olduğu halda sükanın hündürlüyü 50 sm-dən az olmayan;</li>
                <li className="list-disc">oturacağı olmadığı halda sükanın hündürlüyü 70 sm-dən az olmayan;</li>
                <li className="list-disc">sürücüsüz maksimum kütləsi 55 kq, ümumi hündürlüyü 1,40 m-ə qədər və uzunluğu 2 m-ə qədər olan;</li>
                <li className="list-disc">xarici elektrik enerjisi mənbəyinə qoşularaq doldurula bilən enerji saxlama sistemi (batareyası) olan;</li>
              </ul>
            </div>

            {/* Definition 25-5 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">25-5) kiçik elektrik nəqliyyat vasitələrinin operatoru</span> – kiçik elektrik nəqliyyat vasitəsini icarəyə (istifadəyə) verən hüquqi şəxs və ya fərdi sahibkar;
              </p>
            </div>

            {/* Definition 26 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">26) motosiklet</span> – mühərriki olan ikitəkərli, arabalı və ya arabasız mexaniki nəqliyyat vasitəsidir (trisikllər və yüngül kvadrisikllər motosikletlərə bərabər tutulur);
              </p>
            </div>

            {/* Definition 27 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">27) moped</span> – iş həcmi 50 kub santimetrdən çox olmayan mühərriklə hərəkətə gətirilən və maksimum konstruksiya sürəti saatda 50 kilometrdən yüksək olmayan iki və ya üç təkərli nəqliyyat vasitəsidir (asma mühərrikli velosipedlər və oxşar xüsusiyyətli digər nəqliyyat vasitələri də mopedlərə bərabər tutulur);
              </p>
            </div>

            {/* Definition 28 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">28) velosiped</span> – əlilliyi olan şəxs üçün açıq məkanda istifadə üçün mexaniki təkərli oturacaq istisna olmaqla, idarə edən şəxsin əzələ enerjisi ilə, xüsusən pedalların və ya dəstəklərin köməyi ilə hərəkətə gətirilən hər hansı nəqliyyat vasitəsidir;
              </p>
            </div>

            {/* Definition 29 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">29) nəqliyyat vasitəsinin dayanması</span> – adamların minməsi və ya düşməsi, yaxud yüklərin yığılması və ya boşaldılması üçün zəruri olan vaxt ərzində nəqliyyat vasitəsinin hərəkətsiz vəziyyətə gətirilməsidir;
              </p>
            </div>

            {/* Definition 30 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">30) məcburi dayanma</span> – texniki nasazlıq və ya aparılan yükün, sürücünün (sərnişinin) vəziyyətinin və ya yolda maneə yaranmasının doğurduğu təhlükə üzündən nəqliyyat vasitəsinin hərəkətinin dayandırılmasıdır;
              </p>
            </div>

            {/* Definition 31 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">31) nəqliyyat vasitəsinin durması</span> – əgər nəqliyyat vasitəsi digər yol istifadəçisi və ya hər hansı maneə ilə toqquşmanın qarşısını almaq və ya hərəkət qaydalarının göstərişlərini yerinə yetirmək səbəblərindən başqa digər səbəblərə görə hərəkətsiz vəziyyətə gətirilmişdirsə və onun dayanması adamların minməsi və ya düşməsi, yaxud yüklərin yığılması və ya boşaldılması üçün zəruri olan vaxtla məhdudlaşmırsa, nəqliyyat vasitəsi durmuş hesab edilir;
              </p>
            </div>

            {/* Definition 32 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">32) parklanma</span> – nəqliyyat vasitəsinin parklanma yerlərində durmasıdır.
              </p>
            </div>

            {/* Definition 32-1 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">32-1) parklanma yeri</span> – yaşayış məntəqələrinin hüdudlarında avtomobil yolunun hərəkət hissəsində və ya ona bitişik hissədə nəqliyyat vasitələrinin durması üçün ayrılmış, bu Qanunla müəyyən edilmiş qaydada işarələnmiş və təchiz edilmiş yerdir;
              </p>
            </div>

            {/* Definition 32-2 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">32-2) parklanma məntəqəsi</span> – avtomobil yolunun hərəkət hissəsində və ya ona bitişik hissədə nəqliyyat vasitələrinin durması üçün ayrılmış bir neçə parklanma yerinin və ya xidməti parklanma yerinin olduğu ərazidir;
              </p>
            </div>

            {/* Definition 32-3 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">32-3) xidməti parklanma yeri</span> – xidməti zərurətlə əlaqədar dövlət orqanlarının (qurumlarının) istifadəsində olan, dövlət orqanlarının (qurumlarının) əməkdaşlarına məxsus olan və ya "D", "T" və "FK" seriyaları üzrə dövlət qeydiyyat nişanı olan nəqliyyat vasitələrinin durması üçün bu Qanunla müəyyən edilmiş qaydada işarələnmiş və təchiz edilmiş ödənişsiz parklanma yeridir;
              </p>
            </div>

            {/* Definition 33 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">33) yol hərəkəti iştirakçısı</span> – hərəkət prosesində piyada, nəqliyyat vasitəsinin sürücüsü, sərnişin, velosipedçi, mal-qara ötürən qismində iştirak edən, habelə avtomobil yollarından, küçələrdən, dəmiryol keçidlərindən və ya nəqliyyat vasitələri ilə adamların və yüklərin daşınması üçün nəzərdə tutulmuş digər yerlərdən istifadə edən şəxsdir;
              </p>
            </div>

            {/* Definition 34 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">34) sürücü</span> – hər hansı növ nəqliyyat vasitəsini idarə edən şəxsdir (sürücülüyü öyrədən avtomobil təlimatçısı da sürücüyə bərabər tutulur);
              </p>
            </div>

            {/* Definition 35 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">35) sərnişin</span> – nəqliyyat vasitəsində hərəkətdə olan, lakin onun idarə edilməsinə aidiyyəti olmayan şəxsdir;
              </p>
            </div>

            {/* Definition 36 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">36) piyada</span> – nəqliyyat vasitələrindən kənarda yol hərəkətində iştirak edən və yolda hər hansı iş görməyən şəxsdir (əlilliyi olan şəxs üçün açıq məkanda istifadə üçün mexaniki təkərli oturacaqda gedən, velosiped, kiçik elektrik nəqliyyat vasitəsi, moped və ya motosiklet aparan, kirşə, əl arabası, uşaq üçün araba və ya əlilliyi olan şəxs üçün açıq məkanda istifadə üçün mexaniki təkərli oturacağı aparan şəxslər də piyadaya bərabər tutulur);
              </p>
            </div>

            {/* Definition 37 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">37) velosipedçi</span> – velosipedi idarə edən şəxsdir;
              </p>
            </div>

            {/* Definition 38 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">38) mal-qara ötürən</span> – mal-qaranı, yük və ya minik heyvanlarını yoldan keçirən şəxsdir;
              </p>
            </div>

            {/* Definition 39 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">39) ötmə</span> - hərəkət etdiyi zolağı dəyişməklə hərəkətdə olan bir və ya bir neçə nəqliyyat vasitəsini ötüb keçməkdir;
              </p>
            </div>

            {/* Definition 40 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">40) üstünlük</span> – nəzərdə tutulan istiqamətdə digər hərəkət iştirakçılarına nisbətən ilk növbədə hərəkət etmək hüququdur;
              </p>
            </div>

            {/* Definition 41 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">41) yol vermək</span> – sürücünün hərəkəti davam etdirməsi və ya yenidən hərəkətə başlaması, hər hansı manevr etməsi başqa nəqliyyat vasitələrinin sürücülərini və piyadaları qəflətən hərəkət istiqamətini və ya sürəti dəyişdirməyə məcbur edə biləcəyi halda, onun hərəkəti davam etdirməməsi və ya yenidən hərəkətə başlamaması, manevr etməməsidir;
              </p>
            </div>

            {/* Definition 42 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">42) məhdudiyyətli görünmə</span> — duman, yağış, qar və başqa şəraitdə, habelə toranlıqda yolun 300 metrdən az məsafədə görünməsidir;
              </p>
            </div>

            {/* Definition 43 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">43) yol-nəqliyyat hadisəsi</span> — yollarda, küçələrdə, meydanlarda, dəmiryol keçidlərində nəqliyyat vasitələrinin hərəkəti prosesində baş verən və adamların həlakına və ya müxtəlif dərəcəli bədən xəsarəti almasına, heyvanların və ya hərəkətsiz maneənin vurulmasına, nəqliyyat vasitələrinin, yolların, qurğuların zədələnməsinə və ya başqa maddi zərər dəyməsinə səbəb olan hadisədir.
              </p>
            </div>

            {/* Definition 44 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">44) ümumi istifadədə olan nəqliyyat vasitəsi</span> - sərnişin daşınması üçün nəzərdə tutulmuş, müəyyən edilmiş marşrut üzrə təyin edilmiş dayanacaqlarla hərəkət edən nəqliyyat vasitəsidir (avtobus, trolleybus, tramvay);
              </p>
            </div>

            {/* Definition 45 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">45) mütəşəkkil nəqliyyat dəstəsi</span> - qarşıda qırmızı və ya göy sayrışan işıq və xüsusi səs siqnalı ilə təchiz edilmiş operativ nəqliyyat vasitəsinin müşayiəti ilə bir hərəkət zolağında bir-birinin ardınca faraları yandırılmış vəziyyətdə hərəkət edən üç və ya daha artıq mexaniki nəqliyyat vasitəsindən ibarət olan dəstədir;
              </p>
            </div>

            {/* Definition 46 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">46) avtoqatar</span> - bir mexaniki nəqliyyat vasitəsinə qoşularaq birlikdə hərəkət edən bir neçə nəqliyyat vasitəsindən ibarət tərkibdir;
              </p>
            </div>

            {/* Definition 47 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">47) icazə verilən maksimum kütlə</span> - istehsalçı müəssisə tərəfindən müəyyən edilmiş, nəqliyyat vasitəsinin sürücü, sərnişin və yüklə birlikdə yol verilən kütləsinin yuxarı həddidir. Avtoqatarın icazə verilən maksimum kütləsi tərkibə daxil olan nəqliyyat vasitələrinin icazə verilən maksimum kütlələrinin cəmindən ibarətdir;
              </p>
            </div>

            {/* Definition 48 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">48) sutkanın qaranlıq vaxtı</span> - sutkanın günəş batandan günəş çıxanadək olan müddətidir;
              </p>
            </div>

            {/* Definition 49 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">49) yaşayış məntəqəsi</span> - giriş və çıxışları müvafiq olaraq 5.22-5.25 nişanları ilə işarələnmiş, əhalinin yığcam məskunlaşdığı ərazidir. Ağ fonu olan 5.22 və 5.23 nişanları yaşayış məntəqələrində hərəkət qaydalarını tənzimləyən müvafiq tələblərin tətbiq olunduğunu, göy fonu olan 5.24 və 5.25 nişanları yaşayış məntəqələrində hərəkət qaydalarını tənzimləyən müvafiq tələblərin bu yolda tətbiq olunmadığını göstərir;
              </p>
            </div>

            {/* Definition 50 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">50) yaşayış zonası</span> – yaşayış məntəqəsinin giriş və çıxışları müvafiq olaraq 5.51 və 5.52 nişanları ilə işarələnmiş hissəsidir;
              </p>
            </div>

            {/* Definition 51 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">51) ağırçəkili nəqliyyat vasitəsi</span> - ümumi istifadədə olan avtomobil yolları və yol qurğuları üçün müəyyən edilmiş çəki və ya oxlar üzrə parametr hədlərini aşan yüklü və ya yüksüz nəqliyyat vasitəsidir;
              </p>
            </div>

            {/* Definition 52 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">52) iriqabaritli nəqliyyat vasitəsi</span> - ümumi istifadədə olan avtomobil yolları və yol qurğuları üçün müəyyən edilmiş qabarit parametr hədlərini aşan yüklü və ya yüksüz nəqliyyat vasitəsidir;
              </p>
            </div>

            {/* Definition 53 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">53) texnoloji nəqliyyat vasitəsi</span> - küçə-yol şəbəkəsində istismar üçün nəzərdə tutulmayan, sənaye sahələrində müvafiq texnoloji proseslərin həyata keçirilməsi zamanı istifadə edilən, xüsusi texnoloji qurğu və avadanlıqlarla təchiz edilmiş nəqliyyat vasitəsidir;
              </p>
            </div>

            {/* Definition 54 */}
            <div className="space-y-2">
              <p className="text-[15px] leading-7">
                <span className="font-semibold text-gray-900">54) taxoqraf</span> – nəqliyyat vasitəsinin hərəkətinə, o cümlədən qət edilmiş məsafəyə, hərəkətin sürətinə, habelə sürücülərin iş və istirahət dövrlərinə dair bütün məlumatları fasiləsiz olaraq ölçmək və ya qeydə almaq məqsədi ilə həmin nəqliyyat vasitəsində quraşdırılan elektromexaniki və ya elektron nəzarət cihazıdır.
              </p>
            </div>
          </div>
        </div>

        {/* Document footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-8 py-4">
          <p className="text-xs text-gray-500 text-center">
            "Yol hərəkəti haqqında" Azərbaycan Respublikasının Qanunu - Maddə 1
          </p>
        </div>
      </div>
    </div>
  )
}
