import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import SHEETJS from '@salesforce/resourceUrl/xlsx';
import createResponses from '@salesforce/apex/ResponseExcelController.createResponses';

export default class ResponseExcelUpload extends LightningElement {
    fileData;
    surveyName = ''; // Field for Survey Name input
    isButtonDisabled = true;

    // Load SheetJS library
    connectedCallback() {
        loadScript(this, SHEETJS)
            .then(() => console.log('SheetJS loaded'))
            .catch(error => console.error('Failed to load SheetJS', error));
    }

    // Handle Survey Name change
    handleSurveyNameChange(event) {
        this.surveyName = event.target.value;
    }

    // Handle Excel file upload
    handleFileUpload(event) {
        if (event.target.files.length) {
            const file = event.target.files[0];
            this.isButtonDisabled = false;
            const reader = new FileReader();
            reader.onload = (e) => {
                const binaryStr = e.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                this.fileData = XLSX.utils.sheet_to_json(sheet);
            };
            reader.readAsBinaryString(file);
        }
    }

    // Process the uploaded file
    processFile() {
        if (this.fileData && this.fileData.length > 0 && this.surveyName) {
            createResponses({ responses: this.fileData, surveyName: this.surveyName })
                .then(() => {
                    this.showToast('Success', 'Responses created successfully!', 'success');
                })
                .catch(error => {
                    console.error('Error creating responses', error);
                    this.showToast('Error', 'Failed to create responses', 'error');
                });
        } else {
            this.showToast('Error', 'Please upload a file and enter a survey name', 'error');
        }
    }

    // Show toast message
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(event);
    }
}
