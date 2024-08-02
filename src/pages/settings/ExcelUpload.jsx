import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

// Styled components
const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  border: 1px solid #ddd;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadInstructions = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
`;

const UploadArea = styled.div`
  width: 100%;
  border: 2px dashed #007bff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  color: #007bff;
  background-color: #f0f8ff;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #e6f0ff;
    border-color: #0056b3;
  }
`;

const FileName = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  color: #333;
`;

const UploadButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Main component
const ExcelUpload = () => {
  const [fileName, setFileName] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['.xlsx', '.xls'],
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFileName(file.name);
      // Handle file processing here
      console.log('File uploaded:', file);
    }
  });

  return (
    <PageContainer>
      <Heading>Excel फाइल अपलोड गर्नुहोस्</Heading>
      <UploadContainer>
        <UploadInstructions>
          कृपया आफ्नो Excel फाइल ड्र्याग गर्नुहोस् वा यहाँ क्लिक गरेर चयन गर्नुहोस्।
        </UploadInstructions>
        <UploadArea {...getRootProps()}>
          <input {...getInputProps()} />
          <span>फाइल यहाँ छोड्नुहोस् वा क्लिक गरेर चयन गर्नुहोस्</span>
          {fileName && <FileName>अपलोड गरिएको फाइल: {fileName}</FileName>}
        </UploadArea>
        <UploadButton onClick={() => alert('File uploaded successfully!')}>
          सबमिट गर्नुहोस्
        </UploadButton>
      </UploadContainer>
    </PageContainer>
  );
};

export default ExcelUpload;
