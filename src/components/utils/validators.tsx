import React from "react"
export const required = (value : string) =>{

if(value ){
    return undefined
}

else return <div>
    This field is required
</div>

}


export const MaxLengthCreator = (MaxLengthValue : number) =>{
    return(value = 0 )=>{
if(value && value > MaxLengthValue) {
    return `Maximal length is a ${MaxLengthValue} symbols`
}
else return undefined
    }
}

