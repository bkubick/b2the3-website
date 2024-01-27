from __future__ import annotations

from typing import TypedDict

from aws_lambda_powertools.utilities.typing import LambdaContext


class User(TypedDict):
    firstName: str
    lastName: str
    tagline: str
    summary: str


def lambda_handler(event: dict, context: LambdaContext) -> dict:
    """ Returns the personal information for the user.

        Args:
            event (dict): The event that triggered the lambda function.
            context (LambdaContext): The context of the lambda function.

        Returns:
            The personal information for the user.
    """

    user = User(
        firstName='Brandon Kubick',
        lastName='Kubick',
        tagline='Full-Stack Developer | Aerospace Engineer',
        summary="""
            Hello, I'm Brandon, an expert with 2+ years of full-stack engineering
            experience and 2+ years of aviation aerospace engineering experience. I am
            passionate about solving complex problems and building scalable software
            solutions.
        """,
    )

    return {
        'statusCode': 200,
        'body': user,
    }
