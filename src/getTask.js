const AWS = require('aws-sdk');

async function listTask(event) {
    try {
        // Conexión a la base de datos a través de aws con el access key dado al comienzo del proyecto
        const dynamodb = new AWS.DynamoDB.DocumentClient(); 

        const tasks = await dynamodb.scan({ // scan muestra todos los resultados de una tabla dada
            TableName: 'TastTable',
        }).promise();

        const response = tasks.Items; // aquí están las tareas publicadas en la base de datos

        return {
            status: 200,
            body: response
        }
    } catch (err) {
        return {
            status: 500,
            body: err.message
        }
    };
};

async function getOneTask(event) {
    try {
        // Conexión a la base de datos a través de aws con el access key dado al comienzo del proyecto
        const dynamodb = new AWS.DynamoDB.DocumentClient(); 

        const {id} = event.pathParameters;

        const params = {
            Key: {
                id: id
            },
            TableName: 'TastTable'
        }
        // query realiza un query sobre la tabla
        const task = await dynamodb.get(params).promise();
        const response = task.Item; // aquí está la tarea publicadas en la base de datos

        return {
            status: 200,
            body: response
        }
    } catch (err) {
        return {
            status: 500,
            body: err.message
        }
    };
};

module.exports = {
    listTask,
    getOneTask
};