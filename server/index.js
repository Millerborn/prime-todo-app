'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');
const dbClient = new AWS.DynamoDB.DocumentClient();

// Function to Add an Item to DB
exports.handler = async (event, context, callback) => {

  // Convert incoming String data into an Object
  event.body = JSON.parse(event.body);
  
  let data = event.body ? event.body : {};
  let requestType = event.body && event.body.requestType ? event.body.requestType : null;

  if (requestType === null) {
    console.log('Request Was Null. event.body was:', event.body);
  }
  
  // let params = { TableName: process.env.TABLE };
  let params = { TableName: 'PrimeTable' };
  let response = {};
  
  console.log('Data:', data, 'Type:', requestType);

  try {

    // Create an Item
    if (requestType === 'create') {
      params.Item = {
        'id' : uuid.v4(),
        'name': data.name,
        'description': data.description,
        'status': false
      };

      let createResults = await dbClient.put(params, (err, data) => {
        console.log('err:', err, 'data:', data);
        if (err) {
            console.error('Unable create Todo Item. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Create Todo Item succeeded:', JSON.stringify(data, null, 2));
        }
      }).promise();

      response.body = JSON.stringify({
        message: 'Success adding Todo Item.',
        data: createResults
      });
    }

    // Get Items
    if (requestType === 'read') {
      let readResults = await dbClient.scan(params, (err, data) => {
        if (err) {
            console.error('Unable to get Todo Items. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Get Todo Items succeeded:', JSON.stringify(data, null, 2));
        }
      }).promise();

      response.body = JSON.stringify({
        message: 'Success getting Todo Items.',
        data: readResults
      });
    }

    // Update Item
    if (requestType === 'update') {
    const updateParams = {
        TableName: params.TableName,
        Key: {
            "id": data.id
        },
        UpdateExpression: "set #name = :n, #description = :d, #status = :s",
        ExpressionAttributeNames: {
            '#name' : 'name',
            '#description' : 'description',
            '#status': 'status'
        },
        ExpressionAttributeValues: {
          ":n": data.name,
          ":d": data.description,
          ":s": data.status
        },
        ReturnValues: "UPDATED_NEW"
    };
      let updateResults = await dbClient.update(updateParams, (err, data) => {
        if (err) {
            console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
        }
      }).promise();

      response.body = JSON.stringify({
        message: 'Success updating Todo Item.',
        data: updateResults
      });
    }

    // Delete Item
    if (requestType === 'delete') {
      const deleteParams = {
        TableName: params.TableName,
        Key: { "id": data.id },
      };

      let deleteResults = await dbClient.delete(deleteParams, (err, data) => {
        if (err) {
            console.error('Unable to delete Todo Item. Error JSON:', JSON.stringify(err, null, 2));
        } else {
            console.log('Delete Todo Item succeeded:', JSON.stringify(data, null, 2));
        }
      }).promise();

      response.body = JSON.stringify({
        message: 'Success deleting Todo Item.',
        data: deleteResults
      });
    }

    if (response.body) {
      const finalResult = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
        },
        body: response.body,
      };
      console.log('Returning Response:', finalResult);
      return finalResult;
    } else {
      return "No response.body found. Error running function";
    }

  } catch (error) {
    console.log(error);
    return error;
  }
};
