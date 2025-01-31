import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUploadWithDropzone() {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true
    });

    const thumbs = files.map(file => (
        <div key={file.name} style={{ margin: 10 }}>
            <img
                src={file.preview}
                alt={file.name}
                style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
        </div>
    ));

    // Clean up the object URLs to avoid memory leaks
    React.useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div>
            <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyle}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
        </div>
    );
}

const dropzoneStyle = {
    border: '2px dashed #cccccc',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
};

export default FileUploadWithDropzone;
