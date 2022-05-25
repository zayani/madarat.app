import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Icon, log, TopBar } from './lib'

import style from "./App.css";
import './_/js/fontawesome';
import './_/js/light_c';
import SVGICONS from './_/svgs/Artemis.svg';
import logo from './logo.svg'

let version = "0.21";

log('logo', logo);


let mApps = [

    { name: "مصطلحات فضائية", icon: "fal_book-sparkles", url: 'terms' },
    { name: "عمرك الكوكبي", icon: "fal_cake-candles", url: 'planetage' },
    { name: "خطوط زمنية", icon: "fal_timeline", url: "timeline" },

    { name: "مقياس الكون", icon: "fal_ruler-vertical", url2: 'universe_scale' },
    //{ name: "الإطلاقات", icon: "fal_rocket-launch", desc: "" },
    { name: "التقويم الفضائي", icon: "fal_calendar-check", desc: "" },
    { name: "مهام فضائية", icon: "fal_planet-ringed", desc: "" },


    { name: "ارتميس", svg: SVGICONS.Artemis, desc: "" },
    { name: "نظم إطلاق", icon: "fal_shuttle-space", desc: "" },
    { name: "رياديو الفضاء", icon: "fal_graduation-cap", desc: "" },
    { name: "نوادي وجمعيات", icon: "fal_screen-users", desc: "" },
    { name: "أجرام", icon: "fal_solar-system", desc: "" },
    { name: "حقائق مثيرة", icon: "fal_hexagon-exclamation", desc: "" },

    { name: "فضاء البحرين", svg: SVGICONS.NSSA, desc: "" },
    { name: "فضاء السعودية", svg: SVGICONS.SSC, desc: "" },
    { name: "فضاء الإمارات", svg: SVGICONS.UAESA, desc: "" },
    { name: "فضاء الكويت", svg: SVGICONS.KSR, desc: "" },

]




let $mApps = mApps.map(({ name, link, icon, svg, desc, url }) => (
    <div className="iconHolder" key={name}>
        <Link to={url || "soon"} soon={url ? null : 1}>
            <Icon name={icon} svg={svg} />
            <div className="iconname" >{name}</div>
        </Link>
    </div>
));

export default function App() {

    useEffect(() => {
        setTimeout(_ => document.body.setAttribute("loaded", 1), 0);
    });

    /*
          <div id="app-title" style={{ backgroundImage: `url(${logo})` }}>
                مدارات
                <sup>
                    {" "}
                    تجريبية
                    {version}</sup>
            </div>

                    <div id="desc" style={{ backgroundImage: `url(${logo})` }}>

                منصة مدارات هي منصة مصممة على شكل تطبيقات مصغرة بهدف تقديم المعلومات العلمية والمسلية وزيادة الوعي والتفاعل المجتمعي في مجال الفلك والفضاء
            </div>
    */

    let $logo = <div mainLogo=""></div>;

    return (
        <div>
            <TopBar name="" mainTopBar=""
                leftSide={$logo} />
            <div id="mApps">





                {$mApps}

            </div>
        </div>
    )


}