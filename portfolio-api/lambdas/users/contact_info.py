from __future__ import annotations

from typing import TypedDict

from aws_lambda_powertools.utilities.typing import LambdaContext


class ContactInfo(TypedDict):
    email: str
    github: str
    linkedIn: str


def lambda_handler(event: dict, context: LambdaContext) -> dict:
    """ Returns the contact information for the user.

        Args:
            event (dict): The event that triggered the lambda function.
            context (LambdaContext): The context of the lambda function.

        Returns:
            The contact information for the user.
    """
    contactInfo = ContactInfo(
        email='brandonkubick@gmail.com',
        github='https://github.com/bkubick',
        linkedIn='https://www.linkedin.com/in/brandonkubick/',
    )

    return {
        'statusCode': 200,
        'body': contactInfo,
    }
