
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export const log = (...args) => console.log(...args);


export const Back = (props) => {

    let navigate = useNavigate();

    return (

        <button onClick={() => navigate(-1)}>Back</button>

    );
};

export const TopBar = ({ name, children, leftSide, ...props }) => {

    log("children", children);

    let app = "مدارات"

    return [(

        <div topbar="" key="1" {...props}>
            <div>
                <Link to="/" className="barIcon">
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
        </div>

    ), <div topbarholder="" topbarholder2={children ? "" : null} key="2" />];
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