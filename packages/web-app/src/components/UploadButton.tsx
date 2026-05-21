import { MouseEventHandler, PropsWithChildren, useRef } from "react";

interface UploadButtonProps extends PropsWithChildren {
    accept?: string;       // e.g. "image/*" or ".pdf,.docx"
    multiple?: boolean;
    onFilesSelected?: (files: File[]) => void;
}

export const UploadButton = (props: UploadButtonProps) => {
    const { children, accept, multiple = false, onFilesSelected } = props;

    // Ref to the hidden <input type="file"> — we programmatically click it
    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
        // Delegates to the native OS file picker
        inputRef.current?.click();
    };

    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        // e.target.files is a FileList — convert to array for easier use
        const files = Array.from(e.target.files ?? []);
        if (files.length === 0) return;

        onFilesSelected?.(files);

        // Reset so the same file can be re-selected next time
        e.target.value = "";
    };

    return (
        <>
            {/* Hidden — never visible, only used to trigger the OS picker */}
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                style={{ display: "none" }}
                onChange={handleFileChange}
                formEncType="multipart/form-data"
            />
            <button onClick={handleButtonClick}>
                {children ?? "Upload from your computer"}
            </button>
        </>
    );
};