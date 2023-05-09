// const Joi = require ('joi')

console.log ("-----> try catch") 

const a =1
const b =2
 const nombre = 55;
 function addFunction(p1, p2) {
    //  params = p1+p2 
     return p1+p2
 }

//  try {
//     addFunction(5,1) ;
//      console.log("try reussi")
//      console.log(addFunction())
//  } catch(error) {
//     console.log("error.stack")
//      console.log(error.stack)
     
//  }

// let a ={}

// essayer avec un function fleche 
let demo = function (nombre){
    if (nombre > 5){
        throw new Error("Le nombre ne peut etre superieur a 5")
    }
    return nombre*2
}

try{
    // test si ca fonctionne sinon tu vas dans le catch 
demo(6)
} catch (e){
    console.log(e, "--------------------> error dans le catch")
}

// try{
//     try{
//         throw new Error("erreur")
//     } finally {
//         console.log("finally")
//     }
// } catch (e) {
//     console.log('catch')
// }