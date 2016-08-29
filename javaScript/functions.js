/**********************************JQuery***************************/
const kinveyUrl="https://baas.kinvey.com/";
const kinveyID="kid_Bk3-c2FK";
const kinveySecret="6bac70bf7d604165b40a147b81818281";




function showPage(pageId){
    $("#homeDiv").hide();
    $("#houseGrozdanDiv").hide();
    $("#apartmentDiv").hide();
    $("#rentCarDiv").hide();
    $("#login-div").hide();
    $("#register-div").hide();
    $("#commentsHouseGrozdan").hide();
    $("#commentsApartments").hide();
    $("#commentsRentACar").hide();
    
    $("#" + pageId).show();
}

function showInfo(message)
{
    $("#infoBox").text(message);
    $("#infoBox").show();
}
function showError(errorMsg){
    $("#errorBox").text(errorMsg);
    $("#errorBox").show();
}

 function  showComments(){
           const kinveyCommentUrl=kinveyUrl+"appdata/"+kinveyID+"/commentsHouseGrozdan";
           const kinveyAuthHeaders={
               "Authorization":"Kinvey "+sessionStorage.getItem("authToken"),
           };
           $.ajax({
               method:"GET",
               url: kinveyCommentUrl,
               headers: kinveyAuthHeaders,
               success: loadCommentsSuccess,
               error: handleAjaxError
           });
           function loadCommentsSuccess(comments){
                showInfo("Comments loaded.");
                if(comments.length==0)
                {
                    $("#comments").text("No comments....")
                }else
            {
                
        let commentsTable = $('<table id="tableComments">').append($("<tr>")
                    .append($('<th id="authorNewTable">Author</th>'))
                    .append($('<th id="commentNewTable">Comment</th>'))
                    .append($('<th id="dateNewTable">created</th>'))
                );
        for (let comment of comments){
            commentsTable.append($("<tr>")
                    .append($('<td id="creatorNewTable"></td>').text(comment._acl.creator))
                    .append($('<td id="commentTextNewTable"></td>').text(comment.commentText))
                    .append($('<td id="commentDateNewTable"></td>').text(comment._kmd.ect))
                                 );               
                }  
                $("#comments2").append(commentsTable);  
           }
           }
       }
function createComment(){
     const kinveyCommentUrl=kinveyUrl+"appdata/"+kinveyID+"/commentsHouseGrozdan";
           const kinveyAuthHeaders={
               "Authorization":"Kinvey "+sessionStorage.authToken,
           };
           let author1=data.username;
           let newCommentData= {
            author: author1,
            commentText: $("#textComment").val()
           }
           $.ajax({
               method:"POST",
               url: kinveyCommentUrl,
               data: newCommentData,
               headers: kinveyAuthHeaders,
               success: commentCreatedSuccess,
               error: handleAjaxError
           });
           function commentCreatedSuccess(data){
                showInfo("Comments loaded.");
               


                       }
}
function logout(){
    sessionStorage.clear();
    showHidePages();
    showPage("homeDiv");
}
 function showCreateCommentSection(){
     showPage("comment-Div");
 }      
