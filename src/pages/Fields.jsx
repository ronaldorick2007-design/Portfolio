import Header from "../components/Header";
import { useState } from "react";
import JavaVisual from "../components/JavaVisual";
import TracerViewer from "../components/CppVisual"

export default function Fields(){
    return(<>
        {/* <JavaVisual />*/}
        <TracerViewer />
    </>
    );
}
