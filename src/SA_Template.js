// src/DocConverter.js
import React, { useRef } from "react";
import { useState } from "react";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../src/sa_template.css'

const DocConverter = () => {
  const contentRef = useRef();

    const [district, setDistrict] = useState(''); // Initialize state for district input
    const [cmaNumber, setCmaNumber] = useState('');
    const [cmaYear, setCmaYear] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [aadharPersonName, setAadharPersonName] = useState('');
    const [aadharAge, setAadharAge] = useState('');
    const [aadharReligion, setAadharReligion] = useState('');
    const [aadharOccupation, setAadharOccupation] = useState('');
    const [aadharSonOf, setAadharSonOf] = useState('');
    const [aadharResidentOf, setAadharResidentOf] = useState('');
    const [advocateName, setAadvocateName] = useState('');

    const [policeStation, setpoliceStation] = useState('');
    const [psDistrict, setPsDistrict] = useState('');

    const [applicantName, setApplicantName] = useState('');
    const [applicantSonOf, setApplicantSonOf] = useState('');
    const [applicantResidentOf, setApplicantResidentOf] = useState('');

    const [newParagraphs, setNewParagraphs] = useState(['']); // State to store paragraphs
    const [paragraphCount, setParagraphCount] = useState(1); // State to track the number of paragraphs
    const [paragraphs, setParagraphs] = useState([]);
    const [newParagraph, setNewParagraph] = useState('');
    //const [newParagraphs, setNewParagraphs] = useState([{ id: uuidv4(), content: '' }]);


    const getCurrentMonthName = () => {
        const months = [
          "January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"
        ];
        const date = new Date();
        return months[date.getMonth()];
      };
      
      const getCurrentYear = () => {
        const date = new Date();
        return date.getFullYear();
      };
    
       const handleDownload = () => {
      const content = contentRef.current.innerHTML;
       // Get the current month name
  const currentMonth = getCurrentMonthName();
  const currentYear = getCurrentYear();

      // Replace the placeholder [DISTRICT: XXXXXXX] with the actual district value
    //   const updatedContent = content.replace('[DISTRICT: DDDD]', `[DISTRICT: ${district}]`)
     const updatedContent = content.replace(/\[DISTRICT: \w+\]/g, `[DISTRICT: ${district.toUpperCase()}]`)
     .replace(/CRIMINAL MISC\. APPLICATION NO\. CMA OF 20XX/g, `CRIMINAL MISC. APPLICATION NO. ${cmaNumber} OF ${cmaYear}`)
     .replace(/Adhar: \w+/g, `Adhar: ${aadharNo}`)
     .replace(/the day of XXXXX, 20XX/, `the day of ${currentMonth}, ${currentYear}`)
     .replace(/I, \w+, Advocate, High Court, Allahabad/, `I, ${advocateName}, Advocate, High Court, Allahabad`)
    //  .replace(/Affidavit of xxxxxxxxx, \w+/g, `Affidavit of ${aadharPersonName}`)
    //  .replace(/, aged about xx years, \w+/g, `aged about ${aadharAge} years`);
    .replace(/Affidavit of \w+, aged about \w+ years, son of \w+, resident of \w+, District \w+, U\.P\. - \w+, religion \w+, occupation \w+/, `Affidavit of ${aadharPersonName}, aged about ${aadharAge} years, son of ${aadharSonOf}, resident of ${aadharResidentOf},  religion ${aadharReligion}, occupation ${aadharOccupation}`)
    .replace(/P\.S\. pppp/, `P.S. ${policeStation}`)
    .replace(/District dxdx/, `District ${psDistrict}`)
    .replace(/xxxxx /, `${applicantName}`)
    .replace(/son of/, `son of ${applicantSonOf}`)
    .replace(/resident of xxxxxxxxx/, `resident of ${applicantResidentOf}`)
    .replace(/\[aaaaa\]/g, `${applicantName}`)
    // .replace(/\[affidavit\]/, `${newParagraph}`);
    .replace(/\[affidavit\]/, `${newParagraph.replace(/\n/g, '<br/>')}`); // Convert new lines to <br/>

   
    const styledContent = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Courier New', Courier, monospace;
              font-size: 18.5px;
              line-height: 2.5;
            }
            .ql-align-center {
              text-align: center;
            }
            .ql-align-right {
              text-align: right;
            }
            .ql-align-justify {
              text-align: justify;
            }
          </style>
        </head>
        <body>
          ${updatedContent}
        </body>
      </html>
    `;

    const docx = htmlDocx.asBlob(styledContent);
    saveAs(docx, "SA_Template.docx");
     
    };


  const handleParagraphChange = (value) => {
    setNewParagraph(value);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'align': [] }],
      ['clean']
    ],
    clipboard: {
      matchVisual: false, // Important to disable this for single line breaks
    },
  };
 

  const formats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'link', 'align'
  ];

    const handleDistrictChange = (event) => {
        const value = event.target.value.toUpperCase(); // Convert input to uppercase
        setDistrict(value);
      };

      const handleCmaNumberChange = (event) => {
        setCmaNumber(event.target.value);
      };

      const handleCmaYearChange = (event) => {
        setCmaYear(event.target.value);
      };

      const handleAdvocateName = (event) => {
        setAadvocateName(event.target.value);
      };

      const handleApplicantName = (event) => {
        setApplicantName(event.target.value);
      };
      const handleApplicantSonOf = (event) => {
        setApplicantSonOf(event.target.value);
      };

      const handleApplicantResidentOf = (event) => {
        setApplicantResidentOf(event.target.value);
      };


      const handlePoliceStation = (event) => {
        setpoliceStation(event.target.value);
      };


      const handlePsDistrict = (event) => {
        setPsDistrict(event.target.value);
      };


      const handleAadharNoChange = (event) => {
    //     setAadharNo(event.target.value);
    //   };
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    value = value.slice(0, 12); // Limit input to 12 characters
    value = value.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every four characters
    setAadharNo(value);
  };

  const handleAadharPersonName = (event) => {
    setAadharPersonName(event.target.value);
  };

  const handleAadharAge = (event) => {
    setAadharAge(event.target.value);
  };

  const handleAadharReligion = (event) => {
    setAadharReligion(event.target.value);
  };

  const handleAadharOccupation = (event) => {
    setAadharOccupation(event.target.value);
  };

  const handleAadharSonOf = (event) => {
    setAadharSonOf(event.target.value);
  };

  const handleAadharResidentOf = (event) => {
    setAadharResidentOf(event.target.value);
  };



  return (
    <div>
      <div ref={contentRef} className="hide-div-draft" style={{ padding: "20px", fontSize: "16px", margin: '200px', border: '1px solid #ccc', borderRadius: '5px', display: 'none'  }}>
        
        <h1
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          IN THE HIGH COURT OF JUDICATURE AT ALLAHABAD
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          **********************
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {" "}
          SUPPLIMENTARY AFFIDAVIT
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          IN
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          CRIMINAL MISC. APPLICATION NO. CMA OF 20XX
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          [Under Section 482 Cr.P.C.]
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          [DISTRICT: DDDD]
        </p>
        <p
          style={{
            // textAlign: "right",
            textAlign: "justify",
            textAlignLast: "justify",

            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
            display: "inline-block",
          }}
        >
          [aaaaa] son of, resident of xxxxxxxxx, P.S. pppp,
          District dxdx.{" "}
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          ...........Applicants
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          Versus
        </p>
        <p
          style={{
            // textAlign: "right",
            textAlign: "justify",
            textAlignLast: "justify",

            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
            display: "inline-block",
          }}
        >
          1. State Of U.P. through Principal Secretary (Home), U.P. Shasan,
          Lucknow{" "}
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          ...........Opp. Parties
        </p>

        <p
          style={{
            textAlign: "justify",
            textAlignLast: "justify",
            paddingLeft: "7em",
            marginLeft: "14em",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            paddingRight: "50px",
          }}
        >
          Affidavit of xxxxxxxxx, aged about xx years, son of xxxxxxxxx,
          resident of xxxxxxxxxxxxxxx, District xxxxxxxxx, U.P. - xxxxxxx,
          religion xxxxxxx, occupation xxxxxxxxx Adhar: xxxxx
        </p>
        <p
          style={{
            textAlign: "right",
            marginRight: "70px",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Deponent
        </p>

        <p
          style={{
            textAlign: "left",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            textIndent: "4em",
          }}
        >
          I, the deponent above named do hereby solemnly{" "}
        </p>
        <p
          style={{
            textAlign: "left",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          affirm and state on oath as under:-{" "}
        </p>

        <p
          style={{
            textAlign: "left",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          [affidavit]
        </p>

        <p
          style={{
            textAlign: "justify",
            textAlignLast: "justify",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "2.5",
            textIndent: "4em",
          }}
        >
          I, the deponent above named do hereby swear that the contents of
          paragraph nos. ...................... of the affidavit are based on
          true to my personal knowledge; and those of paragraph nos.
          ................... of the affidavit are based on record; and those of
          paragraph nos. ................... ................. of the affidavit
          are based on information received and those of paragraph nos.
          .......................... of the affidavit are based on legal advice
          which all I believe to be true that no part of this affidavit is false
          and nothing material has been concealed.
        </p>
        <p
          style={{
            textAlign: "left",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            marginLeft: "50px",
          }}
        >
          SO HELP ME GOD
        </p>

        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            marginTop: "140px",
          }}
        >
          (DEPONENT)
        </p>
        <p
          style={{
            textAlign: "justify",
            textAlignLast: "justify",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            textIndent: "4em",
          }}
        >
          I, XXXXXXXX, Advocate, High Court, Allahabad, do hereby declare that
          the person making this affidavit and alleging himself to be the
          deponent is known to me on the basis of papers produced by him before
          me in this case and verify the aforesaid advocate.{" "}
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          Advocate
        </p>
        <p
          style={{
            textAlign: "justify",
            textAlignLast: "justify",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            textIndent: "4em",
          }}
        >
          Solemnly affirm before me on________ the day of XXXXX, 20XX at
          about_________ a.m. /p.m. by the deponent who has been identified by
          the aforesaid advocate.
        </p>
        <p
          style={{
            textAlign: "justify",
            textAlignLast: "justify",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            textIndent: "4em",
          }}
        >
          I have satisfied myself by examining the deponent that he understands
          the contents of this affidavit which have been read over and explained
          to the deponent.
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          OATH COMMISSIONER
        </p>

        <hr style={{ border: '0', height: '1px', background: '#333', backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)' }} />

        {/* Index start */}
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1",
          }}
        >
          IN THE HIGH COURT OF JUDICATURE AT ALLAHABAD
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1",
          }}
        >
          **********************
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {" "}
          INDEX{" "}
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1",
          }}
        >
          IN
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {" "}
          SUPPLIMENTARY AFFIDAVIT
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1",
          }}
        >
          IN
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1",
          }}
        >
          CRIMINAL MISC. APPLICATION NO. CMA OF 20XX
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1",
          }}
        >
          [Under Section 482 Cr.P.C.]
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          [DISTRICT: DDDD]
        </p>
        <p
          style={{
            textAlign: "left",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
            display: "inline-block",
          }}
        >
          [aaaaa]{" "}
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          ...........Applicants
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          Versus
        </p>
        <p
          style={{
            textAlign: "left",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
            display: "inline-block",
          }}
        >
          State Of U.P. and{" "}
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          ...........Opp. Parties
        </p>

        <hr style={{ border: '0', height: '2px', background: '#333', backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)' }} />

        {/* Annexure Folio start */}
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          IN THE HIGH COURT OF JUDICATURE AT ALLAHABAD
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          **********************
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {" "}
          ANNEXURE NO. SA-{" "}
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          IN
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {" "}
          SUPPLIMENTARY AFFIDAVIT
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          IN
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          CRIMINAL MISC. APPLICATION NO. CMA OF 20XX
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          [Under Section 482 Cr.P.C.]
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          [DISTRICT: DDDD]
        </p>
        <p
          style={{
            textAlign: "left",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
            display: "inline-block",
          }}
        >
          [aaaaa]{" "}
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          ...........Applicants
        </p>
        <p
          style={{
            textAlign: "center",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          Versus
        </p>
        <p
          style={{
            textAlign: "left",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
            whiteSpace: "pre-wrap",
            display: "inline-block",
          }}
        >
          State Of U.P. and{" "}
        </p>
        <p
          style={{
            textAlign: "right",
            fontSize: "18.5px",
            fontFamily: "Courier New",
            lineHeight: "1.5",
          }}
        >
          ...........Opp. Parties
        </p>
      </div>

      <hr style={{ border: '0', height: '1px', background: '#333', backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)' }} />

        {/* <form> */}
        <h2>SUPPLIMENTARY AFFIDAVIT FORM</h2>

          <form className="form-container">
        <label>
          District:
          <input type="text" value={district} onChange={handleDistrictChange} />
        </label>

          {/* Input field for CMA number */}
          <label>
          CMA Number:
          <input  type="number" value={cmaNumber} onChange={handleCmaNumberChange} />
        </label>

        <label>
          CMA Year:
          <input type="number" value={cmaYear} onChange={handleCmaYearChange} />
        </label>

        <label>
          Police Station:
          <input  type="text" value={policeStation} onChange={handlePoliceStation} />
        </label>

        <label>
          PS District: 
          <input  type="text" value={psDistrict} onChange={handlePsDistrict} />
        </label>

        <label>
          Applicant Name: 
          <input  type="text" value={applicantName} onChange={handleApplicantName} />
        </label>

        <label>
          Applicant Son of: 
          <input  type="text" value={applicantSonOf} onChange={handleApplicantSonOf} />
        </label>

        <label>
          Applicant Resident of: 
          <input  type="text" value={applicantResidentOf} onChange={handleApplicantResidentOf} />
        </label>

        <label>
          Aadhar Number:
          <input  type="text" value={aadharNo} onChange={handleAadharNoChange} maxLength={14} />
        </label>

        <label>
          Aadhar Age:
          <input type="number" value={aadharAge} onChange={handleAadharAge} />
        </label>

        <label>
          Aadhar Person Name:
          <input type="text" value={aadharPersonName} onChange={handleAadharPersonName} />
        </label>


        <label>
  Aadhar Religion:
  <select  value={aadharReligion} onChange={handleAadharReligion}>
    <option value="Hindu">Hindu</option>
    <option value="Islam">Islam</option>
    <option value="Muslim">Muslim</option>
    <option value="Jain">Jain</option>
    <option value="Sikh">Sikh</option>
    <option value="Other">Other</option>
  </select>
</label>

        <label>
  Aadhar Occupation:
  <select  value={aadharOccupation} onChange={handleAadharOccupation}>
    <option value="Housewife">Housewife</option>
    <option value="Business">Business</option>
    <option value="Agriculture">Agriculture</option>
    <option value="Student">Student</option>
    <option value="Businessmen">Businessmen</option>
    <option value="Other">Other</option>
  </select>
</label>


<label>
          Aadhar Son Of:
          <input  type="text" value={aadharSonOf} onChange={handleAadharSonOf} />
        </label>

        <label>
          Aadhar Resident Of:
          <input  type="text" value={aadharResidentOf} onChange={handleAadharResidentOf} />
        </label>

        <label>
          Advocate Name:
          <input type="text" value={advocateName} onChange={handleAdvocateName} />
        </label>


      <label className="full-width-label">
        AFFIDAVIT CONTENT:
      </label>
      <ReactQuill
        value={newParagraph}
        onChange={handleParagraphChange}
        modules={modules}
        style={{
          height: '460px',
          width: '100%',
          marginBottom: '25px',
          fontFamily: 'Courier New',
          fontSize: '18.5px',
          lineHeight: '2.5px',
          overflow: 'auto',
        }}
      />
        <style>
        {`
          .ql-editor {
            font-family: 'Courier New', Courier, monospace;
            font-size: 18.5px;
            line-height: 2.5;
            width:100%;
          }
        `}
      </style>
   

      </form>

      <button style={{ margin: '35px', marginBottom: '50px' }} onClick={handleDownload}>Download DOC File</button>
    </div>
  );
};

export default DocConverter;
