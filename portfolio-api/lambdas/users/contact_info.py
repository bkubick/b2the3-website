from __future__ import annotations

from typing import TypedDict


class ContactInfo(TypedDict):
    email: str
    github: str
    linkedIn: str


def lambda_handler(event, context):
    contactInfo = ContactInfo(
        email='brandonkubick@gmail.com',
        github='https://github.com/bkubick',
        linkedIn='https://www.linkedin.com/in/brandonkubick/',
    )

    return {
        'statusCode': 200,
        'body': {
            'contactInfo': contactInfo,
        }
    }
