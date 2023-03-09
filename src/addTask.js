const {v4} = require('uuid');
const AWS = require('aws-sdk');

async function addTask(event) {

    // Conexión a la base de datos a través de aws con el access key dado al comienzo del proyecto
    const dynamodb = new AWS.DynamoDB.DocumentClient(); 

    const {title, description} = JSON.parse(event.body); // parsear string a JSON
    const createdAt = new Date();
    const id = v4(); // creación del id

    const newTask = {
        id,
        title, 
        description,
        createdAt,
        done: false
    }
    await dynamodb.put({ // put se usa para introducir la información a la db
        TableName: 'TastTable',
        Item: newTask
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify(newTask)
    }
};

module.exports = {
    addTask
};