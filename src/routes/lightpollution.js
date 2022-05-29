import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { TopBar, Icon } from "../lib";

console.log("lp");


export default function () {
    return (
        <div style={{}}>

            <TopBar name="التلوث الضوئي" noholder={1} />
            <div style={{
                position: "absolute",
                top: "50px",
                left: 0,
                bottom: 0,
                right: 0,
                overflow: 'hidden',
            }}>

                <iframe
                    src="https://djlorenz.github.io/astronomy/lp2020/overlay/dark.html"

                    frameBorder="0" scrolling="no" style={{

                        width: '100%',
                        height: '100%',

                        background: "#000"
                    }} />

            </div>
        </div>
    );
}