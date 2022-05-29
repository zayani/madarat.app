import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { TopBar, Icon, log } from "../lib";

const periods = [
    { n: "عطارد", y: 0.240846, l: "عطاردية" },
    { n: "الزهرة", y: 0.615, l: "زهرية" },
    { n: "الأرض", y: 1, l: "أرضية" },
    { n: "المريخ", y: 1.881, l: "مريخية" },
    { n: "المشترى", y: 11.86, l: "مشتراوية" },
    { n: "زحل", y: 29.46, l: "زحلية" },
    { n: "أورانوس", y: 84.01, l: "أورانوسية" },
    { n: "نبتون", y: 164.8, l: "نيوتنية" },
    // { n: "بلوتو", y: 248.1, l: "بلوتوية" },

]

export const DatePicker = ({ onDate }) => {

    let $dd, $mm, $yyyy;

    let currentYear = (new Date()).getFullYear();

    let days = [...Array(31).keys()].map(x => x + 1);
    let months = [...Array(12).keys()].map(x => x + 1);
    let years = [...Array(120).keys()].map(x => currentYear - x);

    let onChange = (e) => {

        console.log(e);

        let [y, m, d] = [$yyyy.value, $mm.value, $dd.value];

        if (!y || !m || !d) return;

        let date = new Date(`${y}-${m}-${d}`);

        if (date > new Date()) date = new Date();

        let [rd, rm, ry] =
            [date.getDate(),
            date.getMonth() + 1,
            date.getFullYear()];

        console.log(`${ry}-${rm}-${rd}`);

        onDate(`${ry}-${rm}-${rd}`);

        $yyyy.value = ry;
        $mm.value = rm;
        $dd.value = rd;

    }

    return (
        <div date-picker="">
            <select defaultValue={''} name="dp-days" required
                ref={ref => $dd = ref} onChange={onChange} >
                <option value='' disabled >يوم</option>
                {days.map(x => <option value={x} key={x}>{x}</option>)}
            </select>
            <select defaultValue={''} name="dp-months" required
                ref={ref => $mm = ref} onChange={onChange} >
                <option value="" disabled>شهر</option>
                {months.map(x => <option value={x} key={x}>{x}</option>)}
            </select>
            <select defaultValue={''} name="dp-years" required
                ref={ref => $yyyy = ref} onChange={onChange} >
                <option value="" disabled>سنة</option>
                {years.map(x => <option value={x} key={x}>{x}</option>)}
            </select>
        </div>
    )

}

let msinYear = (1000 * 60 * 60 * 24 * 365.2425);

export default function () {

    let [bd, set_bd] = useState(
        //'1982-1-19'
    );

    let onDate = d => {
        log(d);
        set_bd(d)
    }

    //if (!bd) set_bd("1982-01-19");

    let $bd, nextBDList = {};


    //age in earth yearsc
    let age = bd ? (Date.now() - new Date(bd)) / msinYear : 0;

    let nextBD = (n, y, l, i) => {

        let D2S = d => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

        let today = new Date(D2S(new Date()));

        if (!bd) return " ";

        let nextBDY = Math.floor(age / y);


        let nextbd = new Date(bd) - 0 + (nextBDY * y * msinYear);

        if (nextbd < today) {
            nextBDY += 1;
            nextbd = new Date(bd) - 0 + (nextBDY * y * msinYear);
        }

        nextbd = new Date(nextbd);

        if (i == 2) {
            let bdd = new Date(bd);
            if (today.getMonth() == bdd.getMonth() && today.getDate() == bdd.getDate()) {
                nextBDY = Math.floor(age);
                nextbd = today;
            }
            else {
                nextBDY = Math.floor(age) + 1;
                nextbd = new Date(`${bdd.getFullYear() + nextBDY}-${bdd.getMonth() + 1}-${bdd.getDate()}`);
            }
        }

        console.log(n, nextBDY, nextbd);

        return [nextbd, <div>
            {D2S(nextbd)}
            {" "}({nextBDY} سنة {l})
        </div>, nextBDY];
    }


    log(age, age.toFixed(2), "earth year");
    $bd = periods.map(({ n, y, l }, i) => {

        nextBDList[n] = nextBD(n, y, l, i)

        console.log('nnn', n, (age / y).toPrecision(3), nextBDList[n][2]);

        return (
            <div planet-age="" key={n} style={{ backgroundImage: `url('/imgs/solar2/b${i + 1}.png')` }}  >
                <div>

                    {
                        (age / y) > 100 ?
                            (age / y).toPrecision(4) :
                            (age / y).toPrecision(3)
                    } سنة {l}

                </div>
                <div>
                    🎂 عيد ميلادك القادم في {n}
                </div>
                <div>
                    {nextBDList[n][1]}

                </div>

            </div>
        )
    })

    let tonextbd;


    const getDayN = (date) => {
        let d = new Date(date);

        let baseDay = Math.floor(
            new Date(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5
        );

        return baseDay;
    }

    if (bd) {
        let min_diff = 1e12, min_diff_name;

        let baseDay = getDayN(Date.now());

        Object.entries(nextBDList).forEach(([name, [nextBD]]) => {

            let diff = getDayN(nextBD) - baseDay;

            if (diff < min_diff) {
                min_diff = diff;
                min_diff_name = name
            }

            console.log(name, nextBD, diff)
        })




        tonextbd = min_diff == 0 ? <div>
            {`اليوم هو عيد ميلادك في كوكب ${min_diff_name}`}
        </div>
            :
            min_diff == 1 ? <div>
                {`غدًا هو عيد ميلادك في كوكب ${min_diff_name}`}
            </div> :
                `تبقى
    ${min_diff}
     يوم على عيد ميلادك في
    ${min_diff_name}
    `

        console.log(min_diff, min_diff_name, tonextbd);
    }

    return (
        <div planetage="">
            <TopBar name="عمرك الكوكبي" />

            <div select-bd="">
                إدخل تاريخ ميلادك لمعرفة عمرك الكوكبي
            </div>
            <DatePicker onDate={onDate} />

            <div className="tonextbd" >{tonextbd}</div>

            <div planets-ages=""  >{bd ? $bd : ""}</div>
        </div>
    );
}