'use strict';
log.setLevel("debug", false);
log.debug("hello!");
log.info("hello!");
log.warn("hello!");
log.error("hello!");

var baseUrl = "http://localhost:5000";
function TodoModel() {
	var self = this;
	self.records = ko.observableArray([]);

	Getall();
   
	
	function Getall()
	{
		 jQuery.ajax({
			url: baseUrl + "/api/todo?callback=?",
			method: 'GET',
			dataType: 'jsonp',
			data: "",
			contentType: "application/json; charset=utf-8",
			async: false,
			success: function(data, status, settings)  
            {  
               console.log("The request URL and DATA" + data);
            }  
            ,
            error: function(ajaxrequest, ajaxOptions, thrownError)  
            {  
				console.log(thrownError);
            } 
		  });
	}
	function a(data){
		console.log(data);
	}
}
ko.applyBindings(new TodoModel());