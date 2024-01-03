


function deletePro(id){
    const result = confirm("Sure to Delete");
    if(result){
        fetch("/delete/" + id, 
        { method: "POST"}).then((res)=>{
            if(res.ok){
                location.reload();
            }
        }).catch(err);
        {res.send(err)}
    }else{window.alert("Proecess has been Reverted")}
}

// export default deletePro;