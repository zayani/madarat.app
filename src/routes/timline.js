import React, { useState, useEffect } from 'react';
import { TopBar, Icon, addToHead } from "../lib";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet
} from "react-router-dom";


let toDateObj = (year, month, day, hour, minute, second, millisecond, display_date) => {
    return { year, month, day, hour, minute, second, millisecond, display_date };
}



const event = (date, headline, text, media, ...args) => {


    if (media) media = { url: Array.isArray(media) ? media[0] : media };

    let e = {
        start_date: toDateObj(...(Array.isArray(date) ? date : date.split(","))),
        text: { headline, text },
        media
    };

    return Object.assign(e, ...args);
}


let toTLJSON = (Events) => {
    let O = { events: [], eras: [] };

    Events.forEach(e => {
        if (e[0] == "title") {

            O.title = event("", ...e.slice(1));
            O.title.unique_id = "0";
            return;
        }

        if (e[0] == "era") {
            O.eras.push({
                start_date: toDateObj(...(Array.isArray(e[1]) ? e[1] : e[1].split(","))),
                end_date: toDateObj(...(Array.isArray(e[2]) ? e[2] : e[2].split(","))),
                text: { headline: (e[3] || "").trim(), text: (e[4] || "").trim() },
            })

            return;
        }

        let ev = event(...e);

        O.events.push(ev);

        ev.unique_id = "" + O.events.length;
    })

    return O;
}

let cw = `https://upload.wikimedia.org/wikipedia/commons`;

let discoveryOfSolarSystem = [
    ["title", "عصر ما قبل التاريخ", `
    تم اكتشاف الشمس والقمر بالإضافة الى الكواكب الستة الأولى (عطارد، الزهرة، الأرض، المريخ، المشترى، زحل) في عصور ماقبل تدوين التاريخ
    `,
        `${cw}/5/50/Solar_System_true_color_%28planets_and_their_moons%29.jpg`],

    ["era", "1600,1,1", "1699,12,31", "القرن 17"],
    ["era", "1700,1,1", "1799,12,31", "القرن 18"],
    ["era", "1800,1,1", "1899,12,31", "القرن 19"],
    ["era", "1900,1,1", "1949,12,31", "اول القرن 20"],
    ["era", "1950,1,1", "2022,12,31", "مابعد 1950"],

    //1600s

    ["1610,1", "أقمار غاليليو",
        "أقمار غاليليو هي أكبر أربعة أقمارٍ تابعة لكوكب المشتري اكتشفها غاليليو غاليلي يناير 1610، "
        + "وهي من بين أكثر الأجسام ضخامة في المجموعة الشمسية عدا الشمس والكواكب الثمانية",
        `${cw}/f/fe/Jupiter_and_the_Galilean_Satellites.jpg`
    ],

    ["1655,3", "قمر تيتان", "قام باكتشافه كريستيان هوغنس، تيتان (Titan) هو أكبر أقمار زحل، وهو القمر الوحيد المعروف أنه له غلاف جوي كثيف، وهو الجُرم الفلكي الوحيد غير الأرض الذي تم العثور على أدلة واضحة على وجود كُتل من السائل السطحي عليه",
        `${cw}/4/45/Titan_in_true_color.jpg`],

    ["1671,10", "إيابيتوس", "القمر إيابيتوس (Iapetus) هو ثالث أكبر قمر من أقمار زحل والحادي عشر من بين أقمار المجموعة الشمسية. إكتشفه جيوفاني كاسيني سنة 1671",
        `${cw}/thumb/c/c9/Iapetus_as_seen_by_the_Cassini_probe_-_20071008.jpg/1024px-Iapetus_as_seen_by_the_Cassini_probe_-_20071008.jpg`],
    ["1672,12", "ريا", "القمر ريا هو ثاني أكبر قمر لزحل وهو تاسع أكبر قمر في المجموعة الشمسية. وقد اكتشف في عام 1672م من قبل جيوفاني كاسيني",
        `${cw}/thumb/a/ab/PIA07763_Rhea_full_globe5.jpg/1024px-PIA07763_Rhea_full_globe5.jpg`
    ],
    ["1684,3", "تثيس و ديون", `
    تثيس و ديون قمرين من أقمار زحل، قام كاسيني باكتشاف بتسمية هذين القمرين
    `,
        `https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2007/06/tethys_and_dione_juxtaposed/9566219-4-eng-GB/Tethys_and_Dione_juxtaposed_pillars.jpg`],

    //1700s

    ["1781,3", "أورانوس", `
    الكوكب السابع بعدًا عن الشمس، أول من أعلن باكتشافه هو ويليام هيرشل في 26 أبريل عام 1781 وكان يظن في البداية بأنه مذنب
    `,
        `https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29.png/1024px-Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29.png`],


    ["1787,1", "تيتانيا وأوبيرون", `
    قمري تيتانيا وأوبيرون أكبر أقمار كوكب أورانوس وقام باكتشافهم ويليام هيرشل بعد اكتشافه لكوكب أورانوس
    `,
        `https://static.tvtropes.org/pmwiki/pub/images/titania_and_oberon.jpg`],



    ["1789,9", "إنسيلادوس و مايمس", `
        إنسيلادوس و مايمس قمرين تابعين لزحل اكتشفهم ويليام هرشل 1787
                `,
        `https://static.independent.co.uk/2022/01/20/07/Low-Res_saturn-moons-mimas-enceladus-3328x1800-hero.jpg.png?quality=75&width=990&auto=webp&crop=982:726,smart`],




    ["1801,1", "سيريس", `
        سيريس أول كويكب مُكتشف، واكتشف بواسطة «جوزيبه بيازي» بمرصد «باليرمو» الفلكي في الأول من يناير عام 1801. اعتبر سيريس كوكبًا في البداية، ثم أُعيد تصنيفه إلى كوكب قزم في خمسينيات القرن التاسع عشر بعد اكتشاف أجرام أخرى عديدة في مدارات مشابهة ويعتبر أكبر الأجرام الموجودة في حزام الكويكبات الرئيسي الذي يقع بين مدار كوكب المريخ ومدار كوكب المشتري
                `,
        `https://upload.wikimedia.org/wikipedia/commons/7/76/Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg`],


    ["1846,9", "نيبتون", `
        ويطلق عليه الكوكب الأزرق هو أحد وهو ثامن كواكب المجموعة الشمسية بعدًا عن الشمس، نبتون هو الكوكب الوحيد في النظام الشمسي الذي تم اكتشافه عبر المعادلات والتوقع الرياضي بدلاً من الرصد المنتظم
        `,
        `https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg`],

    ["1846,10", "ترايتون", `
        `,
        ``],

    ["1848,9", "هايبريون", `
        `,
        ``],

    ["1851,10", "أرييل وأومبريل", `
        `,
        ``],

    ["1877,8", "ديموس وفوبوس", `
        `,
        ``],

    ["1892,9", "أمالثيا", `
        `,
        ``],

    ["1898,8", "فوبي", `
        `,
        ``],

    //1900s


    ["1904,3", "هيمالايا", `
        `,
        ``],

    ["1905,1", "إلارا", `
        `,
        ``],

    ["1908,1", "باسيفي", `
        `,
        ``],

    ["1914,7", "سينوبي", `
        `,
        ``],

    ["1930,1", "بلوتو", `
    كوكب قزم في حزام كايبر، حلقة من الأجسام الفلكية وراء نبتون وهو أول جرم فلكي يكتشف في حزام كايبر، ولقد اكتشفهُ العالم الفلكي كلايد تومبو في عام 1930 وكان يعتبر في الأصل أصغر كواكب المجموعة الشمسية التسعة
        `,
        `https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/1024px-Pluto_in_True_Color_-_High-Res.jpg`],

    ["1938,7", "ليسيثيا وكارم", `
        `,
        ``],


    ["1948,2", "ميراندا", `
        `,
        ``],

    ["1949,5", "نيريد", `
        `,
        ``],

    //

    ["1950,1", "مابعد 1950", `
    بعد عام 1950 توالت اكتشاف الأقمار والكواكب القزمة في المجموعة الشمسية بوتيرة عالية، ومازلنا نكتشف المزيد كل يوم
        `,
        `https://upload.wikimedia.org/wikipedia/commons/c/cf/Hale_telescope_mirror_during_grinding_1945.jpg`],

]

