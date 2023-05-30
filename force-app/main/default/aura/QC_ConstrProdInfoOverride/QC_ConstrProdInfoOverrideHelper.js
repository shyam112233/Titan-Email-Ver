({
	helperMethod : function(component, event, helper) {
		var action=component.get("c.fetchConstructionData");
        var data= component.get("v.referencedConstructionId");
        //alert('--------data(referenced)--------'+data);
        action.setParams(
            {"reportRefId" : data
                
            });
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state=="SUCCESS"){
                var result=response.getReturnValue();
                debugger;
                var vendorName = {};
                if(result[0].Vendor__c != undefined && result[0].Vendor__c != null && result[0].Vendor__c != ''){
                    vendorName = {'sobjectType' : 'QC_Access_Master__c', 'Id': result[0].Vendor__c, 'Name' : result[0].Vendor__r.Name};
                }
                var brandName = {};
                if(result[0].Brand__c != undefined && result[0].Brand__c != null && result[0].Brand__c != ''){
                    brandName = {'sobjectType' : 'QC_Access_Master__c', 'Id': result[0].Brand__c, 'Name' : result[0].Brand__r.Name};
                }
                //alert('---result data--'+result[0].Brand__c);
                component.set("v.recordStatusValue",result[0].Record_Status__c);
                component.set("v.constDocumentStatus",result[0].Document_Status__c);
                component.set("v.referenceConstructionNo",result[0].Report_Ref_Number__c);
                component.set("v.constSampleType",result[0].Sample_Type__c);
                component.set("v.constSampleCategory",result[0].Sample_Category__c);
                component.set("v.constSubCategory",result[0].Sub_Category__c);
                component.set("v.SKURef",result[0].SKU_Reference__c);
                component.set("v.sampleRecvd",result[0].No_Of_Sample_Received__c);
                component.set("v.sampleDate",result[0].Sample_Received_Date__c);
                component.set("v.sampleRecvdFrom",result[0].Sample_Received_From__c);
                component.set("v.sampleRecvdFrom2",result.Sample_Received_From2__c);
                component.set("v.sampleRecvdFrom3",result.Sample_Received_From3__c);
                component.set("v.sampleRecvdFrom4",result.Sample_Received_From4__c);
                component.set("v.sampleRecvdFrom5",result.Sample_Received_From5__c);
                component.find("verdictId").set(("v.value"),result[0].Final_Verdict__c);
                //component.set("v.VerdictStatusValue",result[0].Final_Verdict__c);
                component.set("v.selectedLookUpRecordForVendor",vendorName);
                component.set("v.prepopulateCount", component.get("v.prepopulateCount") + 1);
                component.set("v.selectedLookUpRecordForBrand",brandName);
                component.set("v.prepopulateBrandCount", component.get("v.prepopulateBrandCount") + 1);
                component.set("v.observatnComments", result[0].General_Observation__c);
                component.set("v.vendorRef", result[0].Vendor_Reference__c);
                component.find("genderId").set("v.value", result[0].Gender__c);
                //alert('Displaying the values--!!');
            }
        });
        $A.enqueueAction(action);
       
	},
    saveProdInfoData : function(component,event,helper) {
        var selectedSampleType = component.get("v.constSampleType");
        
        
        //this is the way you can set the fields value which is passed to apex class to insert the record 
        var data={'sobjectType': 'QC_Access_Component__c',
                  'Sample_Type__c': component.get("v.constSampleType"),
                  'Sample_Category__c': component.get("v.constSampleCategory"),
                  'Sub_Category__c': component.get("v.constSubCategory"),
                  'SKU_Reference__c' : component.get("v.SKURef"),
                  'No_Of_Sample_Received__c' : component.get("v.sampleRecvd"),
                  'Sample_Received_Date__c' : component.get("v.sampleDate"),
                  'Final_Verdict__c' : component.find("verdictId").get("v.value"),
                  'Sample_Received_From__c' : component.get("v.sampleRecvdFrom"),
                  'Sample_Received_From2__c' : component.get("v.sampleRecvdFrom2"),
                  'Sample_Received_From3__c' : component.get("v.sampleRecvdFrom3"),
                  'Sample_Received_From4__c' : component.get("v.sampleRecvdFrom4"),
                  'Sample_Received_From5__c' : component.get("v.sampleRecvdFrom5"),
                  'Vendor__c' : component.get("v.selectedLookUpRecordForVendor").Id,
                  'Brand__c' : component.get("v.selectedLookUpRecordForBrand").Id,
                  'General_Observation__c' : component.get("v.observatnComments"),
                  'Vendor_Reference__c' : component.get("v.vendorRef"),
                  'Gender__c' : component.find("genderId").get("v.value")
                 } 
        
        var finRes=component.get("v.referencedConstructionId").Id;
        if(finRes != undefined && finRes !='' ){
            var action =component.get("c.updateComponent");
            action.setParams({
                "recId" : component.get("v.referencedConstructionId").Id,
                "qacIdObj" : data
            });
        }
        
        
      /*  if((finRes == undefined || finRes == '')  && (selectedSampleType == 'New' || selectedSampleType == 'Alternate Development' || selectedSampleType == 'Re-Certification')){
            var action=component.get("c.saveAndDisplayDetails");
            action.setParams({
                "qacObj" : data  
            });
        } */
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state=="SUCCESS"){
                var result=response.getReturnValue();
                component.set("v.isReadonly",true);
                component.set("v.recordStatusValue", result.Record_Status__c);
                component.set("v.constDocumentStatus", result.Document_Status__c);
                component.set("v.referenceConstructionNo",result.Report_Ref_Number__c);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : 'Success Message',
                    message: 'Record Saved Successfully!!',
                    messageTemplate: '',
                    duration:' 5000',
                    key: 'error_alt',
                    type: 'success',
                    mode: 'dismissible'
                });
                // fire a component event to parent
                var compEvent = component.getEvent("QcAccessComponentSavedEvent");
                compEvent.setParams({"qCAccessComponentId" : result.Id });
                compEvent.fire();
                
            }
        });
        $A.enqueueAction(action);
    },
    
})