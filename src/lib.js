
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export const log = (...args) => console.log(...args);


export const Back = (props) => {

    const navigate = useNavigate();

    return (

        <button onClick={() => navigate(-1)}>Back</button>

    );
};

export const TopBar = ({ name, children, leftSide, noholder, ...props }) => {

    const navigate = useNavigate();

    log("children", children);

    let app = "مدارات"

    return [(

        <div topbar="" key="1" {...props}>
            <div>
                <Link onClick={() => {
                    window.location = window.location.pathname.split("/").slice(0, -1).join("/") || "/"

                }
                }
                    to="#" className="barIcon">
                    {leftSide ? leftSide : <Icon name="chevron-left" />}
                </Link>
                <div title={name}>
                    <span>
                        {app}{name ? " | " : ""}{name}
                    </span>
                </div>
                <a className="barIcon" href="#">
                    <Icon name="circle-info" />
                </a>
            </div>
            {children}
        </div >

    ), noholder ? null :
        <div topbarholder="" topbarholder2={children ? "" : null} key="2" />];
}

export const Icon = ({ svg, name, className = "", ...more }) => (
    <div  {...more} className="icon" dangerouslySetInnerHTML={{
        __html: svg ? svg : (window.FontAwesome.icon(
            {
                prefix: name.split("_")[1] ? name.split("_")[0] : "fal",
                iconName: name.split("_")[1] || name
            }
        ) || { html: [""] }).html[0]
    }}
    />
)

export const SearchBar = ({ children, onChange }) => {

    return (
        <div searchbar="">
            <input dir="auto" placeholder="إبحث بالعربية أو الإنجليزية"
                onChange={e => onChange(e.target.value, e)} />
            <div searchicon="">
                <Icon name="magnifying-glass" />
            </div>
        </div>
    )

}

export const addScript = (url) => new Promise((res, rej) => {

    if (document.head.innerHTML.includes(url)) return res(1);

    var script = document.createElement('script');
    script.onload = res;
    script.src = url;
    document.head.appendChild(script);
});

export const addStyle = (url) => new Promise((res, rej) => {

    if (document.head.innerHTML.includes(url)) return res(1);

    var link = document.createElement('link');
    link.onload = res;
    link.href = url;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    document.head.appendChild(link);
});

export const addToHead = (...urls) => {
    let promiseList = [];

    urls.forEach(url => {
        if (Array.isArray(url)) {

            var tag = document.createElement(url[0]);
            tag.innerHTML = url[1];

            document.head.appendChild(tag);

            return;
        }
        promiseList.push(
            url.slice(-3) == ".js" ? addScript(url) : addStyle(url)
        )
    });

    return Promise.all(promiseList);
}