import React, {useState} from "react";
import Fuse from "fuse.js";
import s from "./ShareSearch.module.css";

const ShareSearch = (props) => {

    const {shares, setCurrentInstrument} = props;

    const [resultsVisible, setResultsVisibility] = useState(false);

    const [input, setInput] = useState("");

    const fuse = new Fuse(shares, {
        keys: ["ticker", "name"],
        includeScore: true
    });

    const results = input ? fuse.search(input) : [];


    return <div>
        <div className={s.inputBox}>
            <input type="text" placeholder="Search..." className={s.searchInput}
                   onChange={(e) => setInput(e.target.value)}
                   onFocus={() => {
                       setResultsVisibility(true)
                   }}
                   onBlur={() => {
                       setResultsVisibility(false)
                   }}
            />
        </div>


        {resultsVisible ?
            <div className={s.searchResultsBox}>
                {results.map((result) => {
                    if (result.score < 0.4) return (
                        <div className={s.searchResultsItem} key={result.item.figi}
                             onMouseDown={() => setCurrentInstrument(result.item.figi)}>
                            {result.item.name} ({result.item.ticker})
                        </div>
                    )
                })}
            </div>
            : null
        }


    </div>
}

export default ShareSearch;