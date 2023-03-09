const AWS = require('aws-sdk');

async function updateTask(event) {
    try {
        // Conexión a la base de datos a través de aws con el access key dado al comienzo del proyecto
        const dynamodb = new AWS.DynamoDB.DocumentClient(); 

        const {id} = event.pathParameters;
        const {title, description, done} = JSON.parse(event.body);

        await dynamodb.update({ // scan muestra todos los resultados de una tabla dada
            TableName: 'TastTable',
            Key: {id},
            ExpressionAttributeValues: {
                ":done": done,
                ":title": title,
                ":description": description
            }, // asignación de los atributos a actualizar
            UpdateExpression: "set done = :done, title = :title, description = :description", // :done variable definida anteriormente
            ReturnValues: 'ALL_NEW' // retorna valores actualizados
        }).promise();

        return {
            status: 200,
            body: JSON.stringify({
                message: 'Task updated successfully',
            })
        }
    } catch (err) {
        return {
            status: 500,
            body: err.message
        }
    };
};

module.exports = {
    updateTask
}