function showHomeSection(){
showPage("homeDiv");

}
function showHouseGrozdanSection(){
    if(sessionStorage.authToken==null)
    {
    showPage("houseGrozdanDiv");
    }else
    {
        showPage("houseGrozdanDiv","commentsHouseGrozdan");
    }
    
}
function showApartmentSection(){
    showPage("apartmentDiv","commentsApartments");
     if(sessionStorage.authToken==null)
    {
    showPage("apartmentDiv");
    }else
    {
        showPage("apartmentDiv","commentsApartments");
    }
}
function showRentCarSection(){
     if(sessionStorage.authToken==null)
    {
    showPage("rentCarDiv");
    }else
    {
        showPage("rentCarDiv","commentsRentACar");
    }
}
function showLogInSection(){
    showPage("login-div");
}
//////////////////LOGIN///////////////////LOGIN///////////////////////LOGIN//////////////////LOGIN////////////////////////LOGIN////////
function login(){
    const kinveyLoginUrl=kinveyUrl+"user/"+kinveyID+"/login";
    const kinveyAuthHeaders = {
        "Authorization":"Basic "+btoa(kinveyID+":"+ kinveySecret),   
    };
    let userData=
    {
        username: $("#loginUser").val(),
        password: $("#loginPass").val()
    };

    $.ajax({
        method: "POST",
        url: kinveyLoginUrl,
        headers: kinveyAuthHeaders,
        data: userData,
        success: loginSuccess,
        error: handleAjaxError
    });
        let username=data.username;
    function loginSuccess(data,status){
        sessionStorage.authToken=data._kmd.authtoken;
        $("#infoBox").text("Success!").show().delay(2000).fadeOut();
        showHidePages();
        let username2=data.username;
        $("#registered").text("Loged in as: "+username2);
         showComments();
    }
}
//////////////////////ERRORR/////////////////ERRORR///////////////////ERRORR//////////////ERRORR////////////////ERRORR///////////////
function  handleAjaxError(response){
       let errorMsg="Error: "+JSON.stringify(response);
           $("#errorBox").text(errorMsg).show();
}
//////////////////////REGISTER/////////////////REGISTER///////////////////REGISTER//////////////REGISTER////////////////REGISTER///////////////
function showRegisterSection(){
    showPage("register-div");
}
function register(){

      const kinveyLoginUrl=kinveyUrl+"user/"+kinveyID+"/";
    const kinveyAuthHeaders = {
        "Authorization":"Basic "+btoa(kinveyID+":"+ kinveySecret),   
    };
    let userData=
    {
        username: $("#registerUser").val(),
        password: $("#registerPass").val()
    };

    $.ajax({
        method: "POST",
        url: kinveyLoginUrl,
        headers: kinveyAuthHeaders,
        data: userData,
        success: registerSuccess,
        
    });

    function registerSuccess(data,status){
        sessionStorage.authToken=data._kmd.authtoken;
        $("#infoBox").text("Success!").show().delay(3000).fadeOut();
        showHidePages();
        let username2=data.username;
        $("#registered").text("Loged in as: "+username2);
         showComments();
    }
}

function showButtonHide()
{
    $("#button-hide").show();
    $("#button-show").hide();
}
function showButtonShow(){
     $("#button-hide").hide();
    $("#button-show").show();
}

/****************************SECTION*HOME*****************************/
function showText(){
    document.getElementById("hiddenText").style.display = "inline";
    $("#homeDiv").height("2350px","slow");
}
function hideText(){
    document.getElementById("hiddenText").style.display = "none";
    $("#homeDiv").animate({ height:'680px'});
}
/*************************SECTION*HOUSE*GROZDAN***********************/

function  showCommentsHouseGrozdan(){
           const kinveyCommentUrl=kinveyUrl+"appdata/"+kinveyID+"/commentsHouseGrozdan";
           const kinveyAuthHeaders={
               "Authorization":"Kinvey "+sessionStorage.getItem("authToken"),
           };
           $.ajax({
               method:"GET",
               url: kinveyCommentUrl,
               headers: kinveyAuthHeaders,
               success: loadCommentsSuccess,
               error: handleAjaxError
           });
           function loadCommentsSuccess(comments){
                 $("#infoBox").text("Comments loaded!").show().delay(2000).fadeOut();
                if(comments.length==0)
                {
                    $("#commentsHouseGrozdan").append("<h1>No comments....</h1>");
                }else
            {
                
        let commentsTable = $('<table id="tableComments">').append($("<tr>")
                    .append($('<th id="authorNewTable">Author</th>'))
                    .append($('<th id="commentNewTable">Comment</th>'))
                    
                );
        for (let comment of comments){
            commentsTable.append($("<tr>")
                    .append($('<td id="creatorNewTable"></td>').text(comment.author))
                    .append($('<td id="commentTextNewTable"></td>').text(comment.commentText))
                    
                                 );             
                }  
                $("#commentsHouseGrozdan").append(commentsTable);  
           }
           }
       }
