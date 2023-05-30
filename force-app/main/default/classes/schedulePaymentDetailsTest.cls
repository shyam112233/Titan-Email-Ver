@isTest
private class schedulePaymentDetailsTest{
  @testSetup
  static void setupTestData(){
    test.startTest();
    Account account_Obj = new Account(Name = 'Name566', IsExcludedFromRealign = false, NDA__c = false, LTA__c = false, MOU__c = false, Address_Check__c = false, iv__InsideView_Created__c = false, Bank_Guarantee__c = false, Indemnity_bond_chkbox__c = false, Insurance__c = false, SFSSDupeCatcher__Override_DupeCatcher__c = false, Copy_Billing_Address_To_Shipping_Address__c = false);
    Insert account_Obj; 
    Opportunity opportunity_Obj = new Opportunity(IsPrivate = false, Name = 'Name755', StageName = 'Preliminary Opportunity', CloseDate = Date.today(), IsExcludedFromTerritory2Filter = false, Amended_PO_Approved__c = false, BreakUP_Sales_Approved__c = false, Clarification_Uploaded__c = false, Customer_Product_Process_Risk__c = false, Cycle_Time_Uploaded__c = false, Ignore_Validation_Rule__c = false, Feasibility_Approval__c = false, Finance_Risk__c = false, updateCheckBoxforCostingB__c = false, KickOff_Approved__c = false, Layout_Approval_Sales__c = false, Layout_Manager_Approval__c = false, Layout_Manager_Reject__c = false, OA_Manager_Approved__c = false, PECSA_Regret_Checked__c = false, PECSA_Regret__c = false, Payment_Risk__c = false, Quotation_PECSA_Approved__c = false, Quote_Approved_Services__c = false, Quote_Approved_Spares__c = false, Quote_Manager_Approved__c = false, Quote_Manager_Reject__c = false, Quote_Uploaded__c = false, Regret_Approved__c = false, Repeat_Possibility__c = false, Technical_Risk__c = false, Opportunity_Info_sent__c = false, SYS_Checkbox__c = false, Allocation_Status__c = false, Await_Feedback_Quote_Submitted__c = false, Concept_Approval_Check__c = false, Costing_Approval_Check__c = false, Make_Public__c = false, Negotiation_Status__c = false, Opportunity_Hold_Status__c = false, Opportunity_Lost_Status__c = false, Opportunity_Won_Status__c = false, Order_Cancelled_Status__c = false, Order_Hold_Status__c = false, Project_Approval_Checkbox__c = false, Quote_Preparation_Approval_Check__c = false, RFQ_Received_Date__c = false, Revised_Quote_Approval_Check__c = false, Revision_Status__c = false, Scope_Change_Approval_Check__c = false, Under_Negotiation_Approval_Check__c = false);
    Insert opportunity_Obj; 
    Quote quote_Obj = new Quote(Name = 'Name492', OpportunityId = opportunity_Obj.id, FAI_Cost_pc_chkbox__c = false, Cloned__c = false, One_Time_Dev_Cost_NRE_chkbox__c = false, Total_Value_chkbox__c = false, Batch_Quantity__c = false, Contract_Approval__c = false, Acceptable_Variation_Range_Check__c = false, Free_of_cost_Approved__c = false, Final_Approval_Check__c = false, Indent_Created__c = false);
    Insert quote_Obj; 
    test.stopTest();
  }
  static testMethod void test_execute_UseCase1(){
    List<Account> account_Obj  =  [SELECT Name,IsExcludedFromRealign,NDA__c,LTA__c,MOU__c,Address_Check__c,iv__InsideView_Created__c,Bank_Guarantee__c,Indemnity_bond_chkbox__c,Insurance__c,SFSSDupeCatcher__Override_DupeCatcher__c,Copy_Billing_Address_To_Shipping_Address__c from Account];
    System.assertEquals(true,account_Obj.size()>0);
    List<Opportunity> opportunity_Obj  =  [SELECT IsPrivate,Name,StageName,CloseDate,IsExcludedFromTerritory2Filter,Amended_PO_Approved__c,BreakUP_Sales_Approved__c,Clarification_Uploaded__c,Customer_Product_Process_Risk__c,Cycle_Time_Uploaded__c,Ignore_Validation_Rule__c,Feasibility_Approval__c,Finance_Risk__c,updateCheckBoxforCostingB__c,KickOff_Approved__c,Layout_Approval_Sales__c,Layout_Manager_Approval__c,Layout_Manager_Reject__c,OA_Manager_Approved__c,PECSA_Regret_Checked__c,PECSA_Regret__c,Payment_Risk__c,Quotation_PECSA_Approved__c,Quote_Approved_Services__c,Quote_Approved_Spares__c,Quote_Manager_Approved__c,Quote_Manager_Reject__c,Quote_Uploaded__c,Regret_Approved__c,Repeat_Possibility__c,Technical_Risk__c,Opportunity_Info_sent__c,SYS_Checkbox__c,Allocation_Status__c,Await_Feedback_Quote_Submitted__c,Concept_Approval_Check__c,Costing_Approval_Check__c,Make_Public__c,Negotiation_Status__c,Opportunity_Hold_Status__c,Opportunity_Lost_Status__c,Opportunity_Won_Status__c,Order_Cancelled_Status__c,Order_Hold_Status__c,Project_Approval_Checkbox__c,Quote_Preparation_Approval_Check__c,RFQ_Received_Date__c,Revised_Quote_Approval_Check__c,Revision_Status__c,Scope_Change_Approval_Check__c,Under_Negotiation_Approval_Check__c from Opportunity];
    System.assertEquals(true,opportunity_Obj.size()>0);
    List<Quote> quote_Obj  =  [SELECT Name,OpportunityId,FAI_Cost_pc_chkbox__c,Cloned__c,One_Time_Dev_Cost_NRE_chkbox__c,Total_Value_chkbox__c,Batch_Quantity__c,Contract_Approval__c,Acceptable_Variation_Range_Check__c,Free_of_cost_Approved__c,Final_Approval_Check__c,Indent_Created__c from Quote];
    System.assertEquals(true,quote_Obj.size()>0);
    schedulePaymentDetails sh1 = new schedulePaymentDetails();
    String sch = '0 0 23 * * ?';
    system.schedule('Test Scheduling', sch, sh1);
  }
}