const AWS = require('aws-sdk');

async function deleteTask(event) {
    try {
        // Conexión a la base de datos a través de aws con el access key dado al comienzo del proyecto
        const dynamodb = new AWS.DynamoDB.DocumentClient(); 
        const {id} = event.pathParameters;
        await dynamodb.delete({ // scan muestra todos los resultados de una tabla dada
            TableName: 'TastTable',
            Key: {id},
        }).promise();
        return {
            status: 200,
            body: {
                message: 'Task deleted successfully',
            }
        }
    } catch (err) {
        return {
            status: 500,
            body: err.message
        }
    };
};

module.exports = {
    deleteTask
}