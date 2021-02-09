document.addEventListener('click', function(e){

    // For deleting selected item
    if(e.target.classList.contains("delete-me")) {

        if(confirm("Do you really want to delete this item permanently?")) {
            axios.post('/delete-item', {id: e.target.getAttribute('data-id')}).then(function(){

                e.target.parentElement.parentElement.remove()

            }).catch(function(){
                console.log("Error while deleting item "+ e.target.getAttribute('data-id'))
            })
        }

    }

    // For updating the selected itetm
    if (e.target.classList.contains("edit-me")) {

        let updated = prompt("Enter your new text",e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        
        if( updated ) {
            
            axios.post('/update-item', {text: updated, id: e.target.getAttribute('data-id')}).then(function(){

                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = updated

            }).catch(function(){
                console.log("Error while updating item "+ e.target.getAttribute('data-id'))
            })
        }

    
    }  


})