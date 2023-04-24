import nodemailer from 'nodemailer'
import fs from 'fs/promises'

const _dirname = new URL('.',import.meta.url).pathname
let transporter = nodemailer.createTransport({
    host:'smtp.office365.com',
    port:587,
    secure:false,
    auth:{
        user:' ', //email@outlook.com
        pass:' '    // pass ... 
    }
})


await convertToArray(`${_dirname}/xd.txt`)
    .then(async arr=> await makeMailOptionsArray(arr))
    .then(async mailOptions =>{
        mailOptions.forEach(option=>{
            transporter.sendMail(option,(e,i)=>{
                if(e)
                    console.log(e)
                else
                console.log('Email sent: ' + info.response);
            })
        })
    })  


async function convertToArray(path){
    return new Promise(async resolve=>{
        let arr = await fs.readFile(path)
            .then(str=>{
                str = String(str)
                return str.split('\n').map(rows=> rows.split('\t'))
            })
        resolve(arr)
    })
}
async function makeMailOptionsArray(arr){
    return new Promise(async resolve=>{
        let result = []
        arr.forEach(async row=>{
            result.push({
                from:'k.skamagkas@eoppep.gr',
                to: row[1],
                subject:'test smtp',
                text:row[1]+row[0],
                attachments:[{
                    filename: ``, 
                    path: `${_dirname}/pdfs/${row[0]}.pdf` 
                }]
            })        
        })
        resolve(result)
    })
}