//////////////////////////////////////////////////       
       function createCommentHouseGrozdan(){
     const kinveyCommentUrl=kinveyUrl+"appdata/"+kinveyID+"/commentsHouseGrozdan";
           const kinveyAuthHeaders={
               "Authorization":"Kinvey "+sessionStorage.authToken
           };
           
           let newCommentData= {
               author: $("#name1").val(),
            commentText: $("#textCommentHouseGrozdan").val()
           };
           $.ajax({
               method:"POST",
               url: kinveyCommentUrl,
               data: newCommentData,
               headers: kinveyAuthHeaders,
               success: commentCreatedSuccess,
               error: handleAjaxError
           });
           function commentCreatedSuccess(){
           $("#infoBox").text("COMMENT CREATED!").show().delay(2000).fadeOut();
                
                       }
}
/*************************SECTION*APARTAMENTS*************************/
function  showCommentsApartments(){
            const kinveyCommentUrl=kinveyUrl+"appdata/"+kinveyID+"/commentsApartments";
           const kinveyAuthHeaders={
               "Authorization":"Kinvey "+sessionStorage.getItem("authToken")
           };
           $.ajax({
               method:"GET",
               url: kinveyCommentUrl,
               headers: kinveyAuthHeaders,
               success: loadCommentsSuccess,
               error: handleAjaxError
           });
           function loadCommentsSuccess(comments){
                showInfo("Comments loaded.");
                if(comments.length==0)
                {
                    $("#commentsApartments").append("<h1>No comments....</h1>")
                }else
            {
                
        let commentsTable = $('<table id="tableComments">').append($("<tr>")
                    .append($('<th id="authorNewTable">Author</th>'))
                    .append($('<th id="commentNewTable">Comment</th>'))
                );
        for (let comment of comments){
            commentsTable.append($("<tr>")
                    .append($('<td id="creatorNewTable"></td>').text(comment.author))
                    .append($('<td id="commentTextNewTable"></td>').text(comment.commentText))
                    
                                 );             
                }  
                $("#commentsApartments").append(commentsTable);  
           }
           }
       }
       //////////////////////////////////////////////////////////////////
        function createCommentApartments(){
     const kinveyCommentUrl=kinveyUrl+"appdata/"+kinveyID+"/commentsApartments";
           const kinveyAuthHeaders={
               "Authorization":"Kinvey " + sessionStorage.authToken,
           };
           let newCommentData= {
            author: $("#name2").val(),
            commentText: $("#textCommentApartments").val()
           }
           $.ajax({
               method:"POST",
               url: kinveyCommentUrl,
               data: newCommentData,
               headers: kinveyAuthHeaders,
               success: commentCreatedSuccess,
               error: handleAjaxError
           });
           function commentCreatedSuccess(data){
                showInfo("COMMENT CREATED");
                       }
}
/**************************SECTION*RENT*CAR***************************/
function  showCommentsRentACar(){
             const kinveyCommentUrl="https://baas.kinvey.com/appdata/kid_Bk3-c2FK/commentsRentAcar";
           const kinveyAuthHeaders={
               "Authorization":"Kinvey "+sessionStorage.authToken,
           };
           $.ajax({
               method:"GET",
               url: kinveyCommentUrl,
               headers: kinveyAuthHeaders,
               success: loadCommentsSuccess,
               error: handleAjaxError
           });
           function loadCommentsSuccess(comments){
                showInfo("Comments loaded.");
                if(comments.length==0)
                {
                    $("#commentsRentACar").append("<h1>No comments....</h1>")
                }else
            {
                
        let commentsTable = $('<table id="tableComments">').append($("<tr>")
                    .append($('<th id="authorNewTable">Author</th>'))
                    .append($('<th id="commentNewTable">Comment</th>'))
                );
        for (let comment of comments){
            commentsTable.append($("<tr>")
                    .append($('<td id="creatorNewTable"></td>').text(comment.author))
                    .append($('<td id="commentTextNewTable"></td>').text(comment.commentText))
                                 );             
                }  
                $("#commentsRentACar").append(commentsTable);  
           }
           }
       }
       ////////////////////////////////////////////////////////
        function createCommentRentACar(){
     const kinveyCommentUrl=kinveyUrl+"appdata/"+kinveyID+"/commentsRentAcar";
           const kinveyAuthHeaders={
               "Authorization":"Kinvey "+sessionStorage.authToken,
           };
           let newCommentData= {
            author: $("#name3").val(),
            commentText: $("#textCommentRentAcar").val()
           }
           $.ajax({
               method:"POST",
               url: kinveyCommentUrl,
               data: newCommentData,
               headers: kinveyAuthHeaders,
               success: commentCreatedSuccess,
               error: handleAjaxError
           });
           function commentCreatedSuccess(data){
                showInfo("COMMENT CREATED");
                       }
}
function showPage(pageId,secondPageID){
    $("#homeDiv").hide();
    $("#houseGrozdanDiv").hide();
    $("#apartmentDiv").hide();
    $("#rentCarDiv").hide();
    $("#login-div").hide();
    $("#register-div").hide();
    $("#commentsHouseGrozdan").hide();
    $("#commentsApartments").hide();
    $("#commentsRentACar").hide();
    
    $("#" + pageId).show();
    $("#" + secondPageID).show();
}

