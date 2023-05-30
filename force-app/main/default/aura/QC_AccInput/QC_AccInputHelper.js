({
	
    showInput : function(component, event, helper) {
        var cate=component.get("v.cat");
        debugger;
         var sampleType = component.get("v.subChildSampleType");
        var referenceId = component.get("v.referenceComponentNo");
        var constructionReferenceId = component.get("v.referencedConstructionId");
        //alert('-----cate---'+cate);
        if(cate != undefined && cate != null && cate != '' ){
            var action=component.get("c.fetchQuestions");
            action.setParams({category:cate});
            action.setCallback(this,function(response){
                var state=response.getState();
                if(state==="SUCCESS"){
                    var result=response.getReturnValue();
                    
                    component.set("v.inpData",result);
                    component.set("v.loadOptions",true);
                    var pickLists = [];
                    for(var i= 0; i< result.length; i++){
                        var picklist = {"picklistCompId" : i , questId : result[i].qstnId, responseIds: [], "selectedOptions" : [], "label" : result[i].label, "questionType" : result[i].questionType, "qstnOptionList" : result[i].qstnOptionList};
                        pickLists.push(picklist);
                        //alert("=====pickLists---->>"+pickLists[0].qstnOptionList);
                    }
                    
                    component.set("v.multiSelectList",pickLists);
                    if(sampleType == 'Re-Submission'){
                        this.populatePicklistForReSubmission(component, event, helper);
                        this.dispTestParamForReSubmission(component, event, helper);
                    }
                   /* if(constructionReferenceId != null){
                       this.populatePicklistForReliablityConstTest(component, event, helper); 
                       this.dispTestParamForReliablConstruction(component, event, helper);
                    }*/
                }
            });
            $A.enqueueAction(action); 
            if(constructionReferenceId == null || constructionReferenceId == undefined){
                this.callShowTest(component, event, helper);
            }
            
        }
     	
       
	},
    
     populatePicklistForReSubmission : function(component, event, helper) {
        var cate=component.get("v.cat");
        var sampleType = component.get("v.subChildSampleType");
        var referenceId = component.get("v.referenceComponentNo");
        if(cate != undefined && cate != null && cate != '' && sampleType == 'Re-Submission'){
           var action=component.get("c.viewInpforReSubmission");
           action.setParams({
               reportRefId:referenceId
           });
            action.setCallback(this,function(response){
                var state=response.getState();
                debugger;
                if(state==="SUCCESS"){
                    var result=response.getReturnValue();
                    var multiSelectList = component.get("v.multiSelectList");
                    var pickLists = [];
                    for(var i= 0; i< multiSelectList.length; i++){
                        if(multiSelectList[i].qstnOptionList != undefined && multiSelectList[i].qstnOptionList.length > 0){
                           
                            for(var j= 0; j< multiSelectList[i].qstnOptionList.length; j++){
                                for(var k= 0; k < result.length; k++){
                                    if(multiSelectList[i].questId == result[k].qstnLabel && result[k].respIdList.indexOf(multiSelectList[i].qstnOptionList[j].resId) > -1){
                                        multiSelectList[i].qstnOptionList[j].selected = true;
                                        multiSelectList[i].selectedOptions.push(multiSelectList[i].qstnOptionList[j].value);
                                        multiSelectList[i].responseIds.push(multiSelectList[i].qstnOptionList[j].resId);
                                    }
                                }
                            }
                        }
                    }
                    component.set("v.multiSelectList",multiSelectList);
                }
            });
            $A.enqueueAction(action); 
        	this.callShowTest(component, event, helper);
        }
    },
    
   
    callShowTest : function(component,event,helper) {
		var action=component.get("c.testParamWrapper");
       	var cate=component.get("v.cat");
        if(cate != undefined && cate != null && cate != ''){
            action.setParams({category:cate});
            action.setCallback(this,function(response){
                var state=response.getState();
                if(state==="SUCCESS"){
                    var result=response.getReturnValue();
                  // alert('calling test data !!!!!!!!!!!');
                    component.set("v.testData",result);
                    component.set("v.countTestParamLength",result.length);
                    //component.set("v.isReliableConst",false);
                    console.log(component.get("v.testData"));
                }
            });
            $A.enqueueAction(action); 
        }
	},
    
    dispTestParamForReSubmission : function (component,event,helper){ 
        var cat=component.get("v.cat");
        var reportRefId =component.get("v.referenceComponentNo");
        var sampleType=component.get("v.subChildSampleType");
        var testParamListReSub = component.get("v.testParamListReSub");
        //alert('--------testParamListReSub-------------'+testParamListReSub);
        if(cat !=undefined && cat !=null && cat !='' && sampleType =='Re-Submission'){
            var action=component.get("c.viewTestParamReSubmission");
            action.setParams({
                "reportRefId" : reportRefId
            });
             action.setCallback(this,function(response){
                var state=response.getState();
                if(state==="SUCCESS"){
                    var result=response.getReturnValue(); 
                  	component.set("v.testParamListReSub" , result);
                    debugger;
                    
                }
            });
            $A.enqueueAction(action);
        }
    },

    createObjectData: function(component, event) {
       //get the testParameterList from component and add(push) New Object to List  
       var RowItemList = component.get("v.testParameterList");
       RowItemList.push({
           'sobjectType': 'QC_Access_QuesResponse__c',
           'QC_Access_Questions__r.Test_Name__c': '',
           'QC_Access_Questions__r.Product_Specification__c': '',
           'QC_Access_Questions__r.Acceptance_Criteria__c':'',
		   'Observation__c':'',   
           'Verdict__c':'',
           'Remarks__c':''
       });
       // set the updated list to attribute (testParameterList) again    
       component.set("v.testParameterList", RowItemList);
   },

   
})