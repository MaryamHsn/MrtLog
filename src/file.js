import React, { useState } from "react"; 

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
