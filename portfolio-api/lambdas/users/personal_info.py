from __future__ import annotations

from typing import TypedDict


class User(TypedDict):
    firstName: str
    lastName: str
    tagline: str
    summary: str


def lambda_handler(event, context):

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
