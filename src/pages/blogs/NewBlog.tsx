import Editor from "@/components/Editor";
import Navbar from "@/layout/Navbar";
import React from "react";

const NewBlog = () => {
    return (
        <>
            <Navbar>
                <Editor />
            </Navbar>
        </>
    );
};

export default NewBlog;
