import { DragEvent } from "react";

import classes from "./drop-zone.module.scss";
import Upload from "~/public/assets/upload.svg";

interface Props {
    changeEvent: (file: File | File[]) => void;
    files: File | File[] | undefined;
    multiply?: boolean;
}

const DropZone = ({ changeEvent, files, multiply = false }: Props) => {
    let ref: HTMLInputElement | null;

    const clickHandler = (event: { target: HTMLInputElement }) => {
        const fileObject = event.target.files;
        if (!fileObject) return;
        const isValidate = validateSize(fileObject);
        if (!isValidate) return;
        addFiles(fileObject);
    };

    const dropHandler = (event: DragEvent<HTMLDivElement>) => {
        const fileObject = event.dataTransfer.files;
        if (!fileObject) return;
        const isValidate = validateSize(fileObject);
        if (!isValidate) return;
        addFiles(fileObject);
    };

    const addFiles = (fileObject: FileList) => {
        if (Array.isArray(files)) {
            const listFiles: File[] = Object.values(fileObject);
            changeEvent(listFiles);
        } else changeEvent(fileObject[0]);
    };

    const validateSize = (fileObject: FileList): boolean => {
        let totalFileSize: number;
        if (Array.isArray(files)) {
            totalFileSize = [...files, ...Object.values(fileObject)].reduce(
                (sum: number, item: File) => {
                    return item.size + sum;
                },
                0,
            );
        } else totalFileSize = fileObject[0].size;

        return totalFileSize <= 20971520;
    };

    const preventDefaults = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div
            className={`${classes.download__zone} row`}
            onDrop={(event) => {
                preventDefaults(event);
                dropHandler(event);
            }}
            onDragOver={preventDefaults}
            onDragEnter={preventDefaults}
            onDragLeave={preventDefaults}
            onClick={() => {
                if (ref !== null) ref.click();
            }}>
            <div className={`${classes.download__content} row`}>
                <div className={`${classes.download__instruction} row`}>
                    <Upload />
                    <p className={`${classes.instruction__title} text-base`}>
                        Перетащите файлы сюда или нажмите, чтобы загрузить.
                    </p>
                    <p className={`${classes.instruction__title__tablet} text-base`}>
                        Загрузить документ
                    </p>
                </div>
                <p className={`${classes.download__paragraph} text-base text-grey`}>
                    Доступные файлы: pdf, jpg, png. Размер файла не более 20Мб
                </p>
            </div>
            <input
                ref={(refParam) => {
                    if (ref !== null) return (ref = refParam);
                }}
                onChange={clickHandler}
                type="file"
                hidden={true}
                multiple={multiply}
            />
        </div>
    );
};

export default DropZone;
