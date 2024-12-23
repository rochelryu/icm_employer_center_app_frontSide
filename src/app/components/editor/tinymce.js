'use client';

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = forwardRef(({ onChange, initialValue }, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    clearContent: () => {
      if (editorRef.current) {
        editorRef.current.setContent(''); // Vide le contenu de l'éditeur
      }
    },
  }));

  const handleEditorChange = (content) => {
    if (onChange) {
      onChange(content); // Appelle une fonction parent lors de chaque modification
    }
  };

  return (
    <Editor
      apiKey="zzual6c6g5ven0rb2hqdoa94ivn45qsc4yk56nzxkmh73eju" // Remplacez par votre clé API
      onInit={(evt, editor) => (editorRef.current = editor)}
      
      value={initialValue}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
        ],
        toolbar:
          'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          readonly: false,
      }}
      onEditorChange={handleEditorChange}
      
    />
  );
});

export default TinyMCEEditor;
