import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { TopBar, SearchBar, log } from "../lib";
import termsDB from '../data/termsDB';

log('terms', termsDB);

let normalize = val => {
    val = ` ${val} `
        .toLowerCase()
        .replace("أ", "ا")
        .replace("إ", "ا")
        .replace("آ", "ا")
        .replace("ؤ", "و")
        .replace("ة", "ه")
        .replace(" ال", "")
        .trim();

    return val;
}

export default function () {

    const [states, setStates] = useState({
        terms: termsDB
    });

    let terms = [...states.terms];

    terms = terms.sort((a, b) => ('' + a[1]).localeCompare(b[1]));

    let $termsDB = terms

        .map(([en, ar, desc, img], i) => (
            <div key={en + i} term="" >
                <div term2="">
                    <div en_term={en}>{en}</div>
                    <div ar_term={ar}>{ar}</div>
                </div>
                <div term_desc="">
                    {desc}
                    {img ? <img src={img}></img> : null}
                </div>
            </div>

        ));

    const onSearch = val => {
        val = normalize(val);

        let newTerms = termsDB.filter(t =>
            normalize(t[0]).includes(val) ||
            normalize(t[1]).includes(val)
        );

        log(val);
        setStates({ ...states, terms: newTerms });
    }

    return (
        <div>
            <TopBar name="مصطلحات فضائية" >
                <div>
                    <SearchBar onChange={onSearch} />
                </div>
            </TopBar>
            <div terms="">
                {$termsDB}
            </div>

        </div>
    );
}