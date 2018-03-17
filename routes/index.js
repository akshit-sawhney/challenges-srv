var express = require('express');
var router = express.Router();
var teade = require('teade');
var Promise = require('bluebird');

/**
 * @swagger
 * definitions:
 *   StandardResponse:
 *     properties:
 *       success:
 *         type: boolean
 *       message:
 *         type: string
 *       type:
 *         type: string
 *       action:
 *         type: string
 *       id:
 *         type: integer
 *       data:
 *         type: array
 *         items:
 *           $ref: '#/definitions/RpcObject'
 */

/**
 * @swagger
 * definitions:
 *  RpcObject:
 *     properties:
 *       service_name:
 *         type: string
 *       success:
 *         type: boolean
 */

 

/**
* @swagger
* /:
*   get:
*     tags:
*       - Index
*     description: Get Index
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Get Index
*/
router.get('/', function(req, res, next) {
  res.status(200).send({
    success : true,
    message : "",
    type : "Challenges Srv",
    action: "Index",
    data : ['Hi I am Ixchel Challenges Service. To check what i can offer please explore'],
    meta:{}
  });
});

/**
* @swagger
* /challenges/index/:
*   get:
*     tags:
*       - Index
*     description: Get Index
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Get Index
*/
router.get('/challenges/index/', function(req, res, next) {
  return res.status(200).send({
    success : true,
    message : "",
    type : "Challenges",
    action : "Index",
    id : null,
    data : ['Hi I am Ixchel Challenge Service. This is test route']
  });
});

/**
* @swagger
* /challenges/rpcTest/:
*   get:
*     tags:
*       - Index
*     description: Get Index
*     produces:
*       - application/json
*     responses:
*       200:
*         description: Get Index
*         schema:
*           $ref: '#/definitions/StandardResponse'
*/
router.get('/challenges/rpcTest', function(req, res, next) {
  var arr = [testRPCs('QUESTIONS'), testRPCs('USERS')]
  Promise.all(arr).then(function(results){
    return res.status(200).send({
      success : true,
      message : "",
      type : "challenges-srv",
      action : "rpcTest",
      id : null,
      data : results
    });
  });
});

function testRPCs(srv){
	return new Promise((resolve,reject) => {
		if(!process.env[srv+'_RPC_HOST'] || !process.env[srv+'_RPC_PORT']){
			return resolve({service_name:srv,success:false,msg:'no host and port defined'})
		}
	  var client = new teade.Client(process.env[srv+'_RPC_HOST'], process.env[srv+'_RPC_PORT']);
	  client.request('rpcTest',{}, function(err, response){
	  	if( response && response.success) {
			  resolve({service_name:srv,success:true})
	  	} else {
			  resolve({service_name:srv,success:false,err:err.toString()})
	  	}
	  })
	})
}

module.exports = router;
