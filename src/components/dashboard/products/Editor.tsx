import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import type { FieldErrors, UseFormSetValue } from "react-hook-form";
import type { ProductFormValues } from "../../../lib/Validator";
import StarterKit from "@tiptap/starter-kit";
import type { ReactNode } from "react";

interface Prosp{
    
    setValue: UseFormSetValue<ProductFormValues>;
    errors: FieldErrors<ProductFormValues>;
    initialContent?: JSONContent;
}

export const Editor = ({setValue,errors,initialContent}:Prosp) => {

    const editor = useEditor({
        extensions: [StarterKit],
        content : initialContent || '',
        onUpdate: ({editor})=>{
            //aqui actualizamos el valor del campo description.content en el formulario
            const content = editor.getJSON();
            setValue('description', content, {shouldValidate:true})
        },
        editorProps: {
            attributes:{
                class: 'focus:outline-non min-h-[150px] prose prose-sm sm:prose-base',
            }
        }
    }) 

  return (
    <div className="space-y-3">
        <EditorContent editor={editor}/>
        {
            errors.description && (
                <p className="text-red-500 text-xs mt-1">
                    {(errors.description.message as ReactNode) || 'Debe escribir una descripción'} 
                </p>
            )
        }
    </div>
  )
}
