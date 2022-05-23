// const Joi = require ('joi')

const { countDocuments } = require("./models/modelsSauce");

// const authSchema = Joi.object({
//     email:Joi.string().min(10).max(24).required(),
//     password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
// })

// exports.email = (req,res,next) => { 
//     console.log("je suis dans le middleware joi")
//     req.body.authSchema;
//     console.log(req.body)
//     console.log( req.body.authSchema)
//     console.log("execution de authSchema")
//     next()
// }

// console.log("hi bro")


// Destructuring object array 

/*
// this is old ways to do it 
const team =["galatasaray", "konyaspor","fenerbahce"]
const numbers= ["1", "2","3","4","6"]

// const a = numbers[0]
// const b = numbers[5]
const [a,b, ...rest] = numbers 

console.log(a)
console.log(b)
console.log(rest)

const newArray = [...team, ...numbers] 
console.log(newArray)


const persontwo = {
    name:"joe",
    age: 27,
    address: {
        city: "paris",
        postal_code: 75000
    }
}


// function printUser(user){
//     console.log(`your name is ${user.name}`)
// }


function printUser({name}){
    console.log(`your name is ${name}`)
}

printUser(persontwo)
*/






















// console.log(persontwo)
// console.log("pay phone",name)

// change the variable name or the key name 
// const {name,} = persontwo 
// console.log("pay phone",name)



// destructuring is very useful and how to use it 

// function sumAndMultiply(a,b){
//     return[a+b,a*b]
// }

// const [sum,multiply,division = 'No division'] = sumAndMultiply(2,3)

// console.log(sum)
// console.log(multiply)
// console.log(division)

// let a, rest ;
// // [a] = ["this was an empty variable that transform into an array"]
// // console.log(a)

// [a, ...rest] = [10 ,20,30,40]

// console.log(a)
// console.log(rest)


// const x = [1, 2, 3, 4, 5]; // On crée un "paquet" de données
// const [y, ...z] = x; // On utilise l'affectation par décomposition
// console.log(y); // 1
// console.log(z); // 2 
// console.log("z"); // 2 

// console.log(x)