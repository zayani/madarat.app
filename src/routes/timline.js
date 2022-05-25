import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { TopBar, Icon } from "../lib";




const addScript = (url) => new Promise((res, rej) => {

    if (document.head.innerHTML.includes(url)) return res(1);

    var script = document.createElement('script');
    script.onload = res;
    script.src = url;
    document.head.appendChild(script);
});

const addStyle = (url) => new Promise((res, rej) => {

    if (document.head.innerHTML.includes(url)) return res(1);

    var link = document.createElement('link');
    link.onload = res;
    link.href = url;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    document.head.appendChild(link);
});

const addToHead = (...urls) => {
    let promiseList = [];

    urls.forEach(url => promiseList.push(
        url.slice(-3) == ".js" ? addScript(url) : addStyle(url)
    ));

    return Promise.all(promiseList);
}




const Loading = () => {

    return (
        <div style={{ textAlign: 'center' }}>
            ...
            تحميل
            ...
        </div>
    )
}



export default function () {

    let [loaded, setLoaded] = useState(0);

    useEffect(async () => {

        let l = await addToHead(
            'https://cdnjs.cloudflare.com/ajax/libs/timelinejs/3.6.6/css/timeline.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/timelinejs/3.6.6/js/timeline-min.js'
        );

        console.log("loaded", l);

        setLoaded(1);

    });


    return (
        <div>

            <TopBar name="خطوط زمنية" />
            <div>
                {!loaded ? <Loading /> : <div>done</div>}
            </div>
        </div>
    );
}