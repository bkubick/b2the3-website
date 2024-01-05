import aws_cdk as core
import aws_cdk.assertions as assertions

from portfolio_api.portfolio_api_stack import PortfolioApiStack

# example tests. To run these tests, uncomment this file along with the example
# resource in portfolio_api/portfolio_api_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = PortfolioApiStack(app, "portfolio-api")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
