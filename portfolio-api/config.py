from typing import Dict

import aws_cdk.aws_lambda as _lambda


PYTHON_RUNTIME: _lambda.Runtime = _lambda.Runtime.PYTHON_3_12
LAMBDA_DIR: str = './lambdas/'
LAMBDA_REQUEST_TEMPLATES: Dict[str, str] = {'application/json': '{ "statusCode": "200" }'}
LAMBDA_HANDLER_NAME: str = 'lambda_handler'
