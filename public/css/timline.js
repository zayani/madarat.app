import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { TopBar, Icon, addToHead } from "../lib";



let toDateObj = (year, month, day, hour, minute, second, millisecond, display_date) => {
    return { year, month, day, hour, minute, second, millisecond, display_date };
}



const event = (date, headline, text, media, ...args) => {

    if (media) media = { url: media[0] };

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
                text: { headline: e[3], text: e[4] },
            })

            return;
        }

        let ev = event(...e);

        O.events.push(ev);

        ev.unique_id = "" + O.events.length;
    })

    return O;
}

let discoveryOfSolarSystem = [
    ["title", "عصر ما قبل التاريخ",
        "تم اكتشاف الشمس والقمر بالإضافة الى الكواكب الستة الأولى (عطار، الرزهر، الأرض، المريخ،  المشترى، زحل) في عصور ماقبل تدوين التاريخ",
        ['./imgs/solar2/solar_prehistoric.png']],
    ["era", "1600,1,1", "1699,12,31", "القرن 17"],
    ["era", "1700,1,1", "1799,12,31", "القرن 18"],
    ["1610,1,7", "أقمار غاليليو", "جاليليو جاليلي قام باكتشاف أقمار غاليليو الأربعة التي تدور حول المشتري (غانيميد، كاليستو، آيو، أوروبا)"],
    ["1655,3,25", "قمر تيتان", "قام باكتشافه كريستيان هوغنس"],
    ["1671,10,25", "قمر تيتان", "قام باكتشافه كريستيان هوغنس"],
    ["1672,12,23", "قمر تيتان", "قام باكتشافه كريستيان هوغنس"],
    ["1684,3,21", "قمر تيتان", "قام باكتشافه كريستيان هوغنس"],
]

console.log("discoveryOfSolarSystem", toTLJSON(discoveryOfSolarSystem));

export default function () {

    let [loaded, setLoaded] = useState(0);

    useEffect(async () => {

        if (loaded) return;

        let l = await addToHead(
            'https://cdnjs.cloudflare.com/ajax/libs/timelinejs/3.6.6/css/timeline.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/timelinejs/3.6.6/js/timeline-min.js',
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

            `]
        );

        console.log("loaded", l);




        setLoaded(1);

        window.timeline = new window.TL.Timeline('timeline', toTLJSON(discoveryOfSolarSystem),
            { timenav_position: "top", hash_bookmark: true, language: "ar.json" });


    });


    return (
        <div>
            <TopBar name="خطوط زمنية" />
            <div style={{ marginTop: "-20px", textAlign: 'center', background: 'var(--c1)', color: '#fff', padding: 10 }}>
                اكتشاف النظام الشمس
            </div>
            <div id='timeline' style={{ width: '100%', height: '600px', }}></div>
        </div>
    );
}