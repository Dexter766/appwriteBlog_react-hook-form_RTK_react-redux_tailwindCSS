import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, control, label, defaultValue = "" }) => {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="4mz7nbvse7r2zh1gdjlzqer271wfy8d84hsr1a2icn381eur"
            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "link",
              ],
              toolbar:
                "undo redo | blocks | image | fromatselect | bold italic backcolor underline orecolor | alignleft aligncenter alignright alignjustify| bullist numlist outdent indent | removeformat | help",
              content_style:
                "body {font-family:Helvetica,Arial,sans-serif; font-size:14px} ",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RTE;
