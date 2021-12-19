/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
    const [text, setText] = useState();

    let fileReader;

    const onChange = e => {
        const file = e.target.files;
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file[0]);
    };

    const cleanContent = string => {
        string = string.replace(/^\s*[\r\n]/gm, "");
        const array = string.split(new RegExp(/[\r\n]/gm));
        console.log(array);
        array.splice(0, 3);
        array.splice(-3);
        return array.join("\n");
    };

    const handleFileRead = e => {
        let content = fileReader.result;
        // let text = deleteLines(content, 3);
        content = cleanContent(content);
        // … do something with the 'content' …
        setText(content);
    };
    return (
        <div className="App">
            <div className="upload-btn-wrapper">
                <button className="btn">Upload a file</button>
                <input type="file" name="myfile" onChange={onChange} />
            </div>
            {text && <pre>{text}</pre>}
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);