console.log("discoveryOfSolarSystem", toTLJSON(discoveryOfSolarSystem));

export function TimelineSwitch() {

    return (

        <div>
            <TopBar name="خطوط زمنية" />
            <Link
                class="TLswitch"
                to="discoveryOfSolarSystem">
                الخط الزمني لاكتشاف اجرام النظام الشمسي
            </Link>

            <a class="TLswitch soon">
                الخط الزمني لتاريخ التلسكوبات
            </a>

            <a class="TLswitch soon">
                الخط الزمني لوكالة ناسا
            </a>

            <a class="TLswitch soon">
                الخط الزمني لحرب الفضاء
            </a>



            <Outlet />
        </div>



    )

}

export function Timeline() {

    let [loaded, setLoaded] = useState(0);

    useEffect(async () => {

        if (loaded) return;

        let l = await addToHead(
            'https://cdnjs.cloudflare.com/ajax/libs/timelinejs/3.6.6/css/timeline.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/timelinejs/3.6.6/js/timeline-min.js',
            'css/timeline.css',
            ['style', `
            .tl-message-content,.tl-button {
                color: transparent !important;
                font-size: 0px !important;
            }

            .tl-message-content::before {
                color: #666;
                font-size: 24px;
                content: 'مرر افقيًا للتنقل ';
            }

            .tl-button {
                border: 1px solid #666;
            }

            .tl-button::before {
                color: #666;
                font-size: 22px;
                line-height: 30px;
                padding: 15px;
                content: 'ابدأ';
            }

            .tl-slidenav-description {
                direction: rtl;
            }
            `]
        );



        console.log("loaded", l);




        setLoaded(1);

        window.timeline = new window.TL.Timeline('timeline', toTLJSON(discoveryOfSolarSystem),
            { timenav_position: "top", hash_bookmark: true, language: "../ar.json", debug: true });


    });




    return (
        <div>
            <TopBar name="خطوط زمنية" />
            <div style={{ marginTop: "-20px", textAlign: 'center', background: 'var(--c1)', color: '#fff', padding: 10 }}>
                الخط الزمني لاكتشاف اجرام النظام الشمس (غير مكتمل)
            </div>
            <div id='timeline' style={{ width: '100%', height: '600px', }}></div>
        </div>
    );
}