function showHidePages(){
    if(sessionStorage.authToken==null)
    {   
        $("#register-div").show();
        $("#login-div").show();   
        $("#logOut").hide();
        $("#loginRegisterSection").show();
        $("#comment-Div-houseGrozdan").hide();
        $("#comment-Div-apartments").hide();
        $("#comment-Div-rentAcar").hide();
        $("#registered").hide();
        $("#commentsHouseGrozdan").hide();
        $("#commentsApartments").hide();
        $("#commentsRentACar").hide();
    }
    else
    {
        $("#comment-Div-houseGrozdan").show();
        $("#comment-Div-apartments").show();
        $("#comment-Div-rentAcar").show();
        $("#loginRegisterSection").hide();
        $("#register-div").hide();
        $("#login-div").hide();       
        $("#logOut").show();
        $("#registered").show();
        showCommentsHouseGrozdan();
        showCommentsApartments();
        showCommentsRentACar();
    }
    showPage("homeDiv");
   
}

/*************ACTIONS*******************ACTIONS***************ACTIONS*** */
$(function(){

$(document).on({
    ajaxStart:function() { $("#loading").show()},
    ajaxStop:function() { $("#loading").hide()}
});
      
    $("#registered").hide();
    $("#errorBox").hide();
    $("#infoBox").hide();
    $("#loading").hide();
    $("#button-hide").hide();

    $("#homeDiv").show();
    $("#houseGrozdanDiv").hide();
    $("#apartmentDiv").hide();
    $("#rentCarDiv").hide();
    $("#login-div").hide();
    $("#register-div").hide();
    $("#commentsHouseGrozdan").hide();
    $("#commentsApartments").hide();
    $("#commentsRentACar").hide();
    
$("#button-show").click(showButtonHide);
$("#button-hide").click(showButtonShow);
$("#homeSection").click(showHomeSection);
$("#houseGrozdanSection").click(showHouseGrozdanSection);
$("#apartmentSection").click(showApartmentSection);
$("#rentCarSection").click(showRentCarSection);
$("#login").click(showLogInSection);
$("#register").click(showRegisterSection);
$("#logout").click(logout);
$("#ButtonLogin").click(login);
$("#ButtonRegister").click(register);
$("#buttonCreateCommentHouseGrozdan").click(createCommentHouseGrozdan);
$("#buttonCreateCommentApartments").click(createCommentApartments);
$("#buttonCreateCommentRentAcar").click(createCommentRentACar);
     showHidePages();
$("#login-div").submit(function(e){e.preventDefault(); login();});
$("#register-div").submit(function(e){e.preventDefault(); register();});
$("#comment-Div").submit(function(e){e.preventDefault(); createComment();});


});
