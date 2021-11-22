


$(document).ready( () => { 
   
   
   //adding a unique id for every added task 
    let x=0;
    // add new task 
    $( "#btnAddTask" ).click( () => {
             
            // store the new task
            let data= $("#textAddValue").val();
          console.log(data);
            //add the item to the section
            $("#additem").append(` <div class="input-group mb-3">
            <input  id = "${x}" class="form-control" type="text" placeholder="${data}" aria-label="Disabled input example" disabled>
            <button id="btnClaim${x}" value="${x}" class="btn btn-outline-secondary">Claim</button><br>
        </div>`);
        x++;
        
        //clear the task bar text for next input
        $("#textAddValue").val("");
        
    });


    // claim a task 

    $(document).on("click", ".btn-outline-secondary" ,function()  {
        console.log("clicked");

        let a= $(this).attr("value");
        //getting the clicked button id
    let    letname="#btnClaim"+a;
        //change the button ffrom claim to abandon
        $(letname).text("Abandon");
       

        //add checkbox at the start
        $(letname).parent().prepend(` <div class="input-group-text">
        <input  type="checkbox" class="form-check-input mt-0" name="checkbox" value="1">
        </div>`); 
        //change the id and class of abandon task
        $(letname).attr( "id", "abnTask"+a);
        $(this).attr("class","btn btn-outline-secondary claim");
    
    
    });

    //abandon a task
    $(document).on("click", ".claim" ,function()  {


        let b= $(this).attr("value");
        //getting the clicked button id
      let  Abnname="#abnTask"+b;

        console.log("ABclicked");
        //change the button to claim from abandon
        $(Abnname).text("claim");
       

        //delete the checkbox
        $(Abnname).siblings(":first").remove();
        //change the id and class of abandon task
        $(Abnname).attr( "id", "btnClaim"+b);
        $(this).attr("class","btn btn-outline-secondary");

    
    });

    // completing a task state 4
   $(document).on("click", "input[type=checkbox]",function()  {
  

    //putting a line on complete task
    $(this).parent().siblings(":first").css(
 
        "text-decoration", "line-through");

            // setting a class of "complete" for deleting the finished tasks 
            
        $(this).parent().siblings(":first").attr("class","form-control complete");
        //delete the abandon button 
        $(this).parent().siblings("button").remove();
      });


   
// deleting finished tasks
    $( "#rComplete" ).click( () => {
       
        $(".complete").parent().remove();
       
        });

});