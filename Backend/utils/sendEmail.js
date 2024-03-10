import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//this file location
const __filename = fileURLToPath(import.meta.url);
//this directory location
const __dirname = path.dirname(__filename);


/*
USAGE EXAMPLE:
await sendEmail(isExsit.email, "Title", { name: isExsit.name, description: description, }, "./template/emailtemplate.handlebars");
*/
export const sendEmail = async (email, subject, payload, template) => {
    //console.log(__filename);
    //console.log(__dirname);
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD, 
            },
        });

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        //console.log(source);
        const compiledTemplate = handlebars.compile(source);

        const options = () => {
            return {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: subject,
                html: compiledTemplate(payload),
            };
        };

        // Send email
        transporter.sendMail(options(), (error, info) => {
            if (error) {
                return error;
            } else {
                console.log('EMAIL SENT :');
                return res.status(200).json({
                    success: true,
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

