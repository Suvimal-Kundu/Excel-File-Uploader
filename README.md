# Excel File Upload to Salesforce Records

This repository contains code designed to help users upload Excel files to Salesforce and map the data to Salesforce object fields. The component leverages the [SheetJS library](https://cdn.sheetjs.com/) to handle Excel files in Salesforce. It supports reading data from Excel files, mapping column names to object fields, and creating new records in Salesforce.

## Features

- **Excel Upload**: Upload Excel files (.xlsx format) to Salesforce.
- **Field Mapping**: Automatically map Excel columns to Salesforce object fields based on column names.
- **Duplicate Checking**: Skips creating records if duplicates are found based on specific criteria.
- **Flexible Column Handling**: If some columns in the Excel file are missing, the component will still create records using the available fields.
- **Excel Data Parsing**: Converts all Excel file data to text format to avoid format issues.

## Setup Instructions

1. **Upload SheetJS Library**: 
   - Download the [SheetJS library](https://cdn.sheetjs.com/).
   - Upload it to Salesforce as a static resource:
     - Name: `xlsx`
     - Cache Control: **Public**

2. **Deploy the Component**:
   - Ensure the LWC component is deployed in your Salesforce org.

3. **Usage**:
   - Navigate to the LWC component in your Salesforce app.
   - Upload your Excel file.
   - The component will map the columns and create records for the Salesforce object.

## Requirements

- **Salesforce Static Resource**: 
   - The SheetJS library must be uploaded as a static resource with the name `xlsx` for the component to function.
   
