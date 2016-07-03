var nameArray = ['0'];
var companyArray = ['0'];
var companyPhraseArray = ['0'];
var phoneArray = ['0'];
var emailArray = ['0'];
var websiteArray = ['0'];
var companybsArray = ['0'];
var sortListArray = {};
function ajaxcall(){
$.ajax({
	url: 'http://jsonplaceholder.typicode.com/users',
	//url: '../js/contacts.js',
	method: 'GET',
	  
	dataType: 'json',
      
	success:function(result) { 
		var holdData = '';
		  
		result.forEach(function(p){
				sortListArray[p.id] = p.name;
				
				nameArray.push(p.name);
				companyArray.push(p.company.name);
				companyPhraseArray.push(p.company.catchPhrase);
				phoneArray.push(p.phone);
				emailArray.push(p.email);
				websiteArray.push(p.website);
				companybsArray.push(p.company.bs);
				holdData += "<div class='link' data-toggle='modal' data-target='#myModal' onclick='DisplayPopUp("+p.id+")'>" + p.name + '</div><br />';
            });
        $("#imgLoading").hide();      
        $("#displaymessage").html(holdData); 
        //console.log(sortListArray);
     },
      error: function(xhr, desc, err) {
        $("#imgLoading").hide();
        $("#displaymessage").html("<span class='apiError'>"+desc+": Can't Connect to source</span>");
        
      }
    }); // end ajax call
}

function DisplayPopUp(id){
	var Name = nameArray[id].split(" ");
	$(".displayFirstName").html(Name[0]);
	$(".displayLastName").html(Name[1]);
	$(".personPosition").html(companybsArray[id]);
	$(".companyInfo").html(companyArray[id] + "<br />" + companyPhraseArray[id]);
	$(".phoneInfo").html(phoneArray[id]);
	$(".emailInfo").html(emailArray[id]);
	$(".urlInfo").html(websiteArray[id]);
}

function searchField(id){
	var getText = [];
	var contentText = '';
	var query = $("#"+id).val();
	
	if (query === "" || query === null){
		contentText = "<label class='emptyField'>Fields can't be empty, Please try again.</label>";
		$("#"+id).attr('class', 'form-control borderWrong');
	}
	else{
		$("input[class*='borderWrong']").attr('class','form-control');
		getText = searchText(id);
		if (getText.length > 0 ){
			for (var i=0; i<getText.length; i++){
				contentText += '<label>Name:</label> ' + nameArray[getText[i]] + '<br /> <label>Phone:</label> ' + phoneArray[getText[i]] + '<br /> <label>Company:</label> ' + companyArray[getText[i]] + '<br /> <label>Email:</label> ' + emailArray[getText[i]] + '<br /> <label>URL:</label> ' + websiteArray[getText[i]] + '<br /><br />';
			}
			
		}
		else{
			//console.log(getText);
			contentText = "<label class='emptyField'>We did not find a match.</label>";
		}
				
	}	
	$("#searchResults").html(contentText);
}

function searchText(id){
	var temp = id.split('search');
	var searchArray = temp[1].toLowerCase();
	var results = [];
	var query = $("#"+id).val();
	var re = [];
	re = query.match(/\S+/g) || [];
	//console.log(re);
	//console.log(searchArray);
	
	var splitSearchArray = [];
	for (var i=0; i<nameArray.length; i++){
		
		for (var a=0; a<re.length; a++){
			if (searchArray === 'name'){
				splitSearchArray = nameArray[i].split(' ');
			}
			if (searchArray === 'phone'){
				splitSearchArray = phoneArray[i].split(' ');
			}
			if (searchArray === 'email'){
				splitSearchArray = emailArray[i].split(' ');
			}
			if (searchArray === 'company'){
				splitSearchArray = companyArray[i].split(' ');
			}
			console.log(splitSearchArray);
			for (var j=0; j<splitSearchArray.length; j++){
				if (splitSearchArray[j].toLowerCase() === re[a].toLowerCase()){
					results.push(i);
				}
			
			}
		}
		
	}
	console.log(results);
	return results;	
	
}

function sortArray(id){
	var newArray = sortListArray;
	var sArray = nameArray.slice();
	var sortData = '';
	
	if (id === 'asc'){
		sArray.sort();
	}
	if (id === 'des'){
		sArray.sort();
		sArray.reverse();
	}
	
	for (var i=0; i<sArray.length; i++){
		for (var key in newArray){
			if (newArray[key] === sArray[i]){
				sortData += "<div class='link' data-toggle='modal' data-target='#myModal' onclick='DisplayPopUp("+key+")'>" + newArray[key] + '</div><br />';
			}
			
		}
		
	}
	
	$("#displaymessage").html(sortData);
}

$(document).ready(function(){
	var url = window.location.href;
	if (url.indexOf("admin") !=-1) {
		ajaxcall();
		$("#reportField").val = '';
	}	
});

function getReport(){
	
	$("#logIn").hide();
	$("#logOut").show();
	var ch = $("#reportField").val();
	var ch2 = ch;
	ch = ch.toLowerCase();
	var reportText = '';
	var count = 0;
	var chCompare = '';
	
	if (ch === '' || ch === null){
		$("#reportContent").html("<label class='emptyField'>Field can't be empty, Please try again.</label>");
		$("#reportField").attr('class', 'form-control borderWrong');
		count = 0;
		
	}
	else{
		
		count = 0;
		
		for(var i=0; i<nameArray.length; i++){
			chCompare = nameArray[i].toLowerCase();
			
			chCompare = chCompare.charAt(0);
			
			if (ch === chCompare){
				console.log(ch + ' ' +chCompare);
				reportText = count++;
			}
			
			
		}
		
		console.log(count);
		$("#reportContent").html('<span style=font-weight:bold; color:blue;>'+count + '</span> Names starting with the Letter <span style=color:red; font-weight:bold;>'+ch2+'</span>');
		$("#reportField").attr('class', 'form-control');
		
	}
	
	
	
}

function logout(){
	location.reload();
}





