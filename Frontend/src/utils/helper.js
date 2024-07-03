export const nameInitials = (name)=>{
    let newN = name.split(" ");
    let initials = ""
    for(let i in newN){
        initials += newN[i].charAt(0).toUpperCase();
    }
    return initials;
}