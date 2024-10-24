public with sharing class ResponseExcelController {
    @AuraEnabled
    public static void createResponses(List<Map<String, Object>> responses, String surveyName) {
        List<Response__c> responseList = new List<Response__c>();
        List<String> errorMessages = new List<String>(); // To store error messages
        
        for (Map<String, Object> responseData : responses) {
            try {
                String name = (String) responseData.get('Name');
                String email = (String) responseData.get('Email');
                String response1 = (String) responseData.get('Overall, I think the program was');
                String response2 = (String) responseData.get('The topic presented was relevant and useful for my everyday life');
                String response3 = (String) responseData.get('I learned something valuable');
                String response4 = (String) responseData.get('As a result of this program, I better understand how Pfizer provides education to patients and to their families');
                
                // Ensure that Name is provided
                if (name != null) {
                    responseList.add(new Response__c(
                        Name = name,
                        Email__c = email,
                        Response1__c = response1,
                        Response2__c = response2,
                        Response3__c = response3,
                        Response4__c = response4,
                        Survey_Name__c = surveyName // Set the survey name from the input field
                    ));
                } else {
                    errorMessages.add('Missing required field: Name.');
                }
            } catch (Exception e) {
                errorMessages.add('Error processing response data: ' + e.getMessage());
            }
        }
        
        if (!responseList.isEmpty()) {
            try {
                insert responseList;
            } catch (DmlException dmlEx) {
                errorMessages.add('Error inserting responses: ' + dmlEx.getMessage());
            }
        }

        // If there are any errors, throw an exception to be caught in LWC
        if (!errorMessages.isEmpty()) {
            throw new AuraHandledException(String.join(errorMessages, ', '));
        }
    }
}
