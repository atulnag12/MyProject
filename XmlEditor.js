import React, { useState } from 'react';
import { create } from 'xmlbuilder2';

const XmlEditor = () => {
  const [xmlContent, setXmlContent] = useState('');
  const [jsonContent, setJsonContent] = useState(null);
  const [updatedJson, setUpdatedJson] = useState(null);
  const [updatedXml, setUpdatedXml] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const xmlString = await readFile(file);
        setXmlContent(xmlString);

        // Convert XML to JSON
        const jsonResult = convertXmlToJson(xmlString);
        setJsonContent(jsonResult);
      } catch (error) {
        console.error('Error reading the file:', error);
        setError('Invalid XML file. Please select a valid XML file.');
      }
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const convertXmlToJson = (xmlContent) => {
    try {
      const xmlDoc = create(xmlContent, { format: 'xml' });
      const jsonResult = xmlDoc.end({ format: 'object' });
      return jsonResult;
    } catch (error) {
      console.error('Error converting XML to JSON:', error);
      throw new Error('Error converting XML to JSON. Please try again.');
    }
  };

  const updateJsonValues = () => {
    if (xmlContent) {
      try {
        const xmlDoc = create(xmlContent, { format: 'xml' });
        const jsonObj = xmlDoc.end({ format: 'object' });
  
        // Update JSON values as needed
        // For example, changing the value of an element
        //jsonObj.root.element[0].value = 'Updated Value';
  
        setUpdatedJson(jsonObj);
  
        // Convert updated JSON back to XML
        const updatedXmlString = create(jsonObj).end({ prettyPrint: true });
        setUpdatedXml(updatedXmlString);
        setError(null);
      } catch (error) {
        console.error('Error updating XML values:', error);
        setError('Error updating XML values. Please try again.');
      }
    }
  };
  

  const createXmlObject = (builder, parentName, data) => {
    const xmlObject = builder.ele(parentName);

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === 'object') {
          if (Array.isArray(data[key])) {
            // Handle arrays
            data[key].forEach((item) => {
              createXmlObject(xmlObject, key, item);
            });
          } else {
            createXmlObject(xmlObject, key, data[key]);
          }
        } else {
          xmlObject.ele(key, data[key]);
        }
      }
    }

    return xmlObject;
  };

  return (
    <div>
      <h2>XML Editor</h2>
      <input type="file" accept=".xml" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {jsonContent && (
        <div>
          <h3>JSON Result:</h3>
          <pre>{JSON.stringify(jsonContent, null, 2)}</pre>
          <button onClick={updateJsonValues}>Update Values</button>
        </div>
      )}
      {updatedJson && (
        <div>
          <h3>Updated JSON Result:</h3>
          <pre>{JSON.stringify(updatedJson, null, 2)}</pre>
        </div>
      )}
      {updatedXml && (
        <div>
          <h3>Updated XML Result:</h3>
          <pre>{updatedXml}</pre>
        </div>
      )}
    </div>
  );
};

export default XmlEditor;
