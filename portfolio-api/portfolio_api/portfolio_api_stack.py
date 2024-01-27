from typing import Dict, List, Optional

from aws_cdk import Stack
import aws_cdk.aws_iam as iam
import aws_cdk.aws_lambda as _lambda
import aws_cdk.aws_apigateway as apigateway
from constructs import Construct

import config


def snake_to_camel_case(snake_str: str) -> str:
    """ Converts a snake case string to camel case.
    
        Args:
            snake_str: The snake case string to convert.
        
        Returns:
            The camel case string.
    """
    return ''.join(x.title() for x in snake_str.split('_'))


class PortfolioApiStack(Stack):

    LAMBDA_RUNTIME: _lambda.Runtime = config.PYTHON_RUNTIME
    LAMBDA_DIR: str = config.LAMBDA_DIR
    LAMBDA_REQUEST_TEMPLATES: Dict[str, str] = config.LAMBDA_REQUEST_TEMPLATES
    LAMBDA_HANDLER_NAME: str = config.LAMBDA_HANDLER_NAME

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Setup S3 Buckets
        """s3.Bucket(self, 'LogosBucket',
            bucket_name='logos-bucket',
        )"""

        # Setup IAM Roles
        portfolio_lambda_role = iam.Role(self, 'PortfolioLambdaRole',
            role_name='PortfolioLambdaRole',
            description='Role for portfolio lambda function',
            assumed_by=iam.ServicePrincipal('lambda.amazonaws.com'),
        )
        portfolio_lambda_role.add_managed_policy(iam.ManagedPolicy.from_aws_managed_policy_name('AmazonS3FullAccess'))

        # Setup API Gateway
        api = apigateway.RestApi(self, 'BankingRESTApi',
            rest_api_name='BankingRESTApi',
            deploy=True,
            description='REST API for banking application',
        )

        users_resouse = api.root.add_resource('users')

        users_resource = self._add_lambda_resource(
            role=portfolio_lambda_role,
            resource_parent=users_resouse,
            resource_path='{user_id}',
            methods=['GET'],
            lambda_handler='users.personal_info.lambda_handler',
            lambda_description='Lambda function to return personal user information')

        self._add_lambda_resource(
            role=portfolio_lambda_role,
            resource_parent=users_resource,
            resource_path='contact_info',
            methods=['GET', 'POST'],
            lambda_handler='users.contact_info.lambda_handler',
            lambda_description='Lambda function to return user contact information')

    def _lambda_handler_identifier(self, lambda_handler: str) -> str:
        """ Returns the identifier for the lambda handler.
        
            Args:
                lambda_handler: The name of the lambda handler.
                
            Returns:
                The identifier for the lambda handler.
        """
        return snake_to_camel_case(lambda_handler[:-len(self.LAMBDA_HANDLER_NAME)].replace('.', '-'))

    def _add_lambda_resource(self, role: iam.Role, resource_parent: apigateway.Resource, resource_path: str,
                             methods: List[str], lambda_handler: str,
                             lambda_description: Optional[str] = None) -> apigateway.Resource:
        """ Adds a lambda resource to the API Gateway and returns the resource object.
        
            Args:
                role: The IAM role to use for the lambda function.
                resource_parent: The parent resource to add the resource to.
                resource_path: The name of the resource to add.
                methods: The methods to add to the resource.
                lambda_handler: The name of the lambda handler to use.
                lambda_description: The description of the lambda function.

            Raises:
                ValueError: If lambda_handler name is invalid.
                
            Returns:
                The resource object that was created.
        """
        if not lambda_handler.endswith(self.LAMBDA_HANDLER_NAME):
            raise ValueError(f'lambda_handler must end with ".{self.LAMBDA_HANDLER_NAME}"')

        optional_params = {}
        if lambda_description:
            optional_params['description'] = lambda_description

        user_lambda_function = _lambda.Function(self, self._lambda_handler_identifier(lambda_handler),
            runtime=self.LAMBDA_RUNTIME,
            handler=lambda_handler,
            code=_lambda.Code.from_asset(self.LAMBDA_DIR),
            role=role,
            **optional_params)

        user_info_integration = apigateway.LambdaIntegration(user_lambda_function,
                                                             request_templates=self.LAMBDA_REQUEST_TEMPLATES)

        resource = resource_parent.add_resource(resource_path)

        for method in methods:
            resource.add_method(method, user_info_integration)

        